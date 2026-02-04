"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Logo } from "@/components/logo"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { createClient } from "@/lib/supabase/client"
import { Loader2 } from "lucide-react"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    router.push("/dashboard")
    router.refresh()
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 p-4">
      <div className="absolute top-8 left-8">
        <Link href="/">
          <Logo size="md" />
        </Link>
      </div>

      <Card className="w-full max-w-md shadow-xl border-border/40">
        <CardHeader className="text-center pb-8">
          <div className="flex justify-center mb-6">
            <Logo size="lg" showText={false} />
          </div>
          <CardTitle className="text-3xl font-bold text-foreground">Welcome Back</CardTitle>
          <CardDescription className="text-base mt-2">
            Your secure financial home awaits. Let's reconnect.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && (
              <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
                {error}
              </div>
            )}

          <Button type="submit" className="w-full h-12 text-base font-medium rounded-lg" disabled={loading}>
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Welcoming you in..." : "Enter Your Wallet"}
          </Button>
          </form>

          <div className="mt-6 text-center text-sm text-muted-foreground">
            New to Flash Wallet?{" "}
            <Link href="/auth/sign-up" className="text-primary font-semibold hover:underline">
              Start your journey
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
