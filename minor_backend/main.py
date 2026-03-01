from fastapi import FastAPI
from routers.upload import router as upload_router

app = FastAPI(title="Financial Statement Analyzer")

app.include_router(upload_router)

@app.get("/")
def home():
    return {"message": "Backend running successfully"}