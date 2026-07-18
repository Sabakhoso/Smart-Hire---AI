import React from 'react'
import { motion } from 'framer-motion'
import { FileSearch } from 'lucide-react'

const EmptyResumeState: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="flex w-full flex-col items-center justify-center rounded-2xl border border-dashed border-[#3D2B1F]/15 bg-[#FFFDF9] px-6 py-16 text-center sm:py-20"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        className="relative mb-6"
      >
        <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#3D2B1F]/[0.05]">
          <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#3D2B1F]">
            <FileSearch className="h-6 w-6 text-[#FBF7F1]" strokeWidth={1.6} />
          </div>
        </div>
        <span className="absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#EDE1D3] text-xs font-semibold text-[#8B5A2B]">
          +
        </span>
      </motion.div>

      <h3 className="font-serif text-lg font-semibold text-[#2E211A] sm:text-xl">
        No resume uploaded yet
      </h3>

      <p className="mt-2 max-w-sm text-sm leading-relaxed text-[#6B5847]">
        Upload your resume to get an instant AI-powered analysis, ATS score,
        and personalized suggestions to improve your chances.
      </p>

      <p className="mt-5 text-xs font-medium uppercase tracking-wider text-[#8B5A2B]">
        Drag and drop a PDF above to get started
      </p>
    </motion.div>
  )
}

export default EmptyResumeState