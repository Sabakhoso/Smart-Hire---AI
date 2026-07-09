"""
Pydantic schemas for the Job entity.
"""

from datetime import datetime

from pydantic import BaseModel, Field, ConfigDict


class JobBase(BaseModel):
    """Shared fields between create and update operations."""

    job_title: str = Field(..., min_length=1, max_length=255)
    company_name: str = Field(..., min_length=1, max_length=255)
    job_description: str = Field(..., min_length=1)
    required_skills: list[str] = Field(default_factory=list)
    employment_type: str = Field(..., min_length=1, max_length=50)
    experience_level: str = Field(..., min_length=1, max_length=50)
    location: str = Field(..., min_length=1, max_length=255)
    salary_range: str | None = None


class JobCreate(JobBase):
    """Schema for creating a new job posting."""
    pass


class JobUpdate(BaseModel):
    """Schema for updating a job posting. All fields optional for partial updates."""

    job_title: str | None = Field(None, min_length=1, max_length=255)
    company_name: str | None = Field(None, min_length=1, max_length=255)
    job_description: str | None = Field(None, min_length=1)
    required_skills: list[str] | None = None
    employment_type: str | None = Field(None, min_length=1, max_length=50)
    experience_level: str | None = Field(None, min_length=1, max_length=50)
    location: str | None = Field(None, min_length=1, max_length=255)
    salary_range: str | None = None


class JobResponse(JobBase):
    """Schema for returning job data in API responses."""

    id: int
    recruiter_id: int
    created_at: datetime

    # Allows population directly from SQLAlchemy ORM objects.
    model_config = ConfigDict(from_attributes=True)