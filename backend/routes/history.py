from fastapi import APIRouter
from services.analysis_service import get_all_analyses

router = APIRouter()


@router.get("/history")
def history():

    analyses = get_all_analyses()

    return analyses