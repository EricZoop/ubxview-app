# NMEA Talker Sorter
# This script opens a serial port, reads NMEA sentences,
# and writes sentences from different talkers to separate files.

# First, you need to install the pyserial library if you haven't already.
# You can do this by running the following command in your terminal:
# pip install pyserial

import serial # type: ignore
import sys
import os
import datetime

# --- Configuration ---
# Please change these values to match your setup.
SERIAL_PORT = "COM7"  # The COM port your device is connected to (e.g., "COM4" on Windows, "/dev/ttyUSB0" on Linux)
BAUD_RATE = 115200    # The baud rate of your serial device

def sort_nmea_sentences():
    """
    Connects to a serial port, reads NMEA data, and sorts sentences
    into different files based on their talker ID.
    """
    start_time = datetime.datetime.now()
    serial_connection = None  # Initialize to None
    try:
        # Establish the serial connection
        serial_connection = serial.Serial(
            port=SERIAL_PORT,
            baudrate=BAUD_RATE,
            parity=serial.PARITY_NONE,
            stopbits=serial.STOPBITS_ONE,
            bytesize=serial.EIGHTBITS,
            timeout=1  # Set a timeout for reading
        )
        print(f"Successfully opened port '{SERIAL_PORT}' at {BAUD_RATE} baud.")
        print("Listening for NMEA data... Press Ctrl+C to stop.")

        # Create a directory to store the output files with a timestamp
        timestamp = datetime.datetime.now().strftime("%m-%d-%Y_%H-%M-%S")
        output_dir = f"RTK_NMEA_{timestamp}"
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)
            print(f"Created output directory: '{output_dir}'")

        while True:
            if serial_connection.in_waiting > 0:
                # Read a line from the serial port
                # The readline() method reads until a newline character is found
                line_bytes = serial_connection.readline()

                # Decode the bytes into a string, ignoring potential errors
                line_str = line_bytes.decode('utf-8', errors='ignore').strip()

                # Process only if the line is a valid NMEA sentence (starts with '$')
                if line_str.startswith('$') and len(line_str) > 3:
                    # The talker ID is the two characters following the '$'
                    # Example: $GPGGA -> Talker ID is 'GP'
                    talker_id = line_str[1:3]

                    # Validate that the talker ID consists of two alphabetic characters
                    if len(talker_id) == 2 and talker_id.isalpha():
                        # Construct the output filename
                        file_path = os.path.join(output_dir, f"{talker_id}_{timestamp}.txt")

                        # Open the specific file in append mode and write the line
                        with open(file_path, 'a') as f:
                            f.write(line_str + '\n')

                        # Print to the console to show activity
                        print(line_str)
                    else:
                        # If the talker ID is not valid, print a warning and skip the line
                        print(f"Skipping malformed line (invalid talker ID): {line_str}")

    except serial.SerialException as e:
        print(f"Error: Could not open serial port '{SERIAL_PORT}'.")
        print(f"Details: {e}")
        print("Please ensure the port name is correct and not in use by another application.")
        sys.exit(1)
    except KeyboardInterrupt:
        # Handle the user pressing Ctrl+C to exit gracefully
        print("\nStopping script as requested by user.")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")
    finally:
        # This block will run whether an error occurred or not
        if serial_connection and serial_connection.is_open:
            serial_connection.close()
            print(f"Port '{SERIAL_PORT}' closed.")
        
        end_time = datetime.datetime.now()
        duration = end_time - start_time
        print(f"Script finished. Total runtime: {duration}")

if __name__ == "__main__":
    sort_nmea_sentences()

