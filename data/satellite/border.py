from PIL import Image, ImageDraw

def add_rounded_corners(input_path, output_path, radius, upscale_factor=4):
    """
    Adds smooth, anti-aliased transparent rounded corners to an image.

    Args:
        input_path (str): The path to the input PNG image.
        output_path (str): The path to save the output PNG image.
        radius (int): The corner radius in pixels for the final image.
        upscale_factor (int): How much to upscale the mask for anti-aliasing.
    """
    try:
        # Open the input image
        img = Image.open(input_path).convert("RGBA")
    except FileNotFoundError:
        print(f"Error: The file '{input_path}' was not found.")
        return

    # --- Create the anti-aliased mask ---
    # 1. Create a larger canvas (upscaled)
    upscaled_size = (img.size[0] * upscale_factor, img.size[1] * upscale_factor)
    upscaled_radius = radius * upscale_factor
    
    # 2. Draw the rounded rectangle on the larger canvas
    mask = Image.new('L', upscaled_size, 0)
    draw = ImageDraw.Draw(mask)
    draw.rounded_rectangle([(0, 0), upscaled_size], radius=upscaled_radius, fill=255)
    
    # 3. Scale the mask back down using a high-quality resizer (LANCZOS)
    #    This creates the smooth, anti-aliased edges.
    mask = mask.resize(img.size, Image.Resampling.LANCZOS)
    
    # Apply the mask to the original image's alpha channel
    img.putalpha(mask)
    
    # Save the resulting image
    img.save(output_path, 'PNG')
    print(f"Image with smooth rounded corners saved to '{output_path}' ✨")


if __name__ == '__main__':
    # --- Configuration ---
    # 1. Make sure your image is named 'input.png' or change the name below.
    input_file = 'dot-grad.png'
    output_file = 'output_rounded_smooth.png'
    
    # 2. Set the desired corner radius.
    corner_radius = 75

    # --- Run the function ---
    add_rounded_corners(input_file, output_file, radius=corner_radius)