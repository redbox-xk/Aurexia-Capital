interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

const sizes = {
  sm: { width: 24, height: 24, text: "text-lg" },
  md: { width: 32, height: 32, text: "text-xl" },
  lg: { width: 48, height: 48, text: "text-2xl" },
  xl: { width: 64, height: 64, text: "text-3xl" },
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const { width, height, text } = sizes[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      {/* Flash Wallet Logo Badge */}
      <div
        style={{ width, height }}
        className="flex-shrink-0 bg-gradient-to-br from-primary to-primary/80 rounded-lg flex items-center justify-center shadow-lg"
      >
        <span className="font-bold text-white text-center leading-none" style={{ fontSize: `${width * 0.5}px` }}>
          FW
        </span>
      </div>
      {showText && (
        <span className={`font-bold ${text} text-foreground`}>
          Flash Wallet
        </span>
      )}
    </div>
  )
}
