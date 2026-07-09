# Database operations for the User entity.
# Contains data-access logic only — no route handlers or business validation.



from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.user import UserCreate
from app.core.security import hash_password


def get_user_by_email(db: Session, email: str) -> User | None:
    """Fetch a user by email. Returns None if not found."""
    stmt = select(User).where(User.email == email)
    return db.execute(stmt).scalar_one_or_none()


def create_user(db: Session, user_create: UserCreate) -> User:
    """Hash the password and persist a new user record."""
    hashed_password = hash_password(user_create.password)

    db_user = User(
        full_name=user_create.full_name,
        email=user_create.email,
        hashed_password=hashed_password,
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user