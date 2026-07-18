// src/types/resume.ts

/**
 * Matches the FastAPI Resume response model exactly.
 * Field names are kept in snake_case to mirror the backend JSON payload
 * as-is (no camelCase transformation layer), avoiding silent mismatches
 * with the API contract.
 */
export interface Resume {
  id: number;
  user_id: number;
  original_filename: string;
  stored_filename: string;
  file_path: string;
  file_size: number;
  created_at: string;
}

/**
 * Structured output of the AI resume analysis pipeline.
 */
export interface ResumeAnalysisResult {
  ats_score: number;
  summary: string;
  technical_skills: string[];
  soft_skills: string[];
  missing_skills: string[];
  strengths: string[];
  weaknesses: string[];
  improvement_suggestions: string[];
  recommended_job_roles: string[];
  overall_recommendation: string;
}

/**
 * Response returned immediately after a resume upload completes.
 * Extends the base Resume metadata; analysis may not be ready yet,
 * so it's optional until the AI pipeline finishes processing.
 */
export interface ResumeUploadResponse extends Resume {
  analysis?: ResumeAnalysisResult;
}

/**
 * Response returned by the POST /resume/analyze endpoint.
 *
 * Example:
 * {
 *   "message": "Resume analyzed successfully.",
 *   "analysis": {
 *     "ats_score": 85,
 *     "summary": "...",
 *     ...
 *   }
 * }
 */
export interface AnalyzeResumeResponse {
  message: string;
  analysis: ResumeAnalysisResult;
}