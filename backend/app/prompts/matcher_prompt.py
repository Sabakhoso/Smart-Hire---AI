"""
Prompt template for candidate-to-job matching using Google Gemini.
Focused solely on prompt construction — no API calls or business logic.
"""


def build_matcher_prompt(resume_text: str, job_description: str) -> str:
    """
    Construct a structured prompt instructing Gemini to compare a candidate's
    resume against a job posting and return a JSON-formatted match analysis.

    Args:
        resume_text: Extracted plain text from the candidate's resume.
        job_description: The job posting details (title, description,
            required skills, experience level, etc.) to match against.

    Returns:
        A formatted prompt string ready to send to Gemini.
    """
    return f"""
You are an expert technical recruiter and talent-matching specialist.
Compare the candidate's resume against the job posting below and evaluate
their suitability across the following dimensions:

- Skills alignment with the job's required skills.
- Relevant work experience (years, roles, domain relevance).
- Educational background and its relevance to the role.
- Projects that demonstrate applicable, hands-on capability.
- Certifications relevant to the role.
- Overall suitability for the position.

Return your evaluation as a single JSON object only, with no markdown
formatting, code fences, or additional commentary.

The JSON object must have exactly these keys:
- "overall_score": an integer between 0 and 100 representing overall candidate-job fit.
- "skills_match": an integer between 0 and 100 representing how well the candidate's skills align with the job's requirements.
- "experience_match": an integer between 0 and 100 representing how well the candidate's experience aligns with the role.
- "education_match": an integer between 0 and 100 representing how well the candidate's education aligns with the role.
- "strengths": a list of specific strengths that make the candidate suitable for this job.
- "missing_skills": a list of required skills, experience, or qualifications the candidate appears to lack.
- "recommendations": a list of specific, actionable suggestions for the candidate to become a stronger fit for this role.
- "final_summary": a concise 2-3 sentence overall assessment of the candidate's fit for the job.

Job Posting:
\"\"\"
{job_description}
\"\"\"

Candidate Resume:
\"\"\"
{resume_text}
\"\"\"
"""