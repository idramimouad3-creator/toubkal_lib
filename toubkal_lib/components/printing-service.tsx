"use client"

import { MessageCircle, Upload, Clock } from "lucide-react"
import { useLanguage } from "@/app/language-context"

export default function PrintingService() {
  const { language } = useLanguage()

  const handleWhatsApp = () => {
    const phoneNumber = "212629009050"
    const message =
      language === "en"
        ? "Hello! I want to use your printing service. I'm ready to send my file. Please guide me through the process."
        : "مرحبا! أريد استخدام خدمة الطباعة الخاصة بكم. أنا مستعد لإرسال ملفي. يرجى إرشادي خلال العملية."
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  const content = {
    en: {
      printingService: "Printing Service",
      printingDescription:
        "Send your files via WhatsApp and specify the printing service you need. Our team will process your order quickly and efficiently.",
      easyFileUpload: "Easy File Upload",
      uploadDescription: "Send your files via WhatsApp with service details",
      quickTurnaround: "Quick Turnaround",
      turnaroundDescription: "Fast processing and printing delivery",
      sendFileViaWhatsApp: "Send File via WhatsApp",
      howToUse: "How to Use Our Service",
      step1: "Click the WhatsApp button to start a conversation",
      step2: "Send your document file (PDF, Word, etc.)",
      step3: "Specify the service: (Color/B&W, Paper type, Binding, Quantity, etc.)",
      step4: "Confirm price and pickup time",
      step5: "Pick up your printed materials from our office",
    },
    ar: {
      printingService: "خدمة الطباعة",
      printingDescription:
        "أرسل ملفاتك عبر WhatsApp وحدد خدمة الطباعة التي تحتاجها. سيقوم فريقنا بمعالجة طلبك بسرعة وكفاءة.",
      easyFileUpload: "تحميل الملف بسهولة",
      uploadDescription: "أرسل ملفاتك عبر WhatsApp مع تفاصيل الخدمة",
      quickTurnaround: "معالجة سريعة",
      turnaroundDescription: "معالجة سريعة وتسليم الطباعة",
      sendFileViaWhatsApp: "أرسل الملف عبر WhatsApp",
      howToUse: "كيفية استخدام خدمتنا",
      step1: "اضغط على زر WhatsApp لبدء محادثة",
      step2: "أرسل ملف المستند الخاص بك (PDF أو Word أو غيره)",
      step3: "حدد الخدمة: (ملون أو أبيض وأسود، نوع الورق، الربط، الكمية، وما إلى ذلك)",
      step4: "أكد السعر ووقت الاستلام",
      step5: "استلم المواد المطبوعة من مكتبتنا",
    },
  }

  const t = content[language]

  const services = [
    {
      icon: Upload,
      title: t.easyFileUpload,
      description: t.uploadDescription,
    },
    {
      icon: Clock,
      title: t.quickTurnaround,
      description: t.turnaroundDescription,
    },
  ]

  return (
    <section id="services" className={`py-12 sm:py-20 px-4 bg-card ${language === "ar" ? "text-right" : ""}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4 text-center">
          {t.printingService}
        </h2>
        <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          {t.printingDescription}
        </p>

        {/* Service Features */}
        <div className="grid md:grid-cols-2 gap-4 sm:gap-8 mb-8 sm:mb-12">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <div
                key={index}
                className={`bg-background p-4 sm:p-8 rounded-xl border border-border hover:border-primary transition ${language === "ar" ? "text-right" : ""}`}
              >
                <Icon className="text-primary mb-3 sm:mb-4" size={28} />
                <h3 className="text-base sm:text-xl font-semibold text-foreground mb-2">{service.title}</h3>
                <p className="text-muted-foreground text-sm sm:text-base">{service.description}</p>
              </div>
            )
          })}
        </div>

        {/* WhatsApp Button */}
        <div className="flex justify-center mb-8 sm:mb-12">
          <button
            onClick={handleWhatsApp}
            className="bg-[#25D366] hover:bg-[#20BA58] text-white px-6 sm:px-12 py-3 sm:py-4 rounded-lg font-semibold flex items-center gap-2 sm:gap-3 transition transform hover:scale-105 text-sm sm:text-base w-full sm:w-auto justify-center"
          >
            <MessageCircle size={20} />
            {t.sendFileViaWhatsApp}
          </button>
        </div>

        {/* Instructions */}
        <div
          className={`bg-primary/5 border border-primary/20 rounded-xl p-5 sm:p-8 ${language === "ar" ? "text-right" : ""}`}
        >
          <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">{t.howToUse}</h3>
          <ol
            className={`space-y-2 sm:space-y-3 text-muted-foreground text-sm sm:text-base ${language === "ar" ? "mr-4 sm:mr-6" : "ml-4 sm:ml-6"}`}
          >
            <li className={`flex gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}>
              <span className="font-bold text-primary flex-shrink-0">1.</span>
              <span>{t.step1}</span>
            </li>
            <li className={`flex gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}>
              <span className="font-bold text-primary flex-shrink-0">2.</span>
              <span>{t.step2}</span>
            </li>
            <li className={`flex gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}>
              <span className="font-bold text-primary flex-shrink-0">3.</span>
              <span>{t.step3}</span>
            </li>
            <li className={`flex gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}>
              <span className="font-bold text-primary flex-shrink-0">4.</span>
              <span>{t.step4}</span>
            </li>
            <li className={`flex gap-3 ${language === "ar" ? "flex-row-reverse" : ""}`}>
              <span className="font-bold text-primary flex-shrink-0">5.</span>
              <span>{t.step5}</span>
            </li>
          </ol>
        </div>
      </div>
    </section>
  )
}
