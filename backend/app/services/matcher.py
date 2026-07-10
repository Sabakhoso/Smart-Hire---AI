"""
AI-powered candidate-to-job matching service using Google's Gemini API.
Accepts resume text and a job description, returns a structured match analysis.
Contains AI analysis logic only — no routes or database operations.
"""

import json

from google import genai
from google.genai import types

from app.config import settings
from app.prompts.matcher_prompt import build_matcher_prompt

# Reusable Gemini client, configured with the API key from settings.
client = genai.Client(api_key=settings.GEMINI_API_KEY)

# Model used for candidate-job matching.
GEMINI_MODEL = "gemini-2.5-flash"

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


def _validate_match_result(result: dict) -> None:
    """Ensure the parsed JSON contains all expected keys."""
    missing_keys = [key for key in REQUIRED_KEYS if key not in result]
    if missing_keys:
        raise RuntimeError(f"Gemini response missing expected keys: {missing_keys}")


def match_resume_to_job(resume_text: str, job_description: str) -> dict:
    """
    Send a candidate's resume and a job description to Gemini and return
    a structured match analysis.

    Returns a dictionary with keys: overall_score, skills_match,
    experience_match, education_match, strengths, missing_skills,
    recommendations, final_summary.

    Raises:
        ValueError: if resume_text or job_description is empty.
        RuntimeError: if the API call fails or the response is invalid/malformed.
    """
    if not resume_text or not resume_text.strip():
        raise ValueError("Resume text is empty; nothing to match.")

    if not job_description or not job_description.strip():
        raise ValueError("Job description is empty; nothing to match against.")

    prompt = build_matcher_prompt(resume_text=resume_text, job_description=job_description)

    # Call the Gemini API, wrapping SDK/network errors in a clear exception.
    try:
        response = client.models.generate_content(
            model=GEMINI_MODEL,
            contents=prompt,
            config=types.GenerateContentConfig(
                response_mime_type="application/json",
                temperature=0.3,
            ),
        )
    except Exception as exc:
        raise RuntimeError(f"Gemini API request failed: {exc}") from exc

    raw_text = response.text
    if not raw_text:
        raise RuntimeError("Gemini API returned an empty response.")

    # Parse the model's JSON output into a Python dict.
    try:
        result = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Failed to parse Gemini response as JSON: {exc}") from exc

    _validate_match_result(result)

    return result