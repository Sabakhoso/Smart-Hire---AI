import React, { useState, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { UploadCloud, FileText } from 'lucide-react'

interface UploadBoxProps {
  onFileSelect: (file: File) => void
}

const UploadBox: React.FC<UploadBoxProps> = ({ onFileSelect }) => {
  const [isDragging, setIsDragging] = useState(false)
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(
    (file: File | undefined | null) => {
      if (!file) return

      if (file.type !== 'application/pdf') {
        setError('Only PDF files are supported.')
        setSelectedFileName(null)
        return
      }

      setError(null)
      setSelectedFileName(file.name)
      onFileSelect(file)
    },
    [onFileSelect]
  )

  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault()
      e.stopPropagation()
      setIsDragging(false)
      handleFile(e.dataTransfer.files?.[0])
    },
    [handleFile]
  )

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    e.stopPropagation()
    setIsDragging(false)
  }

  const handleClick = () => {
    inputRef.current?.click()
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFile(e.target.files?.[0])
    e.target.value = ''
  }

  return (
    <div className="w-full">
      <motion.div
        onClick={handleClick}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') handleClick()
        }}
        animate={{
          borderColor: isDragging ? '#8B5A2B' : 'rgba(61,43,31,0.15)',
          backgroundColor: isDragging ? 'rgba(139,90,43,0.06)' : '#FFFDF9',
        }}
        transition={{ duration: 0.2 }}
        className="flex w-full cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-14 text-center outline-none focus-visible:ring-2 focus-visible:ring-[#8B5A2B]/30 sm:py-16"
      >
        <input
          ref={inputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleInputChange}
        />

        <motion.div
          animate={{ scale: isDragging ? 1.08 : 1, y: isDragging ? -4 : 0 }}
          transition={{ type: 'spring', stiffness: 300, damping: 20 }}
          className="mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-[#3D2B1F]"
        >
          <UploadCloud className="h-6 w-6 text-[#FBF7F1]" strokeWidth={1.8} />
        </motion.div>

        <h3 className="font-serif text-lg font-semibold text-[#2E211A] sm:text-xl">
          {isDragging ? 'Drop your resume here' : 'Upload your resume'}
        </h3>
        <p className="mt-2 max-w-xs text-sm leading-relaxed text-[#6B5847]">
          Drag and drop your PDF here, or click to browse. Only PDF files are
          accepted.
        </p>

        <AnimatePresence mode="wait">
          {selectedFileName && !error && (
            <motion.div
              key="file"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-5 flex items-center gap-2 rounded-xl border border-[#3D2B1F]/10 bg-white px-4 py-2.5"
            >
              <FileText className="h-4 w-4 shrink-0 text-[#8B5A2B]" />
              <span className="max-w-[220px] truncate text-sm font-medium text-[#3D2B1F]">
                {selectedFileName}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="mt-5 text-sm font-medium text-[#B3452E]"
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}

export default UploadBox