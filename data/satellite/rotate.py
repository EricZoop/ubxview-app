import os
from PIL import Image

# Folder containing the images
folder_path = "C:/ubxview-app/data/satellite/pictures"

# Ensure folder exists
if not os.path.isdir(folder_path):
    raise ValueError(f"The folder '{folder_path}' does not exist.")

# Loop through all files in the folder
for filename in os.listdir(folder_path):
    if filename.lower().endswith((".jpg", ".jpeg")):
        img_path = os.path.join(folder_path, filename)
        
        try:
            with Image.open(img_path) as img:
                rotated = img.rotate(180, expand=True)  # -90 = clockwise rotation
                rotated.save(img_path)  # Overwrite original file
                print(f"Rotated: {filename}")
        except Exception as e:
            print(f"Error processing {filename}: {e}")

print("Rotation complete!")
