from fastapi import APIRouter, UploadFile, File
from modules.parsers import parse_pdf

router = APIRouter()

@router.post("/upload-statement/")
async def upload_statement(file: UploadFile = File(...)):

    file_bytes = await file.read()

    df, detected_type, full_text = parse_pdf(file_bytes)

    return {
        "detected_type": detected_type,
        "total_transactions": len(df),
        "transactions": df.to_dict(orient="records")
    }