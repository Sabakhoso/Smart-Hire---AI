// src/components/dashboard/RecentResumeCard.tsx

import React from 'react'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'

type ResumeStatus = 'Uploaded' | 'Analyzing' | 'Completed' | 'Failed'

interface RecentResumeCardProps {
  fileName: string
  uploadDate: string
  atsScore?: number
  status: ResumeStatus
  onView?: () => void
}

/**
 * Maps each status to its badge styling. Kept as a lookup table so
 * the JSX stays declarative and new statuses are easy to add later.
 */
const statusConfig: Record<ResumeStatus, string> = {
  Uploaded: 'bg-[#3D2B1F]/[0.06] text-[#6B5847]',
  Analyzing: 'bg-amber-50 text-amber-700',
  Completed: 'bg-emerald-50 text-emerald-700',
  Failed: 'bg-red-50 text-red-600',
}

/**
 * Derives the ATS score badge label and color band from a numeric score.
 * Returns null if no score is supplied, so the caller can conditionally
 * render nothing rather than an empty badge.
 */
function getAtsScoreBand(score: number): { label: string; className: string } {
  if (score >= 95) {
    return { label: 'Excellent', className: 'bg-emerald-50 text-emerald-700 ring-emerald-200' }
  }
  if (score >= 80) {
    return { label: 'Good', className: 'bg-lime-50 text-lime-700 ring-lime-200' }
  }
  if (score >= 60) {
    return { label: 'Average', className: 'bg-amber-50 text-amber-700 ring-amber-200' }
  }
  return { label: 'Needs Improvement', className: 'bg-red-50 text-red-600 ring-red-200' }
}

/**
 * Reusable card summarizing a single recently uploaded resume, its
 * processing status, and (once available) its ATS score. Purely
 * presentational — no data fetching or backend wiring lives here.
 */
const RecentResumeCard: React.FC<RecentResumeCardProps> = ({
  fileName,
  uploadDate,
  atsScore,
  status,
  onView,
}) => {
  const scoreBand = typeof atsScore === 'number' ? getAtsScoreBand(atsScore) : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="flex h-full flex-col justify-between rounded-2xl border border-[#3D2B1F]/8 bg-white p-6 shadow-[0_8px_24px_rgba(61,43,31,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(61,43,31,0.12)]"
    >
      {/* Top row: filename + status badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#A6764B]/10 text-[#8B5A2B]">
            <FileText className="h-5 w-5" strokeWidth={1.8} />
          </div>
          <p className="truncate font-serif text-base font-semibold text-[#3D2B1F]">
            {fileName}
          </p>
        </div>

        <span
          className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${statusConfig[status]}`}
        >
          {status}
        </span>
      </div>

      {/* Middle: upload date + ATS score */}
      <div className="mt-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-[#8A7A6C]">
            Uploaded
          </p>
          <p className="mt-1 text-sm font-medium text-[#3D2B1F]">
            {uploadDate}
          </p>
        </div>

        {scoreBand && (
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`flex h-12 w-12 items-center justify-center rounded-full text-sm font-bold ring-1 ${scoreBand.className}`}
            >
              {atsScore}
            </div>
            <span className="text-[11px] font-medium text-[#8A7A6C]">
              {scoreBand.label}
            </span>
          </div>
        )}
      </div>

      {/* Bottom: primary action */}
      <button
        type="button"
        onClick={onView}
        className="mt-6 w-full rounded-xl bg-[#3D2B1F] px-4 py-2.5 text-sm font-semibold text-[#FBF7F1] transition-colors duration-300 hover:bg-[#2E211A] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#A6764B]"
      >
        View Analysis
      </button>
    </motion.div>
  )
}

export default RecentResumeCard