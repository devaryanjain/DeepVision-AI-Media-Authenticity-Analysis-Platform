from ai_engine.predictor import predict
from services.hash_service import generate_sha256
from services.metadata_service import extract_metadata


def predict_image(image_path):

    prediction = predict(image_path)

    prediction["sha256"] = generate_sha256(image_path)

    prediction["metadata"] = extract_metadata(image_path)

    return prediction