import pandas as pd

# Load CSV
df = pd.read_csv("C:/ubxview-app/data/drone/2026-2-1/UBXView_2026-02-20_20-49-04/raw_Comm_001_2026-02-20_20-48-20_tracks_1.csv")

# Convert DateTime column
df["DateTime"] = pd.to_datetime(df["DateTime"], format="%Y-%m-%d %H:%M:%S:%f")

# Get first timestamp
first_time = df["DateTime"].iloc[0]

# ---- SET YOUR NEW FULL START DATE/TIME HERE ----
new_start = pd.Timestamp("2026-02-20 20:49:04")

# Preserve original milliseconds from first row
new_start = new_start.replace(microsecond=first_time.microsecond)

# Calculate shift
time_shift = new_start - first_time

# Apply shift to entire column
df["DateTime"] = df["DateTime"] + time_shift

# Save result
df.to_csv("shifted_output.csv", index=False)

print("Full datetime shift applied successfully.")