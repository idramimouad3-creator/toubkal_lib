"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Trash2, Plus, Edit2, X } from "lucide-react"
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

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const { language } = useLanguage()
  const [settings, setSettings] = useState<AdminSettings>({
    faculties: ["Engineering", "Science", "Arts", "Business"],
    years: ["1st Year", "2nd Year", "3rd Year"],
    booklets: [],
  })

  const [activeTab, setActiveTab] = useState("booklets")
  const [editingBooklet, setEditingBooklet] = useState<Booklet | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    subject: "",
    faculty: "",
    year: "",
    pages: "",
  })
  const [newFaculty, setNewFaculty] = useState("")
  const [newYear, setNewYear] = useState("")

  const translations = {
    en: {
      adminTitle: "TOUBKAL LIB Admin",
      manageSubtitle: "Manage Booklets & Settings",
      logout: "Logout",
      booklets: "Booklets",
      faculties: "Faculties",
      years: "Years",
      addNewBooklet: "Add New Booklet",
      editBooklet: "Edit Booklet",
      titleLabel: "Title",
      subjectLabel: "Subject",
      facultyLabel: "Select Faculty",
      yearLabel: "Select Year",
      pagesLabel: "Pages",
      addButton: "Add",
      addBookletButton: "Add Booklet",
      updateButton: "Update Booklet",
      cancelButton: "Cancel",
      existingBooklets: "Existing Booklets",
      noBooklets: "No booklets added yet",
      manageFaculties: "Manage Faculties",
      addNewFaculty: "Add new faculty",
      manageYears: "Manage Years",
      addNewYear: "Add new year",
      pages: "pages",
    },
    ar: {
      adminTitle: "إدارة مكتبة توبكال",
      manageSubtitle: "إدارة الكتيبات والإعدادات",
      logout: "تسجيل الخروج",
      booklets: "الكتيبات",
      faculties: "الكليات",
      years: "السنوات",
      addNewBooklet: "إضافة كتيب جديد",
      editBooklet: "تعديل الكتيب",
      titleLabel: "العنوان",
      subjectLabel: "المادة",
      facultyLabel: "اختر الكلية",
      yearLabel: "اختر السنة",
      pagesLabel: "عدد الصفحات",
      addButton: "إضافة",
      addBookletButton: "إضافة كتيب",
      updateButton: "تحديث الكتيب",
      cancelButton: "إلغاء",
      existingBooklets: "الكتيبات الموجودة",
      noBooklets: "لم تتم إضافة أي كتيبات بعد",
      manageFaculties: "إدارة الكليات",
      addNewFaculty: "إضافة كلية جديدة",
      manageYears: "إدارة السنوات",
      addNewYear: "إضافة سنة جديدة",
      pages: "صفحات",
    },
  }

  const t = translations[language]

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

  const saveSettings = (newSettings: AdminSettings) => {
    setSettings(newSettings)
    localStorage.setItem("toubkalSettings", JSON.stringify(newSettings))
  }

  const handleAddBooklet = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.title || !formData.subject || !formData.faculty || !formData.year || !formData.pages) {
      return
    }

    const newBooklet: Booklet = {
      id: editingBooklet?.id || Date.now().toString(),
      title: formData.title,
      subject: formData.subject,
      faculty: formData.faculty,
      year: formData.year,
      pages: Number.parseInt(formData.pages),
    }

    let updatedBooklets
    if (editingBooklet) {
      updatedBooklets = settings.booklets.map((b) => (b.id === editingBooklet.id ? newBooklet : b))
    } else {
      updatedBooklets = [...settings.booklets, newBooklet]
    }

    saveSettings({ ...settings, booklets: updatedBooklets })
    setFormData({ title: "", subject: "", faculty: "", year: "", pages: "" })
    setEditingBooklet(null)
  }

  const handleDeleteBooklet = (id: string) => {
    const updatedBooklets = settings.booklets.filter((b) => b.id !== id)
    saveSettings({ ...settings, booklets: updatedBooklets })
  }

  const handleEditBooklet = (booklet: Booklet) => {
    setEditingBooklet(booklet)
    setFormData({
      title: booklet.title,
      subject: booklet.subject,
      faculty: booklet.faculty,
      year: booklet.year,
      pages: booklet.pages.toString(),
    })
    setActiveTab("booklets")
  }

  const handleAddFaculty = () => {
    if (newFaculty.trim() && !settings.faculties.includes(newFaculty)) {
      saveSettings({
        ...settings,
        faculties: [...settings.faculties, newFaculty.trim()],
      })
      setNewFaculty("")
    }
  }

  const handleRemoveFaculty = (faculty: string) => {
    saveSettings({
      ...settings,
      faculties: settings.faculties.filter((f) => f !== faculty),
    })
  }

  const handleAddYear = () => {
    if (newYear.trim() && !settings.years.includes(newYear)) {
      saveSettings({
        ...settings,
        years: [...settings.years, newYear.trim()],
      })
      setNewYear("")
    }
  }

  const handleRemoveYear = (year: string) => {
    saveSettings({
      ...settings,
      years: settings.years.filter((y) => y !== year),
    })
  }

  return (
    <div className={`min-h-screen bg-background ${language === "ar" ? "text-right" : ""}`}>
      {/* Header */}
      <header className="bg-primary text-primary-foreground sticky top-0 z-50 border-b border-border">
        <div
          className={`max-w-6xl mx-auto px-4 py-4 flex justify-between items-center ${language === "ar" ? "flex-row-reverse" : ""}`}
        >
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">{t.adminTitle}</h1>
            <p className="text-sm opacity-90">{t.manageSubtitle}</p>
          </div>
          <button
            onClick={onLogout}
            className="bg-destructive hover:opacity-90 text-destructive-foreground px-4 py-2 rounded-lg font-medium transition text-sm sm:text-base"
          >
            {t.logout}
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div
          className={`flex gap-2 sm:gap-4 mb-8 border-b border-border flex-wrap ${language === "ar" ? "flex-row-reverse" : ""}`}
        >
          <button
            onClick={() => setActiveTab("booklets")}
            className={`px-4 py-3 font-medium transition border-b-2 text-sm sm:text-base ${
              activeTab === "booklets"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.booklets}
          </button>
          <button
            onClick={() => setActiveTab("faculties")}
            className={`px-4 py-3 font-medium transition border-b-2 text-sm sm:text-base ${
              activeTab === "faculties"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.faculties}
          </button>
          <button
            onClick={() => setActiveTab("years")}
            className={`px-4 py-3 font-medium transition border-b-2 text-sm sm:text-base ${
              activeTab === "years"
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.years}
          </button>
        </div>

        {/* Booklets Tab */}
        {activeTab === "booklets" && (
          <div className="space-y-8">
            {/* Add/Edit Form */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                {editingBooklet ? t.editBooklet : t.addNewBooklet}
              </h2>
              <form onSubmit={handleAddBooklet} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder={t.titleLabel}
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                  <input
                    type="text"
                    placeholder={t.subjectLabel}
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                  <select
                    value={formData.faculty}
                    onChange={(e) => setFormData({ ...formData, faculty: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  >
                    <option value="">{t.facultyLabel}</option>
                    {settings.faculties.map((f) => (
                      <option key={f} value={f}>
                        {f}
                      </option>
                    ))}
                  </select>
                  <select
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  >
                    <option value="">{t.yearLabel}</option>
                    {settings.years.map((y) => (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    placeholder={t.pagesLabel}
                    value={formData.pages}
                    onChange={(e) => setFormData({ ...formData, pages: e.target.value })}
                    className="px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                  />
                </div>
                <div className={`flex gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition text-sm sm:text-base"
                  >
                    {editingBooklet ? t.updateButton : t.addBookletButton}
                  </button>
                  {editingBooklet && (
                    <button
                      type="button"
                      onClick={() => {
                        setEditingBooklet(null)
                        setFormData({ title: "", subject: "", faculty: "", year: "", pages: "" })
                      }}
                      className="bg-muted text-muted-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition text-sm sm:text-base"
                    >
                      {t.cancelButton}
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Booklets List */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">
                {t.existingBooklets} ({settings.booklets.length})
              </h2>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {settings.booklets.length === 0 ? (
                  <p className="text-muted-foreground text-center py-8">{t.noBooklets}</p>
                ) : (
                  settings.booklets.map((booklet) => (
                    <div
                      key={booklet.id}
                      className={`flex items-center justify-between bg-background border border-border p-4 rounded-lg ${language === "ar" ? "flex-row-reverse" : ""}`}
                    >
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-foreground truncate">{booklet.title}</p>
                        <p className={`text-sm text-muted-foreground ${language === "ar" ? "text-right" : ""}`}>
                          {booklet.subject} • {booklet.faculty} • {booklet.year} • {booklet.pages} {t.pages}
                        </p>
                      </div>
                      <div
                        className={`flex gap-2 ${language === "ar" ? "flex-row-reverse ml-0 mr-4" : "ml-4"} flex-shrink-0`}
                      >
                        <button
                          onClick={() => handleEditBooklet(booklet)}
                          className="p-2 bg-primary text-primary-foreground rounded-lg hover:opacity-90 transition"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteBooklet(booklet.id)}
                          className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* Faculties Tab */}
        {activeTab === "faculties" && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">{t.manageFaculties}</h2>
            <div className="space-y-4">
              <div className={`flex gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                <input
                  type="text"
                  placeholder={t.addNewFaculty}
                  value={newFaculty}
                  onChange={(e) => setNewFaculty(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddFaculty()}
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                />
                <button
                  onClick={handleAddFaculty}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <Plus size={18} />
                  {t.addButton}
                </button>
              </div>
              <div className="space-y-2">
                {settings.faculties.map((faculty) => (
                  <div
                    key={faculty}
                    className={`flex items-center justify-between bg-background border border-border p-3 rounded-lg ${language === "ar" ? "flex-row-reverse" : ""}`}
                  >
                    <p className="text-foreground">{faculty}</p>
                    <button
                      onClick={() => handleRemoveFaculty(faculty)}
                      className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Years Tab */}
        {activeTab === "years" && (
          <div className="bg-card border border-border rounded-xl p-6">
            <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-6">{t.manageYears}</h2>
            <div className="space-y-4">
              <div className={`flex gap-2 ${language === "ar" ? "flex-row-reverse" : ""}`}>
                <input
                  type="text"
                  placeholder={t.addNewYear}
                  value={newYear}
                  onChange={(e) => setNewYear(e.target.value)}
                  onKeyPress={(e) => e.key === "Enter" && handleAddYear()}
                  className="flex-1 px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary text-sm sm:text-base"
                />
                <button
                  onClick={handleAddYear}
                  className="bg-primary text-primary-foreground px-6 py-2 rounded-lg font-medium hover:opacity-90 transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <Plus size={18} />
                  {t.addButton}
                </button>
              </div>
              <div className="space-y-2">
                {settings.years.map((year) => (
                  <div
                    key={year}
                    className={`flex items-center justify-between bg-background border border-border p-3 rounded-lg ${language === "ar" ? "flex-row-reverse" : ""}`}
                  >
                    <p className="text-foreground">{year}</p>
                    <button
                      onClick={() => handleRemoveYear(year)}
                      className="p-2 bg-destructive text-destructive-foreground rounded-lg hover:opacity-90 transition"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
