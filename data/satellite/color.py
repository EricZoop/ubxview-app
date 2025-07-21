from PIL import Image

def remove_white_background(input_path, output_path):
    """
    Removes the white background from an image and makes it transparent.

    Args:
        input_path (str): The file path for the input image.
        output_path (str): The file path to save the output image (must be .png).
    """
    try:
        # Open the image
        img = Image.open(input_path)
    except FileNotFoundError:
        print(f"Error: The file '{input_path}' was not found.")
        return

    # Convert the image to RGBA (if it's not already)
    # This adds an alpha channel for transparency
    img = img.convert("RGBA")

    # Get the image data
    datas = img.getdata()

    newData = []
    # Iterate through each pixel
    for item in datas:
        # Check if the pixel is white (R, G, B values are all 255)
        if item[0] == 0 and item[1] == 0 and item[2] == 0:
            # Replace white with transparent
            newData.append((255, 255, 255, 0))
        else:
            # Keep the original pixel
            newData.append(item)

    # Update image data
    img.putdata(newData)

    # Save the new image, must be a format that supports transparency like PNG
    if not output_path.lower().endswith(".png"):
        print("Warning: Output file should be a .png to support transparency.")
    
    img.save(output_path, "PNG")
    print(f"Successfully processed image and saved to '{output_path}'")


if __name__ == '__main__':
    # --- How to use the function ---

    # 1. Replace 'input_image.jpg' with the path to your image
    input_file = 'dot-grad.png'

    # 2. Replace 'output_image.png' with your desired output file name
    output_file = 'output_image.png'

    # 3. Run the script
    remove_white_background(input_file, output_file)