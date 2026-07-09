# Resume model for SmartHire AI.
# Stores uploaded resume metadata alongside the AI-generated analysis results.


from datetime import datetime

from sqlalchemy import String, Integer, Text, DateTime, ForeignKey, JSON, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base


class Resume(Base):
    """Represents an uploaded resume and its AI analysis results."""

    __tablename__ = "resumes"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)

    user_id: Mapped[int] = mapped_column(
        ForeignKey("users.id", ondelete="CASCADE"), nullable=False, index=True
    )

    # --- File metadata ---
    original_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    stored_filename: Mapped[str] = mapped_column(String(255), nullable=False)
    file_path: Mapped[str] = mapped_column(String(500), nullable=False)
    file_size: Mapped[int] = mapped_column(Integer, nullable=False)

    # --- Extracted content ---
    extracted_text: Mapped[str] = mapped_column(Text, nullable=False)

    # --- AI analysis results ---
    ats_score: Mapped[int] = mapped_column(Integer, nullable=False)
    summary: Mapped[str] = mapped_column(Text, nullable=False)
    technical_skills: Mapped[list] = mapped_column(JSON, nullable=False)
    soft_skills: Mapped[list] = mapped_column(JSON, nullable=False)
    missing_skills: Mapped[list] = mapped_column(JSON, nullable=False)
    strengths: Mapped[list] = mapped_column(JSON, nullable=False)
    weaknesses: Mapped[list] = mapped_column(JSON, nullable=False)
    improvement_suggestions: Mapped[list] = mapped_column(JSON, nullable=False)
    recommended_job_roles: Mapped[list] = mapped_column(JSON, nullable=False)
    overall_recommendation: Mapped[str] = mapped_column(Text, nullable=False)

    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True), server_default=func.now(), nullable=False
    )

    # Relationship back to the owning user.
    user = relationship("User", backref="resumes")