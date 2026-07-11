# Reusable authentication dependencies for the AI Resume Analyzer project.

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer
from sqlalchemy.orm import Session

from app.database.database import get_db
from app.core.security import verify_access_token
from app.models.user import User, UserRole

# HTTPBearer tells Swagger to show a simple token field.
# It extracts the Bearer token from the Authorization header.
oauth2_scheme = HTTPBearer()


def get_current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Resolve the authenticated user from a Bearer token."""
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    payload = verify_access_token(token.credentials)  # ← FIXED
    user_id = payload.get("sub")

    if user_id is None:
        raise credentials_exception

    user = db.get(User, int(user_id))
    if user is None:
        raise credentials_exception

    return user


def require_recruiter(current_user: User = Depends(get_current_user)) -> User:
    """Allow access only to users with the 'recruiter' role. Raises 403 otherwise."""
    if current_user.role != UserRole.RECRUITER:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="This action is restricted to recruiters.",
        )
    return current_user  # ← FIXED (removed trailing comma)