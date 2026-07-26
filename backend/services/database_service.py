from datetime import datetime
from database import analysis_collection


def save_analysis(result):

    document = {
        "prediction": result["prediction"],
        "confidence": result["confidence"],
        "sha256": result["sha256"],
        "metadata": result["metadata"],
        "report_name": result["report_name"],
        "created_at": datetime.utcnow(),
    }

    inserted = analysis_collection.insert_one(document)

    return str(inserted.inserted_id)