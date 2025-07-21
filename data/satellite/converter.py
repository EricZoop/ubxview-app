from PIL import Image

def convert_png_to_ico(input_path, output_path):
    """
    Converts a PNG image to a multi-resolution ICO file.

    Args:
        input_path (str): The path to the input PNG image.
        output_path (str): The path to save the output ICO file.
    """
    try:
        # Open the input image
        img = Image.open(input_path)
    except FileNotFoundError:
        print(f"Error: The file '{input_path}' was not found.")
        return

    # Define the standard sizes for an ICO file
    # The save method will automatically resize the image to these dimensions
    icon_sizes = [
        (16, 16),
        (24, 24),
        (32, 32),
        (48, 48),
        (64, 64),
        (128, 128),
        (256, 256)
    ]

    # Save the image as an ICO file with multiple sizes
    # Pillow handles the resizing for each specified dimension
    try:
        img.save(output_path, format='ICO', sizes=icon_sizes)
        print(f"Successfully converted '{input_path}' to '{output_path}' ✨")
    except Exception as e:
        print(f"An error occurred during conversion: {e}")


if __name__ == '__main__':
    # --- Configuration ---
    # 1. Name of your input PNG file.
    #    For best results, use a square image, like 256x256 or 512x512.
    input_file = 'dot-launch.png'

    # 2. Desired name for your output ICO file.
    output_file = 'favicon.ico'

    # --- Create a sample PNG to make the script runnable ---
    # You can comment out this block if you already have an 'icon.png'
    try:
        Image.open(input_file)
    except FileNotFoundError:
        print(f"'{input_file}' not found. Creating a sample image for demonstration.")
        sample_img = Image.new('RGBA', (256, 256), (255, 87, 34, 255)) # Orange color
        draw = ImageDraw.Draw(sample_img) # type: ignore
        draw.text((128, 128), "ICON", fill="white", font_size=80, anchor="mm")
        sample_img.save(input_file)
        print(f"Sample '{input_file}' created.")

    # --- Run the conversion ---
    convert_png_to_ico(input_file, output_file)