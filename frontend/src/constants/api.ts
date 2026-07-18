/* * Base URL for the FastAPI backend.
 * Configure via .env: VITE_API_BASE_URL=http://localhost:8000
 */
export const API_BASE_URL: string =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8000";

/**
 * Centralized API endpoint paths.
 * Keeping these in one place avoids magic strings scattered across services.
 */
export const API_ENDPOINTS = {
  auth: {
    login: "/auth/login",
    register: "/auth/register",
    me: "/auth/me",
    refresh: "/auth/refresh",
    logout: "/auth/logout",
  },
} as const;

/**
 * Shared HTTP header keys.
 */
export const HEADERS = {
  authorization: "Authorization",
  contentType: "Content-Type",
} as const;

/**
 * Local storage keys used across the auth module.
 * Kept here (not duplicated in storage.ts) as the single source of truth.
 */
 export const STORAGE_KEYS = {
  user: "smarthire_user",
} as const;