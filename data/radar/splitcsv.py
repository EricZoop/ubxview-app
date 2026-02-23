import pandas as pd
import math

# Load CSV
df = pd.read_csv("C:/ubxview-app/data/drone/2026-2-1/UBXView_2026-02-20_20-49-04/raw_Comm_001_2026-02-20_20-48-20_tracks_1.csv")

# Calculate split index
split_index = math.ceil(len(df) / 2)

# Split into two chunks
df_chunk_0 = df.iloc[:split_index]
df_chunk_1 = df.iloc[split_index:]

# Save chunks
df_chunk_0.to_csv("output_chunk_0.csv", index=False)
df_chunk_1.to_csv("output_chunk_1.csv", index=False)

print("CSV split into two chunks successfully.")