"use client"
import "./globals.css"
import { ReactNode } from "react"
import { I18nProvider } from "@/lib/i18n"

export const metadata = {
  title: "Aurexia Capital",
  description: "Next generation investment platform",
}

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  )
}
