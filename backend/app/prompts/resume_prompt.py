"""
Prompt template for AI-powered resume analysis using Groq.
Focused solely on prompt construction — no API calls or business logic.
"""

SYSTEM_PROMPT = """You are an expert ATS (Applicant Tracking System) recruiter and professional resume reviewer.
Analyze the resume text provided and evaluate it thoroughly.

Return ONLY valid JSON. Do not explain your reasoning. Do not use markdown formatting.
Do not wrap the JSON in code fences. Do not include any text before or after the JSON object.
Your entire response must be a single, valid JSON object and nothing else.

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
- "overall_recommendation": a short verdict (1-2 sentences) on the candidate's overall hiring potential."""


def build_resume_prompt(resume_text: str) -> list[dict]:
    """
    Construct chat messages for Groq with system prompt and user resume text.

    Args:
        resume_text: Extracted plain text from the candidate's resume.

    Returns:
        A list of message dicts ready for Groq's chat completion.
    """
    return [
        {"role": "system", "content": SYSTEM_PROMPT},
        {"role": "user", "content": f"Resume text:\n```\n{resume_text}\n```"},
    ]