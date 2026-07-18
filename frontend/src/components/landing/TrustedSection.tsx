"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  GraduationCap,
  Briefcase,
  Users,
  Rocket,
  Building2,
  type LucideIcon,
} from "lucide-react";

interface AudienceCard {
  icon: LucideIcon;
  title: string;
  description: string;
}

const audiences: AudienceCard[] = [
  {
    icon: GraduationCap,
    title: "Students",
    description: "Build a standout resume before you even land your first interview.",
  },
  {
    icon: Briefcase,
    title: "Professionals",
    description: "Optimize your resume and match with roles suited to your experience.",
  },
  {
    icon: Users,
    title: "Recruiters",
    description: "Surface qualified candidates in minutes with AI-driven screening.",
  },
  {
    icon: Rocket,
    title: "Startups",
    description: "Hire lean, hire fast — find the right fit without a full HR team.",
  },
  {
    icon: Building2,
    title: "HR Teams",
    description: "Streamline pipelines and reduce time-to-hire across every role.",
  },
];

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
};

const TrustedSection: React.FC = () => {
  return (
    <section className="relative w-full bg-[#FBF7F1] px-6 py-24 sm:px-10 lg:px-16">
      {/* Ambient glow accents to tie into hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 left-1/2 h-[420px] w-[420px] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(166,124,82,0.25) 0%, rgba(166,124,82,0.08) 50%, rgba(166,124,82,0) 70%)",
        }}
      />

      <div className="relative mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-[#3D2B1F]/15 bg-[#3D2B1F]/[0.04] px-4 py-1.5 text-sm font-medium tracking-wide text-[#6B4E3D]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#A6764B]" />
            Who It&apos;s For
          </span>

          <h2 className="font-serif text-3xl font-semibold leading-tight tracking-tight text-[#2E211A] sm:text-4xl lg:text-5xl">
            Built for Modern Hiring
          </h2>

          <p className="mt-5 text-base leading-relaxed text-[#6B5847] sm:text-lg">
            Whether you&apos;re landing your first job or building a whole
            team, SmartHire AI adapts to how you hire and how you get hired —
            students, professionals, recruiters, startups, and HR teams alike.
          </p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5"
        >
          {audiences.map(({ icon: Icon, title, description }) => (
            <motion.div
              key={title}
              variants={cardVariants}
              whileHover={{ y: -6 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="group relative flex flex-col items-start rounded-2xl border border-[#3D2B1F]/10 bg-[#FFFDF9] p-7 shadow-[0_8px_24px_rgba(61,43,31,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(61,43,31,0.12)] hover:border-[#3D2B1F]/20"
            >
              <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-[#3D2B1F] transition-colors duration-300 group-hover:bg-[#8B5A2B]">
                <Icon className="h-6 w-6 text-[#FBF7F1]" strokeWidth={1.8} />
              </div>

              <h3 className="font-serif text-lg font-semibold text-[#2E211A]">
                {title}
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-[#6B5847]">
                {description}
              </p>

              <span
                aria-hidden
                className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(120px circle at 50% 0%, rgba(166,124,82,0.10), transparent 70%)",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedSection;