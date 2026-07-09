
"""
Pydantic schemas for the User entity.
Used for request validation and response serialization, kept separate
from the SQLAlchemy model.
"""

from datetime import datetime

from pydantic import BaseModel, EmailStr, Field, ConfigDict

from app.models.user import UserRole


class UserCreate(BaseModel):
    """Schema for user registration requests."""

    full_name: str = Field(..., min_length=1, max_length=255)
    email: EmailStr
    password: str = Field(..., min_length=8, max_length=128)

    # Defaults to job_seeker; only "job_seeker" or "recruiter" are accepted.
    role: UserRole = UserRole.JOB_SEEKER


class UserLogin(BaseModel):
    """Schema for user login requests."""

    email: EmailStr
    password: str


class UserResponse(BaseModel):
    """Schema for returning user data in API responses. Excludes password fields."""

    id: int
    full_name: str
    email: EmailStr
    role: UserRole
    is_verified: bool
    is_active: bool
    created_at: datetime

    # Allows population directly from SQLAlchemy ORM objects.
    model_config = ConfigDict(from_attributes=True)