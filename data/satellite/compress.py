import os
from PIL import Image

def compress_png_folder(folder):
    png_files = [f for f in os.listdir(folder) if f.lower().endswith(".png")]
    print(f"Found {len(png_files)} PNG files in: {folder}")

    for filename in png_files:
        input_path = os.path.join(folder, filename)
        temp_path = os.path.join(folder, "temp_" + filename)

        try:
            with Image.open(input_path) as img:
                # Convert RGBA to P mode (indexed) if applicable
                if img.mode in ("RGBA", "RGB"):
                    img = img.convert("P", palette=Image.ADAPTIVE)

                # Save with optimization and reduce bits
                img.save(temp_path, format="PNG", optimize=True, bits=8)

            # Replace original file
            os.replace(temp_path, input_path)

            before = os.path.getsize(input_path)
            after = os.path.getsize(temp_path) if os.path.exists(temp_path) else before
            print(f"Compressed {filename}: {before/1024:.1f}KB → {after/1024:.1f}KB")

        except Exception as e:
            print(f"Failed to compress {filename}: {e}")

if __name__ == "__main__":
    folder_to_compress = "C:/ubxview-app/ubxview/frontend/src/maps"
    compress_png_folder(folder_to_compress)
