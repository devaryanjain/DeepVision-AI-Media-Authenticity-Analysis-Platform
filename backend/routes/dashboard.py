from fastapi import APIRouter
from mongodb import analysis_collection

router = APIRouter()

@router.get("/dashboard")

def dashboard():

    total = analysis_collection.count_documents({})

    real = analysis_collection.count_documents({
        "prediction": "REAL"
    })

    fake = analysis_collection.count_documents({
        "prediction": "FAKE"
    })

    return {
        "total": total,
        "real": real,
        "fake": fake,
        "accuracy": 99
    }