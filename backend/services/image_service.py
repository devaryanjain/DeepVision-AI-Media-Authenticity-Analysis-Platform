import sys
from pathlib import Path

sys.path.append(str(Path(__file__).resolve().parent.parent))

from ai_engine.predictor import predict


def predict_image(image_path):
    return predict(image_path)