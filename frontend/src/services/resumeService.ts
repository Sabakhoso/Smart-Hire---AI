import api from './api'
import type { ResumeUploadResponse, ResumeAnalysisResult } from '../types/resume'

export async function uploadResume(file: File): Promise<ResumeUploadResponse> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await api.post<ResumeUploadResponse>(
      '/resume/upload',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return data
  } catch (error) {
    throw normalizeError(error, 'Failed to upload resume. Please try again.')
  }
}

export async function analyzeResume(file: File): Promise<ResumeAnalysisResult> {
  const formData = new FormData()
  formData.append('file', file)

  try {
    const { data } = await api.post<ResumeAnalysisResult>(
      '/resume/analyze',
      formData,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )
    return data
  } catch (error) {
    throw normalizeError(error, 'Failed to analyze resume. Please try again.')
  }
}

function normalizeError(error: unknown, fallbackMessage: string): Error {
  if (
    typeof error === 'object' &&
    error !== null &&
    'response' in error &&
    typeof (error as { response?: { data?: { detail?: string } } }).response
      ?.data?.detail === 'string'
  ) {
    return new Error(
      (error as { response: { data: { detail: string } } }).response.data
        .detail
    )
  }
  return error instanceof Error ? error : new Error(fallbackMessage)
}