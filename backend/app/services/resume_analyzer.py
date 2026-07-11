"""
AI-powered resume analysis service for SmartHire AI, using Groq API.
Accepts extracted resume text and returns a structured analysis dictionary.
Contains AI analysis logic only — no routes or database operations.
"""

import json

from groq import Groq

from app.config import settings
from app.prompts.resume_prompt import build_resume_prompt

# Reusable Groq client, configured with the API key from settings.
client = Groq(api_key=settings.GROQ_API_KEY)

# Model used for resume analysis (fast and free on Groq).
GROQ_MODEL = "llama-3.1-8b-instant"

# Keys expected in every successful analysis response.
REQUIRED_KEYS = [
    "ats_score",
    "summary",
    "technical_skills",
    "soft_skills",
    "missing_skills",
    "strengths",
    "weaknesses",
    "improvement_suggestions",
    "recommended_job_roles",
    "overall_recommendation",
]


def _validate_analysis(analysis: dict) -> None:
    """Ensure the parsed JSON contains all expected keys."""
    missing_keys = [key for key in REQUIRED_KEYS if key not in analysis]
    if missing_keys:
        raise RuntimeError(f"Groq response missing expected keys: {missing_keys}")


def analyze_resume(resume_text: str) -> dict:
    """
    Send extracted resume text to Groq and return a structured analysis.

    Returns a dictionary with keys: ats_score, summary, technical_skills,
    soft_skills, missing_skills, strengths, weaknesses, improvement_suggestions,
    recommended_job_roles, overall_recommendation.

    Raises:
        ValueError: if resume_text is empty.
        RuntimeError: if the API call fails or the response is invalid/malformed.
    """
    # Reject empty input before making any API call.
    if not resume_text or not resume_text.strip():
        raise ValueError("Resume text is empty; nothing to analyze.")

    messages = build_resume_prompt(resume_text)

    # Call the Groq API, wrapping SDK/network errors in a clear exception.
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

    # Parse the model's JSON output into a Python dict.
    try:
        analysis = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Failed to parse Groq response as JSON: {exc}") from exc

    # Confirm the response contains every field the rest of the app depends on.
    _validate_analysis(analysis)

    return analysis