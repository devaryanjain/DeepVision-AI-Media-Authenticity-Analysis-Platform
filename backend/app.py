from fastapi import FastAPI

from routes.prediction import router as prediction_router
from routes.history import router as history_router   # <-- Add this

app = FastAPI(
    title="DeepVision AI",
    description="Media Authenticity Analysis Platform",
    version="1.0"
)

@app.get("/")
def home():
    return {
        "message": "Welcome to DeepVision AI Backend"
    }

app.include_router(prediction_router)
app.include_router(history_router)   # <-- Add this