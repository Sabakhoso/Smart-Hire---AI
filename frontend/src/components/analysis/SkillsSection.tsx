// src/components/analysis/SkillsSection.tsx

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Sparkles, AlertCircle } from 'lucide-react'

interface SkillsSectionProps {
  technicalSkills: string[]
  softSkills: string[]
  missingSkills: string[]
}

const sectionContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
}

const columnVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
  },
}

const chipContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.05 },
  },
}

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Single large "Skills Analysis" card containing three sub-sections:
 * Technical Skills, Soft Skills, and Missing Skills. Visually matches
 * ATSScoreCard and SummaryCard (same shell, palette, typography,
 * shadow and animation language).
 */
const SkillsSection: React.FC<SkillsSectionProps> = ({
  technicalSkills,
  softSkills,
  missingSkills,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl border border-[#5C4033]/8 bg-white p-8 shadow-[0_8px_28px_rgba(92,64,51,0.08)] sm:p-10"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C89B3C]/10 text-[#C89B3C]">
          <Sparkles className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#5C4033] sm:text-xl">
            Skills Analysis
          </h3>
          <p className="text-sm text-[#8A7A6C]">
            AI extracted skills from your resume.
          </p>
        </div>
      </div>

      {/* Three sections */}
      <motion.div
        variants={sectionContainerVariants}
        initial="hidden"
        animate="show"
        className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Technical Skills */}
        <motion.div variants={columnVariants}>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#5C4033]">
            Technical Skills
          </h4>
          <motion.div
            variants={chipContainerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {technicalSkills.map((skill) => (
              <motion.span
                key={skill}
                variants={chipVariants}
                whileHover={{ scale: 1.06 }}
                className="cursor-default rounded-full bg-[#5C4033] px-4 py-1.5 text-sm font-medium text-white shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Soft Skills */}
        <motion.div variants={columnVariants}>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#5C4033]">
            Soft Skills
          </h4>
          <motion.div
            variants={chipContainerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {softSkills.map((skill) => (
              <motion.span
                key={skill}
                variants={chipVariants}
                whileHover={{ scale: 1.06 }}
                className="cursor-default rounded-full bg-[#C89B3C]/15 px-4 py-1.5 text-sm font-medium text-[#8B6A2F] shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>

        {/* Missing Skills */}
        <motion.div variants={columnVariants}>
          <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#5C4033]">
            Missing Skills
          </h4>
          <motion.div
            variants={chipContainerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-wrap gap-2"
          >
            {missingSkills.map((skill) => (
              <motion.span
                key={skill}
                variants={chipVariants}
                whileHover={{ scale: 1.06, x: [0, -2, 2, -2, 0] }}
                transition={{ duration: 0.4 }}
                className="flex cursor-default items-center gap-1.5 rounded-full bg-red-50 px-4 py-1.5 text-sm font-medium text-red-700 shadow-sm transition-shadow duration-200 hover:shadow-md"
              >
                <AlertCircle className="h-3.5 w-3.5" strokeWidth={1.8} />
                {skill}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

export default SkillsSection