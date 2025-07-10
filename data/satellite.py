import math
import xyzservices.providers as xyz
import requests
from PIL import Image
from io import BytesIO

# Function to calculate bbox (top-left and bottom-right) around a point (lat, lon)
# width_m and height_m define box size in meters (default 500m x 500m)
def bbox_around_point(lat, lon, width_m=10, height_m=10):
    delta_lat = height_m / 111320.0
    delta_lon = width_m / (111320.0 * math.cos(math.radians(lat)))
    
    lat_top = lat + delta_lat / 2
    lat_bottom = lat - delta_lat / 2
    lon_left = lon - delta_lon / 2
    lon_right = lon + delta_lon / 2
    
    return (lat_top, lon_left), (lat_bottom, lon_right)

# Convert lat/lon to tile number at given zoom level
def latlon_to_tile(lat, lon, zoom):
    lat_rad = math.radians(lat)
    n = 2.0 ** zoom
    xtile = int((lon + 180.0) / 360.0 * n)
    ytile = int((1.0 - math.log(math.tan(lat_rad) + (1 / math.cos(lat_rad))) / math.pi) / 2.0 * n)
    return xtile, ytile

# Convert tile x,y at zoom to lat/lon (top-left corner of tile)
def tile_to_latlon(x, y, zoom):
    n = 2.0 ** zoom
    lon_deg = x / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * y / n)))
    lat_deg = math.degrees(lat_rad)
    return lat_deg, lon_deg

center_lat, center_lon = 39.19554318441023, -77.2575859852379

# Calculate bounding box ~1000m around center
top_left, bottom_right = bbox_around_point(center_lat, center_lon, 4000, 4000)

zoom = 18

# Get tile ranges covering the bbox
x_min, y_max = latlon_to_tile(top_left[0], top_left[1], zoom)
x_max, y_min = latlon_to_tile(bottom_right[0], bottom_right[1], zoom)

x_start, x_end = min(x_min, x_max), max(x_min, x_max)
y_start, y_end = min(y_min, y_max), max(y_min, y_max)

print(f"Downloading tiles from X: {x_start} to {x_end}")
print(f"Downloading tiles from Y: {y_start} to {y_end}")

tile_size = 256  # Standard tile size

# ESRI World Imagery provider from xyzservices
esri = xyz.Esri.WorldImagery

# Create a blank canvas to stitch tiles onto
width = (x_end - x_start + 1) * tile_size
height = (y_end - y_start + 1) * tile_size
result_img = Image.new('RGB', (width, height))

# Download tiles and paste
for x_idx, x in enumerate(range(x_start, x_end + 1)):
    for y_idx, y in enumerate(range(y_start, y_end + 1)):
        url = esri.build_url(x=x, y=y, z=zoom)
        print(f"Downloading tile {x},{y} ...")
        response = requests.get(url)
        if response.status_code == 200:
            tile_img = Image.open(BytesIO(response.content))
            result_img.paste(tile_img, (x_idx * tile_size, y_idx * tile_size))
        else:
            print(f"Failed to download tile {x},{y}")

# Save the final stitched image
result_img.save('stitched_satellite.png')
print("Saved stitched image as 'stitched_satellite.png'")

# Calculate the lat/lon of the stitched image corners
stitched_top_left = tile_to_latlon(x_start, y_start, zoom)
stitched_bottom_right = tile_to_latlon(x_end + 1, y_end + 1, zoom)

print(f"Stitched image covers approx:")
print(f"Top Left Coordinate: {stitched_top_left}")
print(f"Bottom Right Coordinate: {stitched_bottom_right}")
