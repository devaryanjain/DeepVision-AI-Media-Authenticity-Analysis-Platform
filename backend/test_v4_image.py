import torch
from pathlib import Path
from PIL import Image
from torchvision.models import efficientnet_b0

from ai_engine.preprocess import transform
from ai_engine.config import CLASS_NAMES, DEVICE

MODEL_PATH = Path(
    r"C:\Users\shivani\Projects\DeepVision-AI-Media-Authenticity-Analysis-Platform\backend\ai_engine\weights\best_model-v4.pt"
)

IMAGE_PATH = Path(
    r"C:\Users\shivani\Desktop\SGpassphotojpg.jpg"
)


def load_v4_model():

    model = efficientnet_b0(weights=None)

    model.classifier = torch.nn.Sequential(
        torch.nn.Dropout(0.4),
        torch.nn.Linear(
            model.classifier[1].in_features,
            2
        )
    )

    model.load_state_dict(
        torch.load(
            MODEL_PATH,
            map_location=DEVICE
        )
    )

    model.to(DEVICE)
    model.eval()

    return model


model = load_v4_model()

image = Image.open(IMAGE_PATH).convert("RGB")

input_tensor = (
    transform(image)
    .unsqueeze(0)
    .to(DEVICE)
)

with torch.no_grad():

    outputs = model(input_tensor)

    probabilities = torch.softmax(
        outputs,
        dim=1
    )

    confidence, prediction = torch.max(
        probabilities,
        dim=1
    )

predicted_class = prediction.item()
predicted_confidence = confidence.item() * 100

print("\n==============================")
print("V4 IMAGE TEST")
print("==============================")
print(f"Image      : {IMAGE_PATH.name}")
print(f"Prediction : {CLASS_NAMES[predicted_class]}")
print(f"Confidence : {predicted_confidence:.2f}%")
print("==============================")