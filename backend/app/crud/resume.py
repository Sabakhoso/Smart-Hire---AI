"""
backend/app/crud/resume.py

Database operations for the Resume entity.
Contains data-access logic only — no route handlers or business validation.
"""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.resume import Resume
from app.schemas.resume import ResumeAnalysisCreate


def create_resume_analysis(db: Session, data: ResumeAnalysisCreate) -> Resume:
    """Persist a completed resume analysis record."""
    db_resume = Resume(**data.model_dump())

    db.add(db_resume)
    db.commit()
    db.refresh(db_resume)

    return db_resume


def get_resumes_by_user(db: Session, user_id: int) -> list[Resume]:
    """Fetch all resumes belonging to a specific user, most recent first."""
    stmt = (
        select(Resume)
        .where(Resume.user_id == user_id)
        .order_by(Resume.created_at.desc())
    )
    return list(db.execute(stmt).scalars().all())


def get_resume_by_id(db: Session, resume_id: int) -> Resume | None:
    """Fetch a single resume by its ID. Returns None if not found."""
    stmt = select(Resume).where(Resume.id == resume_id)
    return db.execute(stmt).scalar_one_or_none()