// src/pages/auth/LoginPage.tsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ShieldCheck, Sparkles, TrendingUp } from "lucide-react";
import LoginForm from "../../components/auth/LoginForm";

/**
 * LoginPage composes the reusable LoginForm inside a split-screen
 * auth layout consistent with the SmartHire AI marketing pages
 * (brown/ivory palette, soft radial glow, serif display headings).
 *
 * Left panel: brand context + reassurance points.
 * Right panel: the actual LoginForm.
 */
const highlights = [
  {
    icon: Sparkles,
    text: "AI-matched roles the moment you sign in",
  },
  {
    icon: TrendingUp,
    text: "Track resume performance across applications",
  },
  {
    icon: ShieldCheck,
    text: "Your data stays private and secure",
  },
];

const LoginPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full bg-[#FBF7F1]">
      {/* Ambient glow, consistent with hero/landing sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 right-[-10%] h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(166,124,82,0.30) 0%, rgba(166,124,82,0.10) 50%, rgba(166,124,82,0) 70%)",
        }}
      />

      {/* Left: brand panel (hidden on small screens) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#3D2B1F] px-14 py-12 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -left-16 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(166,124,82,0.45) 0%, rgba(166,124,82,0.1) 50%, rgba(166,124,82,0) 70%)",
          }}
        />

        <Link to="/" className="relative z-10 font-serif text-2xl font-semibold text-[#FBF7F1]">
          SmartHire<span className="text-[#D9A066]">AI</span>
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-md"
        >
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#FBF7F1]">
            Hire Smarter. Get Hired Faster.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#EDE1D3]/80">
            Sign in to pick up where you left off — optimized resumes,
            ranked matches, and every application in one place.
          </p>

          <ul className="mt-10 flex flex-col gap-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-[#EDE1D3]/90">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FBF7F1]/10">
                  <Icon className="h-4 w-4 text-[#D9A066]" strokeWidth={1.8} />
                </span>
                {text}
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="relative z-10 text-xs text-[#EDE1D3]/50">
          © {new Date().getFullYear()} SmartHire AI. All rights reserved.
        </p>
      </div>

      {/* Right: form panel */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-16 sm:px-10 lg:w-1/2">
        {/* Mobile-only brand mark */}
        <Link
          to="/"
          className="mb-10 font-serif text-2xl font-semibold text-[#2E211A] lg:hidden"
        >
          SmartHire<span className="text-[#8B5A2B]">AI</span>
        </Link>

        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;