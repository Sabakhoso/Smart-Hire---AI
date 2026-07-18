import { InputHTMLAttributes, ReactNode, forwardRef, useId } from 'react'

interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'className'> {
  label?: string
  helperText?: string
  error?: string
  icon?: ReactNode
  className?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      helperText,
      error,
      icon,
      id,
      className = '',
      ...props
    },
    ref
  ) => {
    const generatedId = useId()
    const inputId = id ?? generatedId
    const helperId = `${inputId}-helper`
    const errorId = `${inputId}-error`

    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-gray-800"
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          {icon && (
            <span className="pointer-events-none absolute inset-y-0 left-3 flex items-center text-gray-400">
              {icon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            aria-invalid={!!error}
            aria-describedby={
              error ? errorId : helperText ? helperId : undefined
            }
            className={`
              w-full rounded-xl border bg-white text-gray-900 placeholder-gray-400
              px-4 py-2.5 text-base
              ${icon ? 'pl-10' : ''}
              border-gray-300
              focus:outline-none focus:ring-2 focus:ring-amber-800/50 focus:border-amber-800
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-colors duration-200
              ${error ? 'border-red-500 focus:ring-red-500/50 focus:border-red-500' : ''}
              ${className}
            `}
            {...props}
          />
        </div>

        {error ? (
          <p id={errorId} className="text-sm text-red-600">
            {error}
          </p>
        ) : helperText ? (
          <p id={helperId} className="text-sm text-gray-500">
            {helperText}
          </p>
        ) : null}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input