from dotenv import load_dotenv
import os

# Load variables from .env
load_dotenv()

class Settings:
    PROJECT_NAME = "Smart Hire-AI"
    PROJECT_VERSION = "1.0.0"

    GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
    GROQ_API_KEY = os.getenv("GROQ_API_KEY")

    DATABASE_URL = os.getenv("DATABASE_URL")

    SECRET_KEY = os.getenv("SECRET_KEY")

    ALGORITHM = os.getenv("ALGORITHM")

    ACCESS_TOKEN_EXPIRE_MINUTES = int(
        os.getenv("ACCESS_TOKEN_EXPIRE_MINUTES", 30)
    )

    UPLOAD_DIR = os.getenv("UPLOAD_DIR")


settings = Settings()