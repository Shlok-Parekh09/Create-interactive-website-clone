from PIL import Image

def generate():
    img = Image.new('RGBA', (9, 9), (0, 0, 0, 0))
    pixels = img.load()
    
    # Outer black border exactly matching your image
    black = (0, 0, 0, 255)
    border_pixels = [
        (2, 0), (3, 0), (5, 0), (6, 0),
        (1, 1), (4, 1), (7, 1),           # (4, 1) adds the black dip at the top center
        (0, 2), (8, 2),
        (0, 3), (8, 3),
        (0, 4), (8, 4),
        (1, 5), (7, 5),
        (2, 6), (6, 6),
        (3, 7), (5, 7),
        (4, 8)
    ]
    for x, y in border_pixels:
        pixels[x, y] = black
        
    # Dark gray inner fill exactly matching your image
    gray = (65, 65, 65, 255) 
    inner_pixels = [
        (2, 1), (3, 1), (5, 1), (6, 1),
        (1, 2), (2, 2), (3, 2), (4, 2), (5, 2), (6, 2), (7, 2),
        (1, 3), (2, 3), (3, 3), (4, 3), (5, 3), (6, 3), (7, 3),
        (1, 4), (2, 4), (3, 4), (4, 4), (5, 4), (6, 4), (7, 4),
        (2, 5), (3, 5), (4, 5), (5, 5), (6, 5),
        (3, 6), (4, 6), (5, 6),
        (4, 7)
    ]
    for x, y in inner_pixels:
        pixels[x, y] = gray

    # Scale it up x4 just in case they need higher res (Minecraft crispness)
    img = img.resize((36, 36), Image.NEAREST)
    img.save('public/pixel_heart_empty.png')

generate()