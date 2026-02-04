import Image from "next/image"

interface LogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  className?: string
}

const sizes = {
  sm: { icon: 24, text: "text-lg" },
  md: { icon: 32, text: "text-xl" },
  lg: { icon: 48, text: "text-2xl" },
  xl: { icon: 64, text: "text-3xl" },
}

export function Logo({ size = "md", showText = true, className = "" }: LogoProps) {
  const { icon, text } = sizes[size]

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <Image
        src="/logo.svg"
        alt="Flash Wallet Logo"
        width={icon}
        height={icon}
        priority
        className="flex-shrink-0"
      />
      {showText && (
        <span className={`font-bold ${text} text-foreground`}>
          Flash Wallet
        </span>
      )}
    </div>
  )
}
