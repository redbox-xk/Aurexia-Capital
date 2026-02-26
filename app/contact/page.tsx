'use client'

import { useI18n } from '@/lib/i18n/context'
import { Navigation } from '@/components/nav'
import { Footer } from '@/components/footer'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Clock } from 'lucide-react'
import { useState } from 'react'

export default function Contact() {
  const { t } = useI18n()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // Handle form submission
  }

  return (
    <>
      <Navigation />
      <main>
        {/* Page Header */}
        <section className="min-h-96 pt-32 pb-16 bg-gradient-to-b from-muted/50 to-transparent">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-5xl md:text-6xl font-playfair font-bold mb-6">
              {t.contact.title}
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Reach out to our team to discuss your wealth management needs
            </p>
          </div>
        </section>

        {/* Contact Info & Form */}
        <section className="py-24">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-16">
              {/* Contact Info Cards */}
              <Card className="border-border/50">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                    <Phone className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-playfair font-semibold text-lg mb-2">Phone</h3>
                  <p className="text-muted-foreground">{t.contact.phone}</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                    <Mail className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-playfair font-semibold text-lg mb-2">Email</h3>
                  <p className="text-muted-foreground">info@aurexiacapital.com</p>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardContent className="p-8">
                  <div className="w-12 h-12 bg-primary/10 rounded flex items-center justify-center mb-6">
                    <MapPin className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-playfair font-semibold text-lg mb-2">Location</h3>
                  <p className="text-muted-foreground">{t.contact.address}</p>
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl font-playfair font-bold mb-6">{t.contact.form}</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.name}</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.email}</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.subject}</label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) =>
                        setFormData({ ...formData, subject: e.target.value })
                      }
                      className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">{t.contact.message}</label>
                    <textarea
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      rows={6}
                      className="w-full px-4 py-3 border border-border rounded focus:outline-none focus:ring-2 focus:ring-primary/50"
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" className="w-full">
                    {t.contact.send}
                  </Button>

                  <p className="text-xs text-muted-foreground">
                    We respect your privacy. Your information is secure and confidential.
                  </p>
                </form>
              </div>

              {/* Info Sidebar */}
              <div className="space-y-8">
                <Card className="border-border/50 bg-muted/30">
                  <CardContent className="p-8">
                    <div className="flex gap-4 mb-6">
                      <Clock className="w-6 h-6 text-primary flex-shrink-0" />
                      <div>
                        <h3 className="font-playfair font-semibold mb-2">Office Hours</h3>
                        <p className="text-sm text-muted-foreground">
                          Monday - Friday: 9:00 AM - 5:00 PM CET<br />
                          Saturday - Sunday: Closed
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-border/50">
                  <CardContent className="p-8">
                    <h3 className="font-playfair font-semibold text-lg mb-4">Response Time</h3>
                    <p className="text-muted-foreground mb-4">
                      We aim to respond to all inquiries within 24 business hours. For urgent matters, please call our office directly.
                    </p>
                    <div className="space-y-2 text-sm">
                      <p className="font-medium">GDPR Compliance</p>
                      <p className="text-muted-foreground">
                        Your data is handled in accordance with GDPR regulations and our privacy policy.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-primary/30 bg-primary/5">
                  <CardContent className="p-8">
                    <h3 className="font-playfair font-semibold text-lg mb-2">Schedule Consultation</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Book a private consultation with our advisory team to discuss your financial objectives.
                    </p>
                    <Button variant="outline" className="w-full">
                      Schedule Meeting
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
