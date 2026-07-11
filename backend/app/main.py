# FastAPI application entry point for SmartHire AI.


from contextlib import asynccontextmanager

from fastapi import FastAPI

from app.database.database import engine
from app.database.base import Base

# Import models so SQLAlchemy registers them on Base.metadata before create_all runs.
from app.models.user import User  # noqa: F401
from app.models.resume import Resume  # noqa: F401
from app.models.job import Job  # noqa: F401

from app.routers.auth import router as auth_router
from app.routers.resume import router as resume_router
from app.routers.job import router as job_router
from app.routers.matcher import router as matcher_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup: create database tables if they don't already exist.
    Base.metadata.create_all(bind=engine)
    print("Database initialized successfully.")

    yield

    # Shutdown: place cleanup logic here if needed in the future.


app = FastAPI(
    title="AI Resume Analyzer",
    description="Backend API for analyzing resumes and generating ATS reports.",
    version="1.0.0",
    lifespan=lifespan,
)

# Register routers.
app.include_router(auth_router)
app.include_router(resume_router)
app.include_router(job_router)
app.include_router(matcher_router)


@app.get("/")
def root():
    return {"message": "AI Resume Analyzer API is running."}