# DeepVision AI — Media Authenticity Analysis Platform

> An AI-powered media authenticity analysis platform that classifies images as **REAL** or **FAKE** and provides supporting forensic information including confidence score, Grad-CAM visualization, image metadata, SHA-256 verification, downloadable PDF reports, and analysis history.

---

##  Overview

DeepVision AI is an end-to-end AI-based media authenticity analysis platform designed to analyze digital images and determine whether they are **real or fake** using a deep-learning image classification model.

The system uses **EfficientNet-B0** as the deep-learning backbone and fine-tunes it for binary REAL/FAKE image classification.

Unlike a system that only provides a classification result, DeepVision AI combines AI prediction with additional forensic and explainability features.

The platform provides:

- REAL / FAKE classification
- Prediction confidence
- Grad-CAM visual explanation
- Image metadata extraction
- SHA-256 cryptographic fingerprint
- Automated PDF forensic report
- MongoDB analysis history
- REST API using FastAPI
- React-based web interface

---

#  Project Objectives

The main objectives of DeepVision AI are:

1. Detect whether an input image is REAL or FAKE.
2. Use EfficientNet-B0 for deep-learning-based image classification.
3. Fine-tune the pretrained model using a real/fake face dataset.
4. Provide a confidence score for every prediction.
5. Explain the model's prediction using Grad-CAM.
6. Extract available image metadata for additional forensic information.
7. Generate a SHA-256 hash for file verification.
8. Generate a downloadable PDF analysis report.
9. Store analysis results in MongoDB.
10. Provide a complete web-based interface for media authenticity analysis.

---

#  Dataset

DeepVision AI uses the **140k Real and Fake Faces** dataset from Kaggle as the source dataset for training and evaluation.

### Dataset Information

| Property | Details |
|---|---|
| Dataset | 140k Real and Fake Faces |
| Source | Kaggle |
| Creator | xhlulu |
| Total Images | 140,000 |
| Real Images | 70,000 |
| Fake Images | 70,000 |

The dataset contains real human face images and fake/generated face images and provides a binary classification problem for REAL versus FAKE images.

### Dataset Source

[Kaggle — 140k Real and Fake Faces](https://www.kaggle.com/datasets/xhlulu/140k-real-and-fake-faces?resource=download)

### Dataset Structure

The images used by the classification pipeline are organized into two classes:

```text
dataset/
├── real/
└── fake/
Deep Learning Model
EfficientNet-B0

DeepVision AI uses EfficientNet-B0 as the backbone of its image authenticity classifier.

EfficientNet is a convolutional neural network architecture designed to provide an effective balance between:

Classification performance
Computational efficiency
Model size
Feature representation

EfficientNet-B0 is used to extract visual features from the input image, which are then passed to the classification layer responsible for determining whether the image belongs to the REAL or FAKE class.

Model Pipeline

Input Image
      ↓
Image Preprocessing
      ↓
EfficientNet-B0
      ↓
Feature Extraction
      ↓
Classification Layer
      ↓
REAL / FAKE
      ↓
Confidence Score

Model Fine-Tuning

The pretrained EfficientNet-B0 model is fine-tuned for the project's binary image authenticity classification task.

The V4 training pipeline includes:

Dataset loading
Image preprocessing
Training/validation processing
EfficientNet-B0 initialization
Fine-tuning
Loss calculation
Accuracy calculation
Validation evaluation
Best-model checkpointing

The best V4 model is stored at:

backend/ai_engine/weights/best_model-v4.pt

The trained model is tracked using Git LFS because of its binary size.

V4 Training Results

During V4 fine-tuning, the final recorded epoch produced:

Train Loss     : 0.4607
Train Accuracy : 78.49%

Val Loss       : 0.4228
Val Accuracy   : 80.90%

The best model checkpoint was saved as:

backend/ai_engine/weights/best_model-v4.pt

V4 Model Evaluation

The V4 model was evaluated on a test set containing:

Test Images: 2000

The recorded results were:

Metric	Result
Accuracy	80.25%
Precision	77.83%
Recall	84.60%
F1 Score	81.07%
Confusion Matrix
                 Pred REAL    Pred FAKE
Actual REAL          759         241
Actual FAKE          154         846
Error Analysis
Real images incorrectly classified as FAKE: 241
Fake images incorrectly classified as REAL: 154

These results represent the performance of the current V4 model on the 2,000-image test set used during development.

 Explainable AI — Grad-CAM

DeepVision AI integrates Grad-CAM (Gradient-weighted Class Activation Mapping) to provide a visual explanation of the model's prediction.

A normal classifier may provide:

Prediction: REAL
Confidence: 87.78%

Grad-CAM adds a visual explanation showing the regions of the image that contributed strongly to the model's classification.

Grad-CAM Pipeline
Input Image
      ↓
EfficientNet-B0
      ↓
Forward Pass
      ↓
Target Class
      ↓
Gradient Calculation
      ↓
Activation Map
      ↓
Grad-CAM Heatmap
      ↓
Overlay on Original Image

The generated visualization helps provide interpretability for the model's decision.

Important

Grad-CAM highlights regions that influenced the model's prediction. It should not be interpreted as definitive proof that a particular region is manipulated.

 Image Metadata Analysis

DeepVision AI extracts available technical metadata from uploaded images.

The system can extract information such as:

Filename
File size
Image format
Width
Height
Color mode
Camera manufacturer
Camera model
Software
Capture date

Example:

{
    "filename": "SGpassphotojpg.jpg",
    "file_size_kb": 34.51,
    "format": "JPEG",
    "width": 704,
    "height": 900,
    "color_mode": "RGB",
    "camera_make": null,
    "camera_model": null,
    "software": null,
    "capture_date": null
}

Metadata availability depends on the information contained in the original image.

 SHA-256 Verification

Every uploaded image is processed using SHA-256 hashing.

Example:

1df1b79b755e3cda3d9d5c3344cc8b385baf91c575197e17fcd1788dac5de924

The SHA-256 hash acts as a cryptographic fingerprint of the uploaded file.

It can be used to identify whether the exact file has changed.

Important

SHA-256 does not determine whether an image is REAL or FAKE.

It provides file identification and integrity information that complements the AI analysis.

 Automated PDF Forensic Report

After an image is analyzed, DeepVision AI generates a PDF report containing the analysis information.

The report can include:

Prediction
Confidence
Image information
Metadata
SHA-256 hash
Analysis information

Example:

SGpassphotojpg_report.pdf

The generated reports are served through the backend and can be accessed through the frontend.

 MongoDB Analysis History

DeepVision AI stores analysis results in MongoDB.

An analysis record can contain:

Analysis ID
Prediction
Confidence
SHA-256
Metadata
Report information
Timestamp

Example:

6ab199ee5a24ae4233ff092d

This allows previously performed analyses to be retained and accessed through the application's history functionality.

⚙️ System Architecture
                         ┌─────────────────────┐
                         │     User Image      │
                         └──────────┬──────────┘
                                    │
                                    ▼
                         ┌─────────────────────┐
                         │   React Frontend    │
                         │       + Vite        │
                         └──────────┬──────────┘
                                    │
                                    │ REST API
                                    ▼
                         ┌─────────────────────┐
                         │   FastAPI Backend   │
                         └──────────┬──────────┘
                                    │
                ┌───────────────────┼───────────────────┐
                │                   │                   │
                ▼                   ▼                   ▼
        ┌──────────────┐    ┌──────────────┐    ┌──────────────┐
        │   AI Engine  │    │   Metadata   │    │   SHA-256    │
        │              │    │   Extraction │    │   Hashing    │
        └──────┬───────┘    └──────────────┘    └──────────────┘
               │
               ▼
        ┌─────────────────┐
        │  EfficientNet-B0│
        │  Fine-tuned V4  │
        └────────┬────────┘
                 │
                 ▼
            REAL / FAKE
                 │
                 ├──────────────► Confidence
                 │
                 └──────────────► Grad-CAM
                                      │
                                      ▼
                              Explainability Map

                 ┌─────────────────────────┐
                 │     PDF Report          │
                 └─────────────────────────┘

                 ┌─────────────────────────┐
                 │       MongoDB           │
                 │   Analysis History      │
                 └─────────────────────────┘
 Complete Analysis Pipeline

When a user uploads an image:

1. User uploads image
          ↓
2. FastAPI receives image
          ↓
3. Image is saved for processing
          ↓
4. EfficientNet-B0 performs prediction
          ↓
5. REAL / FAKE classification generated
          ↓
6. Confidence score generated
          ↓
7. SHA-256 hash generated
          ↓
8. Image metadata extracted
          ↓
9. Grad-CAM explanation generated
          ↓
10. PDF report generated
          ↓
11. Analysis stored in MongoDB
          ↓
12. Result returned to React frontend
          ↓
13. Complete analysis displayed to user

Technology Stack
Frontend
React
Vite
JavaScript
Tailwind CSS
React Router
Backend
Python
FastAPI
Uvicorn
REST API
Artificial Intelligence
PyTorch
Torchvision
EfficientNet-B0
Grad-CAM
Image Processing
OpenCV
Pillow
Database
MongoDB
Digital Forensics
SHA-256
Image metadata extraction
Reporting
PDF report generation
Version Control
Git
GitHub
Git LFS

📁 Project Structure
DeepVision-AI-Media-Authenticity-Analysis-Platform/
│
├── backend/
│   │
│   ├── ai_engine/
│   │   ├── weights/
│   │   │   └── best_model-v4.pt
│   │   │
│   │   ├── config.py
│   │   ├── predictor.py
│   │   └── gradcam.py
│   │
│   ├── routes/
│   │   ├── prediction.py
│   │   ├── history.py
│   │   └── dashboard.py
│   │
│   ├── services/
│   │   ├── image_service.py
│   │   ├── analysis_service.py
│   │   ├── hash_service.py
│   │   ├── metadata_service.py
│   │   └── pdf_service.py
│   │
│   ├── train_v4.py
│   ├── evaluate_model.py
│   ├── evaluate_v4.py
│   ├── test_v4_image.py
│   ├── app.py
│   └── requirements.txt
│
├── frontend/
│   │
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   │
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── .gitattributes
├── .gitignore
└── README.md
🚀 Installation
1. Clone the Repository
git clone https://github.com/devaryanjain/DeepVision-AI-Media-Authenticity-Analysis-Platform.git

Enter the project directory:

cd DeepVision-AI-Media-Authenticity-Analysis-Platform
🐍 Backend Setup

Enter the backend:

cd backend

Create a virtual environment:

python -m venv venv

Activate the environment on Windows:

venv\Scripts\activate

Install dependencies:

pip install -r requirements.txt

If OpenCV is not already included:

pip install opencv-python
 MongoDB Configuration

The backend uses MongoDB to store analysis history.

Configure the MongoDB connection using the project's configuration/environment setup.

Example:

MONGO_URI=your_mongodb_connection_string

Do not commit credentials, API keys, or other secrets to GitHub.

 Running the Backend

From the backend directory:

uvicorn app:app --reload

The backend will normally be available at:

http://127.0.0.1:8000

Test the root endpoint:

http://127.0.0.1:8000/

Expected response:

{
    "message": "Welcome to DeepVision AI Backend"
}
 FastAPI Documentation

FastAPI automatically provides interactive API documentation.

Open:

http://127.0.0.1:8000/docs

The main prediction endpoint is:

POST /predict

It accepts an image upload and returns the analysis result.

 Frontend Setup

Open another terminal.

Navigate to the frontend:

cd frontend

Install dependencies:

npm install

Run the development server:

npm run dev

The frontend will normally be available at:

http://localhost:5173
 Production Frontend Build

To create a production build:

npm run build

The generated production files are placed in:

frontend/dist/
 Testing the AI Model
Test a Single Image

From the backend directory:

python test_v4_image.py

Example:

==============================
V4 IMAGE TEST
==============================
Image      : SGpassphotojpg.jpg
Prediction : REAL
Confidence : 87.78%
==============================
 Evaluate the V4 Model

Run:

python evaluate_v4.py

This evaluates the V4 model and reports:

Accuracy
Precision
Recall
F1 Score
Confusion Matrix
 Train / Fine-Tune V4

The V4 training script is:

python train_v4.py

The best checkpoint is saved at:

backend/ai_engine/weights/best_model-v4.pt
 Grad-CAM Testing

Grad-CAM can be generated using:

from ai_engine.gradcam import generate_gradcam

result = generate_gradcam("path/to/image.jpg")

print("Prediction:", result["prediction"])
print("Confidence:", result["confidence"])

The generated heatmap can be saved and displayed alongside the original image.

 API Example

The prediction API can be tested using:

curl.exe -X POST "http://127.0.0.1:8000/predict" -F "file=@path/to/image.jpg"

Example response:

{
    "prediction": "REAL",
    "confidence": 87.78,
    "sha256": "1df1b79b755e3cda3d9d5c3344cc8b385baf91c575197e17fcd1788dac5de924",
    "metadata": {
        "filename": "SGpassphotojpg.jpg",
        "file_size_kb": 34.51,
        "format": "JPEG",
        "width": 704,
        "height": 900,
        "color_mode": "RGB",
        "camera_make": null,
        "camera_model": null,
        "software": null,
        "capture_date": null
    },
    "gradcam_name": "SGpassphotojpg_gradcam.png",
    "gradcam_url": "/uploads/gradcam/SGpassphotojpg_gradcam.png",
    "report_name": "SGpassphotojpg_report.pdf",
    "analysis_id": "6ab199ee5a24ae4233ff092d"
}
 Key Features
1. AI-Based Authenticity Classification

The fine-tuned EfficientNet-B0 model classifies an uploaded image as:

REAL

or:

FAKE
2. Confidence Score

The system returns a confidence value associated with the prediction.

Example:

REAL
87.78%
3. Explainable AI

Grad-CAM provides a visual representation of image regions that influenced the model's prediction.

This adds an explainability layer to the classification system.

4. Digital Forensic Metadata

The system extracts available technical information from the image.

5. Cryptographic Verification

SHA-256 generates a cryptographic fingerprint for the uploaded file.

6. Automated Forensic Reporting

The system generates a downloadable PDF report after analysis.

7. Persistent Analysis History

MongoDB stores analysis results for later access.

8. Full-Stack Integration

The project integrates:

React
   ↓
FastAPI
   ↓
EfficientNet-B0 AI Engine
   ↓
Forensic Analysis
   ↓
MongoDB
 Project Contribution

DeepVision AI combines several analysis layers into a single media authenticity workflow.

1. AI Classification

EfficientNet-B0 performs the core REAL/FAKE image classification.

2. Fine-Tuning

The pretrained EfficientNet-B0 architecture is fine-tuned using the real/fake face dataset.

3. Explainability

Grad-CAM provides a visual explanation of the model's decision.

4. Digital Forensics

Metadata extraction and SHA-256 hashing provide additional file-level forensic information.

5. Automated Reporting

The system combines the analysis into a downloadable PDF report.

6. Persistent Investigation History

MongoDB stores analysis records for later review.

The resulting workflow combines:

AI Classification
        +
Explainable AI
        +
Digital Forensics
        +
Automated Reporting
        +
Persistent Storage
🔬 Why EfficientNet-B0?

EfficientNet-B0 was selected as the backbone because it provides a practical balance between model complexity and computational requirements.

In DeepVision AI, EfficientNet-B0 is responsible for learning visual patterns from the input image that can help distinguish between real and fake facial images.

The model acts as the core AI component:

Image
  ↓
EfficientNet-B0
  ↓
Learned Visual Features
  ↓
Classifier
  ↓
REAL / FAKE

Grad-CAM then uses the model's internal activations and gradients to create an interpretable visualization.

 Current Development Status

The current implementation includes:

 React frontend
 FastAPI backend
 EfficientNet-B0
 V4 fine-tuned model
 Kaggle 140k Real and Fake Faces dataset
 10,000-image V4 training subset
 2,000-image V4 test set
 Model evaluation
 REAL/FAKE prediction
 Confidence score
 Grad-CAM explainability
 Image metadata extraction
 SHA-256 hashing
 PDF report generation
 MongoDB analysis storage
 Analysis history
 Result page
 Git LFS model storage
 Production frontend build
 Limitations
Dataset Dependence

The model's performance depends on the characteristics and diversity of the training data.

Generalization

Performance can vary on images that differ significantly from the training dataset, including images generated by different AI models or manipulated using different techniques.

Face Images

Performance may vary depending on:

Face position
Image resolution
Lighting
Compression
Generation technique
Dataset distribution
Metadata

Many images may not contain useful EXIF metadata, particularly screenshots, processed images, compressed images, and images downloaded from online platforms.

Grad-CAM

Grad-CAM highlights areas that influenced the model's prediction. It does not independently prove that a highlighted area is manipulated.

Confidence

A high confidence score does not guarantee that a prediction is correct.

 Future Improvements

Possible future improvements include:

Larger and more diverse training datasets
Additional AI-generated image datasets
Face-specific preprocessing
Multi-model ensemble classification
Video deepfake detection
Audio deepfake detection
JPEG/compression artifact analysis
Frequency-domain analysis
Face landmark analysis
Transformer-based models
Model calibration
Threshold optimization
Improved false-positive and false-negative analysis
Cloud deployment
Authentication and user management
Real-time monitoring dashboard
 Example Workflow
Upload Image
     ↓
EfficientNet-B0 Classification
     ↓
REAL / FAKE
     ↓
Confidence Score
     ↓
Grad-CAM Explanation
     ↓
Metadata Extraction
     ↓
SHA-256 Verification
     ↓
PDF Report
     ↓
MongoDB Storage
     ↓
Result Dashboard
📷 Example Result

The web application displays:

AI ANALYSIS COMPLETE

Detection Status
REAL

Confidence
87.78%

Grad-CAM Analysis
[Heatmap Visualization]

Metadata
Filename
Format
Resolution
Color Mode
Camera Information

PDF Forensic Report
[Download Report]

SHA-256 Verification
[Cryptographic Hash]
 Security Considerations

Do not expose:

MongoDB credentials
API keys
Secret tokens
Passwords
Private configuration files
.env files

These should be stored securely and excluded from Git.

Example:

.env

should not be committed to GitHub.

 Git LFS

The trained V4 model is stored using Git Large File Storage.

Model:

backend/ai_engine/weights/best_model-v4.pt

Git LFS is used because trained model files can be significantly larger than normal source-code files.

To retrieve LFS files after cloning:

git lfs install
git lfs pull
 Development

The project is organized into separate components.

AI Engine
backend/ai_engine/

Responsible for:

EfficientNet-B0
Model loading
Prediction
Grad-CAM
Model configuration
Services
backend/services/

Responsible for:

Image processing
Metadata extraction
SHA-256 hashing
PDF generation
Analysis storage
Routes
backend/routes/

Responsible for exposing backend API endpoints.

Frontend
frontend/src/

Contains the React user interface and result visualization.

📜 License

This project is developed for educational, research, and demonstration purposes.

A suitable open-source license can be added depending on the intended distribution of the project.

⚠️ Disclaimer

DeepVision AI provides an AI-assisted estimate of image authenticity.

The output should not be treated as definitive proof that an image is authentic or manipulated.

AI-generated content detection is an evolving research problem, and model predictions can contain false positives and false negatives.

For high-stakes forensic or legal applications, the output should be combined with additional forensic evidence and expert analysis.