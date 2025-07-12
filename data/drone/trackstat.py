import re
import math
import argparse
from typing import List, Dict, Union

# --- Constants for Data Processing ---

# Outlier rejection within a single flight
MAX_ALT_DIFF = 100        # meters
MAX_SPEED = 100           # meters per second (360 km/h)
MAX_LATLON_JUMP = 0.02    # degrees (≈ 2.2 km)

# Threshold for detecting a new flight (e.g., 2 minutes)
FLIGHT_GAP_SECONDS = 120

def haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    """
    Calculates the distance between two lat/lon points using the Haversine formula.
    Returns distance in meters.
    """
    R = 6371000  # Earth radius in meters
    
    d_lat = math.radians(lat2 - lat1)
    d_lon = math.radians(lon2 - lon1)
    
    a = (math.sin(d_lat / 2) ** 2 +
         math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) *
         math.sin(d_lon / 2) ** 2)
         
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

def extract_gps_points_from_text(text: str) -> List[Dict[str, Union[float, int]]]:
    """
    Parses text to find and convert GNGGA/GPGGA sentences into structured points.
    Includes outlier rejection for points within a potential flight.
    
    Args:
        text: The raw text content from the file.
        
    Returns:
        A list of dictionaries, where each dictionary is a valid GPS point.
    """
    points = []
    
    # Regex to find all valid GNGGA or GPGGA sentences
    gga_regex = re.compile(r"\$(?:GPGGA|GNGGA),[^\r\n]*?\*[0-9A-Fa-f]{2}")
    matches = gga_regex.findall(text)

    if not matches:
        return points

    for sentence in matches:
        try:
            parts = sentence.split(',')
            if len(parts) < 15:
                continue

            # --- Field Parsing ---
            utc_str = parts[1]
            lat_str, lat_dir = parts[2], parts[3]
            lon_str, lon_dir = parts[4], parts[5]
            fix_quality = int(parts[6])
            num_satellites = int(parts[7])
            alt_str, alt_units = parts[9], parts[10]
            undulation_str = parts[11]

            # --- Data Validation ---
            if (not all([lat_str, lon_str, lat_dir, lon_dir, alt_str]) or
                    len(lat_str) < 4 or len(lon_str) < 5 or
                    alt_units != 'M' or fix_quality == 0 or num_satellites < 3):
                continue

            # --- Coordinate Conversion ---
            lat = float(lat_str[:2]) + float(lat_str[2:]) / 60
            if lat_dir == 'S':
                lat = -lat

            lon = float(lon_str[:3]) + float(lon_str[3:]) / 60
            if lon_dir == 'W':
                lon = -lon

            alt = float(alt_str)
            undulation = float(undulation_str) if undulation_str else 0.0

            # --- Time Conversion (to seconds from midnight) ---
            h = int(utc_str[0:2])
            m = int(utc_str[2:4])
            s = float(utc_str[4:])
            time_in_seconds = h * 3600 + m * 60 + s
            
            point_data = {
                'lat': lat,
                'lon': lon,
                'alt': alt,
                'time': time_in_seconds,
                'satellites': num_satellites,
                'undulation': undulation
            }
            
            # --- Outlier Rejection ---
            if points: # Check if there is a previous point
                prev = points[-1]
                dt = point_data['time'] - prev['time']
                
                # Handle time wrap-around (midnight crossing)
                if dt < -1000: dt += 86400 # Allow for small backward time jumps, but catch midnight

                distance = haversine(prev['lat'], prev['lon'], point_data['lat'], point_data['lon'])
                speed = distance / dt if dt > 0 else 0

                # This logic now primarily cleans up noise WITHIN a flight.
                # The gap detection for new flights happens later.
                if dt > 1 and (abs(point_data['alt'] - prev['alt']) > MAX_ALT_DIFF or
                    speed > MAX_SPEED or
                    abs(point_data['lat'] - prev['lat']) > MAX_LATLON_JUMP or
                    abs(point_data['lon'] - prev['lon']) > MAX_LATLON_JUMP):
                    continue # Skip outlier

            points.append(point_data)

        except (ValueError, IndexError):
            # Ignore sentences that are malformed
            continue
            
    return points

def segment_into_flights(points: List[Dict]) -> List[List[Dict]]:
    """
    Segments a list of time-sorted GPS points into distinct flights
    based on a time gap threshold.
    """
    if not points:
        return []

    # The master list that will hold each flight (which is a list of points)
    all_flights = []
    
    # Start the first flight with the first point
    current_flight = [points[0]]

    for i in range(1, len(points)):
        prev_point = points[i-1]
        current_point = points[i]

        time_diff = current_point['time'] - prev_point['time']

        # Handle midnight wrap-around
        if time_diff < 0:
            time_diff += 86400 

        # If the gap is too large, end the current flight and start a new one
        if time_diff > FLIGHT_GAP_SECONDS:
            all_flights.append(current_flight)
            current_flight = [current_point] # Start the new flight
        else:
            current_flight.append(current_point) # Continue the current flight

    # Don't forget to add the last flight to the list
    all_flights.append(current_flight)
    
    return all_flights


def calculate_and_display_stats(points: List[Dict], flight_number: int):
    """
    Calculates statistics from a list of points (for a single flight)
    and prints them to the console.
    """
    if not points:
        print(f"\n--- Flight #{flight_number}: No valid GPS data points found. ---")
        return

    # --- STATISTIC CALCULATIONS ---
    first_point = points[0]
    last_point = points[-1]

    total_points = len(points)
    total_duration = last_point['time'] - first_point['time']
    if total_duration < 0: # Handle midnight crossing
        total_duration += 86400

    current_altitude = last_point['alt']
    current_alt_wsg84 = current_altitude + last_point['undulation']
    
    # Format start time as HH:mm:ss
    start_time_s = first_point['time']
    h = int(start_time_s / 3600) % 24
    m = int((start_time_s % 3600) / 60)
    s = int(start_time_s % 60)
    start_time_formatted = f"{h:02d}:{m:02d}:{s:02d}"

    # Calculate latest speed (m/s)
    latest_speed = 0.0
    if len(points) >= 2:
        p1, p2 = points[-2], points[-1]
        dist_2d = haversine(p1['lat'], p1['lon'], p2['lat'], p2['lon'])
        time_delta = p2['time'] - p1['time']
        if time_delta < 0: time_delta += 86400 # Midnight
        if time_delta > 0:
            latest_speed = dist_2d / time_delta

    # Calculate total 2D and 3D distances
    total_2d_dist = 0.0
    total_3d_dist = 0.0
    for i in range(1, len(points)):
        p1, p2 = points[i - 1], points[i]
        segment_2d_dist = haversine(p1['lat'], p1['lon'], p2['lat'], p2['lon'])
        total_2d_dist += segment_2d_dist
        
        alt_change = p2['alt'] - p1['alt']
        segment_3d_dist = math.sqrt(segment_2d_dist**2 + alt_change**2)
        total_3d_dist += segment_3d_dist

    # --- DISPLAY STATS ---
    print(f"\n--- Flight #{flight_number} Statistics ---")
    print(f"Total Points:     {total_points}")
    print(f"Start Time (UTC): {start_time_formatted}")
    print(f"Duration (s):     {total_duration:.1f}")
    print(f"Distance 2D (m):  {total_2d_dist:.1f}")
    print(f"Distance 3D (m):  {total_3d_dist:.1f}")
    print("-" * 28)
    print("--- Final Point Data ---")
    print(f"Speed (m/s):      {latest_speed:.2f}")
    print(f"Latitude:         {last_point['lat']:.6f}")
    print(f"Longitude:        {last_point['lon']:.6f}")
    print(f"Altitude MSL (m): {current_altitude:.2f}")
    print(f"Altitude WGS84(m):{current_alt_wsg84:.2f}")
    print(f"Satellites:       {last_point['satellites']}")
    print("-" * 28)


if __name__ == "__main__":
    parser = argparse.ArgumentParser(
        description="Parse a file with GNGGA/GPGGA sentences, segment into distinct flights, and display statistics."
    )
    parser.add_argument("filepath", help="Path to the GPS data file.")
    args = parser.parse_args()

    try:
        with open(args.filepath, 'r', errors='ignore') as f:
            file_content = f.read()
            
        # 1. Extract all valid points from the file
        all_gps_points = extract_gps_points_from_text(file_content)

        if not all_gps_points:
            print("No valid GPS data found in the file.")
        else:
            # 2. Sort all points by time to handle interleaved data
            all_gps_points.sort(key=lambda p: p['time'])

            # 3. Segment the sorted points into flights
            flights = segment_into_flights(all_gps_points)

            # 4. Report results
            print(f"\n>>> Analysis Complete: Detected {len(flights)} distinct flight(s). <<<\n")

            for i, flight_points in enumerate(flights):
                calculate_and_display_stats(flight_points, flight_number=i + 1)
        
    except FileNotFoundError:
        print(f"Error: File not found at '{args.filepath}'")
    except Exception as e:
        print(f"An unexpected error occurred: {e}")

