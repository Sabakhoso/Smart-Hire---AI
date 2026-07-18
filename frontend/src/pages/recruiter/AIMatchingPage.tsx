// src/pages/recruiter/AIMatchingPage.tsx

import React from "react";
import { motion } from "framer-motion";
import {
  Sparkles,
  Star,
  User,
  Briefcase,
  Brain,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const candidates = [
  {
    id: 1,
    name: "Ayesha Khan",
    role: "Frontend Developer",
    match: 98,
    experience: "3 Years",
    skills: ["React", "TypeScript", "Tailwind CSS"],
  },
  {
    id: 2,
    name: "Ali Raza",
    role: "Machine Learning Engineer",
    match: 95,
    experience: "2 Years",
    skills: ["Python", "TensorFlow", "FastAPI"],
  },
  {
    id: 3,
    name: "Ahmed Hassan",
    role: "Backend Developer",
    match: 91,
    experience: "4 Years",
    skills: ["Node.js", "PostgreSQL", "Docker"],
  },
  {
    id: 4,
    name: "Fatima Noor",
    role: "UI/UX Designer",
    match: 89,
    experience: "2 Years",
    skills: ["Figma", "Adobe XD", "Design Systems"],
  },
];

const AIMatchingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FBF7F1] px-6 py-10">
      <div className="mx-auto max-w-7xl space-y-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)]"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <Sparkles
                  className="h-8 w-8 text-[#A6764B]"
                  strokeWidth={1.8}
                />

                <h1 className="font-serif text-3xl font-semibold text-[#3D2B1F]">
                  AI Candidate Matching
                </h1>
              </div>

              <p className="mt-4 max-w-3xl text-[#6B5847]">
                SmartHire AI automatically analyzes resumes, compares
                skills, experience, education, and job requirements,
                then recommends the most suitable candidates for your
                open positions.
              </p>
            </div>

            <button className="rounded-xl bg-[#3D2B1F] px-6 py-3 font-medium text-white transition hover:bg-[#2B1D14]">
              Run AI Matching
            </button>
          </div>
        </motion.div>

        {/* AI Summary */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-6 md:grid-cols-3"
        >
          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Brain
              className="mb-4 h-8 w-8 text-[#A6764B]"
              strokeWidth={1.8}
            />

            <h2 className="font-semibold text-[#3D2B1F]">
              AI Analysis
            </h2>

            <p className="mt-2 text-sm text-[#6B5847]">
              Resume content, ATS score, experience and skills are
              analyzed automatically.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Briefcase
              className="mb-4 h-8 w-8 text-[#A6764B]"
              strokeWidth={1.8}
            />

            <h2 className="font-semibold text-[#3D2B1F]">
              Job Matching
            </h2>

            <p className="mt-2 text-sm text-[#6B5847]">
              Candidates are ranked according to your selected job
              description.
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">
            <Star
              className="mb-4 h-8 w-8 text-[#A6764B]"
              strokeWidth={1.8}
            />

            <h2 className="font-semibold text-[#3D2B1F]">
              Smart Ranking
            </h2>

            <p className="mt-2 text-sm text-[#6B5847]">
              Top candidates are highlighted based on the overall AI
              compatibility score.
            </p>
          </div>
        </motion.div>

        {/* Matching Results */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)]"
        >
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h2 className="font-serif text-2xl font-semibold text-[#3D2B1F]">
                Top AI Recommendations
              </h2>

              <p className="mt-2 text-sm text-[#6B5847]">
                Candidates ranked according to AI compatibility.
              </p>
            </div>

            <span className="rounded-full bg-[#A6764B]/10 px-4 py-2 text-sm font-medium text-[#A6764B]">
              {candidates.length} Candidates
            </span>
          </div>

          <div className="space-y-5">
            {candidates.map((candidate) => (
              <motion.div
                key={candidate.id}
                whileHover={{ y: -3 }}
                className="rounded-2xl border border-[#3D2B1F]/10 p-6 transition hover:border-[#A6764B]/40"
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

                  {/* Left */}
                  <div className="flex items-start gap-5">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#A6764B]/10">
                      <User
                        className="h-7 w-7 text-[#A6764B]"
                        strokeWidth={1.8}
                      />
                    </div>

                    <div>
                      <h3 className="text-xl font-semibold text-[#3D2B1F]">
                        {candidate.name}
                      </h3>

                      <p className="mt-1 text-[#6B5847]">
                        {candidate.role}
                      </p>

                      <p className="mt-2 text-sm text-[#6B5847]">
                        Experience: {candidate.experience}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {candidate.skills.map((skill) => (
                          <span
                            key={skill}
                            className="rounded-full bg-[#A6764B]/10 px-3 py-1 text-xs font-medium text-[#A6764B]"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right */}
                  <div className="flex flex-col items-end gap-4">

                    <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">
                      <CheckCircle2
                        className="h-5 w-5 text-emerald-600"
                      />

                      <span className="font-semibold text-emerald-700">
                        {candidate.match}% Match
                      </span>
                    </div>

                    <button className="flex items-center gap-2 rounded-xl bg-[#3D2B1F] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#2B1D14]">
                      View Profile
                      <ArrowRight className="h-4 w-4" />
                    </button>

                  </div>

                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="rounded-2xl bg-[#3D2B1F] p-8 text-white"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

            <div>
              <h2 className="font-serif text-3xl font-semibold">
                Let AI Find Your Perfect Candidate
              </h2>

              <p className="mt-3 max-w-2xl text-[#F2E7DA]">
                SmartHire AI evaluates every application in seconds,
                ranks candidates objectively, and recommends the most
                qualified talent to help you hire faster.
              </p>
            </div>

            <button className="rounded-xl bg-[#A6764B] px-7 py-3 font-semibold transition hover:bg-[#8B5A2B]">
              Analyze New Applicants
            </button>

          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AIMatchingPage;