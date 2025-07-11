import time
import argparse
import os

def simulate_writing_binary(input_path, output_path, delay=1.0):
    """Simulate writing to a binary file chunk by chunk with a delay, showing progress."""
    try:
        total_size = os.path.getsize(input_path)
        written_size = 0

        with open(input_path, 'rb') as infile, open(output_path, 'wb') as outfile:
            while True:
                line = infile.readline()
                if not line:
                    break
                outfile.write(line)
                outfile.flush()
                written_size += len(line)

                percent = (written_size / total_size) * 100
                print(f"Wrote {len(line)} bytes. Progress: {percent:.2f}%")
                time.sleep(delay)

        print(f"\nSimulation complete. Output written to '{output_path}'.")

    except FileNotFoundError:
        print(f"Error: File not found - '{input_path}'")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Simulate binary file writing with delay.")
    parser.add_argument("input_file", help="Path to the binary input file")
    parser.add_argument("output_file", help="Path to the output file")
    parser.add_argument("--delay", type=float, default=1.0, help="Delay between writes (in seconds)")

    args = parser.parse_args()

    simulate_writing_binary(args.input_file, args.output_file, args.delay)
