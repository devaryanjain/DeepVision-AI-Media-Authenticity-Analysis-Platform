import os
from PIL import Image
from PIL.ExifTags import TAGS


def extract_metadata(image_path):
    with Image.open(image_path) as img:

        metadata = {
            "filename": os.path.basename(image_path),
            "file_size_kb": round(os.path.getsize(image_path) / 1024, 2),
            "format": img.format,
            "width": img.width,
            "height": img.height,
            "color_mode": img.mode,
            "camera_make": None,
            "camera_model": None,
            "software": None,
            "capture_date": None,
        }

        exif_data = img.getexif()

        if exif_data:

            for tag_id, value in exif_data.items():

                tag = TAGS.get(tag_id, tag_id)

                if tag == "Make":
                    metadata["camera_make"] = value

                elif tag == "Model":
                    metadata["camera_model"] = value

                elif tag == "Software":
                    metadata["software"] = value

                elif tag == "DateTime":
                    metadata["capture_date"] = value

    return metadata