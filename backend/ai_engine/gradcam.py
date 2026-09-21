import torch
import numpy as np
from PIL import Image
import cv2

from .model_loader import load_model
from .preprocess import transform
from .config import CLASS_NAMES, DEVICE


class GradCAM:

    def __init__(self, model, target_layer):

        self.model = model
        self.target_layer = target_layer

        self.activations = None
        self.gradients = None

        self.forward_hook = target_layer.register_forward_hook(
            self.save_activations
        )

        self.backward_hook = target_layer.register_full_backward_hook(
            self.save_gradients
        )

    def save_activations(self, module, input, output):

        self.activations = output

    def save_gradients(self, module, grad_input, grad_output):

        self.gradients = grad_output[0]

    def generate(self, input_tensor, target_class):

        self.model.zero_grad()

        outputs = self.model(input_tensor)

        target = outputs[0, target_class]

        target.backward()

        gradients = self.gradients[0]
        activations = self.activations[0]

        # Global average pooling of gradients
        weights = gradients.mean(
            dim=(1, 2),
            keepdim=True
        )

        # Weighted combination of feature maps
        cam = (weights * activations).sum(dim=0)

        # Remove negative values
        cam = torch.relu(cam)

        # Normalize between 0 and 1
        cam -= cam.min()

        if cam.max() != 0:
            cam /= cam.max()

        return cam.detach().cpu().numpy()

    def remove_hooks(self):

        self.forward_hook.remove()
        self.backward_hook.remove()


def create_overlay(original_image, heatmap):

    # Convert heatmap from 0-1 to 0-255
    heatmap = np.uint8(255 * heatmap)

    # Resize heatmap to original image dimensions
    heatmap = cv2.resize(
        heatmap,
        (
            original_image.width,
            original_image.height
        )
    )

    # Apply a color map
    colored_heatmap = cv2.applyColorMap(
        heatmap,
        cv2.COLORMAP_JET
    )

    # Convert PIL image to OpenCV format
    original_array = np.array(original_image)

    # RGB -> BGR
    original_bgr = cv2.cvtColor(
        original_array,
        cv2.COLOR_RGB2BGR
    )

    # Blend original image and heatmap
    overlay = cv2.addWeighted(
        original_bgr,
        0.55,
        colored_heatmap,
        0.45,
        0
    )

    # BGR -> RGB
    overlay = cv2.cvtColor(
        overlay,
        cv2.COLOR_BGR2RGB
    )

    return Image.fromarray(overlay)


def generate_gradcam(image_path):

    model = load_model()

    # Last convolutional feature layer of EfficientNet-B0
    target_layer = model.features[-1]

    gradcam = GradCAM(
        model,
        target_layer
    )

    original_image = Image.open(
        image_path
    ).convert("RGB")

    input_tensor = (
        transform(original_image)
        .unsqueeze(0)
        .to(DEVICE)
    )

    try:

        with torch.enable_grad():

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

            heatmap = gradcam.generate(
                input_tensor,
                predicted_class
            )

        overlay = create_overlay(
            original_image,
            heatmap
        )

        return {
            "prediction": CLASS_NAMES[predicted_class],
            "confidence": round(
                confidence.item() * 100,
                2
            ),
            "heatmap": overlay
        }

    finally:

        gradcam.remove_hooks()