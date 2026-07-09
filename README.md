
# SmartHire AI

## AI-Powered Hiring Platform for Job Seekers and Recruiters

SmartHire AI is an end-to-end AI recruitment platform that helps both job seekers and recruiters simplify the hiring process.

The platform is being developed as part of my internship at **Technify**. It combines Artificial Intelligence with resume analysis to provide a smarter, faster, and more efficient recruitment experience.

Unlike traditional resume analyzers, SmartHire AI is designed for two different types of users:

* **Job Seekers**, who receive AI-powered resume analysis, ATS scoring, and personalized improvement suggestions.
* **Recruiters & HR Teams**, who can upload multiple resumes for a job opening and let AI identify the most relevant candidates based on the job requirements.

---

## Current Progress

The project is currently under active development.

### Completed

* User Authentication (Register & Login)
* JWT-based Authentication
* Protected API Routes
* SQLAlchemy Database Integration
* Resume Upload API
* Resume File Validation
* PDF Resume Parser
* Project Structure following FastAPI best practices

### In Progress

* Resume Information Extraction
* ATS Score Calculation
* AI Resume Feedback
* Recruiter Dashboard
* Candidate Ranking System
* Job Description Matching

---

## Planned Features

### For Job Seekers

* Secure account creation and login
* Upload resumes in PDF format
* AI-powered resume analysis
* ATS compatibility score
* Resume improvement suggestions
* Skill gap identification
* Resume history

### For Recruiters & HR

* Secure recruiter accounts
* Create hiring positions
* Upload multiple resumes at once
* AI candidate ranking
* Resume filtering based on job requirements
* Shortlist the most suitable candidates
* Download hiring reports

---

## Tech Stack

**Backend**

* FastAPI
* SQLAlchemy
* SQLite (Development)
* JWT Authentication
* Pydantic

**AI**

* Resume Parsing
* ATS Analysis
* NLP
* Machine Learning (Upcoming)

**Frontend**

* React (Planned)

---

## Project Structure

```text
backend/
│
├── app/
│   ├── config/
│   ├── core/
│   ├── crud/
│   ├── database/
│   ├── models/
│   ├── parser/
│   ├── routers/
│   ├── schemas/
│   └── services/
│
├── uploads/
├── requirements.txt
└── main.py
```

---

## Vision

The goal of SmartHire AI is to make hiring more efficient for everyone involved.

Instead of manually reviewing dozens or even hundreds of resumes, recruiters can rely on AI to identify the strongest candidates. At the same time, job seekers receive detailed insights to improve their resumes before applying.

The aim is to reduce hiring time, improve candidate matching, and make the recruitment process smarter for both individuals and organizations.

---

## Status

🚧 **This project is currently under active development as part of my internship at Technify. New features and improvements are being added continuously.**

## Author

**Saba Khoso**

BS Artificial Intelligence Student

- LinkedIn: www.linkedin.com/in/saba-khoso-897a10313
