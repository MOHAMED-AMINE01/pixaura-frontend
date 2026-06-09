"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, ChevronRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"

type FormData = {
  besoin: string
  nom: string
  prenom: string
  telephone: string
  email: string
  budget: string
  delai: string
  secteur: string
  privacy: boolean
}

export function ContactHomeSection() {
  const { t } = useTranslation()
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    besoin: "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    budget: "",
    delai: "",
    secteur: "",
    privacy: false,
  })

  const totalSteps = 4

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          besoin: "",
          nom: "",
          prenom: "",
          telephone: "",
          email: "",
          budget: "",
          delai: "",
          secteur: "",
          privacy: false,
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.besoin.trim().length > 0
      case 2:
        return formData.nom.trim().length > 0 && 
               formData.prenom.trim().length > 0 && 
               formData.telephone.trim().length > 0 && 
               formData.email.trim().length > 0 &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      case 3:
        return formData.budget !== ""
      case 4:
        return formData.secteur !== "" && formData.privacy
      default:
        return false
    }
  }

  return (
    <>
    <section id="contact" className="relative py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section 1: Envoyez-nous vos coordonnées */}
        <Reveal>
          <div className="mb-32">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ 
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '-0.02em',
              }}>
                {t("contactHome.title")}
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto" style={{ 
                fontFamily: 'Montserrat, sans-serif',
              }}>
                {t("contactHome.description")}
              </p>
            </div>

            {submitted ? (
              <Reveal>
                <div className="max-w-2xl mx-auto text-center py-16 px-8 rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl relative overflow-hidden shadow-[0_25px_80px_rgba(0,115,255,0.15)]">
                  {/* Subtle background glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-cyan-400/5 to-transparent opacity-50" />
                  <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-cyan-400/10 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                    <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-primary to-cyan-400 flex items-center justify-center shadow-[0_0_30px_rgba(0,115,255,0.4)]">
                      <Check className="w-10 h-10 text-black" />
                    </div>
                    <h3 className="text-3xl font-black text-white mb-4">
                      {t("contactHome.thankYou")}
                    </h3>
                    <p className="text-lg text-white/80 mb-8">
                      {t("contactHome.contactWithin48h")}
                    </p>
                    <Link 
                      href="/"
                      className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,115,255,0.3)] hover:shadow-[0_0_30px_rgba(0,115,255,0.5)]"
                    >
                      {t("contactHome.backToHome")}
                      <ArrowRight className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ) : (
              <div className="max-w-3xl mx-auto">
                {/* Progress Bar */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    {[...Array(totalSteps)].map((_, i) => (
                      <div key={i} className="flex items-center flex-1">
                        <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300"
                             style={{
                               borderColor: currentStep > i + 1 ? '#0073FF' : currentStep === i + 1 ? '#0073FF' : 'rgba(255,255,255,0.2)',
                               backgroundColor: currentStep > i + 1 ? '#0073FF' : currentStep === i + 1 ? '#0073FF' : 'transparent',
                             }}>
                          {currentStep > i + 1 ? (
                            <Check className="w-5 h-5 text-white" />
                          ) : (
                            <span className="text-sm font-bold" style={{ color: currentStep === i + 1 ? '#fff' : 'rgba(255,255,255,0.5)' }}>
                              {i + 1}
                            </span>
                          )}
                        </div>
                        {i < totalSteps - 1 && (
                          <div className="flex-1 h-0.5 mx-2 transition-all duration-300 rounded-full"
                               style={{
                                 backgroundColor: currentStep > i + 1 ? '#0073FF' : 'rgba(255,255,255,0.2)',
                               }} />
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Form Card */}
                <form onSubmit={handleSubmit} className="rounded-3xl border border-white/20 bg-gradient-to-br from-white/10 via-white/5 to-transparent backdrop-blur-xl p-8 md:p-12 shadow-[0_25px_80px_rgba(0,0,0,0.4)] relative overflow-hidden">
                  {/* Subtle background effects */}
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/3 via-cyan-400/3 to-transparent opacity-40" />
                  <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-cyan-400/5 rounded-full blur-3xl" />
                  
                  <div className="relative z-10">
                  {/* Step 1: Besoin */}
                  {currentStep === 1 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6">
                        {t("contactHome.step1")}
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">
                          {t("contactHome.describeProject")}
                        </label>
                        <textarea
                          name="besoin"
                          value={formData.besoin}
                          onChange={handleChange}
                          required
                          rows={8}
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-white/40 resize-none backdrop-blur-sm hover:border-white/20"
                          placeholder={t("contactHome.describePlaceholder")}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Informations personnelles */}
                  {currentStep === 2 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6">
                        {t("contactHome.step2")}
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">
                            {t("contactHome.lastName")} *
                          </label>
                          <input
                            type="text"
                            name="nom"
                            value={formData.nom}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-white/40 backdrop-blur-sm hover:border-white/20"
                            placeholder={t("contactHome.lastNamePlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">
                            {t("contactHome.firstName")} *
                          </label>
                          <input
                            type="text"
                            name="prenom"
                            value={formData.prenom}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-white/40 backdrop-blur-sm hover:border-white/20"
                            placeholder={t("contactHome.firstNamePlaceholder")}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">
                            {t("contactHome.phone")} *
                          </label>
                          <input
                            type="tel"
                            name="telephone"
                            value={formData.telephone}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-white/40 backdrop-blur-sm hover:border-white/20"
                            placeholder={t("contactHome.phonePlaceholder")}
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-white/80 mb-2">
                            {t("contactHome.email")} *
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white placeholder-white/40 backdrop-blur-sm hover:border-white/20"
                            placeholder={t("contactHome.emailPlaceholder")}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Budget */}
                  {currentStep === 3 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6">
                        {t("contactHome.step3")}
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">
                          {t("contactHome.estimatedBudget")}
                        </label>
                        <select
                          name="budget"
                          value={formData.budget}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white backdrop-blur-sm hover:border-white/20 cursor-pointer"
                        >
                          <option value="" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.selectRange")}</option>
                          <option value="under-5k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.under5k")}</option>
                          <option value="5k-15k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.range5k15k")}</option>
                          <option value="15k-50k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.range15k50k")}</option>
                          <option value="over-50k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.over50k")}</option>
                        </select>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Secteur */}
                  {currentStep === 4 && (
                    <div className="space-y-6 animate-fadeIn">
                      <h3 className="text-2xl font-bold text-white mb-6">
                        {t("contactHome.step5")}
                      </h3>
                      <div>
                        <label className="block text-sm font-semibold text-white/80 mb-2">
                          {t("contactHome.sector")}
                        </label>
                        <select
                          name="secteur"
                          value={formData.secteur}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-300 text-white backdrop-blur-sm hover:border-white/20 cursor-pointer"
                        >
                          <option value="" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.selectSector")}</option>
                          <option value="immobilier" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.realEstate")}</option>
                          <option value="automobile" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.automotive")}</option>
                          <option value="sport" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.sport")}</option>
                          <option value="beaute" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.beauty")}</option>
                          <option value="restauration" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.restaurant")}</option>
                          <option value="tech" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.tech")}</option>
                          <option value="other" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>{t("contactHome.other")}</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-3 pt-4">
                        <input
                          type="checkbox"
                          name="privacy"
                          checked={formData.privacy}
                          onChange={handleChange}
                          required
                          className="w-5 h-5 rounded border-white/20 bg-white/5 text-primary focus:ring-2 focus:ring-primary/20 flex-shrink-0"
                        />
                        <label className="text-sm text-white/80">
                          {t("contactHome.privacyAcceptBefore")}{" "}
                          <Link href="/politique-de-confidentialite" className="text-primary hover:text-cyan-400 underline transition-colors">
                            {t("contactHome.privacyPolicy")}
                          </Link>
                          {" "}{t("contactHome.privacyAcceptAfter")}
                        </label>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0 mt-10 pt-6 border-t border-white/10">
                    {currentStep > 1 && (
                      <button
                        type="button"
                        onClick={handleBack}
                        className="w-full md:w-auto px-6 py-3 border border-white/20 text-white rounded-full hover:border-primary hover:bg-primary/10 transition-all duration-300 backdrop-blur-sm hover:shadow-[0_0_15px_rgba(0,115,255,0.2)] text-center"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t("contactHome.previous")}
                      </button>
                    )}
                    <div className="hidden md:block flex-1" />
                    {currentStep < totalSteps ? (
                      <button
                        type="button"
                        onClick={handleNext}
                        disabled={!isStepValid()}
                        className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,115,255,0.3)] hover:shadow-[0_0_30px_rgba(0,115,255,0.5)]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t("contactHome.next")}
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    ) : (
                      <button
                        type="submit"
                        disabled={!isStepValid()}
                        className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-primary to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(0,115,255,0.3)] hover:shadow-[0_0_30px_rgba(0,115,255,0.5)]"
                        style={{ fontFamily: 'Montserrat, sans-serif' }}
                      >
                        {t("contactHome.send")}
                        <ArrowRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                  </div>
                </form>
              </div>
            )}
          </div>
        </Reveal>
        <div className="relative mb-20 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/25 to-transparent">
              <div className="absolute left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-blue-400/50 via-purple-400/70 to-cyan-400/50" />
            </div>
          </div>
        </div>


        {/* Section 2: Prendre rendez-vous */}
        <Reveal>
          <div id="rendez-vous" className="text-center scroll-mt-24">
            <div className="mb-8">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6" style={{ 
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '-0.02em',
              }}>
                {t("contactHome.appointmentTitle")}
              </h2>
              <p className="text-xl text-white/70 max-w-2xl mx-auto mb-6" style={{ 
                fontFamily: 'Montserrat, sans-serif',
              }}>
                {t("contactHome.appointmentDescription")}
              </p>
              
              {/* Button without container */}
              <div className="text-center">
                <Link 
                  href="mailto:contact@pixaura.eu?subject=Demande de rendez-vous"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary to-cyan-400 text-white font-bold rounded-full hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(0,115,255,0.3)] hover:shadow-[0_0_30px_rgba(0,115,255,0.5)]"
                  style={{ fontFamily: 'Montserrat, sans-serif' }}
                >
                  {t("contactHome.contactForAppointment")}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </Reveal>

        {/* Section 3: Nos engagements - Background noir comme la vidéo - Couvre toute la largeur */}
      </div>
    </section>

    {/* Section Nos engagements - Background noir pleine largeur */}
    <section className="relative py-24 pb-12 md:pb-16 overflow-hidden bg-black w-full">
      {/* Background noir avec gradients subtils comme la vidéo - Style amélioré */}
      <div className="absolute inset-0" style={{ contain: 'strict' }}>
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95" />
        
        {/* Particles subtiles comme la vidéo */}
        <div className="absolute inset-0" style={{ contain: 'layout style paint', pointerEvents: 'none' }}>
          {[...Array(12)].map((_, i) => {
            const size = 2 + Math.random() * 2
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `rgba(34,211,238,0.15)`,
                  boxShadow: `0 0 ${size * 2}px rgba(34,211,238,0.2)`,
                  transform: 'translateZ(0)',
                  opacity: 0.4,
                }}
              />
            )
          })}
        </div>

        {/* Gradient circulaire au centre - Style carousel vidéo */}
        <div
          className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/3 via-white/2 to-purple-400/3 blur-3xl"
          style={{
            transform: 'translate(-50%, -50%) translateZ(0)',
            pointerEvents: 'none',
          }}
        />

        {/* Radial gradient pour effet vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {/* Section Labels & Engagements */}
        <Reveal>
          <div className="mb-16 text-left">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
              {t("agenceHome.commitmentsBadge")}
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl text-left">
              {t("agenceHome.commitmentsTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base text-white/70 md:text-lg text-left whitespace-pre-line">
              {t("agenceHome.commitmentsDesc")}
            </p>
          </div>
        </Reveal>

        {/* Commitments Cards - 4 cartes avec largeur ajustée et structure améliorée */}
        <div className="grid grid-cols-1 gap-10 md:gap-12 lg:gap-14 md:grid-cols-2 lg:grid-cols-4 md:items-stretch">
              {[
                {
                  badge: t("agenceHome.commitment1Badge"),
                  title: t("agenceHome.commitment1Title"),
                  description: t("agenceHome.commitment1Desc"),
                  gradient: "from-blue-500 via-cyan-500 to-blue-600",
                },
                {
                  badge: t("agenceHome.commitment2Badge"),
                  title: t("agenceHome.commitment2Title"),
                  description: t("agenceHome.commitment2Desc"),
                  gradient: "from-purple-500 via-pink-500 to-purple-600",
                },
                {
                  badge: t("agenceHome.commitment3Badge"),
                  title: t("agenceHome.commitment3Title"),
                  description: t("agenceHome.commitment3Desc"),
                  gradient: "from-emerald-500 via-teal-500 to-emerald-600",
                },
                {
                  badge: t("agenceHome.commitment4Badge"),
                  title: t("agenceHome.commitment4Title"),
                  description: t("agenceHome.commitment4Desc"),
                  gradient: "from-amber-500 via-yellow-500 to-amber-600",
                },
              ].map((commitment, index) => {
                return (
                  <Reveal key={index} delay={index * 100} className="min-w-0">
                    <div className="group relative min-w-0 overflow-hidden rounded-3xl border border-white/20 bg-white/8 text-white backdrop-blur-2xl transition duration-700 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:border-white/30 hover:bg-white/12 hover:shadow-[0_45px_140px_rgba(0,0,0,0.55)] h-full flex flex-col max-w-full">
                      {/* Premium Glow Effects - Style Réalisations */}
                      <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                        <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-primary/20 via-white/10 to-cyan-400/20 blur-3xl animate-pulse" />
                        <div className="absolute inset-0 rounded-[30px] border border-white/20 opacity-60" />
                      </div>

                      {/* Badge Header Section - Hauteur réduite pour plus d'espace pour le contenu */}
                      <div className="relative h-48 md:h-56 w-full overflow-hidden flex items-center justify-center">
                        {/* Background Gradient - More Visible */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/8 to-white/15" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                        
                        {/* Badge - Centered - Taille optimisée */}
                        <div className="relative z-10 flex items-center justify-center">
                          <span className="inline-block rounded-full border border-white/25 bg-white/20 px-5 py-2.5 md:px-6 md:py-3 text-xs md:text-sm font-bold uppercase tracking-[0.35em] text-white backdrop-blur-md">
                            {commitment.badge}
                          </span>
                        </div>
                      </div>

                      {/* Content Section - Structure améliorée avec plus d'espace */}
                      <div className="flex flex-col justify-between px-6 md:px-8 pt-6 md:pt-8 pb-8 md:pb-10 text-white text-center flex-1">
                        {/* Title - Plus d'espace et meilleure lisibilité */}
                        <div className="flex-shrink-0 min-h-[70px] md:min-h-[80px] flex items-start justify-center mb-5 md:mb-6 px-3">
                          <h3 className="text-lg md:text-xl lg:text-xl font-bold leading-tight text-white break-words" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                          }}>
                            {commitment.title}
                          </h3>
                        </div>
                        {/* Description - Meilleure structure */}
                        <div className="flex-1 flex items-start justify-center mt-auto px-3">
                          <p className="text-sm md:text-base leading-relaxed text-white/90 font-medium break-words" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                          }}>
                            {commitment.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </section>
    </>
  )
}

