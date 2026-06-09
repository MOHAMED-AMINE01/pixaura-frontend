"use client"

import { useState, useEffect } from "react"
import { Cookie, X } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import Link from "next/link"

export function CookieConsent() {
  const { t } = useTranslation()
  const [showBanner, setShowBanner] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (typeof window === 'undefined') return
    
    // Vérifier qu'on est bien sur la page d'accueil
    const isHomePage = window.location.pathname === '/' || window.location.pathname === ''
    if (!isHomePage) return
    
    setMounted(true)

    const consent = localStorage.getItem("cookieConsent")
    
    // Si pas de consentement valide, afficher le banner
    // Délai un peu plus long pour s'assurer que l'intro est bien terminée
    if (!consent || (consent !== "accepted" && consent !== "rejected" && consent !== "dismissed")) {
      // Afficher après un court délai pour laisser l'intro se terminer complètement
      const timer = setTimeout(() => {
        setShowBanner(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [])

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "accepted")
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem("cookieConsent", "rejected")
    setShowBanner(false)
  }

  const handleClose = () => {
    localStorage.setItem("cookieConsent", "dismissed")
    setShowBanner(false)
  }

  // Ne pas rendre avant le montage côté client
  if (!mounted) {
    return null
  }

  if (!showBanner) {
    return null
  }

  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-[99999] flex items-center justify-center p-4 sm:p-6"
      style={{ 
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 99999,
        pointerEvents: 'auto'
      }}
    >
      <div className="relative w-full max-w-5xl mx-auto">
        {/* Container glassmorphism - Transparent mais avec opacité suffisante pour masquer le texte */}
        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-gradient-to-r from-purple-600/40 via-purple-500/35 to-blue-500/40 backdrop-blur-[50px] shadow-[0_8px_40px_rgba(0,0,0,0.5)] p-5 sm:p-7">
          {/* Gradient overlays - Opacité augmentée pour masquer le texte */}
          <div className="absolute inset-0 bg-gradient-to-r from-purple-700/25 via-purple-600/20 to-blue-600/25 pointer-events-none" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(139,92,246,0.3),transparent_70%)] pointer-events-none" />
          {/* Overlay sombre pour mieux masquer le texte derrière */}
          <div className="absolute inset-0 bg-black/20 pointer-events-none" />
          
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 p-1.5 text-white/80 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
            aria-label="Fermer"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="relative flex flex-col lg:flex-row items-start lg:items-center gap-5 sm:gap-6 pr-8">
            {/* Cookie Icon - Plus transparent */}
            <div className="flex-shrink-0">
              <div className="rounded-xl sm:rounded-2xl border border-cyan-400/30 bg-cyan-400/10 p-3 sm:p-4 backdrop-blur-md shadow-[0_4px_20px_rgba(34,211,238,0.2)]">
                <Cookie className="h-6 w-6 sm:h-7 sm:w-7 text-cyan-400" strokeWidth={1.5} />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 flex flex-col lg:flex-row items-start lg:items-center gap-4 sm:gap-5 lg:gap-6">
              {/* Text */}
              <p className="flex-1 text-white text-sm sm:text-base lg:text-lg leading-relaxed font-medium">
                {t("cookies.consent.message")}
              </p>

              {/* Buttons */}
              <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0 w-full lg:w-auto">
                <button
                  onClick={handleAccept}
                  className="flex-1 lg:flex-none px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-500 text-white font-semibold text-sm sm:text-base hover:from-cyan-300 hover:to-cyan-400 transition-all duration-300 shadow-[0_4px_20px_rgba(34,211,238,0.5)] hover:shadow-[0_6px_30px_rgba(34,211,238,0.7)] active:scale-[0.98] whitespace-nowrap"
                >
                  {t("cookies.consent.acceptAll")}
                </button>
                <button
                  onClick={handleReject}
                  className="flex-1 lg:flex-none px-5 sm:px-7 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-purple-600/40 border border-purple-400/30 text-white font-semibold text-sm sm:text-base hover:bg-purple-600/50 hover:border-purple-400/40 transition-all duration-300 backdrop-blur-sm active:scale-[0.98] whitespace-nowrap"
                >
                  {t("cookies.consent.reject")}
                </button>
              </div>
            </div>
          </div>

          {/* Separator and Learn More Link */}
          <div className="relative mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-white/20">
            <Link
              href="/cookies"
              className="inline-flex items-center text-cyan-400 hover:text-cyan-300 transition-colors duration-200 text-sm sm:text-base font-medium"
            >
              {t("cookies.consent.learnMore")}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
