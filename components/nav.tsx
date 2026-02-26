'use client'

import { useI18n } from '@/lib/i18n/context'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useState } from 'react'

export function Navigation() {
  const { language, setLanguage, t } = useI18n()
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition">
            <img src="/aurexia-logo.svg" alt="Aurexia Capital" className="w-8 h-8" />
            <span className="font-playfair font-semibold text-lg hidden sm:inline">Aurexia Capital</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm hover:text-primary transition">
              {t.nav.home}
            </Link>
            <Link href="/about" className="text-sm hover:text-primary transition">
              {t.nav.about}
            </Link>
            <Link href="/services" className="text-sm hover:text-primary transition">
              {t.nav.services}
            </Link>
            <Link href="/markets" className="text-sm hover:text-primary transition">
              Markets
            </Link>
            <Link href="/insights" className="text-sm hover:text-primary transition">
              {t.nav.insights}
            </Link>
            <Link href="/clients" className="text-sm hover:text-primary transition">
              {t.nav.clients}
            </Link>
            <Link href="/contact" className="text-sm hover:text-primary transition">
              {t.nav.contact}
            </Link>
          </div>

          {/* Language & Auth */}
          <div className="flex items-center gap-4">
            <div className="flex gap-1 bg-muted p-1 rounded">
              <button
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 text-xs font-medium rounded transition ${
                  language === 'en'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                EN
              </button>
              <button
                onClick={() => setLanguage('al')}
                className={`px-3 py-1 text-xs font-medium rounded transition ${
                  language === 'al'
                    ? 'bg-background text-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                SQ
              </button>
            </div>

            <Link href="/portal">
              <Button size="sm" variant="default">
                {t.nav.portal}
              </Button>
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link href="/" className="block px-3 py-2 hover:bg-muted rounded text-sm">
              {t.nav.home}
            </Link>
            <Link href="/about" className="block px-3 py-2 hover:bg-muted rounded text-sm">
              {t.nav.about}
            </Link>
            <Link href="/services" className="block px-3 py-2 hover:bg-muted rounded text-sm">
              {t.nav.services}
            </Link>
            <Link href="/insights" className="block px-3 py-2 hover:bg-muted rounded text-sm">
              {t.nav.insights}
            </Link>
            <Link href="/clients" className="block px-3 py-2 hover:bg-muted rounded text-sm">
              {t.nav.clients}
            </Link>
            <Link href="/contact" className="block px-3 py-2 hover:bg-muted rounded text-sm">
              {t.nav.contact}
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
