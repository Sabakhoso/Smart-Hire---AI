import React from "react";
import { Outlet } from "react-router-dom";
import DashboardNavbar from "../components/common/DashboardNavbar";

/**
 * DashboardLayout
 *
 * Top-level layout wrapper for all authenticated dashboard routes.
 * Renders the persistent DashboardNavbar and injects the active
 * route's content via <Outlet />.
 */
const DashboardLayout: React.FC = () => {
  return (
    <div className="min-h-screen w-full flex flex-col bg-[#FBF7F1]">
      {/* Persistent top navigation */}
      <DashboardNavbar />

      {/* Page content */}
      <main className="flex-1 w-full pt-20 sm:pt-24 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
