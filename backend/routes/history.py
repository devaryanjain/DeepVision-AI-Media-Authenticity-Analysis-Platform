from fastapi import APIRouter, HTTPException

from services.analysis_service import (
    get_all_analyses,
    get_analysis_by_id,
    delete_analysis
)

router = APIRouter(tags=["History"])


@router.get("/history")
def get_history():
    return get_all_analyses()


@router.get("/history/{analysis_id}")
def get_analysis(analysis_id: str):

    analysis = get_analysis_by_id(analysis_id)

    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found."
        )

    return analysis


@router.delete("/history/{analysis_id}")
def delete_analysis_route(analysis_id: str):

    deleted = delete_analysis(analysis_id)

    if deleted == 0:
        raise HTTPException(
            status_code=404,
            detail="Analysis not found."
        )

    return {
        "message": "Analysis deleted successfully."
    }