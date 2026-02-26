// app/layout.tsx

import "./globals.css"
import type { Metadata } from "next"
import { I18nProvider } from "@/lib/i18n"

export const metadata: Metadata = {
  title: "Aurexia Capital | Institutional Wealth Advisory",
  description:
    "Aurexia Capital provides institutional wealth advisory services for discerning investors in Kosovo and internationally.",
  keywords: [
    "Wealth Advisory Kosovo",
    "Institutional Investment Advisory",
    "Portfolio Management Kosovo",
    "Private Wealth Management Balkans"
  ],
  authors: [{ name: "Aurexia Capital" }],
  openGraph: {
    title: "Aurexia Capital",
    description:
      "Institutional Wealth Advisory for Discerning Clients.",
    url: "https://aurexiacapital.com",
    siteName: "Aurexia Capital",
    type: "website"
  }
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B1C2D] text-white antialiased">
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
