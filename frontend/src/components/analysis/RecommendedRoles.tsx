// src/components/analysis/RecommendedRoles.tsx

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Briefcase, CompassIcon } from 'lucide-react'

interface RecommendedRolesProps {
  roles: string[]
}

const pillContainerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.07 },
  },
}

const pillVariants: Variants = {
  hidden: { opacity: 0, y: 12, scale: 0.9 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Displays AI-recommended job roles as premium gradient pills.
 * Visually matches ATSScoreCard, SummaryCard, SkillsSection,
 * StrengthCard, WeaknessCard, and RecommendationsCard.
 */
const RecommendedRoles: React.FC<RecommendedRolesProps> = ({ roles }) => {
  const hasRoles = roles.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl border border-[#5C4033]/8 bg-white p-8 shadow-[0_8px_28px_rgba(92,64,51,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(92,64,51,0.14)] sm:p-10"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#C89B3C]/10 text-[#C89B3C]">
          <Briefcase className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#5C4033] sm:text-xl">
            Recommended Job Roles
          </h3>
          <p className="text-sm text-[#8A7A6C]">
            Career opportunities suggested by AI.
          </p>
        </div>
      </div>

      {/* Body */}
      {hasRoles ? (
        <motion.div
          variants={pillContainerVariants}
          initial="hidden"
          animate="show"
          className="mt-7 flex flex-wrap gap-3"
        >
          {roles.map((role) => (
            <motion.span
              key={role}
              variants={pillVariants}
              whileHover={{ scale: 1.06 }}
              className="cursor-default rounded-full bg-gradient-to-r from-[#5C4033] to-[#8B5E3C] px-5 py-2 text-sm font-medium text-white shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              {role}
            </motion.span>
          ))}
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-7 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#5C4033]/15 py-12 text-center"
        >
          <CompassIcon className="h-8 w-8 text-[#8A7A6C]/50" strokeWidth={1.6} />
          <p className="text-sm text-[#8A7A6C]">
            No recommended roles available.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default RecommendedRoles