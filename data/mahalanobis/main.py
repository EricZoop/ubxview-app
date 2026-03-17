"""
Radar <-> ADS-B Track Correlator using Mahalanobis Distance
===========================================================
Matches radar detections to ADS-B truth tracks per time-aligned chunk file.
ADS-B truth files have temporal padding around radar track windows.
"""

## HOW DO WE MARK STOLEN TRACKS?

import os
import re
import glob
import logging
from pathlib import Path
from datetime import datetime, timedelta

import numpy as np
import pandas as pd
from scipy.spatial.distance import mahalanobis
from scipy.optimize import linear_sum_assignment

logging.basicConfig(level=logging.INFO, format="%(asctime)s  %(levelname)s  %(message)s")
log = logging.getLogger(__name__)

# --- Configuration -----------------------------------------------------------

EXPERIMENTS = [
    "2021_08_03_Butlers_Germantown_MD_US_MHR",
]

BASE_PATH        = r"Z:\__Datasets\USA"
KNOTS_TO_MS      = 0.514444  # 1 knot = 0.514444 meters per second
EARTH_RADIUS_M   = 6_371_000

# Plot trigger
PLOT_RESULTS = True

# Mahalanobis covariance diagonals
# Units: [meters_lat, meters_lon, speed_ms, seconds]
COV_DIAG = np.array([
    100.0**2,    # lateral position variance   (m^2) - tight
    100.0**2,    # longitudinal position var   (m^2) - tight
    20.0**2,     # speed variance              (m^2/s^2) - e.g. 20 m/s variance
    10.0**2,     # time variance               (s^2) - tight
])

# Gate: maximum Mahalanobis distance to accept an association
GATE_THRESHOLD = 30.0

# Max time gap (seconds) for pairing a radar point to an ADS-B point
MAX_TIME_GAP_S = 30.0

# --- Helpers -----------------------------------------------------------------

VI = np.diag(1.0 / COV_DIAG)


def latlon_to_meters_vec(lat: np.ndarray, lon: np.ndarray,
                         ref_lat: float, ref_lon: float) -> tuple[np.ndarray, np.ndarray]:
    """Vectorised (lat, lon) -> local metre offsets from a reference point."""
    dlat = np.radians(lat - ref_lat)
    dlon = np.radians(lon - ref_lon)
    y = dlat * EARTH_RADIUS_M
    x = dlon * EARTH_RADIUS_M * np.cos(np.radians(ref_lat))
    return x, y


def parse_radar_datetime(dt_str: str) -> datetime:
    """Parse radar DateTime: '2025-10-01 22:20:07:799' (colon before ms)."""
    parts = dt_str.rsplit(":", 1)
    if len(parts) == 2 and len(parts[1]) <= 3:
        dt_str = f"{parts[0]}.{parts[1]}"
    return datetime.strptime(dt_str, "%Y-%m-%d %H:%M:%S.%f")


def parse_adsb_timestamp(ts_str: str) -> datetime:
    """Parse ISO ADS-B timestamp: '2021-02-26T15:27:00Z'."""
    ts_str = str(ts_str).replace("Z", "")
    for fmt in ("%Y-%m-%dT%H:%M:%S", "%Y-%m-%dT%H:%M:%S.%f"):
        try:
            return datetime.strptime(ts_str, fmt)
        except ValueError:
            continue
    raise ValueError(f"Cannot parse ADS-B timestamp: {ts_str}")


# --- File matching -----------------------------------------------------------

def _chunk_key(filename: str) -> str | None:
    m = re.search(r"(rt_\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}_tracks_chunk_\d+)", filename)
    return m.group(1) if m else None


def match_files(radar_dir: str, adsb_dir: str) -> list[tuple[str, str]]:
    radar_files = {_chunk_key(os.path.basename(f)): f
                   for f in glob.glob(os.path.join(radar_dir, "*.csv"))}
    adsb_files  = {_chunk_key(os.path.basename(f)): f
                   for f in glob.glob(os.path.join(adsb_dir, "*.csv"))}

    pairs = []
    for key in sorted(radar_files):
        if key and key in adsb_files:
            pairs.append((radar_files[key], adsb_files[key]))
        else:
            log.warning("No ADS-B match for radar chunk: %s", key)
    return pairs


# --- Loaders -----------------------------------------------------------------

def load_radar(path: str) -> pd.DataFrame:
    raw = pd.read_csv(path)
    raw.columns = raw.columns.str.strip()
    df = pd.DataFrame({
        "ID":    raw["ID"],
        "ExtID": raw.get("ExtID", pd.NA),
        "RCS":   pd.to_numeric(raw.get("RCS", pd.NA), errors="coerce").astype(float),
        "time":  raw["DateTime"].apply(parse_radar_datetime),
        "lat":   pd.to_numeric(raw["Lat"], errors="coerce").astype(float),
        "lon":   pd.to_numeric(raw["Lon"], errors="coerce").astype(float),
        "speed": pd.to_numeric(raw["VelAbs"], errors="coerce").astype(float),
    })
    df.dropna(subset=["lat", "lon", "speed", "time"], inplace=True)
    return df


def load_adsb(path: str) -> pd.DataFrame:
    raw = pd.read_csv(path)
    raw.columns = raw.columns.str.strip()
    callsign_col = "callsign" if "callsign" in raw.columns else "hex"
    df = pd.DataFrame({
        "callsign": raw[callsign_col],
        "hex":      raw.get("hex", pd.NA),
        "fr24_id":  raw.get("fr24_id", pd.NA),
        "type":     raw.get("type", pd.NA),
        "time":     raw["timestamp"].apply(parse_adsb_timestamp),
        "lat":      pd.to_numeric(raw["lat"], errors="coerce").astype(float),
        "lon":      pd.to_numeric(raw["lon"], errors="coerce").astype(float),
        "speed":    pd.to_numeric(raw["gspeed"], errors="coerce").astype(float) * KNOTS_TO_MS,
    })
    df.dropna(subset=["lat", "lon", "speed", "time"], inplace=True)
    return df


# --- Core correlation (vectorised) -------------------------------------------

def _mean_mahalanobis_vectorised(
    r_lat: np.ndarray, r_lon: np.ndarray, r_speed: np.ndarray, r_t: np.ndarray,
    a_lat: np.ndarray, a_lon: np.ndarray, a_speed: np.ndarray, a_t: np.ndarray,
    ref_lat: float, ref_lon: float,
) -> tuple[float, int, float, float]:

    dt = np.abs(r_t[:, None] - a_t[None, :])
    nearest_idx = np.argmin(dt, axis=1)
    nearest_dt  = dt[np.arange(len(r_t)), nearest_idx]

    mask = nearest_dt <= MAX_TIME_GAP_S
    if not np.any(mask):
        return 1e9, 0, 1e9, 1e9

    sel_r_lat = r_lat[mask];  sel_r_lon = r_lon[mask]
    sel_r_speed = r_speed[mask];  sel_r_t   = r_t[mask]
    ai = nearest_idx[mask]
    sel_a_lat = a_lat[ai];    sel_a_lon = a_lon[ai]
    sel_a_speed = a_speed[ai];    sel_a_t   = a_t[ai]

    rx, ry = latlon_to_meters_vec(sel_r_lat, sel_r_lon, ref_lat, ref_lon)
    ax, ay = latlon_to_meters_vec(sel_a_lat, sel_a_lon, ref_lat, ref_lon)

    diff = np.column_stack([rx - ax, ry - ay, sel_r_speed - sel_a_speed, sel_r_t - sel_a_t])
    d = np.sqrt(np.sum(diff**2 / COV_DIAG, axis=1))

    return float(np.mean(d)), int(np.sum(mask)), float(np.min(d)), float(np.max(d))


def correlate_chunk(radar_df: pd.DataFrame, adsb_df: pd.DataFrame) -> pd.DataFrame:
    if radar_df.empty or adsb_df.empty:
        return pd.DataFrame()

    ref_lat = float(np.mean([float(radar_df["lat"].mean()), float(adsb_df["lat"].mean())]))
    ref_lon = float(np.mean([float(radar_df["lon"].mean()), float(adsb_df["lon"].mean())]))

    t0 = min(radar_df["time"].min(), adsb_df["time"].min())
    radar_df = radar_df.copy()
    adsb_df  = adsb_df.copy()
    radar_df["t_sec"] = radar_df["time"].apply(lambda t: (t - t0).total_seconds()).astype(float)
    adsb_df["t_sec"]  = adsb_df["time"].apply(lambda t: (t - t0).total_seconds()).astype(float)

    # Pre-calculate metadata for outputs
    radar_meta = radar_df.groupby("ID").agg(
        ExtID=("ExtID", "first"),
        average_rcs=("RCS", "mean")
    ).to_dict("index")

    callsign_col = "callsign" if "callsign" in adsb_df.columns else "hex"
    adsb_meta = adsb_df.groupby(callsign_col).agg(
        hex=("hex", "first"),
        fr24_id=("fr24_id", "first"),
        type=("type", "first")
    ).to_dict("index")

    radar_ids = radar_df["ID"].unique()
    adsb_signs = adsb_df[callsign_col].unique()

    log.info("  Unique radar tracks: %d  |  Unique ADS-B targets: %d", len(radar_ids), len(adsb_signs))

    radar_groups = {}
    for rid in radar_ids:
        sub = radar_df[radar_df["ID"] == rid]
        if not sub.empty:
            radar_groups[rid] = (sub["lat"].values, sub["lon"].values, sub["speed"].values, sub["t_sec"].values)
    radar_ids = np.array(list(radar_groups.keys()))

    adsb_groups = {}
    for asign in adsb_signs:
        sub = adsb_df[adsb_df[callsign_col] == asign]
        if not sub.empty:
            adsb_groups[asign] = (sub["lat"].values, sub["lon"].values, sub["speed"].values, sub["t_sec"].values)
    adsb_signs = np.array(list(adsb_groups.keys()))

    cost = np.full((len(radar_ids), len(adsb_signs)), fill_value=1e9)
    pair_info = {}

    for ri, rid in enumerate(radar_ids):
        r_lat, r_lon, r_speed, r_t = radar_groups[rid]
        for ai, asign in enumerate(adsb_signs):
            a_lat, a_lon, a_speed, a_t = adsb_groups[asign]

            if r_t[-1] < a_t[0] - MAX_TIME_GAP_S or r_t[0] > a_t[-1] + MAX_TIME_GAP_S:
                continue

            mean_d, n, min_d, max_d = _mean_mahalanobis_vectorised(
                r_lat, r_lon, r_speed, r_t, a_lat, a_lon, a_speed, a_t, ref_lat, ref_lon)

            if n > 0:
                cost[ri, ai] = mean_d
                pair_info[(ri, ai)] = dict(n_pairs=n, min_mahal=min_d, max_mahal=max_d)

    row_idx, col_idx = linear_sum_assignment(cost)

    results = []
    for r, c in zip(row_idx, col_idx):
        d = cost[r, c]
        if d >= 1e8:
            continue

        status = "MATCH" if d < GATE_THRESHOLD else "REJECTED"
        info = pair_info.get((r, c), {})

        r_meta = radar_meta.get(radar_ids[r], {})
        a_meta = adsb_meta.get(adsb_signs[c], {})

        # Ensure average_rcs doesn't blow up if it's NaN
        avg_rcs = r_meta.get("average_rcs")
        if pd.isna(avg_rcs):
            avg_rcs = None
        else:
            avg_rcs = round(float(avg_rcs), 2)

        # Aircraft type (4-letter ICAO code) from ADS-B
        adsb_type = a_meta.get("type")
        if pd.isna(adsb_type) if adsb_type is not None else True:
            adsb_type = "UNKN"

        results.append(dict(
            radar_id=radar_ids[r],
            ExtID=r_meta.get("ExtID"),
            adsb_callsign=adsb_signs[c],
            adsb_hex=a_meta.get("hex"),
            adsb_fr24_id=a_meta.get("fr24_id"),
            adsb_type=adsb_type,
            average_rcs=avg_rcs,
            mean_mahalanobis=round(d, 4),
            n_pairs=info.get("n_pairs", 0),
            min_mahalanobis=round(info.get("min_mahal", 0), 4),
            max_mahalanobis=round(info.get("max_mahal", 0), 4),
            status=status,
        ))

        log.info("  %s  ID %s -> %s  (d=%.3f, n=%d)",
                 status, radar_ids[r], adsb_type, d, info.get("n_pairs", 0))

    return pd.DataFrame(results)


# --- Main --------------------------------------------------------------------

def run_experiment(experiment_name: str) -> pd.DataFrame:
    radar_dir = os.path.join(BASE_PATH, experiment_name, "csv", "raw_tracker_v0.0.7")
    adsb_dir  = os.path.join(BASE_PATH, experiment_name, "experiment_files", "adsb_truth")

    log.info("Experiment: %s", experiment_name)
    pairs = match_files(radar_dir, adsb_dir)
    all_results: list[pd.DataFrame] = []

    for radar_path, adsb_path in pairs:
        chunk_key = _chunk_key(os.path.basename(radar_path))
        radar_df = load_radar(radar_path)
        adsb_df  = load_adsb(adsb_path)

        result = correlate_chunk(radar_df, adsb_df)
        if not result.empty:
            result["chunk"] = chunk_key
            result["experiment"] = experiment_name
            all_results.append(result)

    if all_results:
        return pd.concat(all_results, ignore_index=True)
    return pd.DataFrame()


def main():
    for exp in EXPERIMENTS:
        df = run_experiment(exp)
        if not df.empty:
            # Write out to working directory
            out_path = os.path.join(os.getcwd(), f"{exp}_correlations.csv")
            df.to_csv(out_path, index=False)
            log.info("Results written to %s", out_path)

            n_match  = (df["status"] == "MATCH").sum()
            n_reject = (df["status"] == "REJECTED").sum()
            log.info("TOTAL  matched: %d   rejected: %d", n_match, n_reject)

            if PLOT_RESULTS:
                try:
                    import plot_correlations
                    log.info("Generating plots...")
                    plot_correlations.run_plot(exp, out_path)
                except ImportError:
                    log.error("Could not import plot_correlations.py. Make sure it is in the same directory.")
        else:
            log.warning("No correlations produced for %s.", exp)


if __name__ == "__main__":
    main()