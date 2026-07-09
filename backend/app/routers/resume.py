"""
backend/app/routers/resume.py

Resume upload and AI analysis routes for SmartHire AI.
"""

import os
import uuid

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.resume import ResumeResponse
from app.crud.resume import create_resume
from app.parser.resume_parser import extract_resume_text
from app.services.resume_analyzer import analyze_resume

router = APIRouter(prefix="/resume", tags=["Resume"])

# Directory where uploaded resumes are stored.
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Allowed file extensions for the general upload endpoint.
ALLOWED_EXTENSIONS = {".pdf", ".docx"}


async def _save_upload_file(file: UploadFile, allowed_extensions: set[str]) -> tuple[str, str, str, bytes]:
    """
    Validate and persist an uploaded file to disk.

    Returns (original_filename, stored_filename, file_path, contents).
    Raises HTTPException(400) for disallowed file types.
    """
    original_filename = file.filename
    _, extension = os.path.splitext(original_filename)
    extension = extension.lower()

    if extension not in allowed_extensions:
        allowed = ", ".join(sorted(allowed_extensions))
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Invalid file type. Only {allowed} files are allowed.",
        )

    stored_filename = f"{uuid.uuid4().hex}{extension}"
    file_path = os.path.join(UPLOAD_DIR, stored_filename)

    contents = await file.read()
    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    return original_filename, stored_filename, file_path, contents


@router.post("/upload", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Upload a resume file (PDF or DOCX) and persist its record for the authenticated user."""
    original_filename, stored_filename, file_path, contents = await _save_upload_file(
        file, ALLOWED_EXTENSIONS
    )

    resume = create_resume(
        db=db,
        user_id=current_user.id,
        original_filename=original_filename,
        stored_filename=stored_filename,
        file_path=file_path,
        file_size=len(contents),
    )

    return resume


@router.post("/analyze", status_code=status.HTTP_200_OK)
async def analyze_resume_endpoint(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
):
    """
    Upload a PDF resume and run the full AI analysis pipeline:
    save file -> extract text -> analyze with Gemini -> return structured insights.
    """
    # Step 1: Save the uploaded file (PDF only for this endpoint).
    _, _, file_path, _ = await _save_upload_file(file, {".pdf"})

    # Step 2: Extract text from the saved file.
    try:
        resume_text = extract_resume_text(file_path)
    except ValueError as exc:
        # Raised by the parser for unsupported file types (defensive; already filtered above).
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(exc),
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to extract text from resume: {exc}",
        ) from exc

    if not resume_text or not resume_text.strip():
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail="No readable text could be extracted from the uploaded resume.",
        )

    # Step 3: Run AI analysis on the extracted text.
    try:
        analysis = analyze_resume(resume_text)
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(exc),
        ) from exc
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Resume analysis failed: {exc}",
        ) from exc
    except Exception as exc:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error during resume analysis: {exc}",
        ) from exc

    return {
        "message": "Resume analyzed successfully.",
        "analysis": analysis,
    }