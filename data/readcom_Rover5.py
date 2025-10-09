import serial  # type: ignore
import sys
import os
import re
import datetime

SERIAL_PORT = "COM7"
BAUD_RATE = 115200

# Regex to extract NMEA sentences safely
NMEA_PATTERN = re.compile(r'\$[A-Z]{2}[A-Z0-9]{3},[^$]*?(?:\*[0-9A-Fa-f]{2})?(?=$|\s|\r|\n|\$)')

def split_nmea_sentences(line: str):
    """Split a line into one or more NMEA sentences."""
    return NMEA_PATTERN.findall(line)

def is_valid_nmea(sentence: str) -> bool:
    """Basic NMEA structure validation."""
    if not sentence.startswith('$') or len(sentence) < 6:
        return False
    if '*' in sentence:
        parts = sentence.split('*')
        if len(parts[-1]) == 2:  # checksum looks valid
            return True
    return True  # still allow sentences without checksum

def sort_nmea_sentences():
    start_time = datetime.datetime.now()
    serial_connection = None

    try:
        serial_connection = serial.Serial(
            port=SERIAL_PORT,
            baudrate=BAUD_RATE,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            bytesize=serial.EIGHTBITS,
            timeout=1
        )

        print(f"Opened {SERIAL_PORT} at {BAUD_RATE} baud.")
        print("Listening for NMEA data... (Ctrl+C to stop)")

        timestamp = datetime.datetime.now().strftime("%m-%d-%Y_%H-%M-%S")
        output_dir = f"RTK_NMEA_{timestamp}"
        os.makedirs(output_dir, exist_ok=True)
        print(f"Output directory: {output_dir}")

        buffer = ""
        while True:
            if serial_connection.in_waiting > 0:
                chunk = serial_connection.read(serial_connection.in_waiting).decode('utf-8', errors='ignore')
                buffer += chunk

                # Split on newlines or incomplete joins
                lines = buffer.splitlines()
                buffer = lines.pop() if not buffer.endswith(('\n', '\r')) else ""

                for line in lines:
                    sentences = split_nmea_sentences(line)
                    for sentence in sentences:
                        if is_valid_nmea(sentence):
                            talker_id = sentence[1:3]
                            if talker_id.isalpha() and len(talker_id) == 2:
                                file_path = os.path.join(output_dir, f"{talker_id}_{timestamp}.txt")
                                try:
                                    with open(file_path, 'a', encoding='utf-8') as f:
                                        f.write(sentence + '\n')
                                    print(sentence)
                                except Exception as e:
                                    print(f"Write error ({file_path}): {e}")
                        else:
                            print(f"Skipping invalid NMEA: {sentence}")

    except serial.SerialException as e:
        print(f"Error opening port {SERIAL_PORT}: {e}")
        sys.exit(1)
    except KeyboardInterrupt:
        print("\nStopping as requested by user.")
    except Exception as e:
        print(f"Unexpected error: {e}")
    finally:
        if serial_connection and serial_connection.is_open:
            serial_connection.close()
            print(f"Port '{SERIAL_PORT}' closed.")
        duration = datetime.datetime.now() - start_time
        print(f"Script finished. Runtime: {duration}")

if __name__ == "__main__":
    sort_nmea_sentences()
