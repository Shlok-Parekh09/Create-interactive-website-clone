from PIL import Image

img = Image.open('public/pixel_heart.png').convert('RGBA')

colors = set()
for p in img.getdata():
    if p[3] > 0:
        colors.add(p)

print("Unique visible colors:", len(colors))
# take top 10 most common colors
from collections import Counter
counts = Counter(p for p in img.getdata() if p[3] > 0)
for clr, count in counts.most_common(10):
    print(clr, count)
