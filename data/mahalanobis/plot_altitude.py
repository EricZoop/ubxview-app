"""
Plot Matched Radar <-> ADS-B Tracks
====================================
Reads the correlations CSV to find accepted matches, loads the corresponding
raw radar and ADS-B chunks, and generates a side-by-side figure showing:
  1. Altitude over Time
  2. Latitude vs Longitude (Ground Track)
"""

import os
import glob
import re
import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
import numpy
from datetime import datetime

# --- Configuration -----------------------------------------------------------

BASE_PATH = r"Z:\__Datasets\USA"
EXPERIMENT = "2021_08_03_Butlers_Germantown_MD_US_MHR"
FEET_TO_METERS = 0.3048

# --- Helpers (imported from main.py logic) -----------------------------------

def parse_radar_datetime(dt_str: str) -> datetime:
    parts = dt_str.rsplit(":", 1)
    if len(parts) == 2 and len(parts[1]) <= 3:
        dt_str = f"{parts[0]}.{parts[1]}"
    return datetime.strptime(dt_str, "%Y-%m-%d %H:%M:%S.%f")

def parse_adsb_timestamp(ts_str: str) -> datetime:
    ts_str = str(ts_str).replace("Z", "")
    for fmt in ("%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M:%S.%f"):
        try:
            return datetime.strptime(ts_str, fmt)
        except ValueError:
            continue
    return pd.NaT

def load_radar_chunk(radar_dir: str, chunk_name: str) -> pd.DataFrame:
    files = glob.glob(os.path.join(radar_dir, f"*{chunk_name}*.csv"))
    if not files: return pd.DataFrame()

    raw = pd.read_csv(files[0])
    raw.columns = raw.columns.str.strip()
    df = pd.DataFrame({
        "ID": raw["ID"],
        "time": raw["DateTime"].apply(parse_radar_datetime),
        "lat": pd.to_numeric(raw["Lat"], errors="coerce").astype(float),
        "lon": pd.to_numeric(raw["Lon"], errors="coerce").astype(float),
        "alt_m": pd.to_numeric(raw["Alt"], errors="coerce").astype(float),
    })
    return df.dropna(subset=["lat", "lon", "alt_m", "time"])

def load_adsb_chunk(adsb_dir: str, chunk_name: str) -> pd.DataFrame:
    files = glob.glob(os.path.join(adsb_dir, f"*{chunk_name}*.csv"))
    if not files: return pd.DataFrame()

    raw = pd.read_csv(files[0])
    raw.columns = raw.columns.str.strip()
    callsign_col = "callsign" if "callsign" in raw.columns else "hex"

    df = pd.DataFrame({
        "callsign": raw[callsign_col],
        "time": raw["timestamp"].apply(parse_adsb_timestamp),
        "lat": pd.to_numeric(raw["lat"], errors="coerce").astype(float),
        "lon": pd.to_numeric(raw["lon"], errors="coerce").astype(float),
        "alt_m": pd.to_numeric(raw["alt"], errors="coerce").astype(float) * FEET_TO_METERS,
    })
    return df.dropna(subset=["lat", "lon", "alt_m", "time"])

# --- Plotting logic ----------------------------------------------------------

def main():
    # 1. Load Correlations
    csv_path = os.path.join(os.getcwd(), f"{EXPERIMENT}_correlations.csv")
    if not os.path.exists(csv_path):
        print(f"Error: Could not find {csv_path}")
        return

    df_corr = pd.read_csv(csv_path)

    # 2. Filter ONLY for MATCH
    matches = df_corr[df_corr["status"] == "MATCH"]
    print(f"Found {len(matches)} accepted matches to plot.")

    if matches.empty:
        print("No matches to plot.")
        return

    # Directories for raw data
    radar_dir = os.path.join(BASE_PATH, EXPERIMENT, "csv", "raw_tracker_v0.0.7")
    adsb_dir  = os.path.join(BASE_PATH, EXPERIMENT, "experiment_files", "adsb_truth")

    # Create an output directory for the plots
    out_dir = os.path.join(os.getcwd(), "track_match_plots")
    os.makedirs(out_dir, exist_ok=True)

    # 3. Generate a plot for each match
    for idx, row in matches.iterrows():
        chunk = row["chunk"]
        r_id = row["radar_id"]
        a_id = row["adsb_callsign"]

        # Aircraft type (4-letter ICAO code), default to UNKN
        a_type = row.get("adsb_type", "UNKN")
        if pd.isna(a_type):
            a_type = "UNKN"

        # Load chunk data
        r_df = load_radar_chunk(radar_dir, chunk)
        a_df = load_adsb_chunk(adsb_dir, chunk)

        if r_df.empty or a_df.empty:
            print(f"Missing raw data for chunk {chunk}")
            continue

        # Filter to specific IDs
        r_track = r_df[r_df["ID"] == r_id].sort_values("time")
        a_track = a_df[a_df["callsign"] == a_id].sort_values("time")

        if r_track.empty or a_track.empty:
            continue

        # Create Figure with 2 Subplots Side-by-Side
        fig, (ax1, ax2) = plt.subplots(1, 2, figsize=(15, 6))

        fig.suptitle(f"MATCH  ID {r_id} -> {a_type}\n(Chunk: {chunk})", fontweight="bold", fontsize=14)

        # -- Plot 1: Altitude over Time --
        ax1.plot(r_track["time"], r_track["alt_m"],
                label="Radar", color="#2980b9", linewidth=2, marker='.', markersize=6)

        ax1.plot(a_track["time"], a_track["alt_m"],
                label="ADS-B", color="#e67e22", linewidth=2, linestyle='--', marker='x', markersize=6)

        ax1.set_title("Altitude over Time")
        ax1.set_xlabel("Time (UTC)")
        ax1.set_ylabel("Altitude (Meters)")
        ax1.grid(True, alpha=0.3)
        ax1.legend()
        ax1.xaxis.set_major_formatter(mdates.DateFormatter('%H:%M:%S'))
        ax1.tick_params(axis='x', rotation=45)

        # -- Plot 2: Lat vs Lon --
        ax2.plot(r_track["lon"], r_track["lat"],
                label="Radar", color="#2980b9", linewidth=2, marker='.', markersize=6)

        ax2.plot(a_track["lon"], a_track["lat"],
                label="ADS-B", color="#e67e22", linewidth=2, linestyle='--', marker='x', markersize=6)

        # Disable scientific notation on axes for raw coordinates
        ax2.ticklabel_format(useOffset=False, style='plain')

        ax2.set_title("Latitude vs Longitude")
        ax2.set_xlabel("Longitude")
        ax2.set_ylabel("Latitude")
        ax2.grid(True, alpha=0.3)
        ax2.legend()
        
        # --- NEW CODE: Scale aspect ratio to mimic Mercator projection ---
        # Calculate mean latitude from both tracks to scale the aspect ratio correctly
        mean_lat = pd.concat([r_track["lat"], a_track["lat"]]).mean()
        if not pd.isna(mean_lat):
            # The length of 1 degree of longitude is roughly cos(latitude) * length of 1 deg of latitude
            aspect_ratio = 1 / numpy.cos(numpy.radians(mean_lat))
            ax2.set_aspect(aspect_ratio)
        # -----------------------------------------------------------------

        plt.tight_layout()

        # Save the figure
        filename = f"Match_ID_{r_id}_{a_type}_{chunk}.png".replace("/", "_")
        save_path = os.path.join(out_dir, filename)
        fig.savefig(save_path, dpi=150)
        plt.close(fig)

        print(f"Saved plot: {filename}")

if __name__ == "__main__":
    main()