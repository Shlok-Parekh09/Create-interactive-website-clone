from PIL import Image
import os

img = Image.open('public/pixel_heart.png')
print(f"Size: {img.width}x{img.height}")
