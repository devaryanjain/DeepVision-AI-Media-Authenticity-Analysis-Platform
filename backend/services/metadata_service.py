import os
from PIL import Image


def extract_metadata(image_path):
    with Image.open(image_path) as img:
        metadata = {
            "filename": os.path.basename(image_path),
            "file_size_kb": round(os.path.getsize(image_path) / 1024, 2),
            "format": img.format,
            "width": img.width,
            "height": img.height,
            "color_mode": img.mode,
        }

    return metadata