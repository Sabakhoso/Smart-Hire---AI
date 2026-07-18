export type UserRole = 'admin' | 'recruiter' | 'candidate'

export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  name: string
  email: string
  password: string
  role?: UserRole
}

export interface TokenResponse {
  token: string
  expiresIn?: number
  tokenType?: string
}

