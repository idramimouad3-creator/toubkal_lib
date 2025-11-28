"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import AdminDashboard from "@/components/admin-dashboard"
import { useLanguage } from "@/app/language-context"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [attempts, setAttempts] = useState(0)
  const [isBlocked, setIsBlocked] = useState(false)
  const router = useRouter()
  const { language } = useLanguage()

  const MAX_ATTEMPTS = 5
  const SESSION_TIMEOUT = 30 * 60 * 1000 // 30 minutes
  const ADMIN_PASSWORD = "toubkal@2024"

  const translations = {
    en: {
      title: "Admin Login",
      subtitle: "TOUBKAL LIB Admin Panel",
      passwordLabel: "Password",
      passwordPlaceholder: "Enter admin password",
      loginButton: "Login",
      backButton: "Back to Website",
      lockedTitle: "Account Temporarily Locked",
      lockedMessage: "Too many failed login attempts. Please try again in 15 minutes.",
      errorIncorrect: "Incorrect password.",
      errorLocked: "Too many failed attempts. Account locked for 15 minutes.",
      attemptsRemaining: "attempts remaining",
    },
    ar: {
      title: "تسجيل الدخول الإداري",
      subtitle: "لوحة تحكم مكتبة توبكال",
      passwordLabel: "كلمة المرور",
      passwordPlaceholder: "أدخل كلمة المرور الإدارية",
      loginButton: "تسجيل الدخول",
      backButton: "العودة إلى الموقع",
      lockedTitle: "الحساب مقفل مؤقتاً",
      lockedMessage: "عدد محاولات فاشلة كثيرة. يرجى المحاولة مرة أخرى خلال 15 دقيقة.",
      errorIncorrect: "كلمة مرور غير صحيحة.",
      errorLocked: "عدد محاولات كثيرة جداً. تم قفل الحساب لمدة 15 دقيقة.",
      attemptsRemaining: "محاولات متبقية",
    },
  }

  const t = translations[language]

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth")
    const authTime = localStorage.getItem("adminAuthTime")
    const blockedTime = localStorage.getItem("adminBlocked")

    if (blockedTime) {
      const blockExpiry = Number.parseInt(blockedTime) + 15 * 60 * 1000
      if (Date.now() < blockExpiry) {
        setIsBlocked(true)
        return
      } else {
        localStorage.removeItem("adminBlocked")
        localStorage.removeItem("adminAttempts")
        setAttempts(0)
      }
    }

    if (auth === "true" && authTime) {
      const timeDiff = Date.now() - Number.parseInt(authTime)
      if (timeDiff < SESSION_TIMEOUT) {
        setIsAuthenticated(true)
      } else {
        localStorage.removeItem("adminAuth")
        localStorage.removeItem("adminAuthTime")
        setError(
          language === "ar" ? "انتهت جلسة العمل. يرجى تسجيل الدخول مرة أخرى." : "Session expired. Please login again.",
        )
      }
    }

    const storedAttempts = localStorage.getItem("adminAttempts")
    if (storedAttempts) {
      setAttempts(Number.parseInt(storedAttempts))
    }
  }, [language])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    if (isBlocked) {
      setError(t.lockedMessage)
      return
    }

    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem("adminAuth", "true")
      localStorage.setItem("adminAuthTime", Date.now().toString())
      localStorage.removeItem("adminAttempts")
      localStorage.removeItem("adminBlocked")
      setError("")
      setPassword("")
      setAttempts(0)
    } else {
      const newAttempts = attempts + 1
      setAttempts(newAttempts)
      localStorage.setItem("adminAttempts", newAttempts.toString())

      if (newAttempts >= MAX_ATTEMPTS) {
        setIsBlocked(true)
        localStorage.setItem("adminBlocked", Date.now().toString())
        setError(t.errorLocked)
      } else {
        setError(`${t.errorIncorrect} ${MAX_ATTEMPTS - newAttempts} ${t.attemptsRemaining}`)
      }
      setPassword("")
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem("adminAuth")
    localStorage.removeItem("adminAuthTime")
    localStorage.removeItem("adminAttempts")
    router.push("/")
  }

  if (!isAuthenticated) {
    return (
      <div
        className={`min-h-screen bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center px-4 ${language === "ar" ? "text-right" : ""}`}
      >
        <div className="bg-card rounded-xl shadow-2xl p-8 w-full max-w-md">
          <h1 className="text-3xl font-bold text-center text-foreground mb-2">{t.title}</h1>
          <p className="text-center text-muted-foreground mb-8">{t.subtitle}</p>

          {isBlocked ? (
            <div className="bg-destructive/10 border border-destructive text-destructive p-4 rounded-lg text-center">
              <p className="font-medium">{t.lockedTitle}</p>
              <p className="text-sm mt-2">{t.lockedMessage}</p>
            </div>
          ) : (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">{t.passwordLabel}</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder={t.passwordPlaceholder}
                  className="w-full px-4 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  disabled={isBlocked}
                />
              </div>
              {error && (
                <p className={`text-sm ${isBlocked ? "text-destructive font-medium" : "text-destructive"}`}>{error}</p>
              )}
              <button
                type="submit"
                className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:opacity-90 transition disabled:opacity-50"
                disabled={isBlocked}
              >
                {t.loginButton}
              </button>
            </form>
          )}

          <div className="mt-6 pt-6 border-t border-border text-center">
            <a href="/" className="text-primary hover:underline text-sm">
              {t.backButton}
            </a>
          </div>
        </div>
      </div>
    )
  }

  return <AdminDashboard onLogout={handleLogout} />
}
