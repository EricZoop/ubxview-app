import math
import xyzservices.providers as xyz
import requests
from PIL import Image
from io import BytesIO

# Function to calculate bbox (top-left and bottom-right) around a point (lat, lon)
# width_m and height_m define box size in meters (default 500m x 500m)
def bbox_around_point(lat, lon, width_m=10, height_m=10):
    """Calculates a bounding box in latitude/longitude around a center point."""
    delta_lat = height_m / 111320.0
    delta_lon = width_m / (111320.0 * math.cos(math.radians(lat)))
    
    lat_top = lat + delta_lat / 2
    lat_bottom = lat - delta_lat / 2
    lon_left = lon - delta_lon / 2
    lon_right = lon + delta_lon / 2
    
    return (lat_top, lon_left), (lat_bottom, lon_right)

# Convert lat/lon to tile number at given zoom level
def latlon_to_tile(lat, lon, zoom):
    """Converts geographic coordinates to tile numbers."""
    lat_rad = math.radians(lat)
    n = 2.0 ** zoom
    xtile = int((lon + 180.0) / 360.0 * n)
    ytile = int((1.0 - math.log(math.tan(lat_rad) + (1 / math.cos(lat_rad))) / math.pi) / 2.0 * n)
    return xtile, ytile

# Convert tile x,y at zoom to lat/lon (top-left corner of tile)
def tile_to_latlon(x, y, zoom):
    """Converts tile numbers to the top-left geographic coordinate of the tile."""
    n = 2.0 ** zoom
    lon_deg = x / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * y / n)))
    lat_deg = math.degrees(lat_rad)
    return lat_deg, lon_deg

# --- Configuration ---
center_lat, center_lon = 39.19554318441023, -77.2575859852379
zoom = 18

# Calculate bounding box ~4000m around the center point
top_left, bottom_right = bbox_around_point(center_lat, center_lon, 5000, 5000)

# Get tile ranges covering the bounding box
x_min, y_max = latlon_to_tile(top_left[0], top_left[1], zoom)
x_max, y_min = latlon_to_tile(bottom_right[0], bottom_right[1], zoom)

x_start, x_end = min(x_min, x_max), max(x_min, x_max)
y_start, y_end = min(y_min, y_max), max(y_min, y_max)

print(f"Downloading tiles from X: {x_start} to {x_end}")
print(f"Downloading tiles from Y: {y_start} to {y_end}")

tile_size = 256  # Standard tile size

# Use the Esri World Imagery provider from xyzservices
esri = xyz.Esri.WorldImagery

# --- Tile Downloading and Stitching ---
# Create a blank canvas to stitch tiles onto
width = (x_end - x_start + 1) * tile_size
height = (y_end - y_start + 1) * tile_size
result_img = Image.new('RGB', (width, height))

# Download tiles and paste them onto the canvas
for x_idx, x in enumerate(range(x_start, x_end + 1)):
    for y_idx, y in enumerate(range(y_start, y_end + 1)):
        url = esri.build_url(x=x, y=y, z=zoom)
        print(f"Downloading tile {x},{y} ...")
        try:
            response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
            response.raise_for_status()  # Raise an exception for bad status codes
            tile_img = Image.open(BytesIO(response.content))
            result_img.paste(tile_img, (x_idx * tile_size, y_idx * tile_size))
        except requests.exceptions.RequestException as e:
            print(f"Failed to download tile {x},{y}: {e}")

# --- Splitting, Saving, and Coordinate Calculation ---

# Define the pixel midpoints for cropping
mid_x_pixel = width // 2
mid_y_pixel = height // 2

# Define the tile midpoints for coordinate calculation
num_x_tiles = x_end - x_start + 1
num_y_tiles = y_end - y_start + 1
x_mid_tile = x_start + num_x_tiles // 2
y_mid_tile = y_start + num_y_tiles // 2

# Define the four quadrants for cropping
boxes = {
    "top_left":     (0, 0, mid_x_pixel, mid_y_pixel),
    "top_right":    (mid_x_pixel, 0, width, mid_y_pixel),
    "bottom_left":  (0, mid_y_pixel, mid_x_pixel, height),
    "bottom_right": (mid_x_pixel, mid_y_pixel, width, height)
}

# Define the geographic corners for each quadrant
coords = {
    "top_left":     (tile_to_latlon(x_start, y_start, zoom), tile_to_latlon(x_mid_tile, y_mid_tile, zoom)),
    "top_right":    (tile_to_latlon(x_mid_tile, y_start, zoom), tile_to_latlon(x_end + 1, y_mid_tile, zoom)),
    "bottom_left":  (tile_to_latlon(x_start, y_mid_tile, zoom), tile_to_latlon(x_mid_tile, y_end + 1, zoom)),
    "bottom_right": (tile_to_latlon(x_mid_tile, y_mid_tile, zoom), tile_to_latlon(x_end + 1, y_end + 1, zoom))
}

# Crop, save, and print coordinates for each of the four files
for name, box in boxes.items():
    quadrant_img = result_img.crop(box)
    filename = f"stitched_{name}.png"
    quadrant_img.save(filename)
    print("-" * 40)
    print(f"Saved quadrant image as '{filename}'")
    
    top_left_coord = coords[name][0]
    bottom_right_coord = coords[name][1]
    
    print(f"File: '{filename}' Coordinates:")
    print(f"  Top Left:     (Lat: {top_left_coord[0]:.6f}, Lon: {top_left_coord[1]:.6f})")
    print(f"  Bottom Right: (Lat: {bottom_right_coord[0]:.6f}, Lon: {bottom_right_coord[1]:.6f})")

print("-" * 40)
print("\nProcess complete.")