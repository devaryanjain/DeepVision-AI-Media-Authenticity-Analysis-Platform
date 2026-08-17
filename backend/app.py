from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from routes.prediction import router as prediction_router
from routes.history import router as history_router
from routes.dashboard import router as dashboard_router

app = FastAPI(
    title="DeepVision AI",
    description="Media Authenticity Analysis Platform",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve generated PDF reports
app.mount("/reports", StaticFiles(directory="../reports"), name="reports")

@app.get("/")
def home():
    return {
        "message": "Welcome to DeepVision AI Backend"
    }

app.include_router(prediction_router)
app.include_router(history_router)
app.include_router(dashboard_router)