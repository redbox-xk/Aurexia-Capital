"use client"

import { useI18n } from "@/lib/i18n"

export default function AboutClient() {
  const { t } = useI18n()

  return (
    <div>
      <h1>{t("about.title")}</h1>
      <p>{t("about.description")}</p>
    </div>
  )
}
