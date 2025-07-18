import math
import xyzservices.providers as xyz # type: ignore
import requests # type: ignore
from PIL import Image # type: ignore
from io import BytesIO

def create_grid_satellite_images(center_lat, center_lon, zoom, cell_size_m, grid_dim):
    """
    Downloads one high-resolution satellite image and slices it into a grid,
    ensuring no overlaps and providing coordinates for each cell.

    Args:
        center_lat (float): Center latitude for the entire grid.
        center_lon (float): Center longitude for the entire grid.
        zoom (int): Zoom level for the satellite tiles.
        cell_size_m (int): The desired size (width and height) of each grid cell in meters.
        grid_dim (int): The dimension of the grid (e.g., 3 for a 3x3 grid).
    """
    # 1. Calculate total area and provide user feedback
    total_size_m = cell_size_m * grid_dim
    print(f"Creating a {grid_dim}x{grid_dim} grid from a single high-resolution image.")
    print(f"Each of the {grid_dim**2} cells represents an area of ~{cell_size_m}m x {cell_size_m}m.")
    print(f"Requesting a single large image covering {total_size_m}m x {total_size_m}m...")

    # 2. Download the single large image that covers the entire grid area
    large_image, large_top_left, large_bottom_right = download_single_area(
        center_lat, center_lon, zoom, total_size_m
    )
    print("Download and stitching of the large image is complete.")
    
    # Optional: Save the complete high-res image for reference
    stitched_filename = "satellite_stitched_hires.png"
    large_image.save(stitched_filename)
    print(f"Saved the full high-resolution image as '{stitched_filename}'")

    # 3. Prepare for slicing by calculating dimensions
    large_px_w, large_px_h = large_image.size
    cell_px_w = large_px_w / grid_dim
    cell_px_h = large_px_h / grid_dim

    # Get total lat/lon span of the large, stitched image
    # Note: Latitude decreases from top to bottom
    total_lat_span = large_top_left[0] - large_bottom_right[0]
    total_lon_span = large_bottom_right[1] - large_top_left[1]

    # Calculate the geographic size (lat/lon span) for each individual grid cell
    cell_lat_span = total_lat_span / grid_dim
    cell_lon_span = total_lon_span / grid_dim

    saved_files = []
    plane_definitions = []

    print(f"\nSlicing the large image into {grid_dim**2} cells...")

    # 4. Loop through the grid to slice the image and calculate coordinates for each cell
    for row in range(grid_dim):
        for col in range(grid_dim):
            # Define the pixel box for cropping from the large image
            left = col * cell_px_w
            top = row * cell_px_h
            right = (col + 1) * cell_px_w
            bottom = (row + 1) * cell_px_h
            
            # Crop the image using PIL
            cell_image = large_image.crop((left, top, right, bottom))
            filename = f"satellite_cell_{row}x{col}.png"
            cell_image.save(filename)
            saved_files.append(filename)

            # Calculate the precise geographic coordinates for the cropped cell
            cell_top_left_lat = large_top_left[0] - (row * cell_lat_span)
            cell_top_left_lon = large_top_left[1] + (col * cell_lon_span)
            
            cell_bottom_right_lat = large_top_left[0] - ((row + 1) * cell_lat_span)
            cell_bottom_right_lon = large_top_left[1] + ((col + 1) * cell_lon_span)

            plane_definitions.append({
                'filename': filename,
                'top_left': (cell_top_left_lat, cell_top_left_lon),
                'bottom_right': (cell_bottom_right_lat, cell_bottom_right_lon)
            })
            print(f"  - Saved {filename}")

    print(f"\nProcess complete! Created {len(saved_files)} grid images.")

    # 5. Print JavaScript import and export format
    print("\n" + "="*60)
    print("JAVASCRIPT IMPORTS AND EXPORTS:")
    print("="*60)

    for i, plane in enumerate(plane_definitions):
        import_name = f"imageUrl{i+1}"
        print(f'import {import_name} from "./maps/{plane["filename"]}";')

    print("\nexport const planeDefinitions = [")
    for i, plane in enumerate(plane_definitions):
        import_name = f"imageUrl{i+1}"
        top_left_coords = plane['top_left']
        bottom_right_coords = plane['bottom_right']
        print("  {")
        print("    coords: {")
        print(f"      topLeft: {{ lat: {top_left_coords[0]}, lon: {top_left_coords[1]} }},")
        print(f"      bottomRight: {{ lat: {bottom_right_coords[0]}, lon: {bottom_right_coords[1]} }},")
        print("    },")
        print(f"    imageUrl: {import_name},")
        print("  }," if i < len(plane_definitions) - 1 else "  },")
    print("]")

    return saved_files


def bbox_around_point(lat, lon, width_m=10, height_m=10):
    """Calculates a bounding box in latitude/longitude around a center point."""
    delta_lat = height_m / 111320.0
    delta_lon = width_m / (111320.0 * math.cos(math.radians(lat)))
    
    lat_top = lat + delta_lat / 2
    lat_bottom = lat - delta_lat / 2
    lon_left = lon - delta_lon / 2
    lon_right = lon + delta_lon / 2
    
    return (lat_top, lon_left), (lat_bottom, lon_right)

def latlon_to_tile(lat, lon, zoom):
    """Converts geographic coordinates to tile numbers."""
    lat_rad = math.radians(lat)
    n = 2.0 ** zoom
    xtile = int((lon + 180.0) / 360.0 * n)
    ytile = int((1.0 - math.log(math.tan(lat_rad) + (1 / math.cos(lat_rad))) / math.pi) / 2.0 * n)
    return xtile, ytile

def tile_to_latlon(x, y, zoom):
    """Converts tile numbers to the top-left geographic coordinate of the tile."""
    n = 2.0 ** zoom
    lon_deg = x / n * 360.0 - 180.0
    lat_rad = math.atan(math.sinh(math.pi * (1 - 2 * y / n)))
    lat_deg = math.degrees(lat_rad)
    return lat_deg, lon_deg

def download_single_area(center_lat, center_lon, zoom, area_size_m):
    """Downloads tiles for a single area and returns the stitched image with coordinates."""
    
    # Calculate bounding box around the center point
    top_left, bottom_right = bbox_around_point(center_lat, center_lon, area_size_m, area_size_m)
    
    # Get tile ranges covering the bounding box
    x_min, y_max = latlon_to_tile(top_left[0], top_left[1], zoom)
    x_max, y_min = latlon_to_tile(bottom_right[0], bottom_right[1], zoom)
    
    x_start, x_end = min(x_min, x_max), max(x_min, x_max)
    y_start, y_end = min(y_min, y_max), max(y_min, y_max)
    
    tile_size = 256  # Standard tile size
    esri = xyz.Esri.WorldImagery
    
    # Create a blank canvas to stitch tiles onto
    width = (x_end - x_start + 1) * tile_size
    height = (y_end - y_start + 1) * tile_size
    result_img = Image.new('RGB', (width, height))
    
    # Download tiles and paste them onto the canvas
    for x_idx, x in enumerate(range(x_start, x_end + 1)):
        for y_idx, y in enumerate(range(y_start, y_end + 1)):
            url = esri.build_url(x=x, y=y, z=zoom)
            try:
                response = requests.get(url, headers={'User-Agent': 'Mozilla/5.0'})
                response.raise_for_status()
                tile_img = Image.open(BytesIO(response.content))
                result_img.paste(tile_img, (x_idx * tile_size, y_idx * tile_size))
            except requests.exceptions.RequestException as e:
                print(f"  Failed to download tile {x},{y}: {e}")
    
    # Calculate the actual coordinates of the final image
    actual_top_left = tile_to_latlon(x_start, y_start, zoom)
    actual_bottom_right = tile_to_latlon(x_end + 1, y_end + 1, zoom)
    
    return result_img, actual_top_left, actual_bottom_right

# THE EARTH | 0, 0
# DRS RADA | 39.195572582706525, -77.2581730114447
# BUTLERS ORCHARD | 39.22146543679169, -77.2231572767802
# PEACH FARM | 39.27238759440129, -77.32603711238248

if __name__ == "__main__":
    # --- CONFIGURATION ---
    center_lat, center_lon = 39.195572582706525, -77.2581730114447 # DRS RADA
    zoom = 16

    # Define the size of each INDIVIDUAL cell in the grid (in meters)
    cell_size_m = 4000 

    # Define the grid dimensions (e.g., 3 for a 3x3 grid, 4 for 4x4)
    # This can be any integer, even or odd.
    grid_dim = 5

    # --- EXECUTION ---
    # This function will create a single large image (3*2500m = 7500m) 
    # and then cut it into a 3x3 grid.
    saved_files = create_grid_satellite_images(center_lat, center_lon, zoom, cell_size_m, grid_dim)

    print(f"\nSummary of files created:")
    for filename in saved_files:
        print(f"  - {filename}")