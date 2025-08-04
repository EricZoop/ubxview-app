import struct
import sys

def parse_ubx_nav_hpposllh(data):
    """
    Parse UBX NAV-HPPOSLLH message (0x01 0x14)
    Returns parsed position data or None if invalid
    """
    if len(data) < 36:  # Minimum payload size for NAV-HPPOSLLH
        print(f"  Payload too short: {len(data)} bytes, need 36")
        return None
    
    try:
        # Show raw payload in hex for debugging
        print(f"  Raw payload ({len(data)} bytes): {' '.join(f'{b:02X}' for b in data[:36])}")
        
        # Parse according to UBX NAV-HPPOSLLH specification
        version = struct.unpack('<B', data[0:1])[0]      # Byte 0: Version
        reserved1 = data[1:4]                            # Bytes 1-3: Reserved
        iTOW = struct.unpack('<I', data[4:8])[0]         # Bytes 4-7: iTOW (unsigned!)
        lon = struct.unpack('<i', data[8:12])[0]         # Bytes 8-11: Longitude (signed)
        lat = struct.unpack('<i', data[12:16])[0]        # Bytes 12-15: Latitude (signed)
        height = struct.unpack('<i', data[16:20])[0]     # Bytes 16-19: Height (signed)
        hMSL = struct.unpack('<i', data[20:24])[0]       # Bytes 20-23: Height MSL (signed)
        lonHp = struct.unpack('<b', data[24:25])[0]      # Byte 24: Lon HP (signed)
        latHp = struct.unpack('<b', data[25:26])[0]      # Byte 25: Lat HP (signed)
        heightHp = struct.unpack('<b', data[26:27])[0]   # Byte 26: Height HP (signed)
        hMSLHp = struct.unpack('<b', data[27:28])[0]     # Byte 27: MSL HP (signed)
        hAcc = struct.unpack('<I', data[28:32])[0]       # Bytes 28-31: Horizontal accuracy
        vAcc = struct.unpack('<I', data[32:36])[0]       # Bytes 32-35: Vertical accuracy
        
        print(f"  Version: {version}")
        print(f"  iTOW: {iTOW} ms")
        print(f"  Raw longitude: {lon} (×10⁻⁷ deg) = {lon * 1e-7:.9f}°")
        print(f"  Raw latitude:  {lat} (×10⁻⁷ deg) = {lat * 1e-7:.9f}°")
        print(f"  Raw height:    {height} mm = {height * 1e-3:.3f} m")
        print(f"  Raw hMSL:      {hMSL} mm = {hMSL * 1e-3:.3f} m")
        print(f"  HP components: lonHp={lonHp}, latHp={latHp}, heightHp={heightHp}, hMSLHp={hMSLHp}")
        print(f"  Accuracies: hAcc={hAcc} mm ({hAcc * 1e-3:.3f} m), vAcc={vAcc} mm ({vAcc * 1e-3:.3f} m)")
        
        # Calculate high precision coordinates
        lon_hp = (lon * 1e-7) + (lonHp * 1e-9)
        lat_hp = (lat * 1e-7) + (latHp * 1e-9)
        height_hp = (height * 1e-3) + (heightHp * 1e-4)
        hMSL_hp = (hMSL * 1e-3) + (hMSLHp * 1e-4)
        
        print(f"  FINAL High-Precision Coordinates:")
        print(f"    Longitude: {lon_hp:.9f}°")
        print(f"    Latitude:  {lat_hp:.9f}°")
        print(f"    Height:    {height_hp:.4f} m (ellipsoid)")
        print(f"    MSL:       {hMSL_hp:.4f} m")
        
        return {
            'iTOW': iTOW,
            'version': version,
            'longitude': lon_hp,
            'latitude': lat_hp,
            'height_ellipsoid': height_hp,
            'height_msl': hMSL_hp,
            'horizontal_accuracy': hAcc * 1e-3,
            'vertical_accuracy': vAcc * 1e-3
        }
    except struct.error as e:
        print(f"  Struct unpack error: {e}")
        return None
    except Exception as e:
        print(f"  Parse error: {e}")
        return None

def find_ubx_messages(data):
    """
    Find all UBX messages in binary data
    Returns list of (class, id, payload) tuples
    """
    messages = []
    i = 0
    
    print(f"Scanning {len(data)} bytes for UBX messages...")
    
    while i < len(data) - 8:  # Need at least 8 bytes for header + length + checksum
        # Look for UBX sync chars (0xB5 0x62)
        if data[i] == 0xB5 and data[i+1] == 0x62:
            print(f"Found UBX sync at byte {i}: {data[i]:02X} {data[i+1]:02X}")
            try:
                msg_class = data[i+2]
                msg_id = data[i+3]
                length = struct.unpack('<H', data[i+4:i+6])[0]
                
                print(f"  Class: 0x{msg_class:02X}, ID: 0x{msg_id:02X}, Length: {length}")
                
                # Check if we have enough data for the complete message
                if i + 8 + length <= len(data):
                    payload = data[i+6:i+6+length]
                    
                    # Verify checksum
                    ck_a = data[i+6+length]
                    ck_b = data[i+6+length+1]
                    
                    # Calculate expected checksum
                    calc_ck_a = calc_ck_b = 0
                    for byte in data[i+2:i+6+length]:
                        calc_ck_a = (calc_ck_a + byte) & 0xFF
                        calc_ck_b = (calc_ck_b + calc_ck_a) & 0xFF
                    
                    print(f"  Checksum: {ck_a:02X} {ck_b:02X}, Calculated: {calc_ck_a:02X} {calc_ck_b:02X}")
                    
                    if ck_a == calc_ck_a and ck_b == calc_ck_b:
                        print(f"  ✓ Valid UBX message found!")
                        messages.append((msg_class, msg_id, payload))
                        i += 8 + length  # Skip to next potential message
                    else:
                        print(f"  ✗ Checksum mismatch")
                        i += 1  # Invalid checksum, try next byte
                else:
                    print(f"  ✗ Not enough data for complete message")
                    i += 1  # Not enough data for complete message
            except (struct.error, IndexError) as e:
                print(f"  ✗ Error parsing: {e}")
                i += 1
        else:
            i += 1
    
    return messages

def process_file(filename):
    """
    Process a mixed text/binary file and extract UBX NAV-HPPOSLLH messages
    """
    try:
        # Try reading as binary first
        with open(filename, 'rb') as f:
            data = f.read()
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found")
        return
    except Exception as e:
        print(f"Error reading file: {e}")
        return
    
    # If the file contains mixed text/binary (like your example), 
    # we need to handle it as bytes directly
    print(f"Raw data preview (first 200 bytes as hex):")
    print(" ".join(f"{b:02X}" for b in data[:200]))
    print()
    
    print(f"Processing file: {filename}")
    print(f"File size: {len(data)} bytes")
    print("-" * 50)
    
    # Find all UBX messages
    messages = find_ubx_messages(data)
    
    nav_hpposllh_count = 0
    other_ubx_count = 0
    
    for msg_class, msg_id, payload in messages:
        if msg_class == 0x01 and msg_id == 0x14:  # NAV-HPPOSLLH
            nav_hpposllh_count += 1
            result = parse_ubx_nav_hpposllh(payload)
            
            if result:
                print(f"NAV-HPPOSLLH Message #{nav_hpposllh_count}:")
                print(f"  Time of Week: {result['iTOW']} ms")
                print(f"  Latitude:     {result['latitude']:.9f}°")
                print(f"  Longitude:    {result['longitude']:.9f}°")
                print(f"  Height (ellipsoid): {result['height_ellipsoid']:.4f} m")
                print(f"  Height (MSL):       {result['height_msl']:.4f} m")
                print(f"  Horizontal Accuracy: {result['horizontal_accuracy']:.3f} m")
                print(f"  Vertical Accuracy:   {result['vertical_accuracy']:.3f} m")
                print("-" * 50)
            else:
                print(f"NAV-HPPOSLLH Message #{nav_hpposllh_count}: Parse error")
                print("-" * 50)
        else:
            other_ubx_count += 1
    
    print(f"Summary:")
    print(f"  NAV-HPPOSLLH messages found: {nav_hpposllh_count}")
    print(f"  Other UBX messages found: {other_ubx_count}")
    print(f"  Total UBX messages: {len(messages)}")

# Example usage
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python ubx_parser.py <filename>")
        print("Example: python ubx_parser.py seglog00.txt")
    else:
        process_file(sys.argv[1])

# You can also use it directly in code:
process_file("C:/ubxview-app/data/drone/8-1-2025/SEQLOG00.TXT")