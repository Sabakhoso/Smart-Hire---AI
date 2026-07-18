import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Upload,
  FileSearch,
  Briefcase,
  User,
  Settings,
} from "lucide-react";

const menuItems = [
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Upload Resume",
    path: "/resume-upload",
    icon: Upload,
  },
  {
    title: "Resume Analysis",
    path: "/resume-analysis",
    icon: FileSearch,
  },
  {
    title: "Job Matches",
    path: "/job-matches",
    icon: Briefcase,
  },
  {
    title: "Profile",
    path: "/profile",
    icon: User,
  },
  {
    title: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

const Sidebar: React.FC = () => {
  return (
    <aside className="hidden lg:flex lg:w-64 lg:flex-col border-r border-[#E5D9CB] bg-white">
      <div className="flex-1 px-5 py-6">
        <nav className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
                    isActive
                      ? "bg-[#3D2B1F] text-white"
                      : "text-[#6B5847] hover:bg-[#F5EFE6]"
                  }`
                }
              >
                <Icon size={18} />
                <span>{item.title}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;