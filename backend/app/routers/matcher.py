"""
Candidate-to-job matching routes for SmartHire AI.
Delegates all AI logic to app.services.matcher; this router only handles
request/response wiring and database lookups.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from pydantic import BaseModel
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import get_current_user
from app.models.user import User
from app.crud.resume import get_resume_by_id
from app.crud.job import get_job_by_id
from app.services.matcher import match_resume_to_job

router = APIRouter(prefix="/matcher", tags=["Matcher"])


class MatchRequest(BaseModel):
    """Request payload identifying which resume and job to compare."""

    resume_id: int
    job_id: int


@router.post("/analyze", status_code=status.HTTP_200_OK)
def analyze_match(
    request: MatchRequest,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    """Compare a resume against a job posting and return an AI-generated match analysis."""

    # Fetch the resume and verify it belongs to the requesting user.
    resume = get_resume_by_id(db, request.resume_id)
    if resume is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Resume not found.",
        )

    if resume.user_id != current_user.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this resume.",
        )

    # Fetch the job posting.
    job = get_job_by_id(db, request.job_id)
    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found.",
        )

    # Run the AI match analysis.
    try:
        match_result = match_resume_to_job(
            resume_text=resume.extracted_text,
            job_description=job.job_description,
        )
    except ValueError as exc:
        raise HTTPException(
            status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
            detail=str(exc),
        ) from exc
    except RuntimeError as exc:
        raise HTTPException(
            status_code=status.HTTP_502_BAD_GATEWAY,
            detail=f"Match analysis failed: {exc}",
        ) from exc

    return {
        "message": "Match analysis completed successfully.",
        "resume_id": resume.id,
        "job_id": job.id,
        "match_result": match_result,
    }