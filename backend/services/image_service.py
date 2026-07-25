from ai_engine.predictor import predict
from services.hash_service import generate_sha256


def predict_image(image_path):

    prediction = predict(image_path)

    file_hash = generate_sha256(image_path)

    prediction["sha256"] = file_hash

    return prediction