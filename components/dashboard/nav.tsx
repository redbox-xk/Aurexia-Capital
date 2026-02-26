'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { 
  LayoutDashboard, 
  Wallet, 
  ArrowDownLeft, 
  ArrowUpRight, 
  FileText, 
  Settings,
  LogOut
} from 'lucide-react'

interface DashboardNavProps {
  user: any
}

export function DashboardNav({ user }: DashboardNavProps) {
  const pathname = usePathname()

  const links = [
    { href: '/dashboard', icon: LayoutDashboard, label: 'Overview' },
    { href: '/dashboard/wallets', icon: Wallet, label: 'Wallets' },
    { href: '/dashboard/receive', icon: ArrowDownLeft, label: 'Receive' },
    { href: '/dashboard/send', icon: ArrowUpRight, label: 'Send' },
    { href: '/dashboard/history', icon: FileText, label: 'History' },
    { href: '/dashboard/profile', icon: Settings, label: 'Settings' },
  ]

  const isActive = (href: string) => {
    if (href === '/dashboard') return pathname === '/dashboard'
    return pathname.startsWith(href)
  }

  return (
    <nav className="border-b border-border bg-background/95 backdrop-blur-sm sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <Wallet className="w-5 h-5" />
              Dashboard
            </Link>
            <div className="hidden md:flex items-center gap-1">
              {links.map((link) => {
                const Icon = link.icon
                return (
                  <Link key={link.href} href={link.href}>
                    <Button 
                      variant={isActive(link.href) ? 'default' : 'ghost'}
                      size="sm"
                      className="gap-2"
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:block text-sm">
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
            <Button variant="outline" size="sm" onClick={() => {}}>
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </nav>
  )
}
