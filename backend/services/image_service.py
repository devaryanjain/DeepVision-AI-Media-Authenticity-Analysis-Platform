import os

from ai_engine.predictor import predict
from ai_engine.gradcam import generate_gradcam
from services.hash_service import generate_sha256
from services.metadata_service import extract_metadata


GRADCAM_FOLDER = "../uploads/gradcam"

os.makedirs(GRADCAM_FOLDER, exist_ok=True)


def predict_image(image_path):

    # Normal AI prediction
    prediction = predict(image_path)

    # Generate SHA-256 hash
    prediction["sha256"] = generate_sha256(image_path)

    # Extract image metadata
    prediction["metadata"] = extract_metadata(image_path)

    # Generate Grad-CAM explanation
    gradcam_result = generate_gradcam(image_path)

    # Save Grad-CAM overlay
    image_name = os.path.splitext(
        os.path.basename(image_path)
    )[0]

    gradcam_name = image_name + "_gradcam.png"

    gradcam_path = os.path.join(
        GRADCAM_FOLDER,
        gradcam_name
    )

    gradcam_result["heatmap"].save(
        gradcam_path
    )

    # Return Grad-CAM information
    prediction["gradcam_name"] = gradcam_name
    prediction["gradcam_url"] = (
        "/uploads/gradcam/" + gradcam_name
    )

    return prediction