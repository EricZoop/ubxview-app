import pandas as pd

def load_and_preprocess_data(file_path):
    try:
        df = pd.read_csv(file_path)
        # Clean column names
        df.columns = [c.strip().lower() for c in df.columns]
        return df
    except FileNotFoundError:
        print(f"Error: The file was not found at the path: {file_path}")
        return None
    except Exception as e:
        print(f"An error occurred during file loading: {e}")
        return None

def get_lat_lon_bounds(df):
    if df is None:
        return None
        
    try:
        lat_col_list = [c for c in df.columns if 'lat' in c]
        lon_col_list = [c for c in df.columns if 'lon' in c]

        if not lat_col_list or not lon_col_list:
            print("Latitude or Longitude columns not found.")
            return None

        lat_col = lat_col_list[0]
        lon_col = lon_col_list[0]
        
        # Create a copy to avoid modifying the original df slice
        df_processed = df.copy()
        
        df_processed[lat_col] = pd.to_numeric(df_processed[lat_col], errors='coerce')
        df_processed[lon_col] = pd.to_numeric(df_processed[lon_col], errors='coerce')
        df_latlon = df_processed.dropna(subset=[lat_col, lon_col])

        if df_latlon.empty:
            print("No valid Lat/Lon data found.")
            return None

        # Return a dictionary as requested
        bounds = {
            'min_lat': df_latlon[lat_col].min(),
            'max_lat': df_latlon[lat_col].max(),
            'min_lon': df_latlon[lon_col].min(),
            'max_lon': df_latlon[lon_col].max(),
        }
        return bounds

    except Exception as e:
        print(f"An error occurred processing Lat/Lon: {e}")
        return None

def get_time_bounds(df, datetime_col='datetime', datetime_format='%Y-%m-%d %H:%M:%S:%f'):
    if df is None:
        return None

    try:
        if datetime_col not in df.columns:
            print(f"Column '{datetime_col}' not found in the CSV.")
            return None

        # Create a copy to avoid modifying the original df slice
        df_processed = df.copy()

        df_processed[datetime_col] = pd.to_datetime(df_processed[datetime_col], format=datetime_format, errors='coerce')
        df_datetime = df_processed.dropna(subset=[datetime_col])

        if df_datetime.empty:
            print('No valid datetime data found after processing.')
            return None

        # Return a dictionary as requested
        times = {
            'start_time': df_datetime[datetime_col].min(),
            'stop_time': df_datetime[datetime_col].max(),
        }
        return times

    except Exception as e:
        print(f"An error occurred processing datetime: {e}")
        return None