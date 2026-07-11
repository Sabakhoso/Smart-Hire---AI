"""
Pydantic schema for JWT access token responses.
"""

from pydantic import BaseModel


class Token(BaseModel):
    """Schema for the login endpoint's response payload."""

    access_token: str
    token_type: str = "bearer"