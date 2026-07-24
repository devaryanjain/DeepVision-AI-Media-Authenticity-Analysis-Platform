from pathlib import Path

# Root of ai_engine
BASE_DIR = Path(__file__).resolve().parent

# Trained model
MODEL_PATH = BASE_DIR / "weights" / "best_model-v3.pt"

# Image size
IMAGE_SIZE = (224, 224)

# Labels
CLASS_NAMES = ["REAL", "FAKE"]

# Device
DEVICE = "cpu"