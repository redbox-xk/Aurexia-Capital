'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, TrendingUp, DollarSign, LogOut, Mail, Phone, Shield, Award, Globe, CheckCircle } from 'lucide-react'
import { companyProfile } from '@/lib/company/profile'

export default function DashboardPage() {
  const router = useRouter()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userEmail, setUserEmail] = useState('')
  const [clearanceLevel, setClearanceLevel] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Validate cryptic session token on mount
    const sessionToken = localStorage.getItem('aurexia-session')
    const email = localStorage.getItem('aurexia-email')
    const clearance = localStorage.getItem('aurexia-clearance')

    if (!sessionToken || !email) {
      router.push('/auth/login')
      return
    }

    // Parse and validate token (in production: verify signature/expiration)
    try {
      const parsed = JSON.parse(Buffer.from(sessionToken, 'base64').toString('utf8'))
      if (parsed.exp && parsed.exp * 1000 < Date.now()) {
        // Token expired
        localStorage.removeItem('aurexia-session')
        localStorage.removeItem('aurexia-email')
        localStorage.removeItem('aurexia-clearance')
        router.push('/auth/login')
        return
      }
      
      setIsAuthenticated(true)
      setUserEmail(email)
      setClearanceLevel(clearance || 'institutional')
    } catch (error) {
      router.push('/auth/login')
      return
    } finally {
      setIsLoading(false)
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem('aurexia-session')
    localStorage.removeItem('aurexia-email')
    localStorage.removeItem('aurexia-clearance')
    router.push('/')
  }

  if (isLoading || !isAuthenticated) return null

  const clientFirstName = userEmail.split('@')[0].charAt(0).toUpperCase() + userEmail.split('@')[0].slice(1)

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-transparent">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img src="/aurexia-logo.svg" alt="Aurexia Capital" className="w-8 h-8" />
            <div>
              <h1 className="font-playfair font-semibold hidden sm:block text-base">Aurexia Capital</h1>
              <p className="text-xs text-muted-foreground">Institutional Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium">{userEmail}</p>
              <p className="text-xs text-muted-foreground capitalize">{clearanceLevel} clearance</p>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2">
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Welcome Section */}
        <div className="mb-12">
          <h2 className="text-4xl font-playfair font-bold mb-2">Welcome, {clientFirstName}</h2>
          <p className="text-muted-foreground">Your institutional wealth management portal</p>
        </div>

        {/* Institutional Metrics */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assets Under Advisement</p>
                  <p className="text-3xl font-playfair font-bold">{companyProfile.organization.assetUnderAdvisement}</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Client Partnerships</p>
                  <p className="text-3xl font-playfair font-bold">{companyProfile.organization.clientCount}+</p>
                </div>
                <Globe className="w-8 h-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Established</p>
                  <p className="text-3xl font-playfair font-bold">{companyProfile.identity.establishedYear}</p>
                </div>
                <Award className="w-8 h-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Documents */}
          <div className="md:col-span-2">
            <h3 className="text-2xl font-playfair font-bold mb-6">Documents & Reports</h3>

            <div className="space-y-4">
              {[
                {
                  title: 'Q3 2024 Performance Report',
                  date: 'October 2024',
                  size: '2.4 MB',
                  type: 'Report',
                },
                {
                  title: 'Portfolio Strategy Document',
                  date: 'September 2024',
                  size: '1.8 MB',
                  type: 'Strategy',
                },
                {
                  title: 'Risk Assessment & Analysis',
                  date: 'August 2024',
                  size: '3.1 MB',
                  type: 'Risk',
                },
                {
                  title: 'Annual Compliance Statement',
                  date: 'July 2024',
                  size: '892 KB',
                  type: 'Compliance',
                },
              ].map((doc, i) => (
                <Card key={i} className="hover:border-primary/30 transition">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <FileText className="w-5 h-5 text-primary/60" />
                          <h4 className="font-semibold">{doc.title}</h4>
                        </div>
                        <p className="text-sm text-muted-foreground">{doc.date} • {doc.size}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Download
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button variant="outline" className="w-full justify-start">
                  <Mail className="w-4 h-4 mr-2" />
                  Message Advisor
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Schedule Meeting
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  View All Reports
                </Button>
              </CardContent>
            </Card>

            {/* Your Senior Advisor */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Your Senior Advisor</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{companyProfile.leadership[0].title}</p>
                  <p className="font-semibold">{companyProfile.leadership[0].name}</p>
                  <p className="text-xs text-muted-foreground mt-1">{companyProfile.leadership[0].expertise}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary/60" />
                    <span>{companyProfile.contact.mainOffice.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary/60" />
                    <span>clients@aurexiacapital.com</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Schedule Consultation
                </Button>
              </CardContent>
            </Card>

            {/* Firm Information */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Firm Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">LEGAL ENTITY</p>
                  <p className="font-semibold">{companyProfile.identity.legalName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">LOCATION</p>
                  <p className="font-semibold">{companyProfile.contact.mainOffice.address.split(',')[0]}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">REGULATORY STATUS</p>
                  <p className="font-semibold">{companyProfile.identity.regulatoryStatus}</p>
                </div>
                <div className="pt-3 border-t border-border">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3">Compliance Standards</p>
                  <div className="space-y-2">
                    {companyProfile.compliance.certifications.map((cert, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-xs text-muted-foreground">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Firm Mission */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Our Philosophy</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <div>
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-1">Mission</p>
                  <p className="text-xs leading-relaxed">{companyProfile.mission}</p>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted-foreground uppercase font-semibold mb-2">Core Values</p>
                  <ul className="space-y-2">
                    {companyProfile.values.slice(0, 2).map((value, i) => (
                      <li key={i} className="text-xs">
                        <span className="font-semibold">{value.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
