"""
Database operations for the Job entity.
Contains data-access logic only — no route handlers or business validation.
"""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.job import Job
from app.schemas.job import JobCreate, JobUpdate


def create_job(db: Session, recruiter_id: int, job_create: JobCreate) -> Job:
    """Persist a new job posting for a recruiter."""
    db_job = Job(recruiter_id=recruiter_id, **job_create.model_dump())

    db.add(db_job)
    db.commit()
    db.refresh(db_job)

    return db_job


def get_jobs_by_recruiter(db: Session, recruiter_id: int) -> list[Job]:
    """Fetch all jobs created by a specific recruiter, most recent first."""
    stmt = (
        select(Job)
        .where(Job.recruiter_id == recruiter_id)
        .order_by(Job.created_at.desc())
    )
    return list(db.execute(stmt).scalars().all())


def get_job_by_id(db: Session, job_id: int) -> Job | None:
    """Fetch a single job by its ID. Returns None if not found."""
    stmt = select(Job).where(Job.id == job_id)
    return db.execute(stmt).scalar_one_or_none()


def update_job(db: Session, job: Job, job_update: JobUpdate) -> Job:
    """Apply partial updates to an existing job and persist the changes."""
    update_data = job_update.model_dump(exclude_unset=True)

    for field, value in update_data.items():
        setattr(job, field, value)

    db.commit()
    db.refresh(job)

    return job


def delete_job(db: Session, job: Job) -> None:
    """Delete a job posting."""
    db.delete(job)
    db.commit()