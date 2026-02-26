// app/about/AboutClient.tsx
"use client"

import { useI18n } from "@/lib/i18n"

export default function AboutClient() {
  const { t } = useI18n()

  return (
    <main className="min-h-screen p-10">
      <h1 className="text-4xl font-bold mb-4">{t.about.title}</h1>
      <p className="text-lg">{t.about.description}</p>
    </main>
  )
}
