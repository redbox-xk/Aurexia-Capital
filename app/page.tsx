'use client'

import { useI18n } from '@/lib/i18n/context'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, TrendingUp, Lock, FileText, Users } from 'lucide-react'

export default function Home() {
  const { t } = useI18n()

  return (
    <>
      <Navigation />
      <main>
        {/* Hero Section */}
        <section className="min-h-[calc(100vh-64px)] pt-32 pb-16 flex items-center bg-gradient-to-b from-muted/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-block bg-secondary/20 text-secondary px-4 py-1.5 rounded text-sm font-medium mb-6">
                  {t.home.tagline}
                </span>
                <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6 leading-tight">
                  Strategic Wealth for Discerning Investors
                </h1>
                <p className="text-lg text-muted-foreground mb-8 leading-relaxed max-w-xl">
                  {t.home.subtitle}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="group">
                    {t.home.cta}
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
                  </Button>
                  <Link href="/about">
                    <Button size="lg" variant="outline">
                      Learn More
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Visual */}
              <div className="hidden md:flex justify-end">
                <div className="relative w-96 h-96 bg-gradient-to-br from-primary/5 to-secondary/5 rounded border border-border flex items-center justify-center group">
                  <div className="text-center text-muted-foreground">
                    <TrendingUp className="w-24 h-24 mx-auto mb-4 opacity-40 group-hover:opacity-60 transition" />
                    <p className="text-sm">Portfolio Excellence</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Why Aurexia Section */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">
              Why Aurexia Capital
            </h2>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 bg-background rounded border border-border hover:border-primary/30 transition group">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6 group-hover:bg-primary/20 transition">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">
                  {t.home.features.expertise}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.features.expertiseDesc}
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 bg-background rounded border border-border hover:border-primary/30 transition group">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6 group-hover:bg-primary/20 transition">
                  <Lock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">
                  {t.home.features.security}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.features.securityDesc}
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 bg-background rounded border border-border hover:border-primary/30 transition group">
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6 group-hover:bg-primary/20 transition">
                  <FileText className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-playfair font-semibold text-xl mb-3">
                  {t.home.features.research}
                </h3>
                <p className="text-muted-foreground">
                  {t.home.features.researchDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Services Preview */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">
              Comprehensive Advisory Services
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-2">{t.services.portfolio}</h3>
                  <p className="text-muted-foreground">{t.services.portfolioDesc}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                    <Lock className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-2">{t.services.risk}</h3>
                  <p className="text-muted-foreground">{t.services.riskDesc}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                    <FileText className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-2">{t.services.tax}</h3>
                  <p className="text-muted-foreground">{t.services.taxDesc}</p>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-playfair font-semibold mb-2">{t.services.succession}</h3>
                  <p className="text-muted-foreground">{t.services.successionDesc}</p>
                </div>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View All Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24 bg-primary text-primary-foreground">
          <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold mb-6">
              Ready to Elevate Your Wealth Strategy?
            </h2>
            <p className="text-lg opacity-90 mb-8 leading-relaxed">
              Schedule a consultation with our advisory team to discuss your financial objectives and discover how Aurexia Capital can help preserve and grow your wealth.
            </p>
            <Button size="lg" variant="secondary" className="group">
              {t.home.cta}
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition" />
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
