// src/components/analysis/RecommendationsCard.tsx

import React from 'react'
import { motion, type Variants } from 'framer-motion'
import { Sparkles, Lightbulb, Inbox } from 'lucide-react'

interface RecommendationsCardProps {
  recommendations: string[]
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
 * Displays AI-generated resume recommendations as a stack of highlighted
 * cards. Visually matches ATSScoreCard, SummaryCard, SkillsSection,
 * StrengthCard, and WeaknessCard (same shell, palette, typography, and
 * animation language).
 */
const RecommendationsCard: React.FC<RecommendationsCardProps> = ({
  recommendations,
}) => {
  const hasRecommendations = recommendations.length > 0

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
          <Sparkles className="h-5 w-5" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-[#5C4033] sm:text-xl">
            AI Recommendations
          </h3>
          <p className="text-sm text-[#8A7A6C]">
            Personalized suggestions to improve your resume.
          </p>
        </div>
      </div>

      {/* Body */}
      {hasRecommendations ? (
        <motion.ul
          variants={listVariants}
          initial="hidden"
          animate="show"
          className="mt-7 flex flex-col gap-3"
        >
          {recommendations.map((recommendation) => (
            <motion.li
              key={recommendation}
              variants={itemVariants}
              whileHover={{ y: -3 }}
              className="flex items-start gap-3 rounded-xl border border-[#C89B3C]/25 bg-[#FAF7F2] px-4 py-3.5 shadow-sm transition-shadow duration-200 hover:shadow-md"
            >
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#C89B3C]/15 text-[#8B6A2F]">
                <Lightbulb className="h-4 w-4" strokeWidth={1.8} />
              </span>
              <span className="pt-0.5 text-sm font-medium leading-relaxed text-[#5C4033]">
                {recommendation}
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
          <Inbox className="h-8 w-8 text-[#8A7A6C]/50" strokeWidth={1.6} />
          <p className="text-sm text-[#8A7A6C]">
            No recommendations available.
          </p>
        </motion.div>
      )}
    </motion.div>
  )
}

export default RecommendationsCard