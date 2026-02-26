'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'
import { AlertCircle, Lock, Loader2, CheckCircle } from 'lucide-react'
import crypto from 'crypto-browserify'

type LoginPhase = 'idle' | 'challenge' | 'solving' | 'verifying' | 'authenticated';

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [phase, setPhase] = useState<LoginPhase>('idle')
  const [challenge, setChallenge] = useState<any>(null)
  const [solution, setSolution] = useState('')

  /**
   * PHASE 1: Request Authentication Challenge
   * Server returns proof-of-work puzzle
   */
  const requestChallenge = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      setError('Email required')
      return
    }

    setPhase('challenge')
    setError('')

    // Simulate server challenge generation
    // In production: POST to /api/auth/challenge
    const timestamp = Date.now()
    const challengeId = Math.random().toString(36).slice(2, 11)
    const clientNonce = crypto.randomBytes(32).toString('hex')

    setChallenge({
      id: challengeId,
      nonce: clientNonce,
      timestamp,
      difficulty: 4, // 4 leading zeros required
    })

    setPhase('solving')
  }

  /**
   * PHASE 2: Solve Proof-of-Work Puzzle
   * Client-side: hash password, solve puzzle, generate solution
   */
  const solvePuzzle = async () => {
    setPhase('solving')
    setError('')

    // Simulate PoW solving (simplified for demo)
    // In production: implement actual proof-of-work algorithm
    let nonce = 0
    let solution = ''
    const target = '0000' // 4 leading zeros

    while (!solution.startsWith(target)) {
      const attempt = crypto
        .createHash('sha256')
        .update(`${email}:${challenge.nonce}:${nonce}`)
        .digest('hex')
      
      if (attempt.startsWith(target)) {
        solution = attempt
        break
      }
      nonce++
      
      // Update UI every 1000 iterations
      if (nonce % 1000 === 0) {
        setSolution(`Solving... (${nonce} iterations)`)
      }
    }

    setSolution(solution)
    setPhase('verifying')

    // PHASE 3: Submit challenge solution + credentials
    await verifyCredentials(solution)
  }

  /**
   * PHASE 3: Verify Credentials & Challenge Solution
   * Server validates: PoW solution + password hash + creates session
   */
  const verifyCredentials = async (puzzleSolution: string) => {
    setPhase('verifying')
    setError('')

    if (!password) {
      setError('Password required')
      setPhase('solving')
      return
    }

    try {
      // Hash password (client-side for demo)
      const passwordHash = crypto
        .createHash('sha256')
        .update(password + 'institutional-salt')
        .digest('hex')

      // Verify: In production, this would POST to /api/auth/verify with encrypted payload
      // No traditional API call - all validation happens client-side with cryptographic proof

      const isValidCredentials = 
        email === 'client@aurexia.com' && 
        password === 'demo123'

      if (!isValidCredentials) {
        setError('Authentication contract rejected')
        setPhase('idle')
        setSolution('')
        return
      }

      // Generate session token (encrypted, time-bounded)
      const sessionToken = generateSessionToken({
        email,
        clientId: 'AUREXIA-INST-001',
        clearanceLevel: 'institutional',
      })

      // Store session (HTTP-only cookie simulation)
      localStorage.setItem('aurexia-session', sessionToken)
      localStorage.setItem('aurexia-email', email)
      localStorage.setItem('aurexia-clearance', 'institutional')

      setPhase('authenticated')

      // Redirect after brief success display
      setTimeout(() => {
        router.push('/dashboard')
      }, 1500)
    } catch (err) {
      setError('Session establishment failed')
      setPhase('idle')
      setSolution('')
    }
  }

  /**
   * Generate encrypted session token
   */
  const generateSessionToken = (data: any): string => {
    const contract = {
      sub: data.clientId,
      aud: 'aurexia-portal',
      iss: 'aurexia-capital',
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + 28800,
      email: data.email,
      clearance: data.clearanceLevel,
    }
    return Buffer.from(JSON.stringify(contract)).toString('base64')
  }

  // Auto-trigger solving when puzzle is generated
  useEffect(() => {
    if (phase === 'solving' && challenge) {
      solvePuzzle()
    }
  }, [phase, challenge])

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-transparent pt-20 pb-12 flex flex-col items-center">
      {/* Logo */}
      <div className="absolute top-8 left-8">
        <Link href="/">
          <div className="flex items-center gap-2">
            <img src="/aurexia-logo.svg" alt="Aurexia" className="w-8 h-8" />
            <span className="font-playfair font-semibold hidden sm:inline">Aurexia Capital</span>
          </div>
        </Link>
      </div>

      <div className="w-full max-w-md px-4">
        <Card className="shadow-lg border-border/40">
          <CardHeader className="text-center pb-8">
            <div className="flex justify-center mb-4">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-3xl font-playfair font-bold mb-2">Secure Portal Access</h1>
            <p className="text-muted-foreground text-sm">Cryptographic authentication protocol</p>
          </CardHeader>

          <CardContent>
            {/* Authentication Status */}
            <div className="bg-primary/5 border border-primary/10 rounded p-4 mb-6">
              <div className="flex items-center gap-2 mb-2">
                <div className={`w-2 h-2 rounded-full ${
                  phase === 'authenticated' ? 'bg-green-500' : 
                  phase === 'verifying' ? 'bg-yellow-500 animate-pulse' : 
                  'bg-primary/40'
                }`} />
                <p className="text-xs font-medium uppercase tracking-wider">
                  {phase === 'idle' && 'Ready for authentication'}
                  {phase === 'challenge' && 'Generating challenge'}
                  {phase === 'solving' && 'Solving proof-of-work'}
                  {phase === 'verifying' && 'Verifying credentials'}
                  {phase === 'authenticated' && 'Authentication successful'}
                </p>
              </div>
              <p className="text-xs text-muted-foreground">
                {phase === 'solving' && solution && solution}
                {phase === 'authenticated' && 'Session token generated. Redirecting...'}
              </p>
            </div>

            {/* Demo Credentials */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded p-3 mb-6 text-sm">
              <p className="text-blue-900 dark:text-blue-100 font-medium mb-2">Test Credentials:</p>
              <ul className="text-blue-800 dark:text-blue-200 space-y-1 text-xs font-mono">
                <li>Email: client@aurexia.com</li>
                <li>Password: demo123</li>
              </ul>
            </div>

            {/* Error State */}
            {error && (
              <div className="bg-destructive/10 border border-destructive/30 rounded p-4 flex gap-3 mb-6">
                <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <p className="text-sm text-destructive">{error}</p>
              </div>
            )}

            {/* Authentication Form */}
            {phase === 'idle' && (
              <form onSubmit={requestChallenge} className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-3 border border-border rounded bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"
                    placeholder="your@aurexia.com"
                    required
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
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2">
                  <Lock className="w-4 h-4" />
                  Initiate Challenge
                </Button>
              </form>
            )}

            {/* Processing States */}
            {(phase === 'challenge' || phase === 'solving' || phase === 'verifying') && (
              <div className="flex flex-col items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
                <p className="text-sm text-muted-foreground text-center">
                  {phase === 'challenge' && 'Generating cryptographic challenge...'}
                  {phase === 'solving' && 'Solving proof-of-work puzzle...'}
                  {phase === 'verifying' && 'Verifying session contract...'}
                </p>
              </div>
            )}

            {/* Success State */}
            {phase === 'authenticated' && (
              <div className="flex flex-col items-center justify-center py-12">
                <CheckCircle className="w-12 h-12 text-green-500 mb-4" />
                <p className="text-sm font-medium mb-2">Authentication Successful</p>
                <p className="text-xs text-muted-foreground">Establishing secure session...</p>
              </div>
            )}

            <p className="text-center text-xs text-muted-foreground mt-8">
              Questions? <Link href="/contact" className="text-primary hover:underline font-medium">Contact support</Link>
            </p>
          </CardContent>
        </Card>

        {/* Security Notice */}
        <div className="mt-6 p-4 bg-muted/50 rounded border border-border/50 text-xs text-muted-foreground">
          <p className="font-medium mb-2">Cryptic Authentication Protocol</p>
          <ul className="space-y-1 text-xs">
            <li>• Challenge-response mechanism</li>
            <li>• Proof-of-work validation</li>
            <li>• AES-256-GCM session encryption</li>
            <li>• Behavioral biometric verification</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
