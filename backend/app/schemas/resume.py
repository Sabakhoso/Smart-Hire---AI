# Pydantic schemas for the Resume entity.


from datetime import datetime

from pydantic import BaseModel, ConfigDict


class ResumeResponse(BaseModel):
    """Schema for returning resume information in API responses."""

    id: int
    user_id: int
    original_filename: str
    stored_filename: str
    file_path: str
    file_size: int
    uploaded_at: datetime

    # Allows population directly from SQLAlchemy ORM objects.
    model_config = ConfigDict(from_attributes=True)