"""
backend/app/models/resume.py

Resume model for SmartHire AI.
Stores uploaded resume metadata immediately on upload; AI analysis fields
are populated later once Gemini analysis completes.
"""

from datetime import datetime

from sqlalchemy import String, Integer, Text, DateTime, ForeignKey, JSON, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Resume(Base):
    """Represents an uploaded resume and, once available, its AI analysis results."""

    __tablename__ = "resumes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )

    # --- File metadata (required, set immediately on upload) ---
    original_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    stored_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)
    file_size: Mapped[int] = mapped_column(Integer, nullable=False)

    # --- Extracted content (optional, set after text extraction) ---
    extracted_text: Mapped[str | None] = mapped_column(Text, nullable=True)

    # --- AI analysis results (optional, set after Gemini analysis completes) ---
    ats_score: Mapped[int | None] = mapped_column(Integer, nullable=True)
    summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    technical_skills: Mapped[list | None] = mapped_column(JSON, nullable=True)
    soft_skills: Mapped[list | None] = mapped_column(JSON, nullable=True)
    missing_skills: Mapped[list | None] = mapped_column(JSON, nullable=True)
    strengths: Mapped[list | None] = mapped_column(JSON, nullable=True)
    weaknesses: Mapped[list | None] = mapped_column(JSON, nullable=True)
    improvement_suggestions: Mapped[list | None] = mapped_column(JSON, nullable=True)
    recommended_job_roles: Mapped[list | None] = mapped_column(JSON, nullable=True)
    overall_recommendation: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationship back to the owning user.
    user = relationship("User", backref="resumes")