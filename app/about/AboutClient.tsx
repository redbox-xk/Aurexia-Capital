"use client"

import { useI18n } from "@/lib/i18n"

export default function AboutClient() {
  const { t } = useI18n()

  return (
    <main className="px-6 py-12">
      <h1 className="text-4xl font-bold mb-4">{t.home.tagline}</h1>
      <p className="text-lg text-gray-700">{t.home.description}</p>
    </main>
  )
}
