import Link from 'next/link'
import { companyProfile } from '@/lib/company/profile'
import GDPRService from '@/lib/compliance/gdpr-service'

export const metadata = {
  title: 'Privacy Policy - Aurexia Capital',
  description: 'Our privacy policy and GDPR compliance information',
}

export default function PrivacyPolicyPage() {
  const privacyContent = GDPRService.getPrivacyPolicy()

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
          <h1 className="text-4xl font-playfair font-bold mb-4">Privacy Policy</h1>
          <p className="text-muted-foreground">
            Effective Date: February 26, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">1. Data Collection</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We collect data necessary for service provision:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Contact information (name, email, phone)</li>
                <li>Financial information (investment preferences, portfolio data)</li>
                <li>Usage analytics (page visits, interaction patterns)</li>
                <li>Technical data (IP address, browser type)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">2. Data Usage</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Your data is used for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Service delivery and account management</li>
                <li>Regulatory compliance</li>
                <li>Performance analysis</li>
                <li>Service improvement</li>
                <li>Communication (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">3. Your Rights (GDPR/CCPA)</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                You have the following rights regarding your data:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Right to access your data</li>
                <li>Right to correct inaccurate data</li>
                <li>Right to be forgotten (deletion)</li>
                <li>Right to data portability</li>
                <li>Right to withdraw consent</li>
                <li>Right to object to processing</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">4. Data Retention</h2>
              <div className="bg-muted/50 rounded p-4 space-y-2 text-muted-foreground">
                <p>
                  <strong>Account data:</strong> Duration of relationship + 7 years (legal requirement)
                </p>
                <p>
                  <strong>Transaction data:</strong> 10 years (regulatory requirement)
                </p>
                <p>
                  <strong>Marketing data:</strong> Until unsubscribe
                </p>
                <p>
                  <strong>Analytics data:</strong> 2 years
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">5. Security</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We employ industry-leading security measures:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>AES-256 encryption for data at rest</li>
                <li>TLS 1.3 for data in transit</li>
                <li>Regular security audits</li>
                <li>Intrusion detection systems</li>
                <li>24/7 monitoring</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">6. Third Parties</h2>
              <p className="text-muted-foreground leading-relaxed">
                We do not sell personal data. We share data only with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Regulatory authorities (when required by law)</li>
                <li>Service providers under strict data processing agreements</li>
                <li>Legal advisors (when necessary)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">7. Cookies</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                We use cookies for:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Essential: Session management and security</li>
                <li>Analytics: Usage patterns (with your consent)</li>
                <li>Marketing: Targeted communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">8. Contact</h2>
              <div className="bg-muted/50 rounded p-4 space-y-2 text-muted-foreground">
                <p>
                  <strong>Data Protection Officer:</strong>{' '}
                  <a
                    href="mailto:privacy@aurexiacapital.com"
                    className="text-primary hover:underline"
                  >
                    privacy@aurexiacapital.com
                  </a>
                </p>
                <p>
                  <strong>Address:</strong> {companyProfile.contact.mainOffice.address}
                </p>
                <p>
                  <strong>Phone:</strong> {companyProfile.contact.mainOffice.phone}
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">9. Policy Updates</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may update this privacy policy from time to time. We will notify you of
                significant changes via email or prominent notice on our website. Your continued
                use of the portal following changes constitutes your acceptance of the updated
                policy.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-6 justify-center text-sm">
          <Link href="/terms-of-service" className="text-primary hover:underline">
            Terms of Service
          </Link>
          <Link href="/cookie-policy" className="text-primary hover:underline">
            Cookie Policy
          </Link>
          <Link href="/dashboard" className="text-primary hover:underline">
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  )
}
