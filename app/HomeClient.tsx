// app/HomeClient.tsx
"use client"

import { useI18n } from "@/lib/i18n"

export default function HomeClient() {
  const { t, setLanguage } = useI18n()

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-10">
      <h1 className="text-4xl font-bold mb-4">{t.home.title}</h1>
      <p className="text-lg mb-6">{t.home.description}</p>

      <div className="flex gap-4">
        <button
          onClick={() => setLanguage("en")}
          className="px-4 py-2 bg-black text-white rounded"
        >
          EN
        </button>
        <button
          onClick={() => setLanguage("sq")}
          className="px-4 py-2 bg-gray-300 rounded"
        >
          SQ
        </button>
      </div>
    </main>
  )
}
