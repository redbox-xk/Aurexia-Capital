'use client'

import { useI18n } from '@/lib/i18n/context'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function Footer() {
  const { t } = useI18n()

  return (
    <footer className="bg-foreground text-background mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-secondary rounded flex items-center justify-center">
                <span className="text-foreground font-playfair font-bold text-lg">A</span>
              </div>
              <span className="font-playfair font-semibold">{t.footer.company}</span>
            </div>
            <p className="text-sm text-background/80">{t.footer.tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-playfair font-semibold mb-4">Navigate</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="hover:text-secondary transition">
                  {t.nav.about}
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-secondary transition">
                  {t.nav.services}
                </Link>
              </li>
              <li>
                <Link href="/insights" className="hover:text-secondary transition">
                  {t.nav.insights}
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-secondary transition">
                  {t.nav.contact}
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-playfair font-semibold mb-4">{t.footer.legal}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/privacy" className="hover:text-secondary transition">
                  {t.legal.privacy}
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" className="hover:text-secondary transition">
                  {t.legal.disclaimer}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-secondary transition">
                  {t.legal.terms}
                </Link>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="font-playfair font-semibold mb-4">{t.footer.subscribe}</h3>
            <form className="space-y-2">
              <Input
                type="email"
                placeholder={t.footer.email}
                className="bg-background/20 border-background/30 text-background placeholder:text-background/50"
              />
              <Button className="w-full bg-secondary hover:bg-secondary/90 text-foreground">
                Subscribe
              </Button>
            </form>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-background/70">
            <p>&copy; 2024 Aurexia Capital. All rights reserved.</p>
            <p>Institutional Wealth Advisory | Kosovo</p>
          </div>
        </div>
      </div>
    </footer>
  )
}
