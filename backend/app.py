from fastapi import FastAPI

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