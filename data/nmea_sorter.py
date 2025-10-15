# python .\nmea_sorter.py

import os
import datetime
import functools
import sys

def validate_nmea_checksum(sentence: str) -> bool:
    """
    Validates an NMEA sentence's checksum, making the sorter more robust.

    Args:
        sentence: The NMEA sentence string (e.g., "$GNGGA,...*74").

    Returns:
        True if the sentence format is valid and the checksum matches, False otherwise.
    """
    sentence = sentence.strip()
    # A valid sentence starts with '$' and has a checksum separated by '*'
    if not sentence.startswith('$') or '*' not in sentence:
        return False

    # Split the sentence from the checksum
    parts = sentence.split('*')
    if len(parts) != 2:
        return False  # Malformed sentence, multiple '*' or missing checksum

    sentence_body = parts[0][1:]  # Get the part between '$' and '*'
    checksum_str = parts[1]

    try:
        checksum_from_sentence = int(checksum_str, 16)
    except ValueError:
        return False  # Checksum is not a valid hex number

    # Calculate the checksum by XORing the ASCII values of all characters in the body
    calculated_checksum = functools.reduce(lambda x, y: x ^ y, map(ord, sentence_body), 0)

    # Compare the calculated checksum with the one from the sentence
    return calculated_checksum == checksum_from_sentence

def sort_nmea_file(input_filename="nmea_data.txt"):
    """
    Reads an NMEA data file, validates checksums, and sorts valid
    sentences by talker ID into separate files, placing them in a new
    timestamped directory. Invalid sentences are disregarded.

    Args:
        input_filename (str): The name of the input file to process.
    """
    # 1. Check if the input file exists
    if not os.path.exists(input_filename):
        print(f"Error: Input file '{input_filename}' not found.")
        return

    # 2. Create a timestamped directory for the output
    now = datetime.datetime.now()
    timestamp_str = now.strftime("%m-%d-%Y_%H-%M-%S")
    output_dir = f"RTK_NMEA_{timestamp_str}"

    try:
        os.makedirs(output_dir)
        print(f"Successfully created directory: {output_dir}")
    except OSError as e:
        print(f"Error creating directory {output_dir}: {e}")
        return

    # 3. Process the input file
    output_files = {}  # Dictionary to store file handles for each talker ID
    valid_count = 0
    invalid_count = 0
    try:
        with open(input_filename, 'r') as infile:
            for line in infile:
                # Use the new, stronger validation function
                if validate_nmea_checksum(line):
                    valid_count += 1
                    # Extract the talker ID (e.g., GNGGA) from the valid line
                    talker_id = line.strip().split(',')[0][1:]

                    # If we haven't seen this talker ID yet, create a new file for it
                    if talker_id not in output_files:
                        output_filename = f"{talker_id}_{timestamp_str}.txt"
                        full_path = os.path.join(output_dir, output_filename)
                        output_files[talker_id] = open(full_path, 'w')
                        print(f"Creating file for valid talker ID: {talker_id}")

                    # Write the valid line to the correct output file
                    output_files[talker_id].write(line)
                else:
                    # This line is invalid and will be disregarded
                    invalid_count += 1

    except IOError as e:
        print(f"Error reading from {input_filename}: {e}")
    finally:
        # 4. Close all the opened output files
        for f in output_files.values():
            f.close()
        
        # 5. Print a summary of the operation
        print("\n--- Processing Summary ---")
        print(f"Valid sentences processed: {valid_count}")
        print(f"Invalid/disregarded lines: {invalid_count}")
        print("--------------------------")
        print("Processing complete. All files closed.")


if __name__ == "__main__":
    # Check if a filename was provided on the command line
    if len(sys.argv) > 1:
        input_file = sys.argv[1]
        print(f"Processing file provided via command line: '{input_file}'")
        sort_nmea_file(input_file)
    else:
        # If no file is provided, use the default and show usage instructions
        print("No input file specified on command line.")
        print("Usage: python sort_nmea.py <your_nmea_file.txt>")
        print("Falling back to default file: 'nmea_data.txt'")
        sort_nmea_file()

