// src/routes/AppRoutes.tsx

import { Routes, Route } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import LandingPage from "../pages/landing/LandingPage";
import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import JobSeekerDashboardPage from "../pages/jobseeker/JobSeekerDashboardpage";
import ResumeUploadPage from "../pages/jobseeker/ResumeUploadPage";
import ResumeAnalysisPage from "../pages/jobseeker/ResumeAnalysisPage";

import RecruiterDashboardPage from "../pages/recruiter/RecruiterDashboardPage";
import CreateJobPage from "../pages/recruiter/CreateJobPage";
import CandidatesPage from "../pages/recruiter/CandidatesPage";
import AIMatchingPage from "../pages/recruiter/AIMatchingPage";

import RequireAuth from "../components/auth/RequireAuth";

function AppRoutes() {
  return (
    <Routes>
      {/* =========================
          Public Routes
      ========================== */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<LandingPage />} />
      </Route>

      {/* =========================
          Authentication
      ========================== */}
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* =========================
          Protected Routes
      ========================== */}
      <Route element={<RequireAuth />}>
        <Route element={<DashboardLayout />}>
          {/* =========================
              Job Seeker Routes
          ========================== */}
          <Route
            path="/dashboard"
            element={<JobSeekerDashboardPage />}
          />

          <Route
            path="/dashboard/resume"
            element={<ResumeUploadPage />}
          />

          <Route
            path="/dashboard/analysis"
            element={<ResumeAnalysisPage />}
          />

          {/* =========================
              Recruiter Routes
          ========================== */}
          <Route
            path="/dashboard/recruiter"
            element={<RecruiterDashboardPage />}
          />

          <Route
            path="/dashboard/recruiter/jobs/create"
            element={<CreateJobPage />}
          />

          <Route
            path="/dashboard/recruiter/candidates"
            element={<CandidatesPage />}
          />

          <Route
            path="/dashboard/recruiter/matching"
            element={<AIMatchingPage />}
          />
        </Route>
      </Route>

      {/* =========================
          404 - Temporarily commented out for testing
      ========================== */}
      {/*
      <Route
        path="*"
        element={<h1>404 - Page Not Found</h1>}
      />
      */}
    </Routes>
  );
}

export default AppRoutes;