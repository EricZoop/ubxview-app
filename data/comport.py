import serial
import time
import struct


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
    """
    Build a CFG-VALSET message (UBX class 0x06, ID 0x8A).
    layer: 1=RAM, 2=BBR, 3=RAM+BBR
    kvpairs: list of (key_u32, struct_fmt_char, value)
    """
    header = struct.pack('<BBH', 0, layer, 0)
    body = b''
    for key, fmt, val in kvpairs:
        body += struct.pack('<I', key)
        body += struct.pack('<' + fmt, val)
    return build_ubx(0x06, 0x8A, header + body)


# ── CFG-VALSET key IDs (ZED-F9P interface description) ───────────────────────

CFG_TMODE_MODE            = 0x20030001  # U1: 0=disabled 1=survey-in 2=fixed
CFG_TMODE_SVIN_MIN_DUR    = 0x40030010  # U4: min duration (seconds)
CFG_TMODE_SVIN_ACC_LIMIT  = 0x40030011  # U4: accuracy limit (0.1 mm units)


# ── Serial helpers ────────────────────────────────────────────────────────────

def send_ubx_and_wait_for_ack(port, baud, ubx_frame: bytes, label="command"):
    ACK_ACK = b'\xb5\x62\x05\x01'
    ACK_NAK = b'\xb5\x62\x05\x00'
    try:
        with serial.Serial(port, baud, timeout=0.1) as ser:
            ser.dtr = False
            time.sleep(2)
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


def poll_ubx(ser, cls, msg_id, timeout=2):
    """Sends a poll request and returns the payload."""
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
    """Extracts duration, accuracy, observations, and valid flag from NAV-SVIN payload."""
    if len(p) < 40: return False, 0, 0.0, 0
    dur     = int.from_bytes(p[8:12],  'little')
    meanAcc = int.from_bytes(p[28:32], 'little') / 10000.0  # 0.1mm → m
    obs     = int.from_bytes(p[32:36], 'little')
    valid   = bool(p[36])
    return valid, dur, meanAcc, obs


# ── Main ──────────────────────────────────────────────────────────────────────

PORT = 'COM10'
BAUD = 115200

TARGET_ACCURACY_M = 1.0 # Target accuracy in meters (for print formatting)

DISABLE_CMD = cfg_valset(
    layer=3,
    kvpairs=[(CFG_TMODE_MODE, 'B', 0)] 
)

SURVEY_IN_CMD = cfg_valset(
    layer=3,
    kvpairs=[
        (CFG_TMODE_MODE,          'B', 1),      
        (CFG_TMODE_SVIN_MIN_DUR,  'I', 60),     
        (CFG_TMODE_SVIN_ACC_LIMIT,'I', int(TARGET_ACCURACY_M * 10_000)), 
    ]
)

if __name__ == "__main__":
    print("--- Step 1: Disabling TMODE to reset survey ---")
    send_ubx_and_wait_for_ack(PORT, BAUD, DISABLE_CMD, "CFG-VALSET Disable")
    time.sleep(0.5)

    print("\n--- Step 2: Starting Fresh Survey-In ---")
    ok = send_ubx_and_wait_for_ack(PORT, BAUD, SURVEY_IN_CMD, "CFG-VALSET Survey-In")

    if ok:
        print("\n--- Polling NAV-SVIN (Waiting for Target Accuracy) ---")
        with serial.Serial(PORT, BAUD, timeout=0.1) as ser:
            ser.dtr = False
            time.sleep(2.5)
            ser.reset_input_buffer()

            while True:
                p = poll_ubx(ser, 0x01, 0x3B) # Poll NAV-SVIN
                if p: 
                    valid, dur, meanAcc, obs = parse_nav_svin(p)
                    
                    # \r overwrites the line instead of printing a new one
                    print(f"Dur: {dur}s | Obs: {obs} | Acc: {meanAcc:.4f}m (Target: {TARGET_ACCURACY_M}m) | Valid: {valid}   ", end="\r")
                    
                    if valid:
                        print(f"\n\nSurvey-in complete! Final Accuracy: {meanAcc:.4f}m")
                        break
                
                # Wait 1 second before polling again to avoid flooding the serial line
                time.sleep(1)