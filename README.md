# SmartHire AI

## AI-Powered Hiring Platform for Job Seekers and Recruiters

SmartHire AI is an end-to-end AI recruitment platform that helps both job seekers and recruiters simplify the hiring process.

The platform is being developed as part of my internship at Technify while also serving as a personal portfolio project to showcase modern AI application development and full-stack engineering skills.

Unlike traditional resume analyzers, SmartHire AI is designed for two different types of users:

* **Job Seekers**, who receive AI-powered resume analysis, ATS scoring, personalized feedback, skill gap analysis, and resume improvement suggestions.
* **Recruiters & HR Teams**, who can create job postings, upload resumes, compare candidates against job requirements, and let AI identify the most relevant candidates based on their skills and experience.

---

## Current Progress

The project is currently under active development.

### Completed

#### Authentication & Security

* User Registration
* User Login
* JWT-based Authentication
* Protected API Routes
* Role-Based Authorization (Recruiter & Job Seeker)

#### Resume Module

* Resume Upload API
* PDF Resume Validation
* Resume Storage
* PDF Resume Parser
* AI-Powered Resume Analysis using Google Gemini
* ATS Score Generation
* Resume Summary Generation
* Technical Skills Extraction
* Soft Skills Extraction
* Missing Skills Detection
* Strengths & Weaknesses Analysis
* Resume Improvement Suggestions
* Recommended Job Roles

#### Job Management

* Recruiter Job Creation
* View Posted Jobs
* Update Job Postings
* Delete Job Postings

#### Backend

* SQLAlchemy Database Integration
* Pydantic Schema Validation
* FastAPI Project Structure
* Interactive Swagger API Documentation

### In Progress

* Resume-to-Job Matching
* Candidate Match Score
* Recruiter Dashboard
* Frontend Development (React)
* Candidate Ranking System

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
* Personalized career recommendations

### For Recruiters & HR

* Secure recruiter accounts
* Create and manage hiring positions
* Upload multiple resumes
* AI-powered resume matching
* Candidate ranking based on job descriptions
* Resume filtering
* Shortlist the best candidates
* Download hiring reports
* Recruiter analytics dashboard

---

## Tech Stack

### Backend

* FastAPI
* Python
* SQLAlchemy
* SQLite (Development)
* Pydantic
* JWT Authentication
* Uvicorn

### AI

* Google Gemini API
* PyMuPDF
* Prompt Engineering
* Resume Parsing
* ATS Analysis
* NLP

### Frontend

* React (Planned)

### Development Tools

* Git
* GitHub
* Swagger UI / OpenAPI

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
│   ├── prompts/
│   ├── routers/
│   ├── schemas/
│   ├── services/
│   └── main.py
│
├── uploads/
├── requirements.txt
└── README.md
```

---

## Vision

The goal of SmartHire AI is to make hiring more efficient for everyone involved.

Instead of manually reviewing dozens or even hundreds of resumes, recruiters can rely on AI to identify the strongest candidates through intelligent resume analysis and job matching. At the same time, job seekers receive detailed AI-powered insights to improve their resumes before applying.

The aim is to reduce hiring time, improve candidate matching, and make the recruitment process smarter, faster, and more accessible for both individuals and organizations.

---

## Status

🚧 **SmartHire AI is currently under active development as part of my internship at Technify.**

### Current Milestone

✅ Backend Development Completed

- Authentication & Authorization
- Resume Upload
- AI Resume Analysis
- Job Management APIs
- Database Integration
- Interactive API Documentation

🔄 Next Milestone

- Resume-to-Job Matching
- React Frontend
- Recruiter Dashboard
- Deployment

---

## Author

**Saba Khoso**

BS Artificial Intelligence Student

AI & Backend Developer

- LinkedIn: https://www.linkedin.com/in/saba-khoso-897a10313