import Link from 'next/link'

export const metadata = {
  title: 'Cookie Policy - Aurexia Capital',
  description: 'Information about cookies and tracking technologies',
}

export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-transparent">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/aurexia-logo.svg" alt="Aurexia Capital" className="w-8 h-8" />
            <span className="font-playfair font-semibold text-lg hidden sm:inline">
              Aurexia Capital
            </span>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Page Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-playfair font-bold mb-4">Cookie Policy</h1>
          <p className="text-muted-foreground">
            Effective Date: February 26, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">What are Cookies?</h2>
              <p className="text-muted-foreground leading-relaxed">
                Cookies are small data files stored on your device when you visit a website. They
                allow us to recognize you on future visits and remember your preferences. Cookies
                cannot access other files on your computer or collect information about you beyond
                what you choose to share.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">How We Use Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies for several purposes:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Essential Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies are necessary for the website to function properly. They enable
                    you to navigate the portal, maintain your session, and access protected areas.
                    You cannot disable these cookies without affecting site functionality.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Analytics Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    We use analytics cookies to understand how you interact with our portal. This
                    helps us improve functionality and user experience. Data collected is anonymous
                    and does not identify you personally.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Marketing Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    These cookies help us deliver targeted content and advertisements based on your
                    interests. They track your browsing patterns across websites and are only used
                    with your explicit consent.
                  </p>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground mb-2">Third-Party Cookies</h3>
                  <p className="text-muted-foreground text-sm">
                    Our partners may place cookies on your device for enhanced services and
                    integrations. These are only enabled with your consent.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">Cookie Duration</h2>
              <div className="bg-muted/50 rounded p-4 space-y-3 text-sm text-muted-foreground">
                <p>
                  <strong>Session Cookies:</strong> Deleted when you close your browser
                </p>
                <p>
                  <strong>Persistent Cookies:</strong> Remain for a set period (typically 1 year)
                </p>
                <p>
                  <strong>Analytics Cookies:</strong> Retained for 2 years for data analysis
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">Managing Your Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You can control cookies through:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Our consent banner (bottom of page) - adjust preferences anytime</li>
                <li>Your browser settings - instructions for popular browsers below</li>
                <li>Opting out of analytics services (links provided in consent banner)</li>
              </ul>

              <p className="text-muted-foreground text-sm mt-4">
                <strong>Note:</strong> Disabling cookies may affect your ability to use certain
                features of the portal.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">Browser Instructions</h2>
              <div className="space-y-4 text-sm text-muted-foreground">
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Chrome</h3>
                  <p>
                    Settings → Privacy and Security → Cookies and other site data → Manage all cookies
                    and site data
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Firefox</h3>
                  <p>
                    Preferences → Privacy & Security → Cookies and Site Data → Manage exceptions
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Safari</h3>
                  <p>
                    Preferences → Privacy → Cookies and website data → Manage website data
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Edge</h3>
                  <p>
                    Settings → Privacy, search, and services → Manage cookies and site permissions
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">Our Analytics Partners</h2>
              <div className="bg-muted/50 rounded p-4 space-y-2 text-sm text-muted-foreground">
                <p>
                  <strong>Google Analytics 4</strong> - Usage analytics and behavior tracking
                </p>
                <p>
                  <strong>Hotjar</strong> - Heatmaps and user journey visualization
                </p>
                <p>
                  <strong>Mixpanel</strong> - Event tracking and user insights
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Under GDPR and similar regulations, you have the right to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Know what cookies we use and why</li>
                <li>Control which cookies are stored on your device</li>
                <li>Have cookies deleted at any time</li>
                <li>Withdraw consent without penalty</li>
                <li>Receive clear information about our cookie practices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">Changes to This Policy</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this cookie policy from time to time. We will notify you of significant
                changes via the consent banner or email. Your continued use of the portal constitutes
                acceptance of updated policies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For questions about our cookie practices, please contact our Data Protection Officer
                at{' '}
                <a
                  href="mailto:privacy@aurexiacapital.com"
                  className="text-primary hover:underline"
                >
                  privacy@aurexiacapital.com
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-6 justify-center text-sm">
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </Link>
          <Link href="/dashboard" className="text-primary hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
