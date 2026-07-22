import os
from PIL import Image, ImageEnhance, ImageFilter

public_dir = r"C:\Users\Roko Arraez\.gemini\antigravity\scratch\rokoarraezwebOD-app\public"
brain_dir = r"C:\Users\Roko Arraez\.gemini\antigravity\brain\c2e6f365-d95d-4b13-b01e-0201933322b2"

files = [
    ('media__1784700153482.jpg', 'reiverde-1.jpg'),
    ('media__1784700185545.jpg', 'reiverde-2.jpg'),
    ('media__1784700198950.jpg', 'reiverde-3.jpg'),
    ('media__1784700198950.jpg', 'reiverde3.jpg'),
    ('media__1784700211241.jpg', 'reiverde-4.jpg'),
    ('media__1784700322628.jpg', 'reiverde-5.jpg'),
]

for src_name, target_name in files:
    src_path = os.path.join(brain_dir, src_name)
    target_path = os.path.join(public_dir, target_name)
    
    if os.path.exists(src_path):
        img = Image.open(src_path).convert('RGB')
        w, h = img.size
        
        # Calculate high-res target dimensions (scale 2.5x to 3x)
        scale_factor = 2.5 if w > 600 else 3.5
        new_w = int(w * scale_factor)
        new_h = int(h * scale_factor)
        
        # High quality Lanczos resampling
        upscaled = img.resize((new_w, new_h), Image.Resampling.LANCZOS)
        
        # Apply subtle sharpening & contrast enhancement for crisp vector/text look
        enhancer = ImageEnhance.Sharpness(upscaled)
        sharpened = enhancer.enhance(1.8)
        
        contrast_enhancer = ImageEnhance.Contrast(sharpened)
        final_img = contrast_enhancer.enhance(1.05)
        
        final_img.save(target_path, 'JPEG', quality=95, optimize=True)
        print(f"Upscaled {target_name}: {w}x{h} -> {new_w}x{new_h} (Quality 95)")

