'use client'

import { useI18n } from '@/lib/i18n/context'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { TrendingUp, Lock, FileText, Users, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function Services() {
  const { t } = useI18n()

  const services = [
    {
      icon: TrendingUp,
      title: t.services.portfolio,
      description: t.services.portfolioDesc,
      features: [
        'Personalized investment strategy',
        'Multi-asset allocation',
        'Quarterly performance reviews',
        'Risk-adjusted returns optimization',
      ],
    },
    {
      icon: Lock,
      title: t.services.risk,
      description: t.services.riskDesc,
      features: [
        'Comprehensive risk profiling',
        'Portfolio stress testing',
        'Hedging strategies',
        'Geopolitical exposure analysis',
      ],
    },
    {
      icon: FileText,
      title: t.services.tax,
      description: t.services.taxDesc,
      features: [
        'Cross-border tax planning',
        'Jurisdiction optimization',
        'Estate tax strategies',
        'Charitable giving structures',
      ],
    },
    {
      icon: Users,
      title: t.services.succession,
      description: t.services.successionDesc,
      features: [
        'Generational wealth transfer',
        'Family governance frameworks',
        'Trustee selection & management',
        'Legacy planning',
      ],
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
              {t.services.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Comprehensive advisory solutions tailored to your unique financial objectives
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-8">
              {services.map((service, i) => {
                const Icon = service.icon
                return (
                  <Card key={i} className="border-border/50 hover:border-primary/30 transition overflow-hidden">
                    <CardContent className="p-8">
                      <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                        <Icon className="w-6 h-6 text-primary" />
                      </div>
                      <h3 className="text-2xl font-playfair font-semibold mb-4">{service.title}</h3>
                      <p className="text-muted-foreground mb-6 leading-relaxed">{service.description}</p>

                      {/* Features List */}
                      <ul className="space-y-3 mb-6">
                        {service.features.map((feature, j) => (
                          <li key={j} className="flex items-start gap-3">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Link href="/contact">
                        <Button variant="outline" className="w-full">
                          Learn More
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Process Section */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">Our Process</h2>

            <div className="space-y-8">
              {[
                { number: '01', title: 'Discovery', desc: 'In-depth consultation to understand your financial goals and constraints' },
                { number: '02', title: 'Analysis', desc: 'Comprehensive assessment of your current financial position' },
                { number: '03', title: 'Strategy', desc: 'Development of customized advisory strategy and implementation plan' },
                { number: '04', title: 'Execution', desc: 'Professional implementation with regular monitoring and adjustments' },
              ].map((step, i) => (
                <div key={i} className="flex gap-8 items-start">
                  <div className="text-4xl font-playfair font-bold text-primary/30 flex-shrink-0 w-20">
                    {step.number}
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-semibold mb-2">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
