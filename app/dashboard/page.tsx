'use client'

import { useAuth } from '@/lib/auth/auth-context'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileText, TrendingUp, DollarSign, LogOut, Mail, Phone } from 'lucide-react'

export default function DashboardPage() {
  const { user, logout, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, router])

  if (!user) return null

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-muted/50 to-transparent">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <span className="text-primary-foreground font-playfair font-bold">A</span>
            </div>
            <div>
              <h1 className="font-playfair font-semibold hidden sm:block">Aurexia Capital</h1>
              <p className="text-xs text-muted-foreground">Client Portal</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground hidden sm:inline">{user.name}</span>
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
          <h2 className="text-4xl font-playfair font-bold mb-2">Welcome back, {user.name.split(' ')[0]}</h2>
          <p className="text-muted-foreground">Manage your portfolio and access your documents</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Assets Under Management</p>
                  <p className="text-3xl font-playfair font-bold">€2,450,000</p>
                </div>
                <DollarSign className="w-8 h-8 text-primary/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">YTD Performance</p>
                  <p className="text-3xl font-playfair font-bold text-green-600">+12.4%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-green-600/30" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Last Review</p>
                  <p className="text-lg font-playfair font-bold">Q3 2024</p>
                </div>
                <FileText className="w-8 h-8 text-primary/30" />
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

            {/* Contact Info */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Advisor Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Senior Advisor</p>
                  <p className="font-semibold">Elena Shkreli</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-primary/60" />
                    <span>+383 (0) 38 123 456</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-primary/60" />
                    <span>elena@aurexiacapital.com</span>
                  </div>
                </div>
                <Button variant="outline" className="w-full">
                  Schedule Call
                </Button>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Account</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button variant="outline" className="w-full justify-start">
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  Security & Privacy
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
