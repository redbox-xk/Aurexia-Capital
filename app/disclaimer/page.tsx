'use client'

import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'

export default function Disclaimer() {
  return (
    <>
      <Navigation />
      <main>
        <section className="min-h-96 pt-32 pb-16 bg-gradient-to-b from-muted/50 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h1 className="text-5xl font-playfair font-bold mb-6">Risk Disclaimer</h1>
            <p className="text-muted-foreground">Last updated: December 2024</p>
          </div>
        </section>

        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-primary/5 border border-primary/20 rounded p-6 mb-8">
              <p className="text-sm font-medium text-foreground">
                All investment involves risk, including potential loss of principal. Past performance does not guarantee future results.
              </p>
            </div>

            <div className="space-y-8 text-muted-foreground leading-relaxed">
              <div>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">1. Investment Risk</h2>
                <p>
                  Investments in securities, bonds, and alternative assets carry inherent risks. Market conditions, economic factors, and geopolitical events can significantly impact portfolio performance and asset values.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">2. Market Volatility</h2>
                <p>
                  Financial markets are subject to significant fluctuations. Asset prices may increase or decrease substantially, and investors may experience losses exceeding initial capital investment.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">3. No Guarantees</h2>
                <p>
                  Aurexia Capital does not guarantee specific returns or investment performance. Advisory recommendations are based on analysis and professional judgment but do not assure profitability.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">4. Regulatory Changes</h2>
                <p>
                  Changes in regulatory requirements, tax laws, or government policies may affect investment performance and advisory strategies. We continuously monitor regulatory developments to ensure compliance.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">5. Information Basis</h2>
                <p>
                  Advisory services and research reports are based on information believed to be accurate at the time of publication. However, we do not guarantee accuracy or completeness of all data sources.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">6. Individual Circumstances</h2>
                <p>
                  Advisory recommendations must be evaluated in the context of your individual financial situation, objectives, risk tolerance, and time horizon. Consult with qualified advisors before making investment decisions.
                </p>
              </div>

              <div>
                <h2 className="text-2xl font-playfair font-bold text-foreground mb-4">7. Limitation of Liability</h2>
                <p>
                  Aurexia Capital, its officers, employees, and affiliates shall not be liable for any indirect, incidental, special, or consequential damages resulting from use of advisory services or reliance on recommendations.
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
