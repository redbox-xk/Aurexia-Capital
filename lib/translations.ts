// lib/translations.ts

export const translations = {
  en: {
    nav: {
      home: "Home",
      about: "About",
    },
    home: {
      title: "Aurexia Capital",
      description: "Institutional Wealth Advisory & Digital Asset Strategy",
    },
    about: {
      title: "About Aurexia",
      description:
        "Aurexia Capital delivers modern capital solutions with institutional precision.",
    },
  },
  sq: {
    nav: {
      home: "Ballina",
      about: "Rreth Nesh",
    },
    home: {
      title: "Aurexia Capital",
      description:
        "Këshillim Institucional i Pasurisë & Strategji e Aseteve Digjitale",
    },
    about: {
      title: "Rreth Aurexia",
      description:
        "Aurexia Capital ofron zgjidhje moderne kapitali me saktësi institucionale.",
    },
  },
}

export type Language = keyof typeof translations
export type TranslationSchema = typeof translations.en
