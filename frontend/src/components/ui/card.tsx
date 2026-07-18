import { HTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  subtitle?: string
  footer?: ReactNode
  children?: ReactNode
  className?: string
}

function Card({
  title,
  subtitle,
  footer,
  children,
  className = '',
  ...props
}: CardProps) {
  return (
    <motion.div
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      className={`
        rounded-2xl bg-white shadow-md hover:shadow-xl
        transition-shadow duration-200
        p-6
        ${className}
      `}
      {...props}
    >
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          )}
          {subtitle && (
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          )}
        </div>
      )}

      {children && <div className="text-gray-700">{children}</div>}

      {footer && (
        <div className="mt-4 pt-4 border-t border-gray-100">{footer}</div>
      )}
    </motion.div>
  )
}

export default Card