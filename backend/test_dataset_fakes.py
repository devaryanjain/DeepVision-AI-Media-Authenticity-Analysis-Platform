import random
from pathlib import Path

import torch
from PIL import Image
from torchvision.models import efficientnet_b0

from ai_engine.preprocess import transform
from ai_engine.config import DEVICE, CLASS_NAMES


TEST_FAKE_DIR = Path(
    r"C:\Users\shivani\Datasets\deepvision_subset\test\fake"
)

MODEL_PATH = Path(
    r"C:\Users\shivani\Projects\DeepVision-AI-Media-Authenticity-Analysis-Platform\backend\ai_engine\weights\best_model-v4.pt"
)


def load_model():

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


model = load_model()

images = list(
    TEST_FAKE_DIR.glob("*.jpg")
) + list(
    TEST_FAKE_DIR.glob("*.jpeg")
) + list(
    TEST_FAKE_DIR.glob("*.png")
)

random.seed(42)
samples = random.sample(
    images,
    min(5, len(images))
)

print("\n==============================")
print("V4 TEST-SET FAKE IMAGES")
print("==============================")

correct = 0

for image_path in samples:

    image = Image.open(image_path).convert("RGB")

    tensor = (
        transform(image)
        .unsqueeze(0)
        .to(DEVICE)
    )

    with torch.no_grad():

        outputs = model(tensor)

        probabilities = torch.softmax(
            outputs,
            dim=1
        )

        confidence, prediction = torch.max(
            probabilities,
            dim=1
        )

    predicted = CLASS_NAMES[prediction.item()]

    if predicted == "FAKE":
        correct += 1

    print(
        f"{image_path.name} → "
        f"{predicted} "
        f"({confidence.item() * 100:.2f}%)"
    )

print("\nCorrect FAKE predictions:")
print(f"{correct}/{len(samples)}")git add backend/test_dataset_fakes.py