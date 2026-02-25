import serial
import time
import struct
import socket
import threading
import base64


# ── UBX helpers ──────────────────────────────────────────────────────────────

def ubx_checksum(payload: bytes) -> bytes:
    ck_a, ck_b = 0, 0
    for b in payload:
        ck_a = (ck_a + b) & 0xFF
        ck_b = (ck_b + ck_a) & 0xFF
    return bytes([ck_a, ck_b])


def build_ubx(cls: int, msg_id: int, payload: bytes) -> bytes:
    length = len(payload).to_bytes(2, 'little')
    body = bytes([cls, msg_id]) + length + payload
    return b'\xb5\x62' + body + ubx_checksum(body)


def cfg_valset(layer: int, kvpairs: list) -> bytes:
    header = struct.pack('<BBH', 0, layer, 0)
    body = b''
    for key, fmt, val in kvpairs:
        body += struct.pack('<I', key)
        body += struct.pack('<' + fmt, val)
    return build_ubx(0x06, 0x8A, header + body)


# ── CFG-VALSET key IDs ────────────────────────────────────────────────────────

CFG_TMODE_MODE            = 0x20030001
CFG_TMODE_SVIN_MIN_DUR    = 0x40030010
CFG_TMODE_SVIN_ACC_LIMIT  = 0x40030011


# ── Serial helpers (shared port) ──────────────────────────────────────────────

def send_ubx_and_wait_for_ack(ser: serial.Serial, serial_lock: threading.Lock,
                               ubx_frame: bytes, label="command"):
    ACK_ACK = b'\xb5\x62\x05\x01'
    ACK_NAK = b'\xb5\x62\x05\x00'
    try:
        with serial_lock:
            ser.reset_input_buffer()
            print(f"Sending {label}...")
            ser.write(ubx_frame)
            buf, t0 = b"", time.time()
            while time.time() - t0 < 5:
                if ser.in_waiting:
                    buf += ser.read(ser.in_waiting)
                    if ACK_ACK in buf:
                        print(f"Success: {label}")
                        return True
                    if ACK_NAK in buf:
                        print(f"Failed: {label}")
                        return False
                time.sleep(0.05)
        print(f"Timeout waiting for ACK ({label})")
        return False
    except Exception as e:
        print(f"Serial error: {e}")
        return False


def poll_ubx(ser: serial.Serial, serial_lock: threading.Lock, cls, msg_id, timeout=2):
    with serial_lock:
        ser.write(build_ubx(cls, msg_id, b''))
        header = bytes([0xB5, 0x62, cls, msg_id])
        buf, t0 = b"", time.time()
        while time.time() - t0 < timeout:
            if ser.in_waiting:
                buf += ser.read(ser.in_waiting)
                idx = buf.find(header)
                if idx != -1 and len(buf) >= idx + 6:
                    length = int.from_bytes(buf[idx+4:idx+6], 'little')
                    end = idx + 6 + length + 2
                    if len(buf) >= end:
                        return buf[idx+6:idx+6+length]
            time.sleep(0.05)
    return None


def parse_nav_svin(p: bytes):
    if len(p) < 40: return False, 0, 0.0, 0
    dur     = int.from_bytes(p[8:12],  'little')
    meanAcc = int.from_bytes(p[28:32], 'little') / 10000.0
    obs     = int.from_bytes(p[32:36], 'little')
    valid   = bool(p[36])
    return valid, dur, meanAcc, obs


# ── NTRIP client ──────────────────────────────────────────────────────────────

NTRIP_HOST     = "polaris.pointonenav.com"
NTRIP_PORT     = 2101
NTRIP_USER     = "xxx"
NTRIP_PASS     = "xxx"
NTRIP_MOUNT    = "POLARIS"
GGA_INTERVAL   = 30


def nmea_checksum(sentence: str) -> str:
    ck = 0
    for c in sentence:
        ck ^= ord(c)
    return f"{ck:02X}"


def build_gga(lat=0.0, lon=0.0) -> bytes:
    now = time.gmtime()
    t   = f"{now.tm_hour:02d}{now.tm_min:02d}{now.tm_sec:02d}.00"
    abs_lat  = abs(lat);  lat_deg = int(abs_lat);  lat_min = (abs_lat - lat_deg) * 60
    abs_lon  = abs(lon);  lon_deg = int(abs_lon);  lon_min = (abs_lon - lon_deg) * 60
    lat_hem  = 'N' if lat >= 0 else 'S'
    lon_hem  = 'E' if lon >= 0 else 'W'
    body = (f"GPGGA,{t},"
            f"{lat_deg:02d}{lat_min:07.4f},{lat_hem},"
            f"{lon_deg:03d}{lon_min:07.4f},{lon_hem},"
            f"1,08,1.0,0.0,M,0.0,M,,")
    return f"${body}*{nmea_checksum(body)}\r\n".encode()


def ntrip_connect(host, port, mountpoint, user, password) -> socket.socket:
    credentials = base64.b64encode(f"{user}:{password}".encode()).decode()
    request = (
        f"GET /{mountpoint} HTTP/1.0\r\n"
        f"Host: {host}:{port}\r\n"
        f"Ntrip-Version: Ntrip/2.0\r\n"
        f"User-Agent: NTRIP PythonClient/1.0\r\n"
        f"Authorization: Basic {credentials}\r\n"
        f"Connection: keep-alive\r\n\r\n"
    )
    sock = socket.create_connection((host, port), timeout=10)
    sock.sendall(request.encode())
    response = b""
    while b"\r\n\r\n" not in response:
        chunk = sock.recv(1024)
        if not chunk:
            raise ConnectionError("NTRIP caster closed connection during handshake")
        response += chunk
    first_line = response.split(b"\r\n")[0].decode(errors="replace")
    if "200" not in first_line:
        raise ConnectionError(f"NTRIP caster rejected request: {first_line}")
    print(f"[NTRIP] Connected to {host}:{port}/{mountpoint}  ({first_line})")
    return sock


def ntrip_thread(ser: serial.Serial, serial_lock: threading.Lock,
                 stop_event: threading.Event, ready_event: threading.Event,
                 lat=0.0, lon=0.0):
    first_connect = True
    sock = None

    while not stop_event.is_set():
        try:
            sock = ntrip_connect(NTRIP_HOST, NTRIP_PORT, NTRIP_MOUNT,
                                 NTRIP_USER, NTRIP_PASS)
            sock.settimeout(5.0)

            gga = build_gga(lat, lon)
            sock.sendall(gga)
            print(f"[NTRIP] Sent initial GGA")
            last_gga = time.time()

            if first_connect:
                time.sleep(1.0)
                ready_event.set()
                first_connect = False

            while not stop_event.is_set():
                if time.time() - last_gga >= GGA_INTERVAL:
                    sock.sendall(build_gga(lat, lon))
                    last_gga = time.time()
                    print(f"\n[NTRIP] Sent GGA keepalive")

                try:
                    data = sock.recv(4096)
                    if not data:
                        raise ConnectionError("Caster closed stream")
                    with serial_lock:
                        ser.write(data)
                    print(f"[NTRIP] RTCM → serial: {len(data)} bytes    ", end="\r")
                except socket.timeout:
                    pass

        except Exception as e:
            print(f"\n[NTRIP] Error: {e}  — reconnecting in 5s...")
            try:
                sock.close()
            except Exception:
                pass
            time.sleep(5)


# ── Config ────────────────────────────────────────────────────────────────────

PORT = 'COM10'
BAUD = 115200
TARGET_ACCURACY_M = 1.0

DISABLE_CMD = cfg_valset(
    layer=3, kvpairs=[(CFG_TMODE_MODE, 'B', 0)]
)
SURVEY_IN_CMD = cfg_valset(
    layer=3,
    kvpairs=[
        (CFG_TMODE_MODE,          'B', 1),
        (CFG_TMODE_SVIN_MIN_DUR,  'I', 60),
        (CFG_TMODE_SVIN_ACC_LIMIT,'I', int(TARGET_ACCURACY_M * 10_000)),
    ]
)


# ── Main ──────────────────────────────────────────────────────────────────────

if __name__ == "__main__":

    # Open the serial port once and share it everywhere
    print(f"Opening serial port {PORT}...")
    ser = serial.Serial(PORT, BAUD, timeout=0.1)
    ser.dtr = False
    time.sleep(2)
    serial_lock = threading.Lock()
    print(f"Serial port open.\n")

    # ── Step 1: Start NTRIP ───────────────────────────────────────────────────
    print("--- Step 1: Starting NTRIP Client ---")
    stop_event  = threading.Event()
    ready_event = threading.Event()

    ntrip = threading.Thread(
        target=ntrip_thread,
        args=(ser, serial_lock, stop_event, ready_event),
        kwargs={"lat": 0.0, "lon": 0.0},
        daemon=True
    )
    ntrip.start()

    print("Waiting for NTRIP corrections to start flowing...")
    if not ready_event.wait(timeout=30):
        print("ERROR: NTRIP did not connect within 30s. Check credentials/network.")
        stop_event.set()
        ser.close()
        exit(1)
    print("NTRIP corrections flowing.\n")

    # ── Step 2: Disable TMODE ─────────────────────────────────────────────────
    print("--- Step 2: Disabling TMODE to reset survey ---")
    send_ubx_and_wait_for_ack(ser, serial_lock, DISABLE_CMD, "CFG-VALSET Disable")
    time.sleep(0.5)

    # ── Step 3: Start survey-in ───────────────────────────────────────────────
    print("\n--- Step 3: Starting Survey-In ---")
    ok = send_ubx_and_wait_for_ack(ser, serial_lock, SURVEY_IN_CMD, "CFG-VALSET Survey-In")

    if ok:
        print("\n--- Polling NAV-SVIN (Waiting for Target Accuracy) ---")
        ser.reset_input_buffer()

        while True:
            p = poll_ubx(ser, serial_lock, 0x01, 0x3B)
            if p:
                valid, dur, meanAcc, obs = parse_nav_svin(p)
                print(f"Dur: {dur}s | Obs: {obs} | Acc: {meanAcc:.4f}m "
                      f"(Target: {TARGET_ACCURACY_M}m) | Valid: {valid}   ", end="\r")
                if valid:
                    print(f"\n\nSurvey-in complete! Final Accuracy: {meanAcc:.4f}m")
                    break
            time.sleep(1)

    print("\nNTRIP client running. Press Ctrl+C to stop.\n")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        print("\nShutting down...")
        stop_event.set()
        ntrip.join(timeout=5)
        ser.close()
        print("Done.")