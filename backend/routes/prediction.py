from fastapi import APIRouter, UploadFile, File
import shutil
import os
from services.pdf_service import generate_report
from services.image_service import predict_image
from services.database_service import save_analysis
router = APIRouter()

UPLOAD_FOLDER = "../uploads"

os.makedirs(UPLOAD_FOLDER, exist_ok=True)


@router.post("/predict")
async def predict(file: UploadFile = File(...)):

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)

    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    result = predict_image(file_path)

    report_name = os.path.splitext(file.filename)[0] + "_report.pdf"

    report_path = os.path.join("..", "reports", report_name)

    generate_report(result, report_path)
    
    result["report_name"] = report_name

    analysis_id = save_analysis(result)

    result["analysis_id"] = analysis_id

    analysis_id = save_analysis(result)

    return result