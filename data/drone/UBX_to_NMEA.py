import struct
import sys

def parse_ubx_nav_hpposllh(data):
    """
    Parses the payload of a UBX NAV-HPPOSLLH message (0x01 0x14).

    Args:
        data: The 36-byte payload of the message.

    Returns:
        A dictionary containing the parsed position data, or None if parsing fails.
    """
    if len(data) < 36:
        # Payload is too short, cannot parse.
        return None
    
    try:
        # Unpack the binary data according to the UBX protocol specification.
        # < denotes little-endian byte order.
        # '3x' skips the 3 reserved bytes without creating a value to unpack.
        
        # CORRECTED LINE: The placeholder '_' has been removed.
        version, iTOW, lon, lat, height, hMSL, lonHp, latHp, heightHp, hMSLHp, hAcc, vAcc = struct.unpack(
            '<B3xIiiiibbbbII', data[:36]
        )
        
        # Calculate the final high-precision coordinates by combining the main value
        # with the high-precision component.
        # Longitude/Latitude: Main part is 1e-7 degrees, HP part is 1e-9 degrees.
        # Height/hMSL: Main part is millimeters, HP part is 0.1 millimeters.
        
        final_lon = (lon * 1e-7) + (lonHp * 1e-9)
        final_lat = (lat * 1e-7) + (latHp * 1e-9)
        final_height = (height * 1e-3) + (heightHp * 1e-4) # Convert to meters
        final_hMSL = (hMSL * 1e-3) + (hMSLHp * 1e-4)     # Convert to meters
        
        # Accuracy values are in millimeters, convert to meters.
        h_accuracy_m = hAcc * 1e-3
        v_accuracy_m = vAcc * 1e-3
        
        # Return the parsed data in a dictionary.
        return {
            'iTOW': iTOW,
            'version': version,
            'longitude': final_lon,
            'latitude': final_lat,
            'height_ellipsoid': final_height,
            'height_msl': final_hMSL,
            'horizontal_accuracy': h_accuracy_m,
            'vertical_accuracy': v_accuracy_m
        }
    except (struct.error, IndexError) as e:
        # Handle cases where the binary data doesn't match the expected format.
        print(f"Error unpacking struct: {e}", file=sys.stderr)
        return None

def find_ubx_messages(data):
    """
    Finds all valid UBX messages within a block of binary data.

    Args:
        data: The binary data to scan.

    Returns:
        A list of tuples, where each tuple contains (message_class, message_id, payload).
    """
    messages = []
    i = 0
    while i < len(data) - 8: # Minimum length for a UBX message (header, length, checksum)
        # Look for the UBX sync characters (0xB5 0x62)
        if data[i] == 0xB5 and data[i+1] == 0x62:
            try:
                # Extract header and payload length
                msg_class = data[i+2]
                msg_id = data[i+3]
                length = struct.unpack('<H', data[i+4:i+6])[0]
                
                # Ensure the full message is contained in the data
                if i + 8 + length > len(data):
                    i += 1
                    continue
                    
                # Extract the payload and checksum bytes
                payload = data[i+6:i+6+length]
                ck_a_rcvd, ck_b_rcvd = data[i+6+length], data[i+6+length+1]
                
                # Calculate the Fletcher-8 checksum on the message
                calc_ck_a = calc_ck_b = 0
                for byte in data[i+2:i+6+length]:
                    calc_ck_a = (calc_ck_a + byte) & 0xFF
                    calc_ck_b = (calc_ck_b + calc_ck_a) & 0xFF
                
                # Verify that the received checksum matches the calculated one
                if ck_a_rcvd == calc_ck_a and ck_b_rcvd == calc_ck_b:
                    messages.append((msg_class, msg_id, payload))
                    i += 8 + length  # Skip to the end of the current message
                else:
                    i += 1 # Checksum mismatch, move to the next byte
            except (struct.error, IndexError):
                i += 1 # Error during parsing, move to the next byte
        else:
            i += 1 # Not a sync character, move to the next byte
            
    return messages

def process_file(filename):
    """
    Reads a binary or mixed-content file, finds all UBX NAV-HPPOSLLH messages,
    and prints them in a NMEA-like text format.
    """
    try:
        with open(filename, 'rb') as f:
            data = f.read()
    except FileNotFoundError:
        print(f"Error: File '{filename}' not found.", file=sys.stderr)
        return
    except Exception as e:
        print(f"Error reading file '{filename}': {e}", file=sys.stderr)
        return

    # Find all valid UBX messages in the file data
    all_messages = find_ubx_messages(data)
    
    hpposllh_count = 0

    for msg_class, msg_id, payload in all_messages:
        # Check for the NAV-HPPOSLLH message (Class 0x01, ID 0x14)
        if msg_class == 0x01 and msg_id == 0x14:
            hpposllh_count += 1
            result = parse_ubx_nav_hpposllh(payload)
            
            if result:
                # ** FORMATTING THE OUTPUT AS A NMEA-LIKE SENTENCE **
                # Format: $HPPOSLLH,lat,lon,iTOW,height_ellipsoid,height_msl,h_acc,v_acc
                nmea_sentence = (
                    f"$HPPOSLLH,"
                    f"{result['latitude']:.9f},"
                    f"{result['longitude']:.9f},"
                    f"{result['iTOW']},"
                    f"{result['height_ellipsoid']:.4f},"
                    f"{result['height_msl']:.4f},"
                    f"{result['horizontal_accuracy']:.3f},"
                    f"{result['vertical_accuracy']:.3f}"
                )
                print(nmea_sentence)

    print("-" * 50, file=sys.stderr)
    print(f"# Summary:", file=sys.stderr)
    print(f"#   Total UBX messages found: {len(all_messages)}", file=sys.stderr)
    print(f"#   NAV-HPPOSLLH messages processed: {hpposllh_count}", file=sys.stderr)

# --- Main execution block ---
if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Converts UBX NAV-HPPOSLLH messages from a file to a NMEA-like format.")
        print(f"Usage: python {sys.argv[0]} <input_filename>")
        print(f"Example: python {sys.argv[0]} seglog00.txt")
    else:
        process_file(sys.argv[1])