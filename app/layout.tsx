import React from "react"
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import './globals.css'

const _geist = Geist({ subsets: ['latin'] })
const _geistMono = Geist_Mono({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Flash Wallet - Secure Crypto Wallet Management',
  description: 'Flash Wallet is a secure, easy-to-use cryptocurrency wallet for managing multiple wallets, sending, receiving, and mining crypto on the blockchain. Control your digital assets with military-grade security and a beautiful interface.',
  keywords: 'crypto wallet, bitcoin wallet, ethereum wallet, blockchain, crypto management, secure wallet, digital assets',
  creator: 'Flash Wallet Team',
  generator: 'Flash Wallet v1.0.0',
  metadataBase: new URL('https://flashwallet.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://flashwallet.app',
    siteName: 'Flash Wallet',
    title: 'Flash Wallet - Your Secure Crypto Wallet',
    description: 'Manage, send, receive, and mine cryptocurrency with enterprise-grade security.',
    images: [
      {
        url: '/fw-logo.svg',
        width: 160,
        height: 160,
        alt: 'Flash Wallet Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Flash Wallet - Secure Crypto Management',
    description: 'Your trusted platform for cryptocurrency wallets and blockchain transactions',
    images: ['/fw-logo.svg'],
  },
  icons: {
    icon: '/fw-logo.svg',
    apple: '/fw-logo.svg',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
