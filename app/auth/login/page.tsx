'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/lib/auth/auth-context'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const { login, isLoading } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    try {
      await login(email, password)
      router.push('/dashboard')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Login failed')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-transparent pt-20 pb-12 flex flex-col items-center">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-playfair font-bold">A</span>
            </div>
            <span className="font-playfair font-semibold hidden sm:inline">Aurexia</span>
          </div>
        </Link>
      </div>

      <div className="w-full max-w-md px-4">
        <Card className="shadow-lg border-border/40">
          <CardHeader className="text-center pb-8">
            <h1 className="text-3xl font-playfair font-bold mb-2">Client Login</h1>
            <p className="text-muted-foreground">Secure access to your portfolio</p>
          </CardHeader>
          <CardContent>
            {/* Demo Credentials Info */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3 mb-6 text-sm">
              <p className="text-blue-900 dark:text-blue-100 font-medium mb-2">Demo Access:</p>
              <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-xs font-mono">
                <li>Email: client@aurexia.com</li>
                <li>Password: demo123</li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="bg-destructive/10 border border-destructive/30 rounded p-4 flex gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <div>
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your@email.com"
                  required
                  disabled={isLoading}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  required
                  disabled={isLoading}
                />
              </div>

              <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  'Sign In to Portal'
                )}
              </Button>
            </form>

            <p className="text-center text-sm text-muted-foreground mt-8">
              Questions? <Link href="/contact" className="text-primary hover:underline font-medium">Contact support</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
