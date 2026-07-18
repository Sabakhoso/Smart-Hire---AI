// src/components/auth/RequireAuth.tsx

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

/**
 * Route guard for authenticated-only pages (e.g. /dashboard).
 *
 * Usage in AppRoutes.tsx:
 *
 *   <Route element={<RequireAuth />}>
 *     <Route path="/dashboard" element={<DashboardPage />} />
 *   </Route>
 *
 * While AuthContext is still verifying the token against /auth/me
 * (isLoading === true), this renders a lightweight loading state
 * instead of redirecting — otherwise a logged-in user refreshing the
 * page would flash to /login before the token check resolves.
 */

const RequireAuth: React.FC = () => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-[#FBF7F1]">
        <div className="flex flex-col items-center gap-3">
          <span className="h-8 w-8 animate-spin rounded-full border-2 border-[#3D2B1F]/15 border-t-[#8B5A2B]" />
          <p className="text-sm text-[#6B5847]">Checking your session…</p>
        </div>
      </div>
    );
  }

  if (!user) {
    // Preserve the attempted location so you can redirect back after login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;