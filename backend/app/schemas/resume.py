"""
backend/app/schemas/resume.py

Pydantic schemas for the Resume entity.
"""

from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ResumeAnalysisCreate(BaseModel):
    """Schema for the data needed to persist a completed resume analysis."""

    user_id: int
    original_filename: str
    stored_filename: str
    file_path: str
    file_size: int
    extracted_text: str
    ats_score: int
    summary: str
    technical_skills: list[str]
    soft_skills: list[str]
    missing_skills: list[str]
    strengths: list[str]
    weaknesses: list[str]
    improvement_suggestions: list[str]
    recommended_job_roles: list[str]
    overall_recommendation: str


class ResumeResponse(BaseModel):
    """Schema for returning full resume + analysis information in API responses."""

    id: int
    user_id: int
    original_filename: str
    stored_filename: str
    file_path: str
    file_size: int
    extracted_text: str
    ats_score: int
    summary: str
    technical_skills: list[str]
    soft_skills: list[str]
    missing_skills: list[str]
    strengths: list[str]
    weaknesses: list[str]
    improvement_suggestions: list[str]
    recommended_job_roles: list[str]
    overall_recommendation: str
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ResumeSummaryResponse(BaseModel):
    """Lightweight schema for listing resumes without the full analysis payload."""

    id: int
    original_filename: str
    ats_score: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ResumeUploadResponse(BaseModel):
    """Schema returned immediately after resume upload (before AI analysis)."""

    id: int
    user_id: int
    original_filename: str
    stored_filename: str
    file_path: str
    file_size: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)