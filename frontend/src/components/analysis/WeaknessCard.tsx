// src/components/analysis/WeaknessCard.tsx

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { AlertTriangle, ShieldCheck } from 'lucide-react'

interface WeaknessCardProps {
  weaknesses: string[]
}

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Displays AI-detected resume weaknesses / missing areas as a stack of
 * highlighted rows. Visually matches ATSScoreCard, SummaryCard,
 * SkillsSection, and StrengthCard (same shell, typography, and
 * animation language, with a warning palette for content emphasis).
 */
const WeaknessCard: React.FC<WeaknessCardProps> = ({ weaknesses }) => {
  const hasWeaknesses = weaknesses.length > 0

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
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-red-50 text-red-600">
          <AlertTriangle className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#5C4033] sm:text-xl">
            Areas for Improvement
          </h3>
          <p className="text-sm text-[#8A7A6C]">
            AI detected weaknesses or missing areas.
          </p>
        </div>
      </div>

      {/* Body */}
      {hasWeaknesses ? (
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="mt-7 flex flex-col gap-3"
        >
          {weaknesses.map((weakness) => (
            <motion.li
              key={weakness}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 rounded-xl border border-red-100 bg-red-50/60 px-4 py-3.5 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                <AlertTriangle className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="text-sm font-medium text-[#5C4033]">
                {weakness}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-7 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#5C4033]/15 py-12 text-center"
        >
          <ShieldCheck className="h-8 w-8 text-[#8A7A6C]/50" strokeWidth={1.6} />
          <p className="text-sm text-[#8A7A6C]">
            No weaknesses detected.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default WeaknessCard