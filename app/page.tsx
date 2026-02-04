import Link from "next/link"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Shield, 
  Zap, 
  Globe,
  ChevronRight
} from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Logo size="md" />
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link href="/auth/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/auth/sign-up">Get Started</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Logo size="xl" showText={false} />
          </div>
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-foreground mb-6 text-balance leading-tight">
            Peace of Mind for Your{" "}
            <span className="text-primary">Digital Life</span>
          </h1>
          <p className="text-xl sm:text-2xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty leading-relaxed font-light">
            Experience complete freedom and security. Flash Wallet puts you in control of your assets with a beautifully simple interface, military-grade protection, and the speed you deserve.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="text-lg px-10 h-14 rounded-lg">
              <Link href="/auth/sign-up">
                Start Your Journey
                <ChevronRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-lg px-10 h-14 rounded-lg border-2 bg-transparent">
              <Link href="/auth/login">Welcome Back</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/30 to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
              Designed for Your Trust
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-light">
              We've built Flash Wallet with every detail considered for your peace of mind and financial freedom.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <Wallet className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Organized Wallets</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Manage unlimited wallets in one beautiful place. Keep your assets organized exactly how you want them.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Lightning Speed</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Send and receive instantly. No delays, no complications—just pure, fast transactions.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Unbreakable Security</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your assets sleep peacefully. Military-grade encryption keeps everything safe and secure.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <ArrowUpRight className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Effortless Sending</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Send with confidence. Intuitive interface, saved contacts, and clear confirmations every step.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <ArrowDownLeft className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Easy Receiving</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Share your address or QR code with anyone. Receive funds from anywhere, instantly.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-card border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="w-14 h-14 bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl flex items-center justify-center mb-6">
                  <Globe className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Always Accessible</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Your wallet follows you everywhere. Desktop, mobile, tablet—seamless access worldwide.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-muted/10 to-transparent">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex justify-center mb-8">
            <Logo size="lg" showText={false} />
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6 text-balance">
            Your Financial Freedom Awaits
          </h2>
          <p className="text-xl text-muted-foreground mb-12 leading-relaxed font-light">
            Join thousands of users who've discovered the confidence of true ownership. Start your Flash Wallet journey today.
          </p>
          <Button size="lg" asChild className="text-lg px-10 h-14 rounded-lg">
            <Link href="/auth/sign-up">
              Create Wallet Now
              <ChevronRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <Logo size="sm" />
            <p className="text-sm text-muted-foreground">
              2024 Flash Wallet. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
