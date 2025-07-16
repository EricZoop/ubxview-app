import csv
import math
from datetime import datetime
import time

def nmea_to_decimal_degrees(nmea_coord, direction):
    """
    Converts NMEA coordinate format (DDDMM.MMMMM) to decimal degrees.

    Args:
        nmea_coord (float): The NMEA coordinate.
        direction (str): The cardinal direction ('N', 'S', 'E', 'W').

    Returns:
        float: The coordinate in decimal degrees.
    """
    degrees = int(nmea_coord / 100)
    minutes = nmea_coord - (degrees * 100)
    decimal_degrees = degrees + (minutes / 60)
    if direction in ['S', 'W']:
        decimal_degrees *= -1
    return decimal_degrees

def parse_gngga(file_path):
    """
    Parses a file with NMEA GNGGA sentences, truncating to the second.

    Args:
        file_path (str): The path to the GNGGA file.

    Returns:
        list: A list of dictionaries, each containing timestamp, lat, lon, and alt.
    """
    data = []
    with open(file_path, 'r') as f:
        for line in f:
            if line.startswith('$GNGGA'):
                parts = line.split(',')
                try:
                    time_str = parts[1].split('.')[0] # Truncate milliseconds
                    lat = nmea_to_decimal_degrees(float(parts[2]), parts[3])
                    lon = nmea_to_decimal_degrees(float(parts[4]), parts[5])
                    alt = float(parts[9])
                    timestamp = datetime.strptime(time_str, '%H%M%S').time()
                    data.append({'timestamp': timestamp, 'lat': lat, 'lon': lon, 'alt': alt})
                except (ValueError, IndexError):
                    continue
    return data

def parse_dji_csv(file_path):
    """
    Parses a DJI drone CSV file, truncating to the second.

    Args:
        file_path (str): The path to the DJI CSV file.

    Returns:
        list: A list of dictionaries, each containing timestamp, lat, lon, and alt.
    """
    data = []
    with open(file_path, 'r', encoding='utf-8') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                cleaned_row = {k.strip(): v for k, v in row.items()}
                time_str = cleaned_row['CUSTOM.updateTime.TEXT [UTC]'].strip()
                # Parse time and truncate to the second
                dt_obj = datetime.strptime(time_str, '%I:%M:%S.%f %p')
                timestamp = dt_obj.time().replace(microsecond=0)

                lat = float(cleaned_row['OSD.latitude'])
                lon = float(cleaned_row['OSD.longitude'])
                alt = float(cleaned_row['OSD.altitude [m]'])
                data.append({'timestamp': timestamp, 'lat': lat, 'lon': lon, 'alt': alt})
            except (ValueError, KeyError) as e:
                print(f"Skipping row due to error: {e}")
                continue
    return data

def haversine(lat1, lon1, lat2, lon2):
    """
    Calculate the great-circle distance in meters between two points
    on the earth (specified in decimal degrees).
    """
    lon1, lat1, lon2, lat2 = map(math.radians, [lon1, lat1, lon2, lat2])
    dlon = lon2 - lon1
    dlat = lat2 - lat1
    a = math.sin(dlat/2)**2 + math.cos(lat1) * math.cos(lat2) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    r = 6371000 # Radius of earth in meters.
    return c * r

def calculate_total_distance(data):
    """Calculates the total distance traveled in a dataset."""
    total_distance = 0
    # Ensure data is sorted by timestamp before calculating distance
    sorted_data = sorted(data, key=lambda x: x['timestamp'])
    for i in range(1, len(sorted_data)):
        p1 = sorted_data[i-1]
        p2 = sorted_data[i]
        total_distance += haversine(p1['lat'], p1['lon'], p2['lat'], p2['lon'])
    return total_distance

def calculate_stats(data_list):
    """Calculates average, standard deviation, and standard error."""
    n = len(data_list)
    if n < 2:
        return (sum(data_list) / n) if n == 1 else 0, 0, 0

    mean = sum(data_list) / n
    variance = sum([(x - mean) ** 2 for x in data_list]) / (n - 1)
    std_dev = math.sqrt(variance)
    std_err = std_dev / math.sqrt(n)
    return mean, std_dev, std_err

def compare_data(gngga_data, dji_data):
    """
    Compares datasets at matching timestamps and calculates statistics.
    """
    # Create a dictionary for quick lookups of GNGGA data by timestamp
    gngga_map = {point['timestamp']: point for point in gngga_data}

    horizontal_diffs = []
    vertical_diffs = []

    print("Timestamp\t\tHorizontal Diff (m)\tVertical Diff (m)")
    print("-----------------------------------------------------------------")

    # Sort DJI data to ensure chronological order for comparison
    dji_data.sort(key=lambda x: x['timestamp'])

    for dji_point in dji_data:
        ts = dji_point['timestamp']
        if ts in gngga_map:
            gngga_point = gngga_map[ts]

            horizontal_diff = haversine(gngga_point['lat'], gngga_point['lon'], dji_point['lat'], dji_point['lon'])
            vertical_diff = abs(gngga_point['alt'] - dji_point['alt'])

            horizontal_diffs.append(horizontal_diff)
            vertical_diffs.append(vertical_diff)

            print(f"{ts}\t\t{horizontal_diff:.3f}\t\t\t{vertical_diff:.3f}")

    if horizontal_diffs:
        avg_h, std_dev_h, std_err_h = calculate_stats(horizontal_diffs)
        avg_v, std_dev_v, std_err_v = calculate_stats(vertical_diffs)

        print("\n--- Comparison Summary ---")
        print(f"Compared {len(horizontal_diffs)} data points with matching timestamps.")
        print("\n--- Horizontal Difference ---")
        print(f"Average: {avg_h:.3f} meters")
        print(f"Standard Deviation: {std_dev_h:.3f} meters")
        print(f"Standard Error: {std_err_h:.3f} meters")
        print("\n--- Vertical Difference ---")
        print(f"Average: {avg_v:.3f} meters")
        print(f"Standard Deviation: {std_dev_v:.3f} meters")
        print(f"Standard Error: {std_err_v:.3f} meters")
    else:
        print("\nNo matching timestamps found to compare.")


if __name__ == '__main__':


    # --- Main execution ---
    # Replace with your actual file paths
    gngga_file = 'adam3.ubx'
    dji_file = 'mavic_adam3.csv'

    print(f"Parsing GNGGA data from {gngga_file}...")
    gngga_data = parse_gngga(gngga_file)
    print(f"Found {len(gngga_data)} GNGGA data points.")

    print(f"\nParsing DJI data from {dji_file}...")
    dji_data = parse_dji_csv(dji_file)
    print(f"Found {len(dji_data)} DJI data points.")

    # --- Calculate and print total distance for each file ---
    total_dist_gngga = calculate_total_distance(gngga_data)
    total_dist_dji = calculate_total_distance(dji_data)


    print("\n--- 2D Distance Traveled ---")
    print(f"GNGGA File: {total_dist_gngga:.3f} meters")
    print(f"DJI File:   {total_dist_dji:.3f} meters")


    #time.sleep(10)
    #print("\n--- Data Comparison ---")
    #compare_data(gngga_data, dji_data)
