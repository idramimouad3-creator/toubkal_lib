import Header from "@/components/header"
import HeroSection from "@/components/hero-section"
import BookletsCatalog from "@/components/booklets-catalog"
import PrintingService from "@/components/printing-service"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <HeroSection />
      <PrintingService />
      <BookletsCatalog />
      <Footer />
    </main>
  )
}
