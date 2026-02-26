'use client'

import { useI18n } from '@/lib/i18n/context'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Users, Shield, Target, Award } from 'lucide-react'

export const dynamic = "force-dynamic"
export default function About() {
  const { t } = useI18n()

  return (
    <>
      <Navigation />
      <main>
        {/* Page Header */}
        <section className="min-h-96 pt-32 pb-16 bg-gradient-to-b from-muted/50 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              {t.about.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Institutional expertise meets unwavering commitment to client success
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-16">
              {/* Mission */}
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                  <Target className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-playfair font-bold mb-4">{t.about.mission}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.missionDesc}
                </p>
              </div>

              {/* Vision */}
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <h2 className="text-3xl font-playfair font-bold mb-4">{t.about.vision}</h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  {t.about.visionDesc}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Governance */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl">
              <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                <Shield className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-3xl font-playfair font-bold mb-4">{t.about.governance}</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                {t.about.governanceDesc}
              </p>

              {/* Compliance Grid */}
              <div className="grid md:grid-cols-3 gap-6 mt-8">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-playfair font-semibold mb-3">Regulatory Oversight</h3>
                    <p className="text-sm text-muted-foreground">Operating under stringent regulatory requirements and regular compliance audits</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-playfair font-semibold mb-3">Risk Management</h3>
                    <p className="text-sm text-muted-foreground">Comprehensive risk assessment and mitigation frameworks across all portfolios</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <h3 className="font-playfair font-semibold mb-3">Transparent Reporting</h3>
                    <p className="text-sm text-muted-foreground">Quarterly reporting and open communication with all stakeholders</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-playfair font-bold mb-6">Leadership & Team</h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Experienced professionals dedicated to excellence in wealth management
              </p>
            </div>

            {/* Team Members Grid */}
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden hover:shadow-lg transition">
                  <div className="h-48 bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                    <Users className="w-16 h-16 opacity-30" />
                  </div>
                  <CardContent className="p-6">
                    <h3 className="font-playfair font-semibold text-lg mb-2">Senior Advisor</h3>
                    <p className="text-sm text-muted-foreground mb-3">20+ years of institutional experience</p>
                    <p className="text-xs text-muted-foreground/70">Specialized in portfolio management and risk advisory</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
