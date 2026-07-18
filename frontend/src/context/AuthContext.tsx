// src/context/AuthContext.tsx

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";

import {
  getToken,
  removeToken,
  getCurrentUser,
  logout as logoutService,
  type CurrentUser,
} from "../services/authService";

import { userStorage } from "../utils/storage";

interface AuthContextValue {
  user: CurrentUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (user: CurrentUser) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface Props {
  children: React.ReactNode;
}

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<CurrentUser | null>(() =>
    userStorage.getUser()
  );

  const [isLoading, setIsLoading] = useState(true);

  const isAuthenticated = !!user;

  useEffect(() => {
    const initializeAuth = async () => {
      const token = getToken();

      if (!token) {
        userStorage.clearUser();
        setUser(null);
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser();

        userStorage.setUser(currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error("Authentication failed:", error);

        removeToken();
        userStorage.clearUser();
        setUser(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const login = useCallback((loggedInUser: CurrentUser) => {
    setUser(loggedInUser);
    userStorage.setUser(loggedInUser);
  }, []);

  const logout = useCallback(() => {
    logoutService();
    userStorage.clearUser();
    setUser(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}

export default AuthContext;