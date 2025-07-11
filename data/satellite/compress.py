import os
from PIL import Image
 
def compress_png_folder(Compress_this):
    png_files = [f for f in os.listdir(Compress_this) if f.lower().endswith(".png")]
 
    print(f"Found {len(png_files)} PNG files in: {Compress_this}")
 
    for filename in png_files:
        input_path = os.path.join(Compress_this, filename)
        temp_path = os.path.join(Compress_this, "temp_" + filename)
 
        try:
 
            with Image.open(input_path) as img:
                img.save(temp_path, format="PNG", optimize=True)
 
 
            os.replace(temp_path, input_path)
            print(f"Compressed Successfully: {filename}")
           
        except Exception as e:
            print(f"Failed to compress {filename}: {e}")
 
if __name__ == "__main__":
    folder_to_compress = "C:/ubxview-app/ubxview/frontend/src/maps"
    compress_png_folder(folder_to_compress)