import "./globals.css"
import { ReactNode } from "react"
import Providers from "./providers"

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
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
