"""
Pydantic schemas for JWT access token responses.
"""

from pydantic import BaseModel

from app.schemas.user import UserResponse


class Token(BaseModel):
    """Schema for the login endpoint's response payload."""

    access_token: str
    token_type: str = "bearer"


class AuthResponse(Token):
    """Schema returned after successful registration."""

    user: UserResponse