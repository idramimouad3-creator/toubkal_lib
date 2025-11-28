"use client"

import { BookOpen } from "lucide-react"
import { useLanguage } from "@/app/language-context"

interface Booklet {
  id: string
  title: string
  subject: string
  faculty: string
  year: string
  pages: number
}

export default function BookletCard({ booklet }: { booklet: Booklet }) {
  const { language } = useLanguage()

  const handleOrderViaWhatsApp = () => {
    const phoneNumber = "212629009050"
    const message =
      language === "en"
        ? `I want to print the following booklet:\n\n📚 Title: ${booklet.title}\n📖 Subject: ${booklet.subject}\n🏫 Faculty: ${booklet.faculty}\n📅 Year: ${booklet.year}\n📄 Pages: ${booklet.pages}\n\nPlease provide me with the printing options and pricing.`
        : `أريد طباعة الكتيب التالي:\n\n📚 العنوان: ${booklet.title}\n📖 الموضوع: ${booklet.subject}\n🏫 الكلية: ${booklet.faculty}\n📅 السنة: ${booklet.year}\n📄 الصفحات: ${booklet.pages}\n\nيرجى تزويدي بخيارات الطباعة والأسعار.`
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const content = {
    en: {
      faculty: "Faculty",
      year: "Year",
      pages: "Pages",
      orderNow: "Order via WhatsApp",
    },
    ar: {
      faculty: "الكلية",
      year: "السنة",
      pages: "الصفحات",
      orderNow: "اطلب عبر واتساب",
    },
  }

  const t = content[language]

  return (
    <div
      className="bg-card border border-border rounded-xl overflow-hidden hover:shadow-lg hover:border-primary transition-all h-full flex flex-col cursor-pointer"
      onClick={handleOrderViaWhatsApp}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/15 to-accent/15 p-4 sm:p-6 border-b border-border">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2 flex-wrap">
              <BookOpen size={16} className="text-primary flex-shrink-0" />
              <span className="text-xs font-semibold text-primary uppercase">{booklet.subject}</span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-foreground line-clamp-2">{booklet.title}</h3>
          </div>
        </div>
      </div>

      <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
        <div className="space-y-2 sm:space-y-3 mb-4">
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">{t.faculty}:</span>
            <span className="font-semibold text-foreground">{booklet.faculty}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">{t.year}:</span>
            <span className="font-semibold text-foreground">{booklet.year}</span>
          </div>
          <div className="flex justify-between text-xs sm:text-sm">
            <span className="text-muted-foreground">{t.pages}:</span>
            <span className="font-semibold text-foreground">{booklet.pages}</span>
          </div>
        </div>

        <button
          onClick={(e) => {
            e.stopPropagation()
            handleOrderViaWhatsApp()
          }}
          className="w-full bg-[#25D366] hover:bg-[#20BA58] text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition text-sm sm:text-base"
        >
          {t.orderNow}
        </button>
      </div>
    </div>
  )
}
