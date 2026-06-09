"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Sparkles, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"
import { getAssetUrl } from "@/lib/cloudinary"

// Instagram Icon Component
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <path
      d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
      fill="currentColor"
    />
  </svg>
)

export function AgenceHomeSection() {
  const { t, language } = useTranslation()
  
  const values = [
    {
      badge: t("agenceHome.value1Badge"),
      title: t("agenceHome.value1Title"),
      description: t("agenceHome.value1Desc"),
      gradient: "from-purple-500 via-pink-500 to-purple-600",
    },
    {
      badge: t("agenceHome.value2Badge"),
      title: t("agenceHome.value2Title"),
      description: t("agenceHome.value2Desc"),
      gradient: "from-blue-500 via-cyan-500 to-blue-600",
    },
    {
      badge: t("agenceHome.value3Badge"),
      title: t("agenceHome.value3Title"),
      description: t("agenceHome.value3Desc"),
      gradient: "from-emerald-500 via-teal-500 to-emerald-600",
    },
  ]
  
  const founders = [
    {
      name: t("agenceHome.franckName"),
      role: t("agenceHome.franckRole"),
      image: getAssetUrl("/Banque d_images/Copie de M7_03372.jpg", "image"),
      description: t("agenceHome.franckDesc"),
      vision: t("agenceHome.franckVision"),
      instagram: "https://www.instagram.com/franck_kgsman/",
    },
    {
      name: t("agenceHome.julienName"),
      role: t("agenceHome.julienRole"),
      image: getAssetUrl("/Banque d_images/Copie de M7_01248.jpg", "image"),
      description: t("agenceHome.julienDesc"),
      vision: t("agenceHome.julienVision"),
      instagram: "https://www.instagram.com/_julienhochet/",
    },
  ]

  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section id="agence" className="relative bg-transparent py-24 px-6">
      <div className="mx-auto max-w-7xl">
        {/* Section Manifester Valeurs */}
        <Reveal>
          <div className="mb-20 text-left">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
              {t("agenceHome.valuesBadge")}
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl text-left">
              {t("agenceHome.valuesTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base text-white/70 md:text-lg text-left">
              {t("agenceHome.valuesDesc")}
            </p>
          </div>
        </Reveal>

        {/* Values Cards - Style Réalisations Premium */}
        <div className={`mb-32 grid grid-cols-1 gap-8 md:grid-cols-3 ${language === 'en' ? 'md:items-stretch' : ''}`}>
          {values.map((value, index) => {
            return (
              <Reveal key={index} delay={index * 100} className="min-w-0">
                <div className={`group relative overflow-hidden rounded-3xl border border-white/20 bg-white/8 text-white backdrop-blur-2xl transition duration-700 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:border-white/30 hover:bg-white/12 hover:shadow-[0_45px_140px_rgba(0,0,0,0.55)] ${language === 'en' ? 'md:h-full md:flex md:flex-col' : ''}`}>
                  {/* Premium Glow Effects - Style Réalisations */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                    <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-r from-primary/20 via-white/10 to-cyan-400/20 blur-3xl animate-pulse" />
                    <div className="absolute inset-0 rounded-[30px] border border-white/20 opacity-60" />
                  </div>

                  {/* Badge Header Section - Replacing Icon - Same height as original */}
                  <div className="relative h-64 w-full overflow-hidden flex items-center justify-center">
                    {/* Background Gradient - More Visible */}
                    <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-white/8 to-white/15" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    
                    {/* Badge - Centered - Larger size */}
                    <div className="relative z-10 flex items-center justify-center">
                      <span className="inline-block rounded-full border border-white/25 bg-white/20 px-6 py-3 text-sm font-bold uppercase tracking-[0.35em] text-white backdrop-blur-md">
                        {value.badge}
                      </span>
                    </div>
                  </div>

                  {/* Content Section - Centered */}
                  <div className={`flex flex-col gap-5 px-8 pt-8 pb-10 text-white text-center ${language === 'en' ? 'md:flex-1' : ''}`}>
                    <h3 className="text-2xl font-bold leading-tight md:text-3xl text-white">
                      {value.title}
                    </h3>
                    <p className="text-base md:text-lg leading-relaxed text-white/90 font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Section Separator */}
        <div className="relative mb-20 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/25 to-transparent">
              <div className="absolute left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-blue-400/50 via-purple-400/70 to-cyan-400/50" />
            </div>
          </div>
        </div>

        {/* Section Les Fondateurs */}
        <Reveal>
          <div className="mb-16 text-left">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
              {t("agenceHome.teamBadge")}
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl text-left">
              {t("agenceHome.teamTitle")}
            </h2>
            <p className="mt-6 max-w-3xl text-base text-white/70 md:text-lg text-left">
              {t("agenceHome.teamDesc")}
            </p>
          </div>
        </Reveal>

        {/* Founders Cards - Mobile: Style NOS EXPERTISES, Desktop: Split Layout */}
        <div className="mb-32 grid gap-10 md:grid-cols-2 md:items-stretch">
          {founders.map((founder, index) => (
            <Reveal key={index} delay={index * 150}>
              {/* Mobile: IMPROVED PREMIUM VERSION - ENHANCED DESIGN */}
              <div className="md:hidden group relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/25 bg-gradient-to-br from-black/90 via-slate-900/85 to-black/90 p-0 text-white backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/40 hover:shadow-[0_20px_60px_rgba(0,115,255,0.4),0_0_0_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.3)] h-full">
                {/* Ultimate Multi-Layer Glow Effects - Always Visible */}
                <div className="pointer-events-none absolute -inset-6 opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-cyan-400/25 via-purple-500/25 to-cyan-400/25 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/15 via-transparent to-white/15 blur-2xl" />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-purple-500/10 via-transparent to-cyan-400/10 blur-xl" />
                </div>

                {/* Premium Animated Background Pattern */}
                <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '28px 28px',
                    animation: 'patternMove 20s linear infinite',
                  }} />
                </div>

                {/* Image Section - Positioned at Top, Full Width, Face Fully Visible */}
                <div className="relative h-72 sm:h-96 w-full overflow-hidden">
                  <Image
                    src={founder.image}
                    alt={founder.name}
                    fill
                    className="object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    sizes="100vw"
                    priority
                    style={{ objectPosition: 'center 30%' }}
                  />
                  {/* Enhanced gradient overlay - protects face visibility */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/95" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                  
                  {/* Badge positioned bottom-right on image - doesn't cover face */}
                  <div className="absolute bottom-4 right-4 z-20">
                    <span className="inline-flex items-center gap-2 rounded-full border-2 border-white/30 bg-gradient-to-r from-white/25 via-white/20 to-white/25 px-4 py-1.5 text-[9px] sm:text-[10px] font-extrabold uppercase tracking-[0.35em] text-white shadow-[0_0_50px_rgba(89,129,255,0.45),0_4px_15px_rgba(0,0,0,0.5)] backdrop-blur-2xl">
                      <Sparkles className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] animate-pulse" style={{ animationDuration: '2s' }} />
                      {t("agenceHome.founder")}
                    </span>
                  </div>
                </div>

                {/* Content Section - Below Image, Protected Space */}
                <div className="relative flex flex-col gap-5 px-6 sm:px-8 py-6 sm:py-8 pb-8 sm:pb-10 z-10 bg-gradient-to-b from-black/95 via-black/98 to-black/95 -mt-8 rounded-t-[32px] sm:rounded-t-[40px]">
                  {/* Name - Large & Visible, No Face Overlap */}
                  <h3 className="text-3xl sm:text-4xl font-black leading-[1.1] text-white tracking-tight mb-1" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '-0.02em',
                    textShadow: '0 3px 25px rgba(0,0,0,0.8), 0 6px 50px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.9)',
                  }}>
                    {founder.name}
                  </h3>
                  
                  {/* Role - Full Text, Multiple Lines, Better Readability */}
                  <p className="text-[11px] sm:text-sm font-bold uppercase tracking-[0.2em] sm:tracking-[0.25em] leading-[1.5] sm:leading-[1.6] break-words whitespace-normal bg-gradient-to-r from-purple-400 via-cyan-300 to-purple-400 bg-clip-text text-transparent mb-4" style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShift 4s ease infinite',
                    textShadow: '0 2px 10px rgba(168,85,247,0.3)',
                  }}>
                    {founder.role}
                  </p>
                  
                  {/* Premium Divider */}
                  <div className="relative w-full h-px mb-5">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    <div className="absolute left-1/2 -translate-x-1/2 w-24 h-px bg-gradient-to-r from-cyan-400/60 via-purple-500/60 to-cyan-400/60 blur-sm" />
                  </div>
                  
                  {/* Description - Clear & Readable */}
                  <p className="text-sm sm:text-base text-white/90 leading-relaxed font-medium mb-4" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)',
                    lineHeight: '1.75',
                  }}>
                    {founder.description}
                  </p>
                  
                  {/* Vision - Separated Section */}
                  <div className="pt-4 border-t border-white/20">
                    <p className="text-sm sm:text-base text-white/85 leading-relaxed font-normal mb-6" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      textShadow: '0 2px 12px rgba(0,0,0,0.6), 0 1px 3px rgba(0,0,0,0.8)',
                      lineHeight: '1.75',
                    }}>
                      {founder.vision}
                    </p>
                  </div>
                  
                  {/* Instagram Section - Enhanced with Separator */}
                  <div className="mt-6 pt-6 border-t border-white/10 flex items-center justify-end gap-4">
                    {/* Elegant Separator Line */}
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent">
                      <div className="h-px w-16 bg-gradient-to-r from-purple-400/60 via-pink-400/60 to-orange-400/60 blur-sm ml-auto" />
                    </div>
                    
                    {/* Instagram Button - Enhanced */}
                    <a
                      href={founder.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/ig relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold text-sm transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(225,48,108,0.7)] overflow-hidden backdrop-blur-sm"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {/* Animated gradient background */}
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-100 group-hover/ig:opacity-0 transition-opacity duration-300" />
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 opacity-0 group-hover/ig:opacity-100 transition-opacity duration-300" />
                      
                      {/* Shine effect */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/ig:translate-x-full transition-transform duration-700" />
                      
                      {/* Icon */}
                      <InstagramIcon className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
                      
                      {/* Text */}
                      <span className="relative z-10 hidden sm:inline">Instagram</span>
                      
                      {/* Glow effect */}
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full blur-md opacity-50 group-hover/ig:opacity-80 transition-opacity duration-300 -z-10" />
                    </a>
                  </div>
                </div>

                {/* Premium Corner Accents */}
                <div className="absolute top-4 right-4 w-12 h-12 border-t-2 border-r-2 border-white/30 rounded-tr-[32px] opacity-50 group-hover:opacity-80 transition-all duration-700" />
                <div className="absolute bottom-4 left-4 w-12 h-12 border-b-2 border-l-2 border-white/30 rounded-bl-[32px] opacity-50 group-hover:opacity-80 transition-all duration-700" />
              </div>

              {/* Desktop: Original Split Layout */}
              <div className="hidden md:block group relative overflow-hidden rounded-[32px] border border-white/25 bg-gradient-to-br from-white/12 via-white/8 to-white/5 text-white backdrop-blur-2xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-2 hover:scale-[1.01] hover:border-white/40 hover:bg-gradient-to-br hover:from-white/15 hover:via-white/10 hover:to-white/7 hover:shadow-[0_30px_100px_rgba(0,115,255,0.25),0_0_0_1px_rgba(255,255,255,0.1)] h-full">
                {/* Premium Multi-Layer Glow Effects */}
                <div className="pointer-events-none absolute -inset-8 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-primary/25 via-white/15 to-cyan-400/25 blur-3xl" />
                  <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/10 via-transparent to-white/10 blur-2xl" />
                </div>
                
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-[0.03] group-hover:opacity-[0.05] transition-opacity duration-700">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                    backgroundSize: '40px 40px',
                  }} />
                </div>
                
                {/* Content Layout - Horizontal */}
                <div className="relative flex flex-row h-full min-h-[321px]">
                  {/* Image Container - Left Side (42%) */}
                  <div className="relative w-[42%] overflow-hidden">
                    <Image
                      src={founder.image}
                      alt={founder.name}
                      fill
                      className="object-cover object-center transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                      sizes="(max-width: 1024px) 100vw, 42vw"
                    />
                    {/* Enhanced Gradient Overlays for Better Text Readability */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20" />
                    <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/20" />
                    
                    {/* Premium Badge - Enhanced Visibility */}
                    <div className="absolute bottom-6 left-6 z-10">
                      <span className="inline-flex items-center gap-2.5 rounded-full border border-white/35 bg-gradient-to-br from-white/25 via-white/20 to-white/15 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.35em] text-white backdrop-blur-xl shadow-[0_4px_20px_rgba(0,0,0,0.4)]">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/80 shadow-[0_0_6px_rgba(255,255,255,0.6)]" />
                        {t("agenceHome.founder")}
                      </span>
                    </div>
                  </div>
                  
                  {/* Content Container - Right Side (58%) */}
                  <div className="relative w-[58%] p-10 pb-12 flex flex-col justify-start z-10">
                    {/* Enhanced Background for Better Text Contrast */}
                    <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-black/30 to-black/40 rounded-r-[32px]" />
                    <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-black/15 to-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-r-[32px]" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent" />
                    
                    {/* Name - Ultra Large Bold with Premium Typography */}
                    <h3 className="relative min-h-[5.25rem] line-clamp-2 text-4xl lg:text-5xl font-black text-white leading-[1.1] mb-5 tracking-tight" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '-0.03em',
                      textShadow: '0 3px 25px rgba(0,0,0,0.5), 0 0 50px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.8)',
                    }}>
                      {founder.name}
                    </h3>
                    
                    {/* Premium Divider Line with Glow */}
                    <div className="relative w-full h-[1px] mb-6">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/40 via-cyan-400/40 to-primary/40 blur-sm opacity-70" />
                    </div>
                    
                    {/* Role - Enhanced Readability */}
                    <p className="relative min-h-[5.25rem] line-clamp-4 text-white text-[13px] font-bold uppercase tracking-[0.4em] leading-tight mb-8" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '0.35em',
                      textShadow: '0 2px 15px rgba(0,0,0,0.5), 0 1px 3px rgba(0,0,0,0.7)',
                    }}>
                      {founder.role}
                    </p>
                    
                    {/* Description - Ultra Clear & Readable */}
                    <p className="relative min-h-[7rem] line-clamp-4 text-white text-[16px] leading-[1.75] font-medium mb-8" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      lineHeight: '1.75',
                      textShadow: '0 2px 20px rgba(0,0,0,0.6), 0 1px 4px rgba(0,0,0,0.8)',
                    }}>
                      {founder.description}
                    </p>
                    
                    {/* Vision - Premium Separated Section */}
                    <div className="relative pt-6 border-t border-white/25">
                      <p className="min-h-[6.5rem] line-clamp-4 text-white text-[14px] leading-[1.8] font-normal mb-6" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.8',
                        textShadow: '0 2px 18px rgba(0,0,0,0.55), 0 1px 3px rgba(0,0,0,0.75)',
                      }}>
                        {founder.vision}
                      </p>
                      
                      {/* Instagram Section - Enhanced with Separator */}
                      <div className="mt-6 pt-6 border-t border-white/15 flex items-center justify-end gap-4">
                        {/* Elegant Separator Line */}
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent">
                          <div className="h-px w-20 bg-gradient-to-r from-purple-400/60 via-pink-400/60 to-orange-400/60 blur-sm ml-auto" />
                        </div>
                        
                        {/* Instagram Button - Enhanced */}
                        <a
                          href={founder.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group/ig relative inline-flex items-center gap-2.5 px-5 py-3 rounded-full bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 text-white font-semibold text-sm transition-all duration-300 hover:scale-110 hover:shadow-[0_0_35px_rgba(225,48,108,0.7)] overflow-hidden backdrop-blur-sm"
                          style={{ fontFamily: 'Montserrat, sans-serif' }}
                        >
                          {/* Animated gradient background */}
                          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 opacity-100 group-hover/ig:opacity-0 transition-opacity duration-300" />
                          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 opacity-0 group-hover/ig:opacity-100 transition-opacity duration-300" />
                          
                          {/* Shine effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/ig:translate-x-full transition-transform duration-700" />
                          
                          {/* Icon */}
                          <InstagramIcon className="w-5 h-5 relative z-10" />
                          
                          {/* Text */}
                          <span className="relative z-10">Instagram</span>
                          
                          {/* Glow effect */}
                          <div className="absolute -inset-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 rounded-full blur-md opacity-50 group-hover/ig:opacity-80 transition-opacity duration-300 -z-10" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Section Separator */}
        <div className="relative mb-20 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/25 to-transparent">
              <div className="absolute left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-blue-400/50 via-purple-400/70 to-cyan-400/50" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

