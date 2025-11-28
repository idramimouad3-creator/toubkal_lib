"use client"

import { useState, useMemo, useEffect } from "react"
import BookletCard from "./booklet-card"
import { useLanguage } from "@/app/language-context"

interface Booklet {
  id: string
  title: string
  subject: string
  faculty: string
  year: string
  pages: number
}

interface AdminSettings {
  faculties: string[]
  years: string[]
  booklets: Booklet[]
}

export default function BookletsCatalog() {
  const { language } = useLanguage()
  const [selectedFaculty, setSelectedFaculty] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [searchSubject, setSearchSubject] = useState<string>("")
  const [settings, setSettings] = useState<AdminSettings>({
    faculties: ["Engineering", "Science", "Arts", "Business"],
    years: ["1st Year", "2nd Year", "3rd Year"],
    booklets: [],
  })

  useEffect(() => {
    const savedSettings = localStorage.getItem("toubkalSettings")
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings))
      } catch (e) {
        console.log("[v0] Failed to load settings:", e)
      }
    }
  }, [])

  const content = {
    en: {
      availableBooklets: "Available Booklets",
      browseDescription: "Browse and purchase course booklets organized by faculty, year, and subject",
      searchSubject: "Search Subject",
      searchPlaceholder: "Search...",
      faculty: "Faculty",
      year: "Year",
      allFaculties: "All Faculties",
      allYears: "All Years",
      resetFilters: "Reset Filters",
      noBooklets: "No booklets found matching your filters",
    },
    ar: {
      availableBooklets: "الكتيبات المتاحة",
      browseDescription: "استعرض واشتر الكتيبات الدراسية المنظمة حسب الكلية والسنة والموضوع",
      searchSubject: "البحث عن موضوع",
      searchPlaceholder: "ابحث...",
      faculty: "الكلية",
      year: "السنة",
      allFaculties: "جميع الكليات",
      allYears: "جميع السنوات",
      resetFilters: "إعادة تعيين",
      noBooklets: "لم يتم العثور على كتيبات تطابق المرشحات",
    },
  }

  const t = content[language]

  const filteredBooklets = useMemo(() => {
    return settings.booklets.filter((booklet) => {
      const facultyMatch = selectedFaculty === "all" || booklet.faculty === selectedFaculty
      const yearMatch = selectedYear === "all" || booklet.year === selectedYear
      const subjectMatch =
        booklet.subject.toLowerCase().includes(searchSubject.toLowerCase()) ||
        booklet.title.toLowerCase().includes(searchSubject.toLowerCase())
      return facultyMatch && yearMatch && subjectMatch
    })
  }, [selectedFaculty, selectedYear, searchSubject, settings.booklets])

  return (
    <section id="booklets" className={`py-12 sm:py-20 px-4 bg-background ${language === "ar" ? "text-right" : ""}`}>
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-2 sm:mb-4 text-center">
          {t.availableBooklets}
        </h2>
        <p className="text-center text-muted-foreground mb-8 sm:mb-12 max-w-2xl mx-auto text-sm sm:text-base">
          {t.browseDescription}
        </p>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-4 sm:p-6 mb-8 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            {/* Search */}
            <div className="md:col-span-2 sm:col-span-1">
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">{t.searchSubject}</label>
              <input
                type="text"
                placeholder={t.searchPlaceholder}
                value={searchSubject}
                onChange={(e) => setSearchSubject(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              />
            </div>

            {/* Faculty Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">{t.faculty}</label>
              <select
                value={selectedFaculty}
                onChange={(e) => setSelectedFaculty(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              >
                <option value="all">{t.allFaculties}</option>
                {settings.faculties.map((faculty) => (
                  <option key={faculty} value={faculty}>
                    {faculty}
                  </option>
                ))}
              </select>
            </div>

            {/* Year Filter */}
            <div>
              <label className="block text-xs sm:text-sm font-medium text-foreground mb-2">{t.year}</label>
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="w-full px-3 sm:px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
              >
                <option value="all">{t.allYears}</option>
                {settings.years.map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            {/* Reset Button */}
            <div className="flex items-end md:col-span-2 sm:col-span-1">
              <button
                onClick={() => {
                  setSelectedFaculty("all")
                  setSelectedYear("all")
                  setSearchSubject("")
                }}
                className="w-full px-3 sm:px-4 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition text-sm sm:text-base"
              >
                {t.resetFilters}
              </button>
            </div>
          </div>
        </div>

        {/* Booklets Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredBooklets.length > 0 ? (
            filteredBooklets.map((booklet) => <BookletCard key={booklet.id} booklet={booklet} />)
          ) : (
            <div className="col-span-full text-center py-8 sm:py-12">
              <p className="text-lg sm:text-xl text-muted-foreground text-sm sm:text-base">{t.noBooklets}</p>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
