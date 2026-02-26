// lib/i18n.tsx
"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import { translations, Language, TranslationSchema } from "./translations"

type I18nContextType = {
  language: Language
  setLanguage: (lang: Language) => void
  t: TranslationSchema
}

const I18nContext = createContext<I18nContextType | undefined>(undefined)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const value: I18nContextType = {
    language,
    setLanguage,
    t: translations[language],
  }

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const context = useContext(I18nContext)

  if (!context) {
    throw new Error("useI18n must be used within I18nProvider")
  }

  return context
}
