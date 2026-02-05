import Image from 'next/image'

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

const sizes = {
  sm: { width: 24, height: 24, text: "text-sm" },
  md: { width: 32, height: 32, text: "text-base" },
  lg: { width: 48, height: 48, text: "text-lg" },
  xl: { width: 80, height: 80, text: "text-2xl" },
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const { width, height, text } = sizes[size]

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="flex-shrink-0" style={{ width, height }}>
        <Image
          src="/fw-logo.svg"
          alt="Flash Wallet Logo"
          width={width}
          height={height}
          priority
          className="w-full h-full"
        />
      </div>
      {showText && (
        <div className="flex flex-col items-start">
          <span className={`font-bold ${text} text-foreground leading-tight`}>
            Flash
          </span>
          <span className={`font-bold ${text} text-primary leading-tight`}>
            Wallet
          </span>
        </div>
      )}
    </div>
  )
}
