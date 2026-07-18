import { motion } from 'framer-motion'

function LoadingScreen() {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative flex flex-col items-center gap-6">
        {/* Pulsing ring behind logo */}
        <div className="relative flex items-center justify-center">
          <motion.span
            className="absolute h-20 w-20 rounded-full bg-amber-800/10"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.span
            className="absolute h-20 w-20 rounded-full bg-amber-800/10"
            animate={{ scale: [1, 1.6, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.6 }}
          />

          {/* Logo mark */}
          <motion.div
            className="relative h-16 w-16 rounded-2xl bg-amber-900 flex items-center justify-center shadow-lg"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          >
            <span className="text-white text-2xl font-bold">S</span>
          </motion.div>
        </div>

        {/* Brand text */}
        <div className="flex flex-col items-center gap-1">
          <motion.h1
            className="text-2xl font-bold text-gray-900 tracking-tight"
            animate={{ opacity: [0.6, 1, 0.6] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            SmartHire AI
          </motion.h1>
          <p className="text-sm text-amber-800/70 font-medium">
            Preparing your hiring workspace
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              className="h-2 w-2 rounded-full bg-amber-800"
              animate={{ y: [0, -6, 0], opacity: [0.4, 1, 0.4] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: i * 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default LoadingScreen