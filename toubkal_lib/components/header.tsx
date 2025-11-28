"use client"
import { useState } from "react"
import { useLanguage } from "@/app/language-context"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const { language, setLanguage } = useLanguage()

  const content = {
    en: {
      services: "Services",
      booklets: "Booklets",
      contact: "Contact",
    },
    ar: {
      services: "الخدمات",
      booklets: "الكتيبات",
      contact: "اتصل بنا",
    },
  }

  const t = content[language]

  return (
    <>
      <div className="sticky top-0 z-50 border-b border-border flex justify-between items-center px-4 py-3 bg-chart-3 opacity-100 rounded-none">
        <h1 className="font-bold text-lg sm:text-xl">Toubkal Library</h1>
        <button
          onClick={() => setLanguage(language === "en" ? "ar" : "en")}
          className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:opacity-90 transition text-sm"
        >
          {language === "en" ? "العربية" : "EN"}
        </button>
      </div>
    </>
  )
}
