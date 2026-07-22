import torch
from torchvision.models import (
    efficientnet_b0,
    EfficientNet_B0_Weights
)

from .config import MODEL_PATH, DEVICE

# Global variable to store the loaded model
_model = None


def load_model():
    """
    Load the trained EfficientNet-B0 model only once.
    """

    global _model

    if _model is not None:
        return _model

    # Load pretrained EfficientNet-B0 architecture
    model = efficientnet_b0(
        weights=EfficientNet_B0_Weights.IMAGENET1K_V1
    )

    # Replace classifier for binary classification
    in_features = model.classifier[1].in_features

    model.classifier = torch.nn.Sequential(
        torch.nn.Dropout(0.4),
        torch.nn.Linear(in_features, 2)
    )

    # Load trained weights
    model.load_state_dict(
        torch.load(MODEL_PATH, map_location=DEVICE)
    )

    model.to(DEVICE)
    model.eval()

    _model = model

    print("✅ Deepfake model loaded successfully.")

    return _model