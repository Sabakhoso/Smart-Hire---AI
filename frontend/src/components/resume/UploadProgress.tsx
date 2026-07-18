import React from 'react'
import { motion } from 'framer-motion'

interface UploadProgressProps {
  progress: number
  label?: string
}

const UploadProgress: React.FC<UploadProgressProps> = ({
  progress,
  label = 'Uploading...',
}) => {
  const clamped = Math.min(100, Math.max(0, progress))

  return (
    <div className="w-full">
      <div className="mb-2 flex items-center justify-between">
        <span className="text-sm font-medium text-[#3D2B1F]">{label}</span>
        <span className="text-sm font-semibold text-[#8B5A2B]">
          {Math.round(clamped)}%
        </span>
      </div>

      <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#3D2B1F]/10">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clamped}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="h-full rounded-full bg-gradient-to-r from-[#8B5A2B] to-[#3D2B1F]"
        />
      </div>
    </div>
  )
}

export default UploadProgress