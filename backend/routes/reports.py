from fastapi import APIRouter, HTTPException
from fastapi.responses import FileResponse
import os

router = APIRouter(tags=["Reports"])


@router.get("/reports/{report_name}")
def download_report(report_name: str):

    report_path = os.path.join(
        "..",
        "reports",
        report_name
    )

    if not os.path.exists(report_path):
        raise HTTPException(
            status_code=404,
            detail="Report not found."
        )

    return FileResponse(
        path=report_path,
        filename=report_name,
        media_type="application/pdf"
    )