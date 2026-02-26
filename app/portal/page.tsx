'use client'

import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { LogIn } from 'lucide-react'

export default function Portal() {
  return (
    <>
      <Navigation />
      <main>
        <section className="min-h-[calc(100vh-64px)] flex items-center pt-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
                  Client Portal
                </h1>
                <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                  Secure access to your portfolio documents, research reports, and communication with your advisory team.
                </p>
                <div className="space-y-3">
                  <p className="font-medium">Portal Features:</p>
                  <ul className="space-y-2 text-muted-foreground">
                    <li>✓ Secure document access</li>
                    <li>✓ Portfolio performance tracking</li>
                    <li>✓ Research downloads</li>
                    <li>✓ Advisor messaging</li>
                    <li>✓ Account management</li>
                  </ul>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-12 text-center">
                <div className="mb-6">
                  <LogIn className="w-16 h-16 mx-auto text-primary/30" />
                </div>
                <h2 className="text-2xl font-playfair font-bold mb-6">Existing Clients</h2>
                <p className="text-muted-foreground mb-8">
                  Sign in to access your secure client portal with your email and password.
                </p>
                <Button size="lg" className="w-full mb-3">
                  Client Login
                </Button>
                <p className="text-sm text-muted-foreground">
                  New client? <Link href="/contact" className="text-primary hover:underline">Contact us</Link> to get started.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
