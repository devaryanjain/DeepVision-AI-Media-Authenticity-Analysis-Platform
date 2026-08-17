from fastapi import APIRouter, UploadFile, File
import shutil
import os

from services.pdf_service import generate_report
from services.image_service import predict_image
from services.analysis_service import save_analysis

router = APIRouter()

UPLOAD_FOLDER = "../uploads"
REPORT_FOLDER = "../reports"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)
os.makedirs(REPORT_FOLDER, exist_ok=True)


@router.post("/predict")
async def predict(file: UploadFile = File(...)):

    # Save uploaded image
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # Run AI prediction
    result = predict_image(file_path)

    # Generate PDF report
    report_name = (
        os.path.splitext(file.filename)[0]
        + "_report.pdf"
    )

    report_path = os.path.join(
        REPORT_FOLDER,
        report_name
    )

    generate_report(result, report_path)

    # Add report information to result
    result["report_name"] = report_name

    # Save analysis ONCE to MongoDB
    analysis_id = save_analysis(result)

    # Return MongoDB analysis ID to frontend
    result["analysis_id"] = analysis_id

    return result