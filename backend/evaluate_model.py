import torch
from pathlib import Path
from torchvision.datasets import ImageFolder
from torch.utils.data import DataLoader

from ai_engine.model_loader import load_model
from ai_engine.preprocess import transform
from ai_engine.config import DEVICE


# Test dataset
TEST_DIR = Path(
    r"C:\Users\shivani\Datasets\deepvision_subset\test"
)

BATCH_SIZE = 16


def evaluate():
    print("Loading test dataset...")

    dataset = ImageFolder(
        TEST_DIR,
        transform=transform
    )

    loader = DataLoader(
        dataset,
        batch_size=BATCH_SIZE,
        shuffle=False,
        num_workers=0
    )

    print("Classes:", dataset.class_to_idx)
    print("Test images:", len(dataset))

    model = load_model()

    total = 0
    correct = 0

    # Confusion matrix:
    # rows    = actual
    # columns = predicted
    #
    #             Pred REAL   Pred FAKE
    # Actual REAL
    # Actual FAKE
    true_real_pred_real = 0
    true_real_pred_fake = 0
    true_fake_pred_real = 0
    true_fake_pred_fake = 0

    with torch.no_grad():

        for images, labels in loader:
            
            images = images.to(DEVICE)
            labels = labels.to(DEVICE)
            labels = 1 - labels
            outputs = model(images)
            predictions = torch.argmax(outputs, dim=1)

            total += labels.size(0)
            correct += (predictions == labels).sum().item()

            for actual, predicted in zip(labels, predictions):

                actual = actual.item()
                predicted = predicted.item()

                if actual == 0 and predicted == 0:
                    true_real_pred_real += 1

                elif actual == 0 and predicted == 1:
                    true_real_pred_fake += 1

                elif actual == 1 and predicted == 0:
                    true_fake_pred_real += 1

                elif actual == 1 and predicted == 1:
                    true_fake_pred_fake += 1

    accuracy = correct / total

    # REAL = class 0
    # FAKE = class 1

    precision = (
        true_fake_pred_fake /
        (true_real_pred_fake + true_fake_pred_fake)
        if (true_real_pred_fake + true_fake_pred_fake) > 0
        else 0
    )

    recall = (
        true_fake_pred_fake /
        (true_fake_pred_real + true_fake_pred_fake)
        if (true_fake_pred_real + true_fake_pred_fake) > 0
        else 0
    )

    if precision + recall > 0:
        f1 = 2 * precision * recall / (precision + recall)
    else:
        f1 = 0

    print("\n==============================")
    print("BASELINE MODEL: best_model-v3")
    print("==============================")

    print(f"Accuracy : {accuracy * 100:.2f}%")
    print(f"Precision: {precision * 100:.2f}%")
    print(f"Recall   : {recall * 100:.2f}%")
    print(f"F1 Score : {f1 * 100:.2f}%")

    print("\nConfusion Matrix")
    print("----------------")
    print("                 Pred REAL    Pred FAKE")
    print(
        f"Actual REAL     {true_real_pred_real:10d}    "
        f"{true_real_pred_fake:10d}"
    )
    print(
        f"Actual FAKE     {true_fake_pred_real:10d}    "
        f"{true_fake_pred_fake:10d}"
    )

    print("\nInterpretation")
    print("--------------")
    print(
        f"Real images incorrectly classified as FAKE: "
        f"{true_real_pred_fake}"
    )
    print(
        f"Fake images incorrectly classified as REAL: "
        f"{true_fake_pred_real}"
    )


if __name__ == "__main__":
    evaluate()