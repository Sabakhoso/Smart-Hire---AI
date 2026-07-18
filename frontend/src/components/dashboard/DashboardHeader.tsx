// src/components/dashboard/DashboardHeader.tsx

import React from "react";
import { motion } from "framer-motion";
import { Bell } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

/**
 * Formats today's date as e.g. "Monday, July 13, 2026".
 */
function getFormattedDate(): string {
  return new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

const DashboardHeader: React.FC = () => {
  const { user } = useAuth();

  const today = getFormattedDate();

  const name = user?.full_name ?? "User";
  const initial = name.charAt(0).toUpperCase();

  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full flex-col gap-6 rounded-2xl bg-white p-6 shadow-[0_8px_24px_rgba(61,43,31,0.06)] transition-shadow duration-300 hover:shadow-[0_14px_32px_rgba(61,43,31,0.1)] sm:p-7 md:flex-row md:items-center md:justify-between"
    >
      {/* Left */}
      <div>
        <p className="text-sm font-medium text-[#A6764B]">
          Welcome back 👋
        </p>

        <h1 className="mt-1 font-serif text-2xl font-semibold text-[#3D2B1F] sm:text-3xl">
          {name}
        </h1>

        <p className="mt-1.5 text-sm text-[#6B5847]">
          Here's an overview of your SmartHire AI activity.
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center justify-between gap-4 md:justify-end">
        <span className="hidden text-sm font-medium text-[#6B5847] sm:block">
          {today}
        </span>

        <button
          type="button"
          aria-label="Notifications"
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-[#3D2B1F]/10 text-[#3D2B1F] transition-colors duration-200 hover:bg-[#3D2B1F]/[0.05] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6764B]"
        >
          <Bell className="h-5 w-5" strokeWidth={1.8} />
        </button>

        <div
          aria-hidden
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3D2B1F] font-serif text-sm font-semibold text-[#FBF7F1]"
        >
          {initial}
        </div>
      </div>
    </motion.header>
  );
};

export default DashboardHeader;