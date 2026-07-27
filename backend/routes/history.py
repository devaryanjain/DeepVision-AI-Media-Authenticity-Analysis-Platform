from fastapi import APIRouter, HTTPException

from services.analysis_service import (
    get_all_analyses,
    get_analysis_by_id
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