"""
Job posting model for SmartHire AI.
Each job belongs to exactly one recruiter (User).
"""

from datetime import datetime

from sqlalchemy import String, Text, DateTime, ForeignKey, JSON, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Job(Base):
    """Represents a job posting created by a recruiter."""

    __tablename__ = "jobs"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    recruiter_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )

    job_title: Mapped[str] = mapped_column(String(255), nullable=False)
    company_name: Mapped[str] = mapped_column(String(255), nullable=False)
    job_description: Mapped[str] = mapped_column(Text, nullable=False)

    # Stored as a JSON list of skill strings (e.g. ["Python", "SQL"]).
    required_skills: Mapped[list] = mapped_column(JSON, nullable=False)

    employment_type: Mapped[str] = mapped_column(String(50), nullable=False)
    experience_level: Mapped[str] = mapped_column(String(50), nullable=False)
    location: Mapped[str] = mapped_column(String(255), nullable=False)

    # Optional free-text salary range (e.g. "$80,000 - $100,000").
    salary_range: Mapped[str | None] = mapped_column(String(100), nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationship back to the recruiter who created this job.
    recruiter = relationship("User", backref="jobs")