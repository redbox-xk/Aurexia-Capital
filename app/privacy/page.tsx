'use client'

import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'

export default function Privacy() {
  return (
    <>
      <Navigation />
      <main>
        <section className="min-h-96 pt-32 pb-16 bg-gradient-to-b from-muted/50 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-playfair font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-invert max-w-none">
            <h2 className="text-2xl font-playfair font-bold mt-8 mb-4">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Aurexia Capital ("we" or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and protect your personal information in accordance with GDPR and applicable data protection regulations.
            </p>

            <h2 className="text-2xl font-playfair font-bold mt-8 mb-4">2. Data Collection</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              We collect personal information only when you voluntarily provide it, including:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Contact information (name, email, phone)</li>
              <li>Financial information (for advisory services)</li>
              <li>Communication records</li>
              <li>Website usage data (via analytics)</li>
            </ul>

            <h2 className="text-2xl font-playfair font-bold mt-8 mb-4">3. Data Usage</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We use your information to: provide advisory services, communicate with you, improve our services, and comply with legal obligations.
            </p>

            <h2 className="text-2xl font-playfair font-bold mt-8 mb-4">4. Data Protection</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              We implement bank-grade security measures to protect your personal information from unauthorized access, alteration, or disclosure.
            </p>

            <h2 className="text-2xl font-playfair font-bold mt-8 mb-4">5. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Under GDPR, you have the right to:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2 mb-6">
              <li>Access your personal data</li>
              <li>Request data correction or deletion</li>
              <li>Opt-out of marketing communications</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-2xl font-playfair font-bold mt-8 mb-4">6. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              For privacy concerns, contact us at: privacy@aurexiacapital.com or +383 (0) 38 123 456
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
