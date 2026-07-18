import { ButtonHTMLAttributes, ReactNode } from 'react'
import { motion } from 'framer-motion'

type Variant = 'primary' | 'secondary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragStart' | 'onDragEnd' | 'onAnimationStart'> {
  variant?: Variant
  size?: Size
  isLoading?: boolean
  children: ReactNode
  className?: string
}

const variantStyles: Record<Variant, string> = {
  primary: 'bg-gray-900 text-white hover:bg-gray-800 border border-transparent',
  secondary: 'bg-gray-100 text-gray-900 hover:bg-gray-200 border border-transparent',
  outline: 'bg-transparent text-gray-900 border border-gray-300 hover:bg-gray-50',
  ghost: 'bg-transparent text-gray-900 border border-transparent hover:bg-gray-100',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-3 py-1.5',
  md: 'text-base px-4 py-2',
  lg: 'text-lg px-6 py-3',
}

function Spinner() {
  return (
    <svg
      className="animate-spin h-4 w-4"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        className="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        strokeWidth="4"
      />
      <path
        className="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
      />
    </svg>
  )
}

function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  children,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading

  return (
    <motion.button
      whileHover={!isDisabled ? { scale: 1.03 } : undefined}
      whileTap={!isDisabled ? { scale: 0.97 } : undefined}
      transition={{ duration: 0.15, ease: 'easeOut' }}
      disabled={isDisabled}
      className={`
        inline-flex items-center justify-center gap-2 rounded-xl font-medium
        transition-colors duration-200 ease-out
        disabled:opacity-50 disabled:cursor-not-allowed
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${className}
      `}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </motion.button>
  )
}

export default Button