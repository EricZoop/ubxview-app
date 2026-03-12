import socket, base64

HOST, PORT, MOUNT = "polaris.pointonenav.com", 2101, "polaris"
USER, PASS = "x2j5638n5g", "twzbvf3jxe"  # your real password

creds = base64.b64encode(f"{USER}:{PASS}".encode()).decode()
req = (
    f"GET /{MOUNT} HTTP/1.0\r\n"
    f"Host: {HOST}:{PORT}\r\n"
    f"Ntrip-Version: Ntrip/2.0\r\n"
    f"User-Agent: NTRIP PythonClient/1.0\r\n"
    f"Authorization: Basic {creds}\r\n"
    f"Connection: keep-alive\r\n\r\n"
)

sock = socket.create_connection((HOST, PORT), timeout=10)
sock.sendall(req.encode())

resp = b""
while b"\r\n\r\n" not in resp:
    resp += sock.recv(1024)

print(resp.split(b"\r\n")[0])          # Should print: ICY 200 OK
data = sock.recv(256)
print(f"Got {len(data)} bytes of RTCM data: {data[:20].hex()}")  # RTCM3 starts with D3
sock.close()