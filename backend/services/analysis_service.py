from datetime import datetime
from mongodb import analysis_collection


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

from bson import ObjectId


def get_all_analyses():

    analyses = []

    documents = analysis_collection.find().sort("created_at", -1)

    for doc in documents:

        analyses.append({
            "analysis_id": str(doc["_id"]),
            "prediction": doc["prediction"],
            "confidence": doc["confidence"],
            "filename": doc["metadata"]["filename"],
            "report_name": doc["report_name"],
            "created_at": doc["created_at"]
        })

    return analyses

from bson import ObjectId


def get_analysis_by_id(analysis_id):

    document = analysis_collection.find_one(
        {"_id": ObjectId(analysis_id)}
    )

    if document is None:
        return None

    return {
        "analysis_id": str(document["_id"]),
        "prediction": document["prediction"],
        "confidence": document["confidence"],
        "sha256": document["sha256"],
        "metadata": document["metadata"],
        "report_name": document["report_name"],
        "created_at": document["created_at"]
    }

from bson import ObjectId


def delete_analysis(analysis_id):

    result = analysis_collection.delete_one(
        {"_id": ObjectId(analysis_id)}
    )

    return result.deleted_count