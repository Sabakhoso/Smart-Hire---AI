// src/components/analysis/StrengthCard.tsx

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { CheckCircle2, ClipboardCheck } from 'lucide-react'

interface StrengthCardProps {
  strengths: string[]
}

const listVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants: Variants = {
  hidden: { opacity: 0, x: -16 },
  show: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
  },
}

/**
 * Displays AI-detected resume strengths as a stack of highlighted list
 * items. Visually matches ATSScoreCard, SummaryCard, and SkillsSection
 * (same card shell, palette family, and animation language).
 */
const StrengthCard: React.FC<StrengthCardProps> = ({ strengths }) => {
  const hasStrengths = strengths.length > 0

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl border border-[#E8DCCF] bg-[#FFFDF9] p-8 shadow-[0_8px_28px_rgba(90,62,43,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(90,62,43,0.14)] sm:p-10"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#2E7D32]/10 text-[#2E7D32]">
          <CheckCircle2 className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#5A3E2B] sm:text-xl">
            Resume Strengths
          </h3>
          <p className="text-sm text-[#8B5E3C]/80">
            Strong points detected by AI
          </p>
        </div>
      </div>

      {/* Body */}
      {hasStrengths ? (
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="mt-7 flex flex-col gap-3"
        >
          {strengths.map((strength) => (
            <motion.li
              key={strength}
              variants={itemVariants}
              whileHover={{ x: 4 }}
              className="flex items-center gap-3 rounded-xl border border-[#2E7D32]/15 bg-[#2E7D32]/[0.05] px-4 py-3.5 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#2E7D32] text-white">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2} />
              </span>
              <span className="text-sm font-medium text-[#5A3E2B]">
                {strength}
              </span>
            </motion.li>
          ))}
        </motion.ul>
      ) : (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="mt-7 flex flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-[#E8DCCF] py-12 text-center"
        >
          <ClipboardCheck className="h-8 w-8 text-[#8B5E3C]/40" strokeWidth={1.6} />
          <p className="text-sm text-[#8B5E3C]/70">
            No strengths detected yet.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default StrengthCard