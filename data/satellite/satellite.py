import math
import xyzservices.providers as xyz # type: ignore
import requests # type: ignore
from PIL import Image # type: ignore
from io import BytesIO

def calculate_grid_centers(center_lat, center_lon, area_size_m, grid_size):
    """Calculate center coordinates for a grid of any size (e.g. 2x2, 3x3, 4x4)."""
    centers = []

    delta_lat = area_size_m / 111320.0
    delta_lon = area_size_m / (111320.0 * math.cos(math.radians(center_lat)))

    offset_start = -(grid_size - 1) / 2.0

    for row in range(grid_size):
        for col in range(grid_size):
            row_offset = offset_start + row
            col_offset = offset_start + col

            lat = center_lat + (row_offset * delta_lat)
            lon = center_lon + (col_offset * delta_lon)
            centers.append((lat, lon, row_offset, col_offset))

    return centers

def create_grid_satellite_images(center_lat, center_lon, zoom, area_size_m, grid_size):
    """
    Creates satellite images in a grid pattern (e.g., 3x3, 5x5).
    
    Args:
        center_lat, center_lon: Center coordinates
        zoom: Zoom level for tiles
        area_size_m: Size of each individual image area in meters
        grid_size: Number of rows/columns in the grid (must be odd)
    """
    total_images = grid_size * grid_size

    print(f"Creating {grid_size}x{grid_size} grid of satellite images")
    print(f"Center: ({center_lat}, {center_lon})")
    print(f"Each image area: {area_size_m}m x {area_size_m}m")
    print(f"Zoom level: {zoom}")
    print(f"Total images to create: {total_images}")

    saved_files = []
    plane_definitions = []

    neighbors = calculate_grid_centers(center_lat, center_lon, area_size_m, grid_size)

    for i, (lat, lon, row_offset, col_offset) in enumerate(neighbors):
        print(f"\nDownloading tile {i+1}/{len(neighbors)} (Row {row_offset:+.1f}, Col {col_offset:+.1f})...")
        img, top_left, bottom_right = download_single_area(lat, lon, zoom, area_size_m)
        
        row_str = f"{row_offset:+.1f}".replace('.', '_')
        col_str = f"{col_offset:+.1f}".replace('.', '_')
        filename = f"satellite_grid_row{row_str}_col{col_str}.png"


        img.save(filename)
        saved_files.append(filename)

        plane_definitions.append({
            'filename': filename,
            'top_left': top_left,
            'bottom_right': bottom_right
        })

    print(f"\nProcess complete! Created {len(saved_files)} images.")

    # JavaScript import/export
    print("\n" + "="*60)
    print("JAVASCRIPT IMPORTS AND EXPORTS:")
    print("="*60)

    for i, plane in enumerate(plane_definitions):
        import_name = f"imageUrl{i+1}"
        print(f'import {import_name} from "./maps/{plane["filename"]}";')

    print("\nexport const planeDefinitions = [")
    for i, plane in enumerate(plane_definitions):
        import_name = f"imageUrl{i+1}"
        top_left = plane['top_left']
        bottom_right = plane['bottom_right']
        print("  {")
        print("    coords: {")
        print(f"      topLeft: {{ lat: {top_left[0]}, lon: {top_left[1]} }},")
        print(f"      bottomRight: {{ lat: {bottom_right[0]}, lon: {bottom_right[1]} }},")
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

def calculate_neighbor_centers(center_lat, center_lon, area_size_m, layer):
    """Calculate the center coordinates for all neighbors in a given layer."""
    neighbors = []
    
    # Convert area size to lat/lon deltas
    delta_lat = area_size_m / 111320.0
    delta_lon = area_size_m / (111320.0 * math.cos(math.radians(center_lat)))
    
    # For each layer, generate all positions
    for layer_num in range(1, layer + 1):
        # Generate positions for this layer (square ring around center)
        positions = []
        
        # Top and bottom rows
        for col_offset in range(-layer_num, layer_num + 1):
            positions.append((layer_num, col_offset))    # Top row
            positions.append((-layer_num, col_offset))   # Bottom row
        
        # Left and right columns (excluding corners already added)
        for row_offset in range(-layer_num + 1, layer_num):
            positions.append((row_offset, -layer_num))   # Left column
            positions.append((row_offset, layer_num))    # Right column
        
        # Convert positions to lat/lon
        for row_offset, col_offset in positions:
            neighbor_lat = center_lat + (row_offset * delta_lat)
            neighbor_lon = center_lon + (col_offset * delta_lon)
            neighbors.append((neighbor_lat, neighbor_lon, layer_num, row_offset, col_offset))
    
    return neighbors

def create_layered_satellite_images(center_lat, center_lon, zoom, area_size_m, layers):
    """
    Creates satellite images in a layered spreadout pattern.
    
    Args:
        center_lat, center_lon: Center coordinates
        zoom: Zoom level for tiles
        area_size_m: Size of each individual image area in meters
        layers: Number of layers (1 = center only, 2 = center + 1 layer of neighbors, etc.)
    """
    
    total_images = 1  # Center image
    for i in range(1, layers):
        total_images += 8 * i  # Each layer adds 8*layer_number images
    
    print(f"Creating {layers} layer(s) of satellite images")
    print(f"Center: ({center_lat}, {center_lon})")
    print(f"Each image area: {area_size_m}m x {area_size_m}m")
    print(f"Zoom level: {zoom}")
    print(f"Total images to create: {total_images}")
    
    saved_files = []
    plane_definitions = []
    
    # Create center image (layer 0)
    print(f"\nDownloading center image...")
    center_img, top_left, bottom_right = download_single_area(center_lat, center_lon, zoom, area_size_m)
    
    filename = f"satellite_center.png"
    center_img.save(filename)
    saved_files.append(filename)
    
    # Add to plane definitions
    plane_definitions.append({
        'filename': filename,
        'top_left': top_left,
        'bottom_right': bottom_right
    })
    
    # Create neighbor images for each layer
    if layers > 1:
        neighbors = calculate_neighbor_centers(center_lat, center_lon, area_size_m, layers - 1)
        
        for i, (neighbor_lat, neighbor_lon, layer_num, row_offset, col_offset) in enumerate(neighbors):
            print(f"\nDownloading neighbor {i+1}/{len(neighbors)} (Layer {layer_num}, Row {row_offset:+d}, Col {col_offset:+d})...")
            
            neighbor_img, top_left, bottom_right = download_single_area(neighbor_lat, neighbor_lon, zoom, area_size_m)
            
            row_str = f"{row_offset:+.1f}".replace('.', '_')
            col_str = f"{col_offset:+.1f}".replace('.', '_')
            filename = f"satellite_grid_row{row_str}_col{col_str}.png"

            neighbor_img.save(filename)
            saved_files.append(filename)
            
            # Add to plane definitions
            plane_definitions.append({
                'filename': filename,
                'top_left': top_left,
                'bottom_right': bottom_right
            })
    
    print(f"\nProcess complete! Created {len(saved_files)} images.")
    
    # Print JavaScript import and export format
    print("\n" + "="*60)
    print("JAVASCRIPT IMPORTS AND EXPORTS:")
    print("="*60)
    
    # Print imports
    for i, plane in enumerate(plane_definitions):
        import_name = f"imageUrl{i+1}"
        print(f'import {import_name} from "./maps/{plane["filename"]}";')
    
    print("\nexport const planeDefinitions = [")
    
    # Print plane definitions
    for i, plane in enumerate(plane_definitions):
        import_name = f"imageUrl{i+1}"
        top_left = plane['top_left']
        bottom_right = plane['bottom_right']
        
        print("  {")
        print("    coords: {")
        print(f"      topLeft: {{ lat: {top_left[0]}, lon: {top_left[1]} }},")
        print(f"      bottomRight: {{ lat: {bottom_right[0]}, lon: {bottom_right[1]} }},")
        print("    },")
        print(f"    imageUrl: {import_name},")
        print("  }," if i < len(plane_definitions) - 1 else "  },")
    
    print("]")
    
    return saved_files

# THE EARTH | 0, 0
# DRS RADA | 39.195572582706525, -77.2581730114447
# BUTLERS ORCHARD | 39.22146543679169, -77.2231572767802
# PEACH FARM | 39.27238759440129, -77.32603711238248

if __name__ == "__main__":
    center_lat, center_lon = 39.195572582706525, -77.2581730114447
    zoom = 15
    area_size_m = 15000
    grid_size = 1  # You can now use even sizes like 2 or 4

    saved_files = create_grid_satellite_images(center_lat, center_lon, zoom, area_size_m, grid_size)

    print(f"\nFiles created:")
    for filename in saved_files:
        print(f"  - {filename}")
