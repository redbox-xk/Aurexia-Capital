'use client'

import { useI18n } from '@/lib/i18n/context'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { companyProfile } from '@/lib/company/profile'
import { Shield, Award, Users, Globe, TrendingUp, CheckCircle } from 'lucide-react'
import { NewsletterSignup } from '@/components/newsletter-signup'

export default function CompanyPage() {
  const { t } = useI18n()

  return (
    <>
      <Navigation />
      <main>
        {/* Hero */}
        <section className="min-h-[50vh] pt-32 pb-16 bg-gradient-to-b from-muted/50 to-transparent">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <h1 className="text-5xl font-playfair font-bold mb-6">About Aurexia Capital</h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {companyProfile.identity.shortDescription}
              </p>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Our Mission</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{companyProfile.mission}</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">Our Vision</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">{companyProfile.vision}</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">Core Values</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {companyProfile.values.map((value, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle className="text-xl">{value.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">Leadership Team</h2>

            <div className="grid md:grid-cols-2 gap-8">
              {companyProfile.leadership.map((member, i) => (
                <Card key={i}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-xl">{member.name}</CardTitle>
                        <p className="text-sm text-primary font-medium mt-1">{member.title}</p>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Background</p>
                      <p className="text-sm">{member.background}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Expertise</p>
                      <p className="text-sm">{member.expertise}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Profile</p>
                      <p className="text-sm text-muted-foreground">{member.bio}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Organization Structure */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">Organization</h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Users className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Team Members</p>
                      <p className="text-2xl font-bold">{companyProfile.organization.totalEmployees}+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <Globe className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">Client Partnerships</p>
                      <p className="text-2xl font-bold">{companyProfile.organization.clientCount}+</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <TrendingUp className="w-8 h-8 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">AUA</p>
                      <p className="text-2xl font-bold">{companyProfile.organization.assetUnderAdvisement}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {Object.values(companyProfile.organization.structure).map((dept: any, i) => (
                <Card key={i}>
                  <CardHeader>
                    <CardTitle>{dept.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="text-muted-foreground">{dept.description}</p>
                    <p className="text-sm font-semibold">{dept.members || dept.analysts} professionals</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Compliance & Security */}
        <section className="py-24 bg-muted/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-4xl font-playfair font-bold text-center mb-16">Compliance & Security</h2>

            <div className="grid md:grid-cols-3 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Licenses
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {companyProfile.compliance.licenses.map((license, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{license}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="w-5 h-5" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {companyProfile.compliance.certifications.map((cert, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    Insurance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {companyProfile.compliance.insurances.map((insurance, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span>{insurance}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Newsletter */}
        <section className="py-16 bg-muted/30">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <NewsletterSignup 
              title="Stay Updated"
              description="Subscribe to our institutional insights, market analysis, and investment opportunities."
            />
          </div>
        </section>

        {/* Contact */}
        <section className="py-24">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-playfair font-bold mb-6">Get In Touch</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Contact our team to discuss your wealth management objectives
            </p>

            <Card>
              <CardContent className="p-8 space-y-6">
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-semibold mb-2">Address</p>
                  <p className="text-lg font-medium">{companyProfile.contact.mainOffice.address}</p>
                </div>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <p className="text-sm text-muted-foreground uppercase font-semibold mb-2">Phone</p>
                    <p className="text-lg font-medium">{companyProfile.contact.mainOffice.phone}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground uppercase font-semibold mb-2">Email</p>
                    <p className="text-lg font-medium">{companyProfile.contact.mainOffice.email}</p>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground uppercase font-semibold mb-2">Hours</p>
                  <p className="text-lg font-medium">{companyProfile.contact.mainOffice.hours}</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
