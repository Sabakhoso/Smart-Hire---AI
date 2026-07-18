// src/pages/jobseeker/ResumeAnalysisPage.tsx

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Sparkles } from 'lucide-react'

import ATSScoreCard from '../../components/analysis/ATSScoreCard'
import SummaryCard from '../../components/analysis/SummaryCard'
import SkillsSection from '../../components/analysis/SkillsSection'
import StrengthCard from '../../components/analysis/StrengthsCard'
import WeaknessCard from '../../components/analysis/WeaknessCard'
import RecommendationsCard from '../../components/analysis/RecommendationsCard'
import RecommendedRoles from '../../components/analysis/RecommendedRoles'

/**
 * Temporary mock data matching the exact backend ResumeAnalysisResult
 * shape. Replace with a real API call once resumeService integration
 * for this page is wired in — no fetching happens here yet.
 */
const analysis = {
  ats_score: 85,
  summary:
    'Highly motivated BS Artificial Intelligence student with strong programming, AI and problem-solving skills.',
  technical_skills: [
    'Python',
    'FastAPI',
    'Prompt Engineering',
    'SQL',
    'Machine Learning',
  ],
  soft_skills: ['Leadership', 'Communication', 'Critical Thinking', 'Teamwork'],
  missing_skills: ['Docker', 'AWS', 'Kubernetes'],
  strengths: [
    'Strong programming fundamentals',
    'Excellent communication skills',
    'Well structured projects',
  ],
  weaknesses: [
    'Limited industry experience',
    'Needs stronger cloud knowledge',
  ],
  improvement_suggestions: [
    'Learn Docker',
    'Build more AI projects',
    'Earn AWS certification',
  ],
  recommended_job_roles: [
    'AI Engineer',
    'Backend Developer',
    'Machine Learning Engineer',
    'Data Analyst',
  ],
  overall_recommendation: 'Good resume with strong AI potential.',
}

const sectionVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  },
}

const pageVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.12 },
  },
}

const ResumeAnalysisPage: React.FC = () => {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={pageVariants}
      className="mx-auto max-w-7xl space-y-8 px-6 py-10"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Section 1: Page title */}
      <motion.div variants={sectionVariants}>
        <h1 className="text-3xl font-bold text-[#5C4033] sm:text-4xl">
          Resume Analysis
        </h1>
        <p className="mt-2 text-base text-[#8A7A6C]">
          AI-powered insights extracted from your uploaded resume.
        </p>
      </motion.div>

      {/* Section 2: ATS Score, centered */}
      <motion.div variants={sectionVariants} className="flex justify-center">
        <ATSScoreCard score={analysis.ats_score} />
      </motion.div>

      {/* Section 3: Summary */}
      <motion.div variants={sectionVariants}>
        <SummaryCard summary={analysis.summary} />
      </motion.div>

      {/* Section 4: Skills */}
      <motion.div variants={sectionVariants}>
        <SkillsSection
          technicalSkills={analysis.technical_skills}
          softSkills={analysis.soft_skills}
          missingSkills={analysis.missing_skills}
        />
      </motion.div>

      {/* Section 5: Strengths / Weaknesses grid */}
      <motion.div
        variants={sectionVariants}
        className="grid grid-cols-1 gap-8 lg:grid-cols-2"
      >
        <StrengthCard strengths={analysis.strengths} />
        <WeaknessCard weaknesses={analysis.weaknesses} />
      </motion.div>

      {/* Section 6: Recommendations */}
      <motion.div variants={sectionVariants}>
        <RecommendationsCard
          recommendations={analysis.improvement_suggestions}
        />
      </motion.div>

      {/* Section 7: Recommended roles */}
      <motion.div variants={sectionVariants}>
        <RecommendedRoles roles={analysis.recommended_job_roles} />
      </motion.div>

      {/* Bottom: Overall recommendation, highlighted */}
      <motion.div
        variants={sectionVariants}
        className="rounded-2xl bg-gradient-to-br from-[#F3E7D3] to-[#FAF7F2] p-8 shadow-[0_8px_28px_rgba(92,64,51,0.08)] sm:p-10"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C89B3C]/15 text-[#C89B3C]">
            <Sparkles className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <h3 className="text-lg font-semibold text-[#5C4033] sm:text-xl">
            Overall Recommendation
          </h3>
        </div>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-[#5C4033]/90">
          {analysis.overall_recommendation}
        </p>
      </motion.div>
    </motion.div>
  )
}

export default ResumeAnalysisPage