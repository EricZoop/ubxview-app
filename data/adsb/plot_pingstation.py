import json
import folium
import os

# --- CONFIGURATION ---
filename = 'pingStation_2026-02-12_20-30-06.json'  # Your file path
output_map = 'adsb_map.html'

# List to hold all found aircraft positions
all_aircraft = []

print(f"--- Processing {filename} ---")

# 1. Read the file line by line
if not os.path.exists(filename):
    print(f"ERROR: File {filename} not found.")
    exit()

with open(filename, 'r') as f:
    for line_num, line in enumerate(f, 1):
        line = line.strip()
        
        # Skip empty lines
        if not line:
            continue

        try:
            # Parse the JSON line
            data_packet = json.loads(line)
            
            # Navigate to the aircraft list: Object -> data -> aircraft
            # We use .get() to avoid crashing if a key is missing
            inner_data = data_packet.get('data', {})
            aircraft_list = inner_data.get('aircraft', [])
            
            # If the list is empty (common in logs), just move on
            if not aircraft_list:
                continue

            # Process each aircraft in this packet
            for ac in aircraft_list:
                # We only care if it has a Lat/Lon
                if 'latDD' in ac and 'lonDD' in ac:
                    all_aircraft.append(ac)

        except json.JSONDecodeError as e:
            # This handles cut-off lines or bad data
            print(f"Skipping Line {line_num}: Malformed JSON (probably cut off)")
            continue
        except Exception as e:
            print(f"Skipping Line {line_num}: Unexpected error {e}")
            continue

# 2. Summary
total_points = len(all_aircraft)
print(f"--- Finished Reading ---")
print(f"Total valid aircraft positions found: {total_points}")

if total_points == 0:
    print("No aircraft positions were found to plot. Check your data file.")
    exit()

# 3. Create Map (Centered on the average location)
avg_lat = sum(ac['latDD'] for ac in all_aircraft) / total_points
avg_lon = sum(ac['lonDD'] for ac in all_aircraft) / total_points

m = folium.Map(location=[avg_lat, avg_lon], zoom_start=10)

# 4. Plot points
for ac in all_aircraft:
    lat = ac['latDD']
    lon = ac['lonDD']
    callsign = ac.get('callsign', 'N/A').strip()
    
    # Altitude: mm -> ft
    alt = ac.get('altitudeMM', 0) / 304.8
    
    # Heading
    heading = ac.get('headingDE2', 0) / 100.0

    # Create a small circle for each position update
    folium.CircleMarker(
        location=[lat, lon],
        radius=3,
        color='blue',
        fill=True,
        fill_opacity=0.6,
        popup=f"<b>{callsign}</b><br>Alt: {int(alt)} ft<br>Hdg: {heading}",
    ).add_to(m)

# 5. Save
m.save(output_map)
print(f"Success! Map saved to: {os.path.abspath(output_map)}")