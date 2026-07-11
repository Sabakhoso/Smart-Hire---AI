"""
AI-powered candidate-to-job matching service for SmartHire AI, using Groq API.
Compares a resume against a job description and returns a structured match analysis.
"""

import json

from groq import Groq

from app.config import settings
from app.prompts.matcher_prompt import build_matcher_prompt

# Reusable Groq client.
client = Groq(api_key=settings.GROQ_API_KEY)

# Model used for matching.
GROQ_MODEL = "llama-3.1-8b-instant"

# Keys expected in every successful match response.
REQUIRED_KEYS = [
    "overall_score",
    "skills_match",
    "experience_match",
    "education_match",
    "strengths",
    "missing_skills",
    "recommendations",
    "final_summary",
]


def _validate_match(match: dict) -> None:
    """Ensure the parsed JSON contains all expected keys."""
    missing_keys = [key for key in REQUIRED_KEYS if key not in match]
    if missing_keys:
        raise RuntimeError(f"Groq response missing expected keys: {missing_keys}")


def match_resume_to_job(resume_text: str, job_description: str) -> dict:
    """
    Compare a resume against a job description and return a match analysis.

    Raises:
        ValueError: if either input is empty.
        RuntimeError: if the API call fails or the response is invalid.
    """
    if not resume_text or not resume_text.strip():
        raise ValueError("Resume text is empty; nothing to match.")
    if not job_description or not job_description.strip():
        raise ValueError("Job description is empty; nothing to match against.")

    messages = build_matcher_prompt(resume_text, job_description)

    try:
        response = client.chat.completions.create(
            model=GROQ_MODEL,
            messages=messages,
            temperature=0.3,
            response_format={"type": "json_object"},
        )
    except Exception as exc:
        raise RuntimeError(f"Groq API request failed: {exc}") from exc

    raw_text = response.choices[0].message.content
    if not raw_text:
        raise RuntimeError("Groq API returned an empty response.")

    try:
        match = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Failed to parse Groq response as JSON: {exc}") from exc

    _validate_match(match)

    return match