"use client"
import { useLanguage } from "@/app/language-context"

export default function HeroSection() {
  const { language } = useLanguage()

  const content = {
    en: {
      title: "Toubkal Library",
      subtitle: "Your Printing & Booklet Partner",
      description:
        "Professional printing and course booklets for students. Fast, reliable, and affordable solutions for all your academic needs.",
      printService: "Print My File",
      browseBooklets: "Browse Booklets",
    },
    ar: {
      title: "مكتبة توبكال",
      subtitle: "شريكك في الطباعة والكتيبات",
      description:
        "خدمات طباعة احترافية وكتيبات دراسية للطلاب. حلول سريعة وموثوقة وبأسعار معقولة لجميع احتياجاتك الأكاديمية.",
      printService: "اطبع ملفي",
      browseBooklets: "استعرض الكتيبات",
    },
  }

  const t = content[language]

  const handleSmoothScroll = (targetId: string) => {
    const element = document.getElementById(targetId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      className={`bg-gradient-to-br from-primary/20 via-background to-accent/15 py-16 sm:py-24 md:py-32 px-4 min-h-screen flex items-center ${language === "ar" ? "text-right" : ""}`}
    >
      <div className="max-w-6xl mx-auto w-full">
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center">
          {/* Left Content */}
          <div className={language === "ar" ? "md:col-start-2" : ""}>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground mb-3 sm:mb-4 text-balance leading-tight">
              {t.title}
            </h1>
            <p className="text-xl sm:text-2xl md:text-3xl text-primary font-bold mb-4 sm:mb-6">{t.subtitle}</p>
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-8 sm:mb-10 leading-relaxed max-w-xl">
              {t.description}
            </p>

            <div
              className={`flex flex-col sm:flex-row gap-4 sm:gap-6 ${language === "ar" ? "sm:flex-row-reverse" : ""}`}
            >
              <button
                onClick={() => handleSmoothScroll("services")}
                className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-primary-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold hover:shadow-lg transition transform hover:scale-105 text-base sm:text-lg w-full sm:w-auto text-center"
              >
                {t.printService}
              </button>
              <button
                onClick={() => handleSmoothScroll("booklets")}
                className="border-3 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 sm:px-10 py-4 sm:py-5 rounded-xl font-bold transition transform hover:scale-105 text-base sm:text-lg w-full sm:w-auto text-center"
              >
                {t.browseBooklets}
              </button>
            </div>
          </div>

          {/* Right Visual */}
          <div className={`hidden md:flex flex-col gap-6 ${language === "ar" ? "md:col-start-1" : ""}`}>
            <div className="bg-gradient-to-br from-primary/30 to-accent/20 rounded-2xl p-12 min-h-80 flex flex-col items-center justify-center border-2 border-primary/30">
              <div className="text-8xl mb-6">📚</div>
              <p className="text-2xl font-bold text-foreground text-center">{t.title}</p>
              <p className="text-lg text-muted-foreground text-center mt-4">{t.subtitle}</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-primary/10 rounded-xl p-6 text-center border border-primary/20">
                <div className="text-4xl mb-2">⚡</div>
                <p className="font-semibold text-foreground text-sm">Quick Service</p>
              </div>
              <div className="bg-accent/10 rounded-xl p-6 text-center border border-accent/20">
                <div className="text-4xl mb-2">✓</div>
                <p className="font-semibold text-foreground text-sm">Quality Print</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
