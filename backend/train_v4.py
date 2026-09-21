import torch
from pathlib import Path
from torch import nn, optim
from torch.utils.data import DataLoader
from torchvision import transforms
from torchvision.datasets import ImageFolder
from torchvision.models import efficientnet_b0

# =========================
# CONFIGURATION
# =========================

TRAIN_DIR = Path(
    r"C:\Users\shivani\Datasets\deepvision_subset\train"
)

VALID_DIR = Path(
    r"C:\Users\shivani\Datasets\deepvision_subset\valid"
)

V3_MODEL = Path(
    r"C:\Users\shivani\Projects\DeepVision-AI-Media-Authenticity-Analysis-Platform\backend\ai_engine\weights\best_model-v3.pt"
)

V4_MODEL = Path(
    r"C:\Users\shivani\Projects\DeepVision-AI-Media-Authenticity-Analysis-Platform\backend\ai_engine\weights\best_model-v4.pt"
)

IMAGE_SIZE = 224
BATCH_SIZE = 16
EPOCHS = 5
LEARNING_RATE = 1e-5

DEVICE = torch.device("cpu")

# =========================
# TRANSFORMS
# =========================

train_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.RandomHorizontalFlip(),
    transforms.ColorJitter(
        brightness=0.15,
        contrast=0.15,
        saturation=0.15
    ),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

valid_transform = transforms.Compose([
    transforms.Resize((IMAGE_SIZE, IMAGE_SIZE)),
    transforms.ToTensor(),
    transforms.Normalize(
        [0.485, 0.456, 0.406],
        [0.229, 0.224, 0.225]
    )
])

# =========================
# DATASET
# =========================

print("Loading datasets...")

train_dataset = ImageFolder(
    TRAIN_DIR,
    transform=train_transform
)

valid_dataset = ImageFolder(
    VALID_DIR,
    transform=valid_transform
)

print("Dataset classes:", train_dataset.class_to_idx)
print("Training images:", len(train_dataset))
print("Validation images:", len(valid_dataset))

train_loader = DataLoader(
    train_dataset,
    batch_size=BATCH_SIZE,
    shuffle=True,
    num_workers=0
)

valid_loader = DataLoader(
    valid_dataset,
    batch_size=BATCH_SIZE,
    shuffle=False,
    num_workers=0
)

# =========================
# MODEL
# =========================

print("\nLoading EfficientNet-B0...")

model = efficientnet_b0(weights=None)

model.classifier = nn.Sequential(
    nn.Dropout(0.4),
    nn.Linear(
        model.classifier[1].in_features,
        2
    )
)

print("Loading previous v3 weights...")

state_dict = torch.load(
    V3_MODEL,
    map_location=DEVICE
)

model.load_state_dict(state_dict)

model.to(DEVICE)

print("v3 model loaded successfully.")

# =========================
# LOSS + OPTIMIZER
# =========================

criterion = nn.CrossEntropyLoss()

optimizer = optim.AdamW(
    model.parameters(),
    lr=LEARNING_RATE,
    weight_decay=1e-4
)

# =========================
# TRAINING
# =========================

best_val_loss = float("inf")

print("\nStarting fine-tuning...")
print("Device:", DEVICE)
print("Epochs:", EPOCHS)
print("Batch size:", BATCH_SIZE)
print("Learning rate:", LEARNING_RATE)

for epoch in range(EPOCHS):

    # ---------------------
    # TRAIN
    # ---------------------

    model.train()

    train_loss = 0.0
    train_correct = 0
    train_total = 0

    for images, labels in train_loader:
        if train_total % (BATCH_SIZE * 10) == 0:
            print(
                f"Training progress: "
                f"{train_total}/{len(train_dataset)} images",
                flush=True
        )

        # ImageFolder:
        # fake = 0
        # real = 1
        #
        # Our model:
        # real = 0
        # fake = 1
        #
        # Therefore reverse the labels.

        labels = 1 - labels

        images = images.to(DEVICE)
        labels = labels.to(DEVICE)

        optimizer.zero_grad()

        outputs = model(images)

        loss = criterion(outputs, labels)

        loss.backward()

        optimizer.step()

        train_loss += loss.item() * images.size(0)

        predictions = torch.argmax(outputs, dim=1)

        train_correct += (
            predictions == labels
        ).sum().item()

        train_total += labels.size(0)

    train_loss /= train_total
    train_accuracy = train_correct / train_total

    # ---------------------
    # VALIDATION
    # ---------------------

    model.eval()

    val_loss = 0.0
    val_correct = 0
    val_total = 0

    with torch.no_grad():

        for images, labels in valid_loader:

            labels = 1 - labels

            images = images.to(DEVICE)
            labels = labels.to(DEVICE)

            outputs = model(images)

            loss = criterion(outputs, labels)

            val_loss += loss.item() * images.size(0)

            predictions = torch.argmax(
                outputs,
                dim=1
            )

            val_correct += (
                predictions == labels
            ).sum().item()

            val_total += labels.size(0)

    val_loss /= val_total
    val_accuracy = val_correct / val_total

    print("\n------------------------------")
    print(f"Epoch {epoch + 1}/{EPOCHS}")
    print("------------------------------")
    print(f"Train Loss     : {train_loss:.4f}")
    print(f"Train Accuracy : {train_accuracy * 100:.2f}%")
    print(f"Val Loss       : {val_loss:.4f}")
    print(f"Val Accuracy   : {val_accuracy * 100:.2f}%")

    # ---------------------
    # SAVE BEST MODEL
    # ---------------------

    if val_loss < best_val_loss:

        best_val_loss = val_loss

        torch.save(
            model.state_dict(),
            V4_MODEL
        )

        print("✅ New best model saved:")
        print(V4_MODEL)

print("\n==============================")
print("FINE-TUNING COMPLETE")
print("==============================")
print("Best model:", V4_MODEL)