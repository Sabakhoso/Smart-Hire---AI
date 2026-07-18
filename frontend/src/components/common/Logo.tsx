interface LogoProps {
  className?: string
}

function Logo({ className = '' }: LogoProps) {
  return (
    <span
      className={`font-bold tracking-tight text-xl sm:text-2xl text-gray-900 ${className}`}
    >
      SmartHire<span className="text-amber-800">AI</span>
    </span>
  )
}

export default Logo