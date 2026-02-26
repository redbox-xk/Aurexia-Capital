'use client'

import { useI18n } from '@/lib/i18n/context'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Star, Quote } from 'lucide-react'

export default function Clients() {
  const { t } = useI18n()

  const testimonials = [
    {
      quote: 'Aurexia Capital has transformed how we manage our family wealth. The professionalism and strategic insights are unmatched.',
      author: 'European Business Leader',
      role: 'Asset Portfolio €50M+',
      rating: 5,
    },
    {
      quote: 'Their understanding of Southeast European markets combined with global perspective is invaluable. Highly recommend.',
      author: 'Regional Entrepreneur',
      role: 'Capital Advisor',
      rating: 5,
    },
    {
      quote: 'The quarterly reports and market analysis provide the insights we need to make confident investment decisions.',
      author: 'Investment Committee Member',
      role: 'Institutional Fund',
      rating: 5,
    },
    {
      quote: 'Professional, transparent, and results-oriented. They truly understand high-net-worth advisory.',
      author: 'Wealth Holder',
      role: 'Family Office Client',
      rating: 5,
    },
    {
      quote: 'Tax optimization strategies alone have saved us significant capital. Excellent advisory partnership.',
      author: 'Corporate Executive',
      role: 'C-Level Strategic Planning',
      rating: 5,
    },
    {
      quote: 'Their commitment to compliance and risk management gives us peace of mind managing substantial assets.',
      author: 'International Investor',
      role: 'Cross-border Portfolio',
      rating: 5,
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
              {t.clients.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Trusted by discerning investors across Europe and Southeast Europe
            </p>
          </div>
        </section>

        {/* Statistics */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-playfair font-bold text-primary mb-2">€2.4B+</div>
                <p className="text-muted-foreground">Assets Under Advisement</p>
              </div>
              <div>
                <div className="text-4xl font-playfair font-bold text-primary mb-2">350+</div>
                <p className="text-muted-foreground">Client Families</p>
              </div>
              <div>
                <div className="text-4xl font-playfair font-bold text-primary mb-2">20+</div>
                <p className="text-muted-foreground">Years Experience</p>
              </div>
              <div>
                <div className="text-4xl font-playfair font-bold text-primary mb-2">98%</div>
                <p className="text-muted-foreground">Client Retention Rate</p>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">
              What Our Clients Say
            </h2>

            <div className="grid md:grid-cols-2 gap-8">
              {testimonials.map((testimonial, i) => (
                <Card key={i} className="border-border/50 hover:border-primary/30 transition">
                  <CardContent className="p-8">
                    {/* Stars */}
                    <div className="flex gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <Star key={j} className="w-5 h-5 fill-primary text-primary" />
                      ))}
                    </div>

                    {/* Quote */}
                    <div className="mb-6">
                      <Quote className="w-6 h-6 text-primary/30 mb-4" />
                      <p className="text-lg leading-relaxed">"{testimonial.quote}"</p>
                    </div>

                    {/* Author */}
                    <div className="border-t border-border/50 pt-6">
                      <p className="font-playfair font-semibold">{testimonial.author}</p>
                      <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Institutional Trust */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-playfair font-bold mb-6">Institutional Grade Service</h2>
            <p className="text-xl text-muted-foreground leading-relaxed mb-12">
              Serving high-net-worth individuals, family offices, and institutional investors with sophisticated advisory solutions and unwavering commitment to excellence.
            </p>

            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="p-6 bg-background rounded border border-border/50">
                <h3 className="font-playfair font-semibold text-lg mb-2">Discretionary Advisory</h3>
                <p className="text-sm text-muted-foreground">Full portfolio management based on comprehensive strategy</p>
              </div>
              <div className="p-6 bg-background rounded border border-border/50">
                <h3 className="font-playfair font-semibold text-lg mb-2">Risk Management</h3>
                <p className="text-sm text-muted-foreground">Advanced frameworks for protecting and growing wealth</p>
              </div>
              <div className="p-6 bg-background rounded border border-border/50">
                <h3 className="font-playfair font-semibold text-lg mb-2">Legacy Planning</h3>
                <p className="text-sm text-muted-foreground">Multi-generational wealth transfer and succession</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
