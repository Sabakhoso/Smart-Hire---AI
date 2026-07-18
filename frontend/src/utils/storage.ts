// src/utils/storage.ts

import type { CurrentUser } from "../services/authService";

export interface StoredUser extends CurrentUser {}

const USER_KEY = "smarthire_user";

export const userStorage = {
  getUser(): StoredUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as StoredUser) : null;
    } catch {
      return null;
    }
  },

  setUser(user: StoredUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  clearUser() {
    localStorage.removeItem(USER_KEY);
  },
};