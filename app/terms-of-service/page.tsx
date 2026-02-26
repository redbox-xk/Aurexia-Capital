import Link from 'next/link'
import GDPRService from '@/lib/compliance/gdpr-service'

export const metadata = {
  title: 'Terms of Service - Aurexia Capital',
  description: 'Terms of service and conditions of use',
}

export default function TermsOfServicePage() {
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
          <h1 className="text-4xl font-playfair font-bold mb-4">Terms of Service</h1>
          <p className="text-muted-foreground">
            Effective Date: February 26, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing and using the Aurexia Capital portal, you accept and agree to be bound
                by the terms and provision of this agreement. If you do not agree to abide by the
                above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">2. Use License</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information
                or software) on our portal for personal, non-commercial transitory viewing only. This
                is the grant of a license, not a transfer of title, and under this license you may
                not:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose or for any public display</li>
                <li>Attempt to decompile or reverse engineer any software contained on the portal</li>
                <li>Remove any copyright or other proprietary notations from the materials</li>
                <li>Transfer the materials to another person or 'mirror' the materials on any other server</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">3. Disclaimer</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials on Aurexia Capital's portal are provided on an 'as is' basis. Aurexia
                Capital makes no warranties, expressed or implied, and hereby disclaims and negates
                all other warranties including, without limitation, implied warranties or conditions
                of merchantability, fitness for a particular purpose, or non-infringement of
                intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">4. Limitations</h2>
              <p className="text-muted-foreground leading-relaxed">
                In no event shall Aurexia Capital or its suppliers be liable for any damages
                (including, without limitation, damages for loss of data or profit, or due to
                business interruption) arising out of the use or inability to use the materials on
                Aurexia Capital's portal, even if Aurexia Capital or an authorized representative
                has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">5. Accuracy of Materials</h2>
              <p className="text-muted-foreground leading-relaxed">
                The materials appearing on Aurexia Capital's portal could include technical,
                typographical, or photographic errors. Aurexia Capital does not warrant that any
                of the materials on its portal are accurate, complete, or current. Aurexia Capital
                may make changes to the materials contained on its portal at any time without
                notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">6. Links</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aurexia Capital has not reviewed all of the sites linked to its portal and is not
                responsible for the contents of any such linked site. The inclusion of any link
                does not imply endorsement by Aurexia Capital of the site. Use of any such linked
                website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">7. Modifications</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aurexia Capital may revise these terms of service for our portal at any time without
                notice. By using this portal, you are agreeing to be bound by the then current
                version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">8. Governing Law</h2>
              <p className="text-muted-foreground leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws
                of the Republic of Kosovo, and you irrevocably submit to the exclusive jurisdiction
                of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">9. User Obligations</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                As a user of the portal, you agree to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Maintain the confidentiality of your login credentials</li>
                <li>Use the portal only for authorized purposes</li>
                <li>Comply with all applicable laws and regulations</li>
                <li>Not attempt to access unauthorized data or systems</li>
                <li>Not engage in any activity that disrupts the service</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-playfair font-bold mb-4">10. Account Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                Aurexia Capital may terminate your account or restrict your access to the portal at
                any time for violation of these terms or for any other reason at our sole discretion.
              </p>
            </section>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-12 pt-8 border-t border-border flex flex-wrap gap-6 justify-center text-sm">
          <Link href="/privacy-policy" className="text-primary hover:underline">
            Privacy Policy
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
