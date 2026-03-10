import socket, base64

req = "GET / HTTP/1.0\r\nHost: polaris.pointonenav.com:2101\r\nNtrip-Version: Ntrip/2.0\r\nUser-Agent: NTRIP PythonClient/1.0\r\n\r\n"
sock = socket.create_connection(("polaris.pointonenav.com", 2101), timeout=10)
sock.sendall(req.encode())
resp = b""
for _ in range(20):
    resp += sock.recv(4096)
    if b"ENDSOURCETABLE" in resp:
        break
print(resp.decode(errors="replace"))
sock.close()