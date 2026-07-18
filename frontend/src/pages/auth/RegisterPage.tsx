// src/pages/auth/RegisterPage.tsx

import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FileCheck2, Users, Zap } from "lucide-react";
import RegisterForm from "../../components/auth/RegisterForm";

/**
 * RegisterPage mirrors LoginPage's split-screen layout for visual
 * consistency across the auth module, with copy tailored to
 * onboarding rather than returning users.
 */
const highlights = [
  {
    icon: FileCheck2,
    text: "AI-optimized resume the moment you join",
  },
  {
    icon: Zap,
    text: "Get matched to relevant roles instantly",
  },
  {
    icon: Users,
    text: "Trusted by job seekers and recruiters alike",
  },
];

const RegisterPage: React.FC = () => {
  return (
    <div className="relative flex min-h-screen w-full bg-[#FBF7F1]">
      {/* Ambient glow, consistent with hero/landing sections */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-32 left-[-10%] h-[520px] w-[520px] rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(166,124,82,0.30) 0%, rgba(166,124,82,0.10) 50%, rgba(166,124,82,0) 70%)",
        }}
      />

      {/* Left: form panel (on register, form comes first for lower friction) */}
      <div className="relative flex w-full flex-col items-center justify-center px-6 py-16 sm:px-10 lg:w-1/2">
        {/* Mobile-only brand mark */}
        <Link
          to="/"
          className="mb-10 font-serif text-2xl font-semibold text-[#2E211A] lg:hidden"
        >
          SmartHire<span className="text-[#8B5A2B]">AI</span>
        </Link>

        <RegisterForm />
      </div>

      {/* Right: brand panel (hidden on small screens) */}
      <div className="relative hidden w-1/2 flex-col justify-between overflow-hidden bg-[#3D2B1F] px-14 py-12 lg:flex">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-24 -right-16 h-[380px] w-[380px] rounded-full opacity-30 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(166,124,82,0.45) 0%, rgba(166,124,82,0.1) 50%, rgba(166,124,82,0) 70%)",
          }}
        />

        <div className="relative z-10 flex justify-end">
          <Link to="/" className="font-serif text-2xl font-semibold text-[#FBF7F1]">
            SmartHire<span className="text-[#D9A066]">AI</span>
          </Link>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10 max-w-md self-end text-right"
        >
          <h2 className="font-serif text-3xl font-semibold leading-tight text-[#FBF7F1]">
            Join a Smarter Way to Hire.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#EDE1D3]/80">
            Create your account and let SmartHire AI optimize your resume or
            surface your best-fit candidates from day one.
          </p>

          <ul className="mt-10 flex flex-col gap-4">
            {highlights.map(({ icon: Icon, text }) => (
              <li
                key={text}
                className="flex items-center justify-end gap-3 text-sm text-[#EDE1D3]/90"
              >
                {text}
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#FBF7F1]/10">
                  <Icon className="h-4 w-4 text-[#D9A066]" strokeWidth={1.8} />
                </span>
              </li>
            ))}
          </ul>
        </motion.div>

        <p className="relative z-10 text-right text-xs text-[#EDE1D3]/50">
          © {new Date().getFullYear()} SmartHire AI. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;