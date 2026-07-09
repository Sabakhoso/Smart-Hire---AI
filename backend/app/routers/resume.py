# Resume upload routes for the AI Resume Analyzer project.


import os
import uuid

from fastapi import APIRouter, Depends, UploadFile, File, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.schemas.resume import ResumeResponse
from app.crud.resume import create_resume

router = APIRouter(prefix="/resume", tags=["Resume"])

# Directory where uploaded resumes are stored.
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Allowed file extensions for resume uploads.
ALLOWED_EXTENSIONS = {".pdf", ".docx"}


@router.post("/upload", response_model=ResumeResponse, status_code=status.HTTP_201_CREATED)
async def upload_resume(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Upload a resume file (PDF or DOCX) and persist its record for the authenticated user."""

    # Validate file extension.
    original_filename = file.filename
    _, extension = os.path.splitext(original_filename)
    extension = extension.lower()

    if extension not in ALLOWED_EXTENSIONS:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Invalid file type. Only .pdf and .docx files are allowed.",
        )

    # Generate a unique filename to avoid collisions/overwrites.
    stored_filename = f"{uuid.uuid4().hex}{extension}"
    file_path = os.path.join(UPLOAD_DIR, stored_filename)

    # Persist the uploaded file to disk.
    contents = await file.read()
    with open(file_path, "wb") as buffer:
        buffer.write(contents)

    # Create the corresponding resume record in the database.
    resume = create_resume(
        db=db,
        user_id=current_user.id,
        original_filename=original_filename,
        stored_filename=stored_filename,
        file_path=file_path,
        file_size=len(contents),
    )

    return resume
