import os
from PIL import Image, ImageEnhance

user_uploaded = r"C:\Users\Roko Arraez\.gemini\antigravity\brain\c2e6f365-d95d-4b13-b01e-0201933322b2\.user_uploaded"
public_dir = r"C:\Users\Roko Arraez\.gemini\antigravity\scratch\rokoarraezwebOD-app\public"

mapping = [
    ('media_1789019424120.png', 'coffeebubble-1.jpg', 3.0),
    ('media_1789019424072.jpg', 'coffeebubble-2.jpg', 2.0),
    ('media_1789019424002.jpg', 'coffeebubble-3.jpg', 2.5),
]

for src_name, dest_name, scale in mapping:
    src_path = os.path.join(user_uploaded, src_name)
    dest_path = os.path.join(public_dir, dest_name)
    
    if os.path.exists(src_path):
        img = Image.open(src_path).convert('RGB')
        w, h = img.size
        new_w = int(w * scale)
        new_h = int(h * scale)
        
        upscaled = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Sharpening
        enhancer = ImageEnhance.Sharpness(upscaled)
        sharpened = enhancer.enhance(1.6)
        
        contrast_enhancer = ImageEnhance.Contrast(sharpened)
        final_img = contrast_enhancer.enhance(1.03)
        
        final_img.save(dest_path, 'JPEG', quality=95, optimize=True)
        print(f"Saved {dest_name}: {w}x{h} -> {new_w}x{new_h}")

# Also create coffeebubble-cover.jpg alias
cover_src = os.path.join(public_dir, 'coffeebubble-2.jpg')
cover_dest = os.path.join(public_dir, 'coffeebubble-cover.jpg')
if os.path.exists(cover_src):
    img = Image.open(cover_src)
    img.save(cover_dest, 'JPEG', quality=95)
    print("Created coffeebubble-cover.jpg")
