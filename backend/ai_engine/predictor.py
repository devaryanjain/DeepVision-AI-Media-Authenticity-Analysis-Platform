import torch
from PIL import Image

from .model_loader import load_model
from .preprocess import transform
from .config import CLASS_NAMES, DEVICE


def predict(image_path):
    """
    Predict whether an image is REAL or FAKE.
    """

    model = load_model()

    image = Image.open(image_path).convert("RGB")

    input_tensor = transform(image).unsqueeze(0).to(DEVICE)

    with torch.no_grad():
        outputs = model(input_tensor)

        probabilities = torch.softmax(outputs, dim=1)

        confidence, prediction = torch.max(probabilities, dim=1)

    return {
        "prediction": CLASS_NAMES[prediction.item()],
        "confidence": round(confidence.item() * 100, 2)
    }