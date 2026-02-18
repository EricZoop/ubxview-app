# utils.py - Optimized for larger JSON files with track filtering

import json
import pandas as pd # type: ignore
import plotly.express as px # type: ignore
from dash import html # type: ignore
import os
import simplejson as s_json # type: ignore
import csv
import ast 

colors_tracks = px.colors.qualitative.Set3
colors_flights = px.colors.qualitative.Plotly

def load_and_process_data(csv_filename, json_filename, min_points=1):
    """
    Load and process radar and flight data with track filtering.
    """
    
    flight_data = {}
    track_data = {}
    track_dropdown_options = []
    warnings = []

    # --- 1. Load the JSON file (flight data) ---
    try:
        with open(json_filename, 'r') as f:
            try:
                import simplejson as s_json # type: ignore
                flights = s_json.load(f)
            except ImportError:
                flights = json.load(f)
            except Exception as e:
                warnings.append(f"Error loading '{json_filename}': {e}")
                flights = []

    except FileNotFoundError:
        warnings.append(f"'{json_filename}' not found. Please ensure it's in the same directory.")
        flights = []
    except json.JSONDecodeError:
        warnings.append(f"'{json_filename}' is not valid JSON.")
        flights = []

    # --- 2. Load the CSV file (radar tracks) ---
    try:
        # OPTIMIZATION: Use dtypes for memory efficiency
        tracks_df = pd.read_csv(csv_filename, dtype={'ID': int, 'Lat': float, 'Lon': float, 'Alt': float, 'VelAbs': float})
        
        # FILTER: Remove tracks with fewer than min_points
        if not tracks_df.empty and 'ID' in tracks_df.columns:
            track_counts = tracks_df.groupby('ID').size()
            valid_tracks = track_counts[track_counts >= min_points].index
            
            print(f"Total tracks: {len(track_counts)}")
            print(f"Tracks with >= {min_points} points: {len(valid_tracks)}")

            # Filter the dataframe to only include valid tracks
            tracks_df = tracks_df[tracks_df['ID'].isin(valid_tracks)]
            
            if tracks_df.empty:
                warnings.append(f"No tracks remain after filtering with min_points={min_points}")
        
        # PRE-PROCESSING FIX: Apply the time format fix once here
        if 'DateTime' in tracks_df.columns and not tracks_df.empty:
            # FIX: Handle non-standard time format where ':' is used for fractional seconds 
            tracks_df['DateTime_fixed'] = tracks_df['DateTime'].str.replace(r':(\d+)$', r'.\1', regex=True)
            # Pre-parse to datetime objects (tz-naive)
            tracks_df['Time_dt'] = pd.to_datetime(tracks_df['DateTime_fixed'], errors='coerce').dt.tz_localize(None)

    except FileNotFoundError:
        warnings.append(f"'{csv_filename}' not found. Please ensure it's in the same directory.")
        tracks_df = pd.DataFrame(columns=['ID', 'Lat', 'Lon', 'Alt', 'DateTime', 'Range', 'Azimuth', 'Elevation', 'VelAbs'])
    except Exception as e:
        warnings.append(f"Error loading '{csv_filename}': {e}")
        tracks_df = pd.DataFrame(columns=['ID', 'Lat', 'Lon', 'Alt', 'DateTime', 'Range', 'Azimuth', 'Elevation', 'VelAbs'])


    # --- 3. Process and store flight data ---
    for flight in flights:
        callsign = flight.get('callsign', 'Unknown')
        if callsign != 'Unknown' and flight.get('positions'):
            
            # --- EXTRACT CLASSES ---
            ac_classes = flight.get('aircraftClasses', [])
            
            flight_data[callsign] = {
                'flight': flight,
                'positions': flight.get('positions', []), 
                'aircraftTypeDescription': flight.get('aircraftTypeDescription', 'Unknown'),
                'aircraftType': flight.get('aircraftType', 'Unknown'), 
                'dep_airport': flight.get('depAirportIata', 'N/A'),
                'arr_airport': flight.get('arrAirportIata', 'N/A'),
                'aircraftClasses': ac_classes, 
                'aircraftRegistration': flight.get('aircraftRegistration', 'N/A')
            }
    
    if not flight_data:
        warnings.append(f"No valid flights were found in '{json_filename}'. The right map may be empty.")

    # --- 4. Process and store track data ---
    if 'ID' in tracks_df.columns and not tracks_df.empty:

        grouped_tracks = tracks_df.groupby('ID')
        
        unique_track_ids = tracks_df['ID'].unique()
        unique_track_ids.sort() 
        total_tracks = len(unique_track_ids)
        
        for track_id, track_points in grouped_tracks:
            if not track_points.empty:
                ext_id = track_points['ExtID'].iloc[0] if 'ExtID' in track_points.columns else track_id
                
                track_data[track_id] = {
                    'points': track_points, 
                    'lats': track_points['Lat'].values,
                    'lons': track_points['Lon'].values,
                    'ext_id': ext_id
                }
        
        # 4. Generate options with enumeration (i+1 / total)
        track_dropdown_options = [
            {'label': f'{track_id} ({i+1}/{total_tracks})', 'value': track_id} 
            for i, track_id in enumerate(unique_track_ids)
        ]
    
    if not track_dropdown_options:
        warnings.append(f"No valid radar tracks were found in '{csv_filename}'. The track dropdown may be empty.")

    return flight_data, track_data, track_dropdown_options, warnings


def load_matches_from_csv(filename):
    """
    Load existing matches from a CSV file.
    """
    matches = []
    
    if not os.path.exists(filename):
        return matches
    
    try:
        with open(filename, 'r', newline='') as f:
            reader = csv.DictReader(f)
            for row in reader:
                int_id = row.get('IntID', '')
                try:
                    int_id = int(int_id)
                except (ValueError, TypeError):
                    pass
                
                # --- PARSE CLASSES BACK TO LIST ---
                ac_classes_str = row.get('aircraftClasses', '')
                ac_classes = []
                
                if ac_classes_str:
                    # 1. Clean the brackets
                    clean_str = ac_classes_str.replace('[', '').replace(']', '').replace("'", "").replace('"', "")
                    
                    if clean_str.strip():
                        # 2. Check for semicolon (the format used in save_matches_to_csv)
                        if ';' in clean_str:
                            ac_classes = [x.strip() for x in clean_str.split(';')]
                        # 3. Fallback for legacy comma-separated lists
                        elif ',' in clean_str:
                            ac_classes = [x.strip() for x in clean_str.split(',')]
                        # 4. Single item case
                        else:
                            ac_classes = [clean_str.strip()]
                
                # --- PARSE STOLEN STATUS ---
                stolen_value = row.get('stolen', '').strip()
                if stolen_value in ['Yes', '1', 'true', 'True']:
                    stolen = 'Yes'
                else:
                    stolen = ''

                # --- RECONSTRUCT START TIME ---
                date_part = row.get('id_date', '').strip()
                time_part = row.get('start_time', '').strip()
                
                if '.' in time_part and time_part.count(':') == 1:
                     time_part = time_part.replace('.', ':')

                full_start_time = f"{date_part} {time_part}".strip()

                # --- MAP CSV COLUMNS TO INTERNAL KEYS ---
                aircraft_desc = row.get('target_type_secondary', '')
                if not aircraft_desc:
                    aircraft_desc = row.get('aircraftTypeDescription', '')

                # --- NEW: RECONSTRUCT POSITIONS FROM FLATTENED COLUMNS ---
                # This prevents corruption when saving back to CSV
                positions = []
                
                # Keys we expect to find in the CSV for positions
                pos_keys = [
                    'groundSpeed', 'heading', 'altitude', 'verticalRate', 'latitude', 
                    'longitude', 'squawkCode', 'source', 'timestamp', 
                    'barometricAltitude', 'gpsAltitude'
                ]
                
                # Attempt to reconstruct index 0
                # We check a required field (e.g. latitude) to see if data exists
                if row.get('adsb_positions_latitude_0') or row.get('adsb_positions_timestamp_0'):
                    pos_0 = {}
                    for k in pos_keys:
                        val = row.get(f'adsb_positions_{k}_0', '')
                        if val:
                            pos_0[k] = val
                    positions.append(pos_0)
                
                # Attempt to reconstruct index 1
                if row.get('adsb_positions_latitude_1') or row.get('adsb_positions_timestamp_1'):
                    pos_1 = {}
                    for k in pos_keys:
                        val = row.get(f'adsb_positions_{k}_1', '')
                        if val:
                            pos_1[k] = val
                    # Only add if it's different or if we want to preserve exact count, 
                    # but logic in save writes index 0 and index -1. 
                    positions.append(pos_1)

                matches.append({
                    'IntID': int_id,
                    'ExtID': row.get('ExtID', ''),
                    'aircraftTypeDescription': aircraft_desc, 
                    'aircraftType': row.get('aircraftType', ''),
                    'callsign': row.get('callsign', ''),
                    'aircraftRegistration': row.get('aircraftRegistration', ''),
                    'start_time': full_start_time,            
                    'stop_time': row.get('stop_time', 'N/A'),
                    'aircraftClasses': ac_classes,
                    'stolen': stolen,
                    'not_stolen_times': row.get('not_stolen_times', ''),
                    'positions': positions # Store reconstructed positions
                })
    except Exception as e:
        print(f"Error loading matches from '{filename}': {e}")
        return []
    
    return matches


def save_matches_to_csv(matches, filename, username):
    """
    Save the current matches to a CSV file.
    """
    fieldnames = [
        'id_date',
        'start_time',
        'IntID',
        'ExtID',
        'id_type',
        'target_type_primary',
        'target_type_secondary',
        'logs_exist',
        'ignore_track',
        'by_field',
        'by_target_logs',
        'by_map_or_feature_analysis',
        'by_model',
        'by_optics',
        'stolen',
        'not_stolen_times',
        'done',
        'user',
        'comments',
        'by_valhalla',
        'comments_valhalla',
        'Vel_continuous',
        'stop_time',
        'aircraftType',
        'callsign',
        'aircraftClasses',
        'aircraftRegistration',

        # First position entry (index 0)
        'adsb_positions_groundSpeed_0',
        'adsb_positions_heading_0',
        'adsb_positions_altitude_0',
        'adsb_positions_verticalRate_0',
        'adsb_positions_latitude_0',
        'adsb_positions_longitude_0',
        'adsb_positions_squawkCode_0',
        'adsb_positions_source_0',
        'adsb_positions_timestamp_0',
        'adsb_positions_barometricAltitude_0',
        'adsb_positions_gpsAltitude_0',
        # Last position entry (index 1)
        'adsb_positions_groundSpeed_1',
        'adsb_positions_heading_1',
        'adsb_positions_altitude_1',
        'adsb_positions_verticalRate_1',
        'adsb_positions_latitude_1',
        'adsb_positions_longitude_1',
        'adsb_positions_squawkCode_1',
        'adsb_positions_source_1',
        'adsb_positions_timestamp_1',
        'adsb_positions_barometricAltitude_1',
        'adsb_positions_gpsAltitude_1'
    ]

    if not matches:
        with open(filename, 'w', newline='') as f:
            writer = csv.DictWriter(f, fieldnames=fieldnames)
            writer.writeheader()
        return

    with open(filename, 'w', newline='') as f:
        writer = csv.DictWriter(f, fieldnames=fieldnames)
        writer.writeheader()
        
        for match in matches:
            start_time = match.get('start_time', 'N/A')
            stop_time = match.get('stop_time', 'N/A')
            
            if not isinstance(start_time, str):
                start_time = str(start_time)
            if not isinstance(stop_time, str):
                stop_time = str(stop_time)

            # Defensive slicing
            id_date_val = start_time[:10] if len(start_time) >= 10 else start_time
            time_val_raw = start_time[11:] if len(start_time) > 11 else start_time
            
            def format_time_custom(s):
                if isinstance(s, str) and s.rfind(':') != -1:
                    return s[:s.rfind(':')] + '.' + s[s.rfind(':')+1:]
                return s

            start_time_formatted = format_time_custom(time_val_raw)
            
            # --- FIX: Do not format or slice stop_time; save exactly as is (Full Date + Time) ---
            stop_time_formatted = stop_time
            
            # --- PROCESS LIST INTO STRING ---
            ac_class_raw = match.get('aircraftClasses')
            if ac_class_raw is None:
                ac_class_raw = []

            ac_class_str = str(ac_class_raw).replace("'", "").replace('"', "").replace(",", ";")

            target_type_primary = 'Aircraft'
            if "HELICOPTER" in ac_class_str.upper():
                target_type_primary = 'Helicopter'
            
            # --- PROCESS STOLEN STATUS ---
            stolen_value = match.get('stolen', '')
            if stolen_value in ['Yes', 1, '1', 'true', 'True']:
                stolen_output = 'Yes'
            else:
                stolen_output = ''

            # --- EXTRACT POSITION DATA ---
            # Get positions from match object
            positions = match.get('positions', [])
            
            pos_0 = {}
            pos_1 = {}
            
            if positions and isinstance(positions, list):
                if len(positions) > 0:
                    pos_0 = positions[0]
                if len(positions) > 1:
                    pos_1 = positions[-1]
                elif len(positions) == 1:
                    pos_1 = positions[0]

            writer.writerow({
                'id_date': id_date_val,
                'start_time': start_time_formatted,
                'IntID': match.get('IntID', ''),
                'ExtID': match.get('ExtID', ''),

                'id_type': 'ExtID',
                'target_type_primary': target_type_primary,
                'target_type_secondary': match.get('aircraftTypeDescription', ''), 

                'logs_exist':'',
                'ignore_track':'',
                'by_field':'',
                'by_target_logs':'',
                'by_map_or_feature_analysis':'',
                'by_model':'',
                'by_optics':'',

                'stolen': stolen_output,
                'not_stolen_times': match.get('not_stolen_times', ''),
                
                'done':'',
                'user': username,
                'comments':'',
                'by_valhalla':'',
                'comments_valhalla':'',
                'Vel_continuous':'',

                'stop_time': stop_time_formatted,
                'aircraftType': match.get('aircraftType', ''),
                'callsign': match.get('callsign', ''),
                'aircraftClasses': ac_class_str,
                'aircraftRegistration': match.get('aircraftRegistration',''),

                # First position entry (index 0)
                'adsb_positions_groundSpeed_0': pos_0.get('groundSpeed', ''),
                'adsb_positions_heading_0': pos_0.get('heading', ''),
                'adsb_positions_altitude_0': pos_0.get('altitude', ''),
                'adsb_positions_verticalRate_0': pos_0.get('verticalRate', ''),
                'adsb_positions_latitude_0': pos_0.get('latitude', ''),
                'adsb_positions_longitude_0': pos_0.get('longitude', ''),
                'adsb_positions_squawkCode_0': pos_0.get('squawkCode', ''),
                'adsb_positions_source_0': pos_0.get('source', ''),
                'adsb_positions_timestamp_0': pos_0.get('timestamp', ''),
                'adsb_positions_barometricAltitude_0': pos_0.get('barometricAltitude', ''),
                'adsb_positions_gpsAltitude_0': pos_0.get('gpsAltitude', ''),

                # Last position entry (index 1)
                'adsb_positions_groundSpeed_1': pos_1.get('groundSpeed', ''),
                'adsb_positions_heading_1': pos_1.get('heading', ''),
                'adsb_positions_altitude_1': pos_1.get('altitude', ''),
                'adsb_positions_verticalRate_1': pos_1.get('verticalRate', ''),
                'adsb_positions_latitude_1': pos_1.get('latitude', ''),
                'adsb_positions_longitude_1': pos_1.get('longitude', ''),
                'adsb_positions_squawkCode_1': pos_1.get('squawkCode', ''),
                'adsb_positions_source_1': pos_1.get('source', ''),
                'adsb_positions_timestamp_1': pos_1.get('timestamp', ''),
                'adsb_positions_barometricAltitude_1': pos_1.get('barometricAltitude', ''),
                'adsb_positions_gpsAltitude_1': pos_1.get('gpsAltitude', '')
            })