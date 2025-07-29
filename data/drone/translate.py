import pynmea2 #type: ignore
import argparse

def dms_to_dd(degrees, minutes, direction):
    """Converts Degrees Minutes Seconds (DMS) to Decimal Degrees (DD)."""
    dd = float(degrees) + float(minutes)/60
    if direction in ['S', 'W']:
        dd *= -1
    return dd

def dd_to_dms(dd):
    """Converts Decimal Degrees (DD) to Degrees Minutes Seconds (DMS) format for NMEA."""
    is_positive = dd >= 0
    dd = abs(dd)
    degrees = int(dd)
    minutes = (dd - degrees) * 60
    
    # Determine direction based on whether it's latitude or longitude.
    # This part of the logic was flawed and is now corrected.
    # We need context to know if it's lat or lon.
    # The calling function will now handle direction.
        
    # Format for NMEA (ddmm.mmmmmm for lat, dddmm.mmmmmm for lon)
    if 'lat' in dd_to_dms.__name__: # A simple check, better to pass context
        nmea_deg = f"{degrees:02d}"
    else:
        nmea_deg = f"{degrees:03d}"
    nmea_min = f"{minutes:09.6f}".zfill(9)

    return nmea_deg + nmea_min.split('.')[0] + '.' + nmea_min.split('.')[1]


def get_new_direction(dd, is_lat):
    """Determines the cardinal direction based on decimal degrees."""
    if is_lat:
        return 'N' if dd >= 0 else 'S'
    else:
        return 'E' if dd >= 0 else 'W'

def format_lat_dms(dd):
    """Formats a latitude decimal degree value into NMEA dddmm.mmmmmm format."""
    is_positive = dd >= 0
    dd = abs(dd)
    degrees = int(dd)
    minutes = (dd - degrees) * 60
    return f"{degrees:02d}{minutes:09.6f}"

def format_lon_dms(dd):
    """Formats a longitude decimal degree value into NMEA dddmm.mmmmmm format."""
    is_positive = dd >= 0
    dd = abs(dd)
    degrees = int(dd)
    minutes = (dd - degrees) * 60
    return f"{degrees:03d}{minutes:09.6f}"


def translate_coordinates(input_file, output_file, target_lat_dd, target_lon_dd):
    """
    Translates a file of GNGGA sentences to a new starting location.

    Args:
        input_file (str): Path to the input file with NMEA sentences.
        output_file (str): Path to write the translated NMEA sentences.
        target_lat_dd (float): The target latitude in decimal degrees.
        target_lon_dd (float): The target longitude in decimal degrees.
    """
    first_coord = None
    lat_offset = 0
    lon_offset = 0

    # Open the input file with utf-8 encoding and ignore errors to handle binary/garbage characters.
    with open(input_file, 'r', encoding='utf-8', errors='ignore') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
        for line in infile:
            # Find the start of the NMEA sentence ($)
            start_index = line.find('$')
            if start_index == -1:
                continue # Skip lines without a '$'

            # Find the checksum character '*' and truncate the line right after the 2-digit checksum.
            # This removes any trailing garbage characters that cause conversion errors.
            checksum_index = line.find('*', start_index)
            if checksum_index != -1 and len(line) >= checksum_index + 3:
                stripped_line = line[start_index : checksum_index + 3].strip()
            else:
                # If no checksum, just take from the start (might be incomplete)
                stripped_line = line[start_index:].strip()

            if not stripped_line:
                continue
            
            try:
                # Parse the NMEA sentence
                msg = pynmea2.parse(stripped_line)

                # Check if it's a GGA sentence with valid data
                if isinstance(msg, pynmea2.types.talker.GGA) and msg.lat and msg.lon:
                    # Convert parsed latitude and longitude to decimal degrees
                    current_lat_dd = dms_to_dd(msg.lat[:2], msg.lat[2:], msg.lat_dir)
                    current_lon_dd = dms_to_dd(msg.lon[:3], msg.lon[3:], msg.lon_dir)

                    # If this is the first coordinate, calculate the offset
                    if first_coord is None:
                        first_coord = (current_lat_dd, current_lon_dd)
                        lat_offset = target_lat_dd - current_lat_dd
                        lon_offset = target_lon_dd - current_lon_dd

                    # Apply the offset to the current coordinate
                    new_lat_dd = current_lat_dd + lat_offset
                    new_lon_dd = current_lon_dd + lon_offset

                    # Update the message object with the new coordinates
                    msg.lat = format_lat_dms(new_lat_dd)
                    msg.lon = format_lon_dms(new_lon_dd)
                    msg.lat_dir = get_new_direction(new_lat_dd, is_lat=True)
                    msg.lon_dir = get_new_direction(new_lon_dd, is_lat=False)
                    
                    # Let pynmea2 regenerate the sentence with the correct checksum
                    new_sentence = msg.render()
                    
                    # Write the modified sentence to the output file
                    outfile.write(new_sentence + '\n')
                else:
                    # If it's not a GGA sentence or is invalid, write the original line
                    outfile.write(stripped_line + '\n')

            except (pynmea2.ParseError, ValueError) as e:
                # Catch both parsing and value errors for robustness
                print(f"Could not process line: '{stripped_line}'. Error: {e}. Skipping.")


    print(f"Translation complete. Output written to {output_file}")


if __name__ == "__main__":
    # --- Configuration ---
    # Example coordinates for the Grand Canyon South Rim
    # You can change these to any target location.
    GRAND_CANYON_LAT = 36.059167
    GRAND_CANYON_LON = -112.140278

    SF_LAT = 37.827693524817086
    SF_LON = -122.48178379060958

    MONACO_LAT = 43.73414627847463
    MONACO_LON = 7.421745811058697

    # RUN:
    # python translate.py dronego.ubx sf.ubx

    # --- Command-Line Argument Parsing ---
    parser = argparse.ArgumentParser(
        description="Translate NMEA GNGGA coordinate tracks to a new location.",
        formatter_class=argparse.RawTextHelpFormatter
    )
    parser.add_argument("input_file", help="The path to the input text file containing NMEA sentences.")
    parser.add_argument("output_file", help="The path for the new output file.")

    parser.add_argument("--lat", type=float, default=MONACO_LAT)
    parser.add_argument("--lon", type=float, default=MONACO_LON)

    args = parser.parse_args()

    # --- Run the Translation ---
    translate_coordinates(args.input_file, args.output_file, args.lat, args.lon)
