// src/pages/jobseeker/JobSeekerDashboardPage.tsx

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { FileCheck2, Target, Send, Users, UploadCloud } from 'lucide-react'

import DashboardHeader from '../../components/dashboard/DashboardHeader'
import StatsCard from '../../components/dashboard/StatsCard'
import QuickActionCard from '../../components/dashboard/QuickCardAction'
import RecentResumeCard from '../../components/dashboard/RecentResumeCard'

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const statsContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const slideLeftVariants: Variants = {
  hidden: { opacity: 0, x: -32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const slideRightVariants: Variants = {
  hidden: { opacity: 0, x: 32 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const JobSeekerDashboardPage: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={pageVariants}
      className="min-h-screen bg-[#FBF7F1] px-6 py-10"
    >
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Dashboard header */}
        <motion.div variants={fadeUpVariants}>
          <DashboardHeader />
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={statsContainerVariants}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
        >
          <motion.div variants={fadeUpVariants}>
            <StatsCard
              title="Resume Score"
              value={85}
              subtitle="Out of 100"
              icon={<FileCheck2 className="h-5 w-5" strokeWidth={1.8} />}
              trend="up"
            />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <StatsCard
              title="Jobs Matched"
              value={42}
              subtitle="This month"
              icon={<Target className="h-5 w-5" strokeWidth={1.8} />}
              trend="up"
            />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <StatsCard
              title="Applications"
              value={16}
              subtitle="Submitted"
              icon={<Send className="h-5 w-5" strokeWidth={1.8} />}
              trend="neutral"
            />
          </motion.div>

          <motion.div variants={fadeUpVariants}>
            <StatsCard
              title="Interviews"
              value={5}
              subtitle="Scheduled"
              icon={<Users className="h-5 w-5" strokeWidth={1.8} />}
              trend="up"
            />
          </motion.div>
        </motion.div>

        {/* Two-column layout: recent resume + quick action */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <motion.div variants={slideLeftVariants} className="lg:col-span-2">
            <RecentResumeCard
              fileName="Saba_Resume_2026.pdf"
              uploadDate="Jul 10, 2026"
              atsScore={85}
              status="Completed"
              onView={() => {}}
            />
          </motion.div>

          <motion.div variants={slideRightVariants} className="lg:col-span-1">
            <QuickActionCard
              title="Upload Resume"
              description="Add a new resume to get instant AI-powered analysis."
              icon={<UploadCloud className="h-5 w-5" strokeWidth={1.8} />}
              href="/dashboard/resume"
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  )
}

export default JobSeekerDashboardPage