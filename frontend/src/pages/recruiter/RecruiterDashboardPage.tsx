// src/pages/recruiter/RecruiterDashboardPage.tsx

import React from "react";
import { motion, type Variants } from "framer-motion";
import {
  Briefcase,
  Users,
  ClipboardList,
  CalendarCheck,
  PlusCircle,
  Search,
  Sparkles,
  BarChart3,
  Clock3,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatsCard from "../../components/dashboard/StatsCard";
import QuickActionCard from "../../components/dashboard/QuickCardAction";

const pageVariants: Variants = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const statsVariants: Variants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const slideLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  show: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const RecruiterDashboardPage: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={pageVariants}
      className="min-h-screen bg-[#FBF7F1] px-6 py-10"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header */}
        <motion.div variants={fadeUpVariants}>
          <DashboardHeader />
        </motion.div>

        {/* Stats */}
        <motion.div
          variants={statsVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4"
        >
          <motion.div variants={fadeUpVariants}>
            <StatsCard
              title="Active Jobs"
              value={12}
              subtitle="Currently Open"
              trend="up"
              icon={
                <Briefcase
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              }
            />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <StatsCard
              title="Candidates"
              value={248}
              subtitle="Total Applicants"
              trend="up"
              icon={
                <Users
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              }
            />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <StatsCard
              title="Applications"
              value={91}
              subtitle="This Month"
              trend="neutral"
              icon={
                <ClipboardList
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              }
            />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <StatsCard
              title="Interviews"
              value={18}
              subtitle="Scheduled"
              trend="up"
              icon={
                <CalendarCheck
                  className="h-5 w-5"
                  strokeWidth={1.8}
                />
              }
            />
          </motion.div>
        </motion.div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recruiter Overview */}
          <motion.div
            variants={slideLeft}
            className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)] lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-serif text-2xl font-semibold text-[#3D2B1F]">
                  Recruitment Overview
                </h2>

                <p className="mt-2 text-sm text-[#6B5847]">
                  Your hiring activity at a glance.
                </p>
              </div>

              <div className="rounded-full bg-[#A6764B]/10 p-4">
                <BarChart3
                  className="h-6 w-6 text-[#A6764B]"
                  strokeWidth={1.8}
                />
              </div>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-2">
              <div className="rounded-xl border border-[#3D2B1F]/10 p-5">
                <div className="flex items-center gap-3">
                  <Clock3
                    className="h-5 w-5 text-[#A6764B]"
                  />

                  <h3 className="font-semibold text-[#3D2B1F]">
                    Pending Reviews
                  </h3>
                </div>

                <p className="mt-4 text-4xl font-bold text-[#3D2B1F]">
                  37
                </p>

                <p className="mt-2 text-sm text-[#6B5847]">
                  Candidates awaiting resume screening.
                </p>
              </div>

              <div className="rounded-xl border border-[#3D2B1F]/10 p-5">
                <div className="flex items-center gap-3">
                  <CheckCircle2
                    className="h-5 w-5 text-emerald-600"
                  />

                  <h3 className="font-semibold text-[#3D2B1F]">
                    AI Shortlisted
                  </h3>
                </div>

                <p className="mt-4 text-4xl font-bold text-[#3D2B1F]">
                  24
                </p>

                <p className="mt-2 text-sm text-[#6B5847]">
                  High-quality candidates recommended by AI.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Quick Actions - wrapped in a motion.div */}
          <motion.div
            variants={slideRight}
            className="space-y-5"
          >
            <QuickActionCard
              title="Post New Job"
              description="Create a new AI-powered job listing."
              icon={<PlusCircle className="h-5 w-5" />}
              href="/dashboard/recruiter/jobs/create"
            />

            <QuickActionCard
              title="Browse Candidates"
              description="Search and review candidate profiles."
              icon={<Search className="h-5 w-5" />}
              href="/dashboard/recruiter/candidates"
            />

            <QuickActionCard
              title="AI Matching"
              description="Find the best candidates instantly."
              icon={<Sparkles className="h-5 w-5" />}
              href="/dashboard/recruiter/matching"
            />
          </motion.div>
        </div>

        {/* Recent Activity + Hiring Pipeline */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* Recent Hiring Activity */}
          <motion.div
            variants={slideLeft}
            className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)] lg:col-span-2"
          >
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-semibold text-[#3D2B1F]">
                Recent Activity
              </h2>

              <button className="flex items-center gap-2 text-sm font-medium text-[#A6764B] transition hover:text-[#8B5A2B]">
                View All
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>

            <div className="mt-8 space-y-5">
              {[
                {
                  title: "Frontend Developer",
                  text: "12 new applications received",
                  status: "2 hours ago",
                },
                {
                  title: "Machine Learning Engineer",
                  text: "5 candidates shortlisted by AI",
                  status: "Today",
                },
                {
                  title: "UI/UX Designer",
                  text: "Interview scheduled with 3 applicants",
                  status: "Yesterday",
                },
                {
                  title: "Backend Developer",
                  text: "Job posting reached 450+ views",
                  status: "2 days ago",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center justify-between rounded-xl border border-[#3D2B1F]/10 p-5 transition hover:border-[#A6764B]/30"
                >
                  <div>
                    <h3 className="font-semibold text-[#3D2B1F]">
                      {item.title}
                    </h3>

                    <p className="mt-1 text-sm text-[#6B5847]">
                      {item.text}
                    </p>
                  </div>

                  <span className="text-xs font-medium text-[#A6764B]">
                    {item.status}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Hiring Pipeline */}
          <motion.div
            variants={slideRight}
            className="rounded-2xl bg-white p-8 shadow-[0_8px_24px_rgba(61,43,31,0.06)]"
          >
            <h2 className="font-serif text-2xl font-semibold text-[#3D2B1F]">
              Hiring Pipeline
            </h2>

            <div className="mt-8 space-y-6">
              {[
                {
                  stage: "Applications",
                  value: 248,
                  color: "bg-blue-500",
                },
                {
                  stage: "Screening",
                  value: 74,
                  color: "bg-yellow-500",
                },
                {
                  stage: "Interview",
                  value: 18,
                  color: "bg-purple-500",
                },
                {
                  stage: "Final Review",
                  value: 9,
                  color: "bg-orange-500",
                },
                {
                  stage: "Hired",
                  value: 4,
                  color: "bg-emerald-500",
                },
              ].map((item) => (
                <div key={item.stage}>
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-medium text-[#3D2B1F]">
                      {item.stage}
                    </span>

                    <span className="text-[#6B5847]">
                      {item.value}
                    </span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-[#EFE8DE]">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{
                        width: `${Math.min(item.value / 2.5, 100)}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          variants={fadeUpVariants}
          className="rounded-2xl bg-[#3D2B1F] p-8 text-white"
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="font-serif text-3xl font-semibold">
                Hire Faster with SmartHire AI
              </h2>

              <p className="mt-3 max-w-2xl text-[#F2E7DA]">
                Let AI analyze resumes, rank candidates, and recommend
                the best talent automatically so you can spend more time
                interviewing the right people.
              </p>
            </div>

            <button className="rounded-xl bg-[#A6764B] px-7 py-3 font-semibold transition hover:bg-[#8B5A2B]">
              Start Recruiting
            </button>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default RecruiterDashboardPage;