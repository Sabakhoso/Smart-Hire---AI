// src/layouts/PublicLayout.tsx

import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/common/Navbar";   
import Footer from "../components/common/Footer";   

const PublicLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col bg-[#FBF7F1]">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default PublicLayout;