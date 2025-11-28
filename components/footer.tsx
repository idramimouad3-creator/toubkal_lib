"use client"

import { MessageCircle, MapPin, Phone, Mail } from "lucide-react"
import { useLanguage } from "@/app/language-context"

export default function Footer() {
  const { language, setLanguage } = useLanguage()
  const phoneNumber = "212629009050"

  const handleWhatsApp = () => {
    const message =
      language === "en"
        ? "Hello! I have a question about TOUBKAL LIB services."
        : "مرحبا! لدي سؤال حول خدمات توبكال ليب"
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const openMaps = () => {
    const address = "9G5H+PP2, Av. Mohammed V, Aït Melloul 86153, Morocco"
    const mapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(address)}`
    window.open(mapsUrl, "_blank")
  }

  const content = {
    en: {
      title: "TOUBKAL LIB",
      description: "Professional printing and booklet services for students in Aït Melloul.",
      quickLinks: "Quick Links",
      printServices: "Print Services",
      booklets: "Booklets",
      contact: "Contact",
      contactInfo: "Contact Info",
      address: "9G5H+PP2, Av. Mohammed V\nAït Melloul 86153, Morocco",
      phone: "0629-009050",
      email: "toubkal.lib@gmail.com",
      getInTouch: "Get in Touch",
      whatsappUs: "WhatsApp Us",
      copyright: "© 2025 TOUBKAL LIB. All rights reserved.",
    },
    ar: {
      title: "توبكال ليب",
      description: "خدمات طباعة واحترافية وكتيبات للطلاب في أيت ملول.",
      quickLinks: "روابط سريعة",
      printServices: "خدمات الطباعة",
      booklets: "الكتيبات",
      contact: "اتصل بنا",
      contactInfo: "معلومات التواصل",
      address: "9G5H+PP2, شارع محمد الخامس\nأيت ملول 86153، المغرب",
      phone: "0629-009050",
      email: "toubkal.lib@gmail.com",
      getInTouch: "تواصل معنا",
      whatsappUs: "واتس أب",
      copyright: "© 2025 توبكال ليب. جميع الحقوق محفوظة.",
    },
  }

  const t = content[language]

  return (
    <footer id="contact" className="bg-primary text-primary-foreground py-8 sm:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-end mb-6 sm:mb-8">
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="bg-secondary text-secondary-foreground px-3 sm:px-4 py-2 rounded-lg font-semibold hover:opacity-90 transition text-sm sm:text-base"
          >
            {language === "en" ? "العربية" : "English"}
          </button>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 mb-8 sm:mb-12 ${language === "ar" ? "text-right" : ""}`}
        >
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">{t.title}</h3>
            <p className="text-primary-foreground/80 text-xs sm:text-sm leading-relaxed">{t.description}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.quickLinks}</h3>
            <ul className="space-y-1 sm:space-y-2 text-primary-foreground/80 text-xs sm:text-sm">
              <li>
                <a href="#services" className="hover:text-primary-foreground transition">
                  {t.printServices}
                </a>
              </li>
              <li>
                <a href="#booklets" className="hover:text-primary-foreground transition">
                  {t.booklets}
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-primary-foreground transition">
                  {t.contact}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.contactInfo}</h3>
            <ul className="space-y-2 sm:space-y-3 text-primary-foreground/80 text-xs sm:text-sm">
              <li
                className="flex items-start gap-2 cursor-pointer hover:text-primary-foreground transition"
                onClick={openMaps}
              >
                <MapPin size={16} className="flex-shrink-0 mt-0.5" />
                <span className="whitespace-pre-line">{t.address}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone size={16} />
                <a href={`tel:+${phoneNumber}`} className="hover:text-primary-foreground transition">
                  {t.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} />
                <a href="mailto:toubkal.lib@gmail.com" className="hover:text-primary-foreground transition">
                  {t.email}
                </a>
              </li>
            </ul>
          </div>

          {/* WhatsApp */}
          <div>
            <h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{t.getInTouch}</h3>
            <button
              onClick={handleWhatsApp}
              className="w-full bg-[#25D366] text-white py-2 sm:py-3 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-[#20BA58] transition text-xs sm:text-sm"
            >
              <MessageCircle size={18} />
              {t.whatsappUs}
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-primary-foreground/20 pt-6 sm:pt-8 text-center text-primary-foreground/60 text-xs sm:text-sm">
          <p>{t.copyright}</p>
        </div>
      </div>
    </footer>
  )
}
