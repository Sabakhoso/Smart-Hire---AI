"""
Job posting routes for SmartHire AI.
Recruiter-only: create, list, retrieve, update, and delete job postings.
"""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.dependencies import require_recruiter
from app.models.user import User
from app.schemas.job import JobCreate, JobUpdate, JobResponse
from app.crud.job import (
    create_job,
    get_jobs_by_recruiter,
    get_job_by_id,
    update_job,
    delete_job,
)

router = APIRouter(prefix="/jobs", tags=["Jobs"])


def _get_owned_job_or_404(db: Session, job_id: int, recruiter: User):
    """Fetch a job by ID and verify it belongs to the requesting recruiter."""
    job = get_job_by_id(db, job_id)

    if job is None:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Job not found.",
        )

    if job.recruiter_id != recruiter.id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="You do not have access to this job.",
        )

    return job


@router.post("/", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job_endpoint(
    job_in: JobCreate,
    current_user: User = Depends(require_recruiter),
    db: Session = Depends(get_db),
):
    """Create a new job posting for the authenticated recruiter."""
    return create_job(db, recruiter_id=current_user.id, job_create=job_in)


@router.get("/", response_model=list[JobResponse], status_code=status.HTTP_200_OK)
def list_my_jobs(
    current_user: User = Depends(require_recruiter),
    db: Session = Depends(get_db),
):
    """List all jobs created by the authenticated recruiter."""
    return get_jobs_by_recruiter(db, recruiter_id=current_user.id)


@router.get("/{job_id}", response_model=JobResponse, status_code=status.HTTP_200_OK)
def get_job(
    job_id: int,
    current_user: User = Depends(require_recruiter),
    db: Session = Depends(get_db),
):
    """Retrieve a single job posting owned by the authenticated recruiter."""
    return _get_owned_job_or_404(db, job_id, current_user)


@router.put("/{job_id}", response_model=JobResponse, status_code=status.HTTP_200_OK)
def update_job_endpoint(
    job_id: int,
    job_update: JobUpdate,
    current_user: User = Depends(require_recruiter),
    db: Session = Depends(get_db),
):
    """Update a job posting owned by the authenticated recruiter."""
    job = _get_owned_job_or_404(db, job_id, current_user)
    return update_job(db, job=job, job_update=job_update)


@router.delete("/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job_endpoint(
    job_id: int,
    current_user: User = Depends(require_recruiter),
    db: Session = Depends(get_db),
):
    """Delete a job posting owned by the authenticated recruiter."""
    job = _get_owned_job_or_404(db, job_id, current_user)
    delete_job(db, job=job)
    return None