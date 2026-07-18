import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  Menu,
  X,
  Bell,
  LogOut,
  LayoutDashboard,
  FileText,
} from "lucide-react";

interface NavItem {
    name: string;
    path: string;
    icon: React.ElementType;
}

const navItems: NavItem[] = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Upload Resume",
    path: "/dashboard/resume",
    icon: FileText,
  },
  {
    name: "Resume Analysis",
    path: "/dashboard/analysis",
    icon: FileText,
  },
];
const DashboardNavbar: React.FC = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate("/");
        setMobileMenuOpen(false);
    };

    const closeMobileMenu = () => setMobileMenuOpen(false);

    return (
        <>
            {/* Desktop Navbar */}
            <header className="sticky top-0 z-40 w-full bg-[#FBF7F1] border-b border-[#E5D9CB] shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <Link to="/dashboard" className="flex items-center gap-2">
                                <span className="text-2xl font-bold text-[#3D2B1F]">SmartHire</span>
                                <span className="text-sm font-medium text-[#8B5A2B] bg-[#E5D9CB] px-2 py-0.5 rounded-full">AI</span>
                            </Link>
                        </div>

                        {/* Desktop Navigation Links */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) =>
                                        `flex items-center gap-2 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                            isActive
                                                ? "bg-[#3D2B1F] text-[#FBF7F1] shadow-md"
                                                : "text-[#6B5847] hover:bg-[#E5D9CB] hover:text-[#2E211A]"
                                        }`
                                    }
                                >
                                    <item.icon className="w-4 h-4" />
                                    <span>{item.name}</span>
                                </NavLink>
                            ))}
                        </nav>

                        {/* Right Side: Notifications + User + Logout */}
                        <div className="flex items-center gap-4">
                            {/* Notification Bell */}
                            <button
                                className="relative p-2 rounded-full hover:bg-[#E5D9CB] transition-colors duration-200 text-[#6B5847] hover:text-[#2E211A]"
                                aria-label="Notifications"
                            >
                                <Bell className="w-5 h-5" />
                                <span className="absolute top-1 right-1 block w-2 h-2 bg-red-500 rounded-full ring-2 ring-[#FBF7F1]"></span>
                            </button>

                            {/* User Info & Avatar (Desktop) */}
                            <div className="hidden md:flex items-center gap-3 border-l border-[#E5D9CB] pl-4">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-semibold text-[#2E211A]">{user?.full_name || "User"}</span>
                                    <span className="text-xs text-[#6B5847]">{user?.role || "Candidate"}</span>
                                </div>
                                <div className="w-8 h-8 rounded-full bg-[#3D2B1F] text-[#FBF7F1] flex items-center justify-center text-sm font-bold">
                                    user?.full_name?.charAt(0)?.toUpperCase()
                                </div>
                                <button
                                    onClick={handleLogout}
                                    className="ml-2 p-2 rounded-lg hover:bg-[#E5D9CB] transition-colors duration-200 text-[#6B5847] hover:text-[#3D2B1F]"
                                    aria-label="Logout"
                                >
                                    <LogOut className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Mobile Hamburger */}
                            <button
                                onClick={() => setMobileMenuOpen(true)}
                                className="md:hidden p-2 rounded-lg hover:bg-[#E5D9CB] transition-colors duration-200 text-[#6B5847]"
                                aria-label="Open menu"
                            >
                                <Menu className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Mobile Drawer */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm md:hidden"
                        onClick={closeMobileMenu}
                    >
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="absolute right-0 top-0 h-full w-72 bg-[#FBF7F1] shadow-2xl border-l border-[#E5D9CB]"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex flex-col h-full">
                                {/* Header with close button */}
                                <div className="flex items-center justify-between p-4 border-b border-[#E5D9CB]">
                                    <span className="text-lg font-bold text-[#3D2B1F]">Menu</span>
                                    <button
                                        onClick={closeMobileMenu}
                                        className="p-2 rounded-lg hover:bg-[#E5D9CB] transition-colors duration-200 text-[#6B5847]"
                                        aria-label="Close menu"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>

                                {/* User info in drawer */}
                                <div className="p-4 border-b border-[#E5D9CB] flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#3D2B1F] text-[#FBF7F1] flex items-center justify-center text-lg font-bold">
                                        {user?.full_name?.charAt(0)?.toUpperCase() || "User"}
                                    </div>
                                    <div>
                                        <div className="text-sm font-semibold text-[#2E211A]">{user?.full_name || "User"}</div>
                                        <div className="text-xs text-[#6B5847]">{user?.email || "user@example.com"}</div>
                                        <div className="text-xs text-[#8B5A2B]">{user?.role || "Candidate"}</div>
                                    </div>
                                </div>

                                {/* Navigation Links */}
                                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                                    {navItems.map((item) => (
                                        <NavLink
                                            key={item.path}
                                            to={item.path}
                                            onClick={closeMobileMenu}
                                            className={({ isActive }) =>
                                                `flex items-center gap-3 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                                                    isActive
                                                        ? "bg-[#3D2B1F] text-[#FBF7F1] shadow-md"
                                                        : "text-[#6B5847] hover:bg-[#E5D9CB] hover:text-[#2E211A]"
                                                }`
                                            }
                                        >
                                            <item.icon className="w-5 h-5" />
                                            <span>{item.name}</span>
                                        </NavLink>
                                    ))}
                                </nav>

                                {/* Logout Button in Drawer */}
                                <div className="p-4 border-t border-[#E5D9CB]">
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium text-[#6B5847] hover:bg-[#E5D9CB] hover:text-[#3D2B1F] transition-colors duration-200"
                                    >
                                        <LogOut className="w-5 h-5" />
                                        <span>Logout</span>
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DashboardNavbar;