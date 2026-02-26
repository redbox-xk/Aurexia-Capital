'use client'

import { useI18n } from '@/lib/i18n/context'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { FileText, Download, Calendar } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function Insights() {
  const { t } = useI18n()

  const reports = [
    {
      title: 'Q4 2024 Market Outlook',
      type: 'Quarterly Report',
      date: 'December 2024',
      description: 'Comprehensive analysis of global markets, geopolitical risks, and investment opportunities for the final quarter.',
      size: '2.4 MB',
    },
    {
      title: 'Fixed Income Strategy in Rising Rates',
      type: 'Market Analysis',
      date: 'November 2024',
      description: 'Deep dive into bond markets and strategies for optimizing returns in volatile rate environments.',
      size: '1.8 MB',
    },
    {
      title: 'Southeast European Economic Overview',
      type: 'Regional Analysis',
      date: 'October 2024',
      description: 'Regional market trends, regulatory updates, and investment opportunities across Southeast Europe.',
      size: '3.1 MB',
    },
    {
      title: 'Alternative Assets: Diversification Beyond Equities',
      type: 'Research Brief',
      date: 'September 2024',
      description: 'Exploration of alternative investment vehicles and their role in institutional portfolios.',
      size: '2.2 MB',
    },
    {
      title: 'Risk Management in Uncertain Times',
      type: 'Strategy Guide',
      date: 'August 2024',
      description: 'Updated frameworks for managing portfolio risk through market volatility and economic cycles.',
      size: '2.7 MB',
    },
    {
      title: 'H1 2024 Performance Review',
      type: 'Quarterly Report',
      date: 'July 2024',
      description: 'Mid-year assessment of market performance, portfolio adjustments, and outlook for H2.',
      size: '3.5 MB',
    },
  ]

  return (
    <>
      <Navigation />
      <main>
        {/* Page Header */}
        <section className="min-h-96 pt-32 pb-16 bg-gradient-to-b from-muted/50 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              {t.insights.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Proprietary research and market analysis to inform your investment decisions
            </p>
          </div>
        </section>

        {/* Reports Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-6">
              {reports.map((report, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/30 transition group">
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 bg-primary/10 rounded flex items-center justify-center">
                        <FileText className="w-5 h-5 text-primary" />
                      </div>
                      <span className="text-xs bg-muted px-3 py-1 rounded text-muted-foreground">
                        {report.type}
                      </span>
                    </div>

                    <h3 className="text-xl font-playfair font-semibold mb-2 group-hover:text-primary transition">
                      {report.title}
                    </h3>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                      <Calendar className="w-4 h-4" />
                      <span>{report.date}</span>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {report.description}
                    </p>

                    <div className="flex items-center justify-between pt-6 border-t border-border/50">
                      <span className="text-xs text-muted-foreground/70">{report.size}</span>
                      <Button size="sm" className="gap-2">
                        <Download className="w-4 h-4" />
                        {t.insights.download}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-playfair font-bold mb-4">Stay Informed</h2>
            <p className="text-lg text-muted-foreground mb-8">
              Subscribe to receive quarterly research reports and market analysis directly to your inbox
            </p>
            <form className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-3 bg-background border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
              <Button type="submit">Subscribe</Button>
            </form>
            <p className="text-xs text-muted-foreground/70 mt-4">
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
