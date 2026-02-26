// app/providers.tsx
"use client"

import { ReactNode } from "react"
import { I18nProvider as AppI18nProvider } from "@/lib/i18n"
import { I18nProvider as LegacyI18nProvider } from "@/lib/i18n/context"

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <LegacyI18nProvider>
      <AppI18nProvider>{children}</AppI18nProvider>
    </LegacyI18nProvider>
  )
}
