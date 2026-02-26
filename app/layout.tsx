import React from 'react'
import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { I18nProvider } from '@/lib/i18n/context'
import { AuthProvider } from '@/lib/auth/auth-context'
import { ConsentBanner } from '@/components/consent-banner'
import { AnalyticsInitializer } from '@/components/analytics-initializer'
import { StockTickerBanner } from '@/components/stock-ticker-banner'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700'],
})
const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Aurexia Capital - Institutional Wealth Advisory',
  description: 'Premium institutional wealth management and financial advisory for discerning investors in Kosovo and Southeast Europe. Offering portfolio management, risk advisory, and tax strategy with bank-grade security and GDPR compliance.',
  keywords: 'wealth management, institutional advisory, portfolio management, Kosovo, financial advisor, investment strategy, risk management',
  creator: 'Aurexia Capital',
  generator: 'Aurexia Capital v1.0',
  metadataBase: new URL('https://aurexiacapital.com'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://aurexiacapital.com',
    siteName: 'Aurexia Capital',
    title: 'Aurexia Capital - Institutional Wealth Advisory',
    description: 'Strategic financial guidance for discerning investors across Southeast Europe',
    images: [
      {
        url: '/aurexia-logo.svg',
        width: 200,
        height: 60,
        alt: 'Aurexia Capital Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aurexia Capital - Wealth Management',
    description: 'Institutional advisory for discerning investors',
    images: ['/aurexia-logo.svg'],
  },
  icons: {
    icon: '/aurexia-icon.svg',
    apple: '/aurexia-icon.svg',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID || 'G-XXXXXXXXXX'}');
            `,
          }}
        />
      </head>
      <body className="font-sans antialiased bg-background text-foreground">
        <StockTickerBanner />
        <AuthProvider>
          <I18nProvider>
            {children}
            <ConsentBanner />
            <AnalyticsInitializer />
          </I18nProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
