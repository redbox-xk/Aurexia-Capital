'use client'

import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'

export default function Terms() {
  return (
    <>
      <Navigation />
      <main>
        <section className="min-h-96 pt-32 pb-16 bg-gradient-to-b from-muted/50 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-playfair font-bold mb-6">Terms of Service</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 text-muted-foreground leading-relaxed">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using Aurexia Capital's services and website, you agree to be bound by these Terms of Service. If you do not accept these terms, please do not use our services.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">2. Services Description</h2>
              <p>
                Aurexia Capital provides institutional wealth management and financial advisory services to qualified clients. Services include portfolio management, risk advisory, tax strategy, and succession planning.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">3. Client Responsibilities</h2>
              <p>
                Clients agree to provide accurate financial information and disclose all material circumstances affecting advisory services. Clients are responsible for reviewing recommendations and making independent investment decisions.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">4. Fees and Compensation</h2>
              <p>
                Advisory fees are disclosed separately in client agreements. Fees may be calculated as a percentage of assets under management or as fixed retainers. All fee structures are agreed upon before service commencement.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">5. Confidentiality</h2>
              <p>
                Both Aurexia Capital and clients agree to maintain confidentiality of all proprietary information, strategies, and personal financial details shared during the advisory relationship.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">6. Governing Law</h2>
              <p>
                These Terms of Service and all advisory relationships are governed by the laws of Kosovo. Any disputes shall be resolved through mutual agreement or, if necessary, through appropriate legal channels in Kosovo.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">7. Limitation of Liability</h2>
              <p>
                To the extent permitted by law, Aurexia Capital's liability is limited to the fees paid during the preceding 12 months. We disclaim liability for indirect, incidental, or consequential damages.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">8. Termination</h2>
              <p>
                Either party may terminate the advisory relationship with written notice as specified in the client agreement. Outstanding fees are due upon termination.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">9. Modifications</h2>
              <p>
                Aurexia Capital reserves the right to modify these Terms of Service. Continued use of services following modifications constitutes acceptance of updated terms.
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">10. Contact</h2>
              <p>
                For questions regarding these terms, please contact: legal@aurexiacapital.com
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
