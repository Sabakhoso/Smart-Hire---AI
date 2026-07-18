// src/services/authService.ts

import api from "./api";

/**
 * Login Request
 */
export interface LoginPayload {
  email: string;
  password: string;
}

/**
 * Register Request
 */
export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
  role: "job_seeker" | "recruiter";
}

/**
 * Current User
 */
export interface CurrentUser {
  id: number;
  full_name: string;
  email: string;
  role: "job_seeker" | "recruiter";
  is_verified: boolean;
  is_active: boolean;
  created_at: string;
}

/**
 * Login Response
 */
export interface LoginResponse {
  access_token: string;
  token_type: string;
}

/**
 * Registration Response
 */
export interface RegisterResponse {
  access_token: string;
  token_type: string;
  user: CurrentUser;
}

const TOKEN_KEY = "token";

/**
 * Save JWT token
 */
export function saveToken(token: string): void {
  localStorage.setItem(TOKEN_KEY, token);
}

/**
 * Get JWT token
 */
export function getToken(): string | null {
  return localStorage.getItem(TOKEN_KEY);
}

/**
 * Remove JWT token
 */
export function removeToken(): void {
  localStorage.removeItem(TOKEN_KEY);
}

/**
 * Login
 */
export async function login(
  payload: LoginPayload
): Promise<LoginResponse> {
  const { data } = await api.post<LoginResponse>(
    "/auth/login",
    payload
  );

  saveToken(data.access_token);

  return data;
}

/**
 * Register
 */
export async function register(
  payload: RegisterPayload
): Promise<RegisterResponse> {
  const { data } = await api.post<RegisterResponse>(
    "/auth/register",
    payload
  );

  saveToken(data.access_token);

  return data;
}

/**
 * Get Current Logged-in User
 */
export async function getCurrentUser(): Promise<CurrentUser> {
  const { data } = await api.get<CurrentUser>("/auth/me");
  return data;
}

/**
 * Logout
 */
export function logout(): void {
  removeToken();
}