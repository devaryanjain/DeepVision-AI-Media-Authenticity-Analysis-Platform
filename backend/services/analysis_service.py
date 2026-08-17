from datetime import datetime

from bson import ObjectId
from bson.errors import InvalidId

from mongodb import analysis_collection


def save_analysis(result):
    """
    Save a completed analysis to MongoDB Atlas.
    """

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


def get_all_analyses():
    """
    Return all analyses for the History page.
    Newest analyses appear first.
    """

    analyses = []

    documents = (
        analysis_collection
        .find()
        .sort("created_at", -1)
    )

    for doc in documents:

        analyses.append({
            "analysis_id": str(doc["_id"]),
            "prediction": doc["prediction"],
            "confidence": doc["confidence"],
            "filename": doc["metadata"].get("filename", "Unknown"),
            "report_name": doc.get("report_name"),
            "created_at": doc.get("created_at"),
        })

    return analyses


def get_analysis_by_id(analysis_id):
    """
    Return complete analysis information by MongoDB ID.
    """

    try:
        object_id = ObjectId(analysis_id)

    except (InvalidId, TypeError):
        return None

    document = analysis_collection.find_one(
        {"_id": object_id}
    )

    if document is None:
        return None

    return {
        "analysis_id": str(document["_id"]),
        "prediction": document["prediction"],
        "confidence": document["confidence"],
        "sha256": document["sha256"],
        "metadata": document["metadata"],
        "report_name": document.get("report_name"),
        "created_at": document.get("created_at"),
    }


def delete_analysis(analysis_id):
    """
    Delete an analysis from MongoDB by ID.
    """

    try:
        object_id = ObjectId(analysis_id)

    except (InvalidId, TypeError):
        return 0

    result = analysis_collection.delete_one(
        {"_id": object_id}
    )

    return result.deleted_count