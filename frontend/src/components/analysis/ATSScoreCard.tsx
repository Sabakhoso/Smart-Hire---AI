import React, { useEffect, useState } from 'react'
import { motion, useMotionValue, useTransform, animate } from 'framer-motion'
import { ShieldCheck } from 'lucide-react'

interface ATSScoreCardProps {
  score: number
}

/**
 * Derives the status label and color for a given ATS score.
 * Kept as a lookup function so the JSX stays declarative.
 */
function getScoreStatus(score: number): { label: string; color: string; bg: string } {
  if (score >= 85) {
    return { label: 'Excellent', color: '#1E7A4C', bg: 'rgba(30,122,76,0.08)' }
  }
  if (score >= 70) {
    return { label: 'Good', color: '#C89B3C', bg: 'rgba(200,155,60,0.10)' }
  }
  if (score >= 50) {
    return { label: 'Average', color: '#B3752E', bg: 'rgba(179,117,46,0.10)' }
  }
  return { label: 'Needs Improvement', color: '#B3452E', bg: 'rgba(179,69,46,0.08)' }
}

const RADIUS = 88
const STROKE_WIDTH = 12
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

/**
 * Premium dashboard card showing an animated circular ATS score ring.
 * The ring fills and the numeric value counts up from 0 to `score` on
 * mount, driven by a single Framer Motion animation so both stay in sync.
 */
const ATSScoreCard: React.FC<ATSScoreCardProps> = ({ score }) => {
  const clampedScore = Math.min(100, Math.max(0, score))
  const status = getScoreStatus(clampedScore)

  const motionValue = useMotionValue(0)
  const [displayValue, setDisplayValue] = useState(0)
  const strokeDashoffset = useTransform(
    motionValue,
    (value) => CIRCUMFERENCE - (value / 100) * CIRCUMFERENCE
  )

  useEffect(() => {
    const controls = animate(motionValue, clampedScore, {
      duration: 1.4,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (value) => setDisplayValue(Math.round(value)),
    })
    return () => controls.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clampedScore])

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full max-w-sm flex-col items-center rounded-2xl border border-[#5C4033]/8 bg-white p-8 shadow-[0_8px_28px_rgba(92,64,51,0.08)] transition-shadow duration-300 hover:shadow-[0_18px_42px_rgba(92,64,51,0.14)] sm:p-10"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Circular progress ring */}
      <div className="relative flex items-center justify-center">
        <svg
          width="220"
          height="220"
          viewBox="0 0 220 220"
          className="-rotate-90"
        >
          {/* Track */}
          <circle
            cx="110"
            cy="110"
            r={RADIUS}
            fill="none"
            stroke="#5C4033"
            strokeOpacity="0.08"
            strokeWidth={STROKE_WIDTH}
          />
          {/* Progress */}
          <motion.circle
            cx="110"
            cy="110"
            r={RADIUS}
            fill="none"
            stroke={status.color}
            strokeWidth={STROKE_WIDTH}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            style={{ strokeDashoffset }}
          />
        </svg>

        {/* Center content */}
        <div className="absolute flex flex-col items-center">
          <span className="font-serif text-5xl font-bold text-[#5C4033]">
            {displayValue}
          </span>
          <span className="mt-1 text-xs font-medium uppercase tracking-wider text-[#8A7A6C]">
            out of 100
          </span>
        </div>
      </div>

      {/* Status badge */}
      <span
        className="mt-6 rounded-full px-4 py-1.5 text-sm font-semibold"
        style={{ color: status.color, backgroundColor: status.bg }}
      >
        {status.label}
      </span>

      {/* Title */}
      <div className="mt-5 flex items-center gap-2">
        <ShieldCheck className="h-4.5 w-4.5 text-[#C89B3C]" strokeWidth={1.8} />
        <h3 className="text-lg font-semibold text-[#5C4033]">
          ATS Compatibility Score
        </h3>
      </div>

      {/* Description */}
      <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-[#8A7A6C]">
        This resume is evaluated based on ATS readability, formatting, keyword
        optimization and recruiter friendliness.
      </p>
    </motion.div>
  )
}

export default ATSScoreCard