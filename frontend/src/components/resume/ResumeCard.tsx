import React from 'react'
import { motion } from 'framer-motion'
import { FileText, Sparkles, Trash2, Calendar, HardDrive } from 'lucide-react'
import type { Resume } from '../../types/resume'

interface ResumeCardProps {
  resume: Resume
  onAnalyze: (resume: Resume) => void
  onRemove: (resume: Resume) => void
  isAnalyzing?: boolean
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
}

function formatDate(isoString: string): string {
  const date = new Date(isoString)
  if (Number.isNaN(date.getTime())) return isoString
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

const ResumeCard: React.FC<ResumeCardProps> = ({
  resume,
  onAnalyze,
  onRemove,
  isAnalyzing = false,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className="group relative flex w-full flex-col rounded-2xl border border-[#3D2B1F]/10 bg-white p-6 shadow-[0_8px_24px_rgba(61,43,31,0.06)] transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(61,43,31,0.12)] sm:flex-row sm:items-center sm:justify-between sm:p-7"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#3D2B1F] transition-colors duration-300 group-hover:bg-[#8B5A2B]">
          <FileText className="h-5 w-5 text-[#FBF7F1]" strokeWidth={1.8} />
        </div>

        <div className="min-w-0">
          <h3 className="truncate font-serif text-base font-semibold text-[#2E211A] sm:text-lg">
            {resume.original_filename}
          </h3>

          <div className="mt-1.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#6B5847]">
            <span className="flex items-center gap-1.5">
              <HardDrive className="h-3.5 w-3.5" />
              {formatFileSize(resume.file_size)}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(resume.created_at)}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-5 flex items-center gap-2 sm:mt-0 sm:ml-6 sm:shrink-0">
        <motion.button
          type="button"
          onClick={() => onAnalyze(resume)}
          disabled={isAnalyzing}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#3D2B1F] px-4 py-2.5 text-sm font-semibold text-[#FBF7F1] shadow-md shadow-[#3D2B1F]/15 transition-colors duration-300 hover:bg-[#2E211A] disabled:cursor-not-allowed disabled:opacity-60 sm:flex-none"
        >
          <Sparkles className="h-4 w-4" strokeWidth={1.8} />
          {isAnalyzing ? 'Analyzing...' : 'Analyze'}
        </motion.button>

        <motion.button
          type="button"
          onClick={() => onRemove(resume)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label="Remove resume"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#3D2B1F]/15 text-[#8A7A6C] transition-colors duration-300 hover:border-[#B3452E]/30 hover:bg-[#B3452E]/[0.06] hover:text-[#B3452E]"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.8} />
        </motion.button>
      </div>
    </motion.div>
  )
}

export default ResumeCard