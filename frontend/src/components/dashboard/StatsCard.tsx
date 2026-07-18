// src/components/dashboard/StatsCard.tsx

import React from 'react'
import { motion } from 'framer-motion'
import { ArrowUp, ArrowDown, Minus } from 'lucide-react'

interface StatsCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: React.ReactNode
  color?: string
  trend?: 'up' | 'down' | 'neutral'
}

/**
 * Maps a trend direction to its icon, color, and accessible label.
 * Kept as a lookup rather than inline conditionals so the JSX stays clean.
 */
const trendConfig = {
  up: {
    Icon: ArrowUp,
    className: 'text-emerald-600 bg-emerald-50',
    label: 'Trending up',
  },
  down: {
    Icon: ArrowDown,
    className: 'text-red-600 bg-red-50',
    label: 'Trending down',
  },
  neutral: {
    Icon: Minus,
    className: 'text-gray-500 bg-gray-100',
    label: 'No change',
  },
} as const

/**
 * Reusable stat tile for the dashboard grid (ATS Score, Total Resume
 * Uploads, AI Analyses Completed, Improvement Suggestions, etc).
 * Purely presentational — the caller supplies the value, no data
 * fetching or mock content lives here.
 */
const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  subtitle,
  icon,
  color = '#A6764B',
  trend,
}) => {
  const trendInfo = trend ? trendConfig[trend] : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, scale: 1.015 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex h-full flex-col justify-between rounded-2xl border border-[#3D2B1F]/8 bg-white p-6 shadow-[0_8px_24px_rgba(61,43,31,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(61,43,31,0.12)]"
    >
      {/* Circular icon container, top-right */}
      <div
        className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full"
        style={{ backgroundColor: `${color}1A`, color }}
      >
        {icon}
      </div>

      <div className="pr-14">
        <p className="text-xs font-semibold uppercase tracking-wider text-[#6B5847]">
          {title}
        </p>

        <p className="mt-2 font-serif text-3xl font-bold text-[#3D2B1F] sm:text-4xl">
          {value}
        </p>

        {subtitle && (
          <p className="mt-1 text-sm text-[#8A7A6C]">{subtitle}</p>
        )}
      </div>

      {/* Optional trend indicator */}
      {trendInfo && (
        <div className="mt-4 flex items-center gap-1.5">
          <span
            className={`flex h-6 w-6 items-center justify-center rounded-full ${trendInfo.className}`}
            aria-label={trendInfo.label}
          >
            <trendInfo.Icon className="h-3.5 w-3.5" strokeWidth={2} />
          </span>
          <span className="text-xs font-medium text-[#8A7A6C]">
            {trendInfo.label}
          </span>
        </div>
      )}
    </motion.div>
  )
}

export default StatsCard