"""
backend/app/services/resume_analyzer.py

AI analysis engine for SmartHire AI, powered by Google's Gemini API (google-genai SDK).
Accepts extracted resume text and returns structured hiring insights.
Contains AI analysis logic only — no routes or database operations.
"""

import json

from google import genai
from google.genai import types

from app.config import settings

# Reusable Gemini client, configured with the API key from settings.
client = genai.Client(api_key=settings.GEMINI_API_KEY)

# Model used for resume analysis.
GEMINI_MODEL = "gemini-2.0-flash"

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


def _build_prompt(resume_text: str) -> str:
    """Construct a structured prompt instructing Gemini to return JSON analysis only."""
    return f"""
You are an expert technical recruiter and ATS (Applicant Tracking System) specialist.
Analyze the following resume text and return your evaluation as a single JSON object only,
with no markdown formatting, code fences, or additional commentary.

The JSON object must have exactly these keys:
- "ats_score": an integer between 0 and 100 representing overall ATS compatibility and quality.
- "summary": a concise 2-3 sentence summary of the candidate's profile.
- "technical_skills": a list of technical/hard skills clearly demonstrated in the resume.
- "soft_skills": a list of soft skills evidenced in the resume (e.g. communication, leadership).
- "missing_skills": a list of relevant skills that appear weak or absent for the candidate's apparent role.
- "strengths": a list of notable strengths in the resume.
- "weaknesses": a list of notable weaknesses or gaps in the resume.
- "improvement_suggestions": a list of specific, actionable suggestions to improve the resume.
- "recommended_job_roles": a list of job titles/roles this candidate is well-suited for.
- "overall_recommendation": a short verdict (1-2 sentences) on the candidate's overall hiring potential.

Resume text:
\"\"\"
{resume_text}
\"\"\"
"""


def _validate_analysis(analysis: dict) -> None:
    """Ensure the parsed JSON contains all expected keys."""
    missing_keys = [key for key in REQUIRED_KEYS if key not in analysis]
    if missing_keys:
        raise RuntimeError(f"Gemini response missing expected keys: {missing_keys}")


def analyze_resume(resume_text: str) -> dict:
    """
    Send extracted resume text to Gemini and return a structured analysis.

    Returns a dictionary with keys: ats_score, summary, technical_skills,
    soft_skills, missing_skills, strengths, weaknesses, improvement_suggestions,
    recommended_job_roles, overall_recommendation.

    Raises:
        ValueError: if resume_text is empty.
        RuntimeError: if the API call fails or the response is invalid/malformed.
    """
    if not resume_text or not resume_text.strip():
        raise ValueError("Resume text is empty; nothing to analyze.")

    prompt = _build_prompt(resume_text)

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
        analysis = json.loads(raw_text)
    except json.JSONDecodeError as exc:
        raise RuntimeError(f"Failed to parse Gemini response as JSON: {exc}") from exc

    _validate_analysis(analysis)

    return analysis