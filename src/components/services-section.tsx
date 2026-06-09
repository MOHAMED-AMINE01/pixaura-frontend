"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronDown, ChevronUp, TrendingUp, Target, Palette, DollarSign, ChevronLeft, ChevronRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { getAssetUrl } from "@/lib/cloudinary"

function formatDescription(text: string) {
  // Split by double newlines to separate sections
  const sections = text.split(/\n\n+/)
    .map(section => section.trim())
    .filter(Boolean)
  
  // Les 4 premières sections correspondent aux 2 piliers (titre + texte x2)
  // qu'on affiche déjà dans le bloc inférieur. On les enlève pour ÉVITER
  // les doublons, quelle que soit la langue (FR, EN, etc.).
  // Cette logique fonctionne car la structure est identique dans toutes les langues
  const filteredSections = sections.length > 4 ? sections.slice(4) : []
  
  // Si on a enlevé les 4 premières sections et qu'il ne reste rien, on ne montre rien
  if (filteredSections.length === 0) {
    return null
  }
  
  return (
    <div className="space-y-6">
      {filteredSections.map((section, index) => {
        const trimmed = section.trim()
        // Check if it's a title (all caps, no lowercase letters, and relatively short)
        const isTitle = trimmed === trimmed.toUpperCase() && 
                        trimmed.length < 50 && 
                        !trimmed.includes('.') &&
                        trimmed.split(' ').length < 8
        
        if (isTitle) {
          return (
            <h3 
              key={index}
              className="text-center text-xl sm:text-2xl md:text-3xl font-black uppercase tracking-wider text-white mb-4 mt-6"
            >
              {trimmed}
            </h3>
          )
        }
        
        return (
          <p key={index} className="text-justify leading-relaxed">
            {trimmed}
          </p>
        )
      })}
    </div>
  )
}

function PhotoSlider() {
  const images = [
    "/Banque d_images/Copie de M7_00197.jpg", // Position 1
    "/Banque d_images/Copie de M7_00259.jpg", // Position 2
    "/Banque d_images/Copie de LDP_5182.jpg", // Position 3
    "/Banque d_images/Copie de DSC04614.jpg",
    "/Banque d_images/Copie de DSC04678.jpg",
    "/Banque d_images/Copie de DSC04796.jpg", // Position 6 - remplacée
    "/Banque d_images/Copie de M7_09197.jpg",
    "/Banque d_images/Copie de M7_09236.jpg", // Position 8 - remplacée
  ]

  const [currentIndex, setCurrentIndex] = useState(0)
  const [imageErrors, setImageErrors] = useState<Set<number>>(new Set())
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  const handleImageError = (index: number) => {
    setImageErrors((prev) => new Set(prev).add(index))
  }

  // Auto-play functionality
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000) // Change image every 4 seconds

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [images.length])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length)
    // Reset auto-play timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    // Reset auto-play timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
    // Reset auto-play timer
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length)
    }, 4000)
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Slider Container */}
      <div className="relative h-[400px] sm:h-[500px] md:h-[600px] rounded-2xl sm:rounded-3xl overflow-hidden border border-white/20 bg-white/5 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)]">
        {/* Images */}
        <div className="relative w-full h-full">
          {images.map((src, index) => {
            if (imageErrors.has(index)) {
              return null // Ne pas afficher les images en erreur
            }
            return (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                }`}
              >
                <img
                  src={src}
                  alt={`Photo ${index + 1}`}
                  className="w-full h-full object-cover"
                  onError={() => handleImageError(index)}
                />
                {/* Gradient overlay for better text readability if needed */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
              </div>
            )
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Photo précédente"
        >
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-300 hover:scale-110"
          aria-label="Photo suivante"
        >
          <ChevronRight className="w-6 h-6 text-white" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-2 rounded-full transition-all duration-300 ${
                index === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Aller à la photo ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function ElasticGridBenefits() {
  const { t } = useTranslation()
  const [active, setActive] = useState(0)

  const features = [
    {
      title: t("services.benefit1Title"),
      desc: t("services.benefit1Desc"),
      label: t("services.benefit1Label"),
      img: getAssetUrl("/Banque d_images/art1.jpg", "image"),
      icon: Target,
      imagePath: "/Banque d_images/art1.jpg",
      delay: 100,
      imagePosition: "left" as const,
    },
    {
      title: t("services.benefit4Title"),
      desc: t("services.benefit4Desc"),
      label: t("services.benefit4Label"),
      img: getAssetUrl("/Banque d_images/Copie de DSC04796.jpg", "image"),
      icon: DollarSign,
      imagePath: "/Banque d_images/Copie de DSC04796.jpg",
      delay: 200,
      imagePosition: "right" as const,
    },
    {
      title: t("services.benefit2Title"),
      desc: t("services.benefit2Desc"),
      label: t("services.benefit2Label"),
      img: getAssetUrl("/Banque d_images/Copie de M7_00487.jpg", "image"),
      icon: TrendingUp,
      imagePath: "/Banque d_images/Copie de M7_00487.jpg",
      delay: 300,
      imagePosition: "left" as const,
    },
    {
      title: t("services.benefit3Title"),
      desc: t("services.benefit3Desc"),
      label: t("services.benefit3Label"),
      img: getAssetUrl("/Banque d_images/art2.jpg", "image"),
      icon: Palette,
      imagePath: "/Banque d_images/art2.jpg",
      delay: 400,
      imagePosition: "right" as const,
    },
  ]

  return (
    <>
      {/* Mobile: Design traditionnel (cartes en grille) */}
      <div className="grid gap-8 md:grid-cols-2 md:auto-rows-fr max-w-7xl mx-auto md:hidden">
        {features.map((benefit, index) => (
          <Reveal key={index} delay={benefit.delay} className="h-full">
            <div className={`group relative flex h-full w-full overflow-hidden rounded-2xl sm:rounded-3xl border border-white/15 bg-black/40 backdrop-blur-xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-700 hover:border-white/25 hover:shadow-[0_30px_80px_rgba(0,0,0,0.5)] ${
              benefit.imagePosition === 'left' ? 'md:flex-row' : 'md:flex-row-reverse'
            } flex-col`}>
              {/* Image Section */}
              <div className="relative w-full md:w-[35%] h-72 sm:h-80 md:h-full overflow-hidden flex-shrink-0">
                <Image
                  src={benefit.imagePath}
                  alt={benefit.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 35vw"
                />
                {/* Gradient overlay */}
                <div 
                  className={`absolute inset-0 ${
                    benefit.imagePosition === 'left' 
                      ? 'bg-gradient-to-r from-black/60 via-transparent to-transparent' 
                      : 'bg-gradient-to-l from-black/60 via-transparent to-transparent'
                  }`}
                />
                
                {/* Label Badge sur l'image */}
                <div className={`absolute top-4 ${benefit.imagePosition === 'left' ? 'left-4' : 'right-4'} z-10`}>
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping" style={{ animationDuration: '2s' }} />
                    <div className="relative rounded-full border border-white/40 bg-white/10 backdrop-blur-md px-4 py-2">
                      <span className="text-xs font-bold uppercase tracking-[0.4em] text-white">{benefit.label}</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Content Section */}
              <div className="relative w-full md:w-[65%] flex flex-col bg-gradient-to-br from-white/5 via-white/3 to-transparent min-h-0">
                <div className="pt-8 pb-8 px-8 md:pt-10 md:pb-10 md:px-10 flex-1 flex flex-col min-h-0">
                  <h3 className="text-2xl md:text-[1.75rem] font-bold leading-[1.2] text-white md:mb-4 whitespace-pre-line">
                    {benefit.title}
                  </h3>
                  <p className="text-base text-white/75 leading-relaxed group-hover:text-white/85 transition-colors duration-500 flex-1 overflow-y-auto">
                    {benefit.desc}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Desktop: ElasticGrid */}
      <div className="hidden md:flex items-center justify-center p-4 md:p-12">
        <div className="flex flex-col md:flex-row gap-4 w-full max-w-6xl h-[600px]">
          {features.map((item, i) => {
            return (
              <motion.div
                key={i}
                layout
                onClick={() => setActive(i)}
                onHoverStart={() => setActive(i)}
                className={cn(
                  "relative rounded-[2rem] overflow-hidden cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]",
                  active === i ? "flex-[10]" : "flex-[1] bg-white hover:bg-neutral-200"
                )}
              >
                {/* Background Image (Active Only) */}
                <motion.div
                  className="absolute inset-0 bg-black"
                  initial={false}
                  animate={{ opacity: active === i ? 1 : 0 }}
                >
                  {item.img && (
                    <Image
                      src={item.img}
                      alt={item.title}
                      fill
                      className="object-cover opacity-60"
                    />
                  )}
                </motion.div>

                {/* Vertical Label (Inactive) */}
                <div className={cn(
                  "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
                  active === i ? "opacity-0 pointer-events-none" : "opacity-100"
                )}>
                  <h3 className="transform -rotate-90 text-xl font-bold text-neutral-400 whitespace-nowrap uppercase tracking-widest">{item.label}</h3>
                </div>

                {/* Expanded Content */}
                <div className={cn(
                  "relative h-full flex flex-col justify-end p-8 md:p-12 transition-opacity duration-500 delay-100",
                  active === i ? "opacity-100" : "opacity-0 pointer-events-none"
                )}>
                  <motion.h2 layout="position" className="text-4xl md:text-7xl font-bold text-white mb-4 leading-tight">
                    {item.title}
                  </motion.h2>
                  <motion.p layout="position" className="text-lg text-white/80 max-w-lg">
                    {item.desc}
                  </motion.p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </>
  )
}

export function ServicesSection() {
  const { t } = useTranslation()
  const [expandedCards, setExpandedCards] = useState<Set<number>>(new Set())

  // Extract the two big pillars from the long description
  const rawDescription = t("services.description") as string
  const descriptionSections = rawDescription
    .split(/\n\n+/)
    .map(section => section.trim())
    .filter(Boolean)

  const accompagnementTitle = descriptionSections[0] || t("services.process")
  const accompagnementText = descriptionSections[1] || t("services.processDesc")
  const croissanceTitle = descriptionSections[2] || t("services.team")
  const croissanceText = descriptionSections[3] || t("services.teamDesc")

  const pillars = [
    {
      title: accompagnementTitle,
      description: accompagnementText,
    },
    {
      title: croissanceTitle,
      description: croissanceText,
    },
  ]

  const offers = [
  {
      tag: t("services.brandingTag"),
      title: t("services.brandingTitle"),
      description: t("services.brandingDesc"),
    deliverables: [
        t("services.brandingDeliverable1"),
        t("services.brandingDeliverable2"),
        t("services.brandingDeliverable3"),
    ],
  },
  {
      tag: t("services.productionTag"),
      title: t("services.productionTitle"),
      description: t("services.productionDesc"),
    deliverables: [
        t("services.productionDeliverable1"),
        t("services.productionDeliverable2"),
        t("services.productionDeliverable3"),
    ],
  },
  {
      tag: t("services.socialTag"),
      title: t("services.socialTitle"),
      description: t("services.socialDesc"),
    deliverables: [
        t("services.socialDeliverable1"),
        t("services.socialDeliverable2"),
        t("services.socialDeliverable3"),
    ],
  },
  {
      tag: t("services.campaignTag"),
      title: t("services.campaignTitle"),
      description: t("services.campaignDesc"),
    deliverables: [
        t("services.campaignDeliverable1"),
        t("services.campaignDeliverable2"),
        t("services.campaignDeliverable3"),
    ],
  },
  {
      tag: t("services.strategyTag"),
      title: t("services.strategyTitle"),
      description: t("services.strategyDesc"),
    deliverables: [
        t("services.strategyDeliverable1"),
        t("services.strategyDeliverable2"),
        t("services.strategyDeliverable3"),
    ],
  },
  {
      tag: t("services.digitalTag"),
      title: t("services.digitalTitle"),
      description: t("services.digitalDesc"),
    deliverables: [
        t("services.digitalDeliverable1"),
        t("services.digitalDeliverable2"),
        t("services.digitalDeliverable3"),
    ],
  },
]
  return (
    <section id="services" className="relative px-4 sm:px-6 pb-16 sm:pb-20 md:pb-28 pt-12 sm:pt-16">
      <div className="mx-auto flex max-w-6xl flex-col gap-12 sm:gap-16 md:gap-20">
        <div className="relative overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[40px] border border-white/15 bg-white/5 p-6 sm:p-8 md:p-10 lg:p-14 text-white backdrop-blur-xl">
          <div className="absolute inset-y-0 -left-20 hidden w-1/3 bg-[radial-gradient(circle_at_center,_rgba(0,115,255,0.35),_transparent_70%)] opacity-70 md:block" />
          
          {/* Image - Right Side - Comme la version originale : 1/3 de la largeur, sujet centré */}
          <div className="absolute inset-y-0 right-0 h-full w-full md:w-1/3 overflow-hidden rounded-r-[24px] sm:rounded-r-[32px] md:rounded-r-[40px] opacity-30 md:opacity-100">
            <Image
              src="/Banque d_images/Copie de M7_00487.jpg"
              alt="Nos expertises"
              fill
              className="object-cover object-center brightness-110 md:brightness-125 contrast-105 md:contrast-120"
              sizes="(max-width: 768px) 100vw, 33vw"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-l from-black/90 via-black/60 to-black/40 md:from-transparent md:via-transparent md:to-black/20" />
          </div>

          <div className="relative flex flex-col gap-6 sm:gap-8 md:flex-row md:items-end md:justify-between z-10">
            <Reveal className="max-w-3xl space-y-4 sm:space-y-6">
              <span className="inline-flex w-fit items-center gap-2.5 sm:gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 sm:px-6 sm:py-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.4em] sm:tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
                {t("services.badge")}
              </span>
              <h2 className="max-w-2xl text-2xl sm:text-3xl md:text-4xl lg:text-[52px] font-black leading-tight">
                {t("services.title")}
              </h2>
              {/* Les deux piliers principaux sont affichés dans le bloc inférieur, donc on n'affiche rien ici pour éviter les doublons */}
              {formatDescription(t("services.description")) && (
                <div className="max-w-2xl text-sm sm:text-base text-white/85 md:text-white/80 md:text-lg leading-relaxed">
                  {formatDescription(t("services.description"))}
                </div>
              )}
            </Reveal>
          </div>

          {/* Accompagnement & Croissance - Bloc premium en dessous - Positionné à gauche avec marge, sans toucher l'image */}
          <Reveal delay={300} className="relative z-10 mt-8 sm:mt-10 md:mt-12">
            {/* Sur mobile : pleine largeur (w-full). Sur desktop : largeur limitée pour ne pas toucher l'image */}
            <div className="relative rounded-xl sm:rounded-2xl border border-white/20 bg-white/8 p-6 sm:p-8 lg:p-12 xl:p-14 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.4)] w-full md:max-w-[64%] lg:max-w-[60%] mr-auto">
              {/* Subtle Glow */}
              <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-white/10 via-transparent to-white/10 blur-xl opacity-50" />
              
              <div className="relative space-y-10 sm:space-y-12">
                {pillars.map((pillar, index) => (
                  <div key={pillar.title} className="group/pillar">
                    <div className="flex items-start gap-4">
                      {/* Animated Circle Indicator - Taille réduite */}
                      <div className="relative h-12 w-12 sm:h-14 sm:w-14 flex-shrink-0 flex items-center justify-center">
                        <div
                          className="absolute inset-0 rounded-full border-2 border-white/30 animate-ping"
                          style={{ animationDuration: index === 0 ? "2s" : "2.5s", animationDelay: index === 0 ? "0s" : "0.4s" }}
                        />
                        <div className="absolute inset-0 rounded-full border border-white/40" />
                        <div className="relative h-3 w-3 sm:h-3.5 sm:w-3.5 rounded-full bg-white/85" />
                      </div>

                      <div className="flex-1 space-y-4 min-w-0">
                        <div className="flex items-center gap-3">
                          <span className="text-xs sm:text-sm md:text-base font-bold uppercase tracking-[0.45em] text-white/90 break-words">
                            {pillar.title}
                          </span>
                          <div className="flex-1 h-px bg-gradient-to-r from-white/40 via-white/25 to-transparent" />
                        </div>
                        <p className="text-base sm:text-lg md:text-xl text-white/85 leading-relaxed group-hover/pillar:text-white/95 transition-colors duration-500 break-words overflow-wrap-anywhere">
                          {pillar.description}
                        </p>
                      </div>
                    </div>

                    {/* Divider between the two pillars */}
                    {index === 0 && (
                      <div className="mt-8 sm:mt-10 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Photo Slider - Below the main card */}
        <Reveal delay={200} className="relative z-10 mt-8 sm:mt-12">
          <PhotoSlider />
        </Reveal>

        {/* Section Bénéfices Clients - Design Innovant Moderne */}
        <Reveal delay={400} className="relative z-10 mt-16 sm:mt-20">
          <div className="mb-12 text-center">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
              {t("services.benefitsBadge")}
            </span>
            <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
              {t("services.benefitsTitle")}
            </h2>
            <p className="mt-4 text-base text-white/70 md:text-lg max-w-2xl mx-auto">
              {t("services.benefitsSubtitle")}
            </p>
          </div>

          {/* ElasticGrid Component */}
          <ElasticGridBenefits />
        </Reveal>

        <div className="grid gap-10 md:grid-cols-2 md:items-start">
          {offers.map((offer, index) => {
            const isExpanded = expandedCards.has(index)
            const toggleExpanded = () => {
              setExpandedCards(prev => {
                const newSet = new Set(prev)
                if (newSet.has(index)) {
                  newSet.delete(index)
                } else {
                  newSet.add(index)
                }
                return newSet
              })
            }

            return (
              <Reveal
                key={offer.title}
                delay={index * 120}
                className={`group relative overflow-hidden rounded-[24px] sm:rounded-[32px] md:rounded-[38px] border border-white/12 bg-white/[0.06] p-6 sm:p-8 md:p-10 text-white backdrop-blur-2xl transition-all duration-500 hover:-translate-y-1 hover:border-white/30 hover:bg-white/[0.12] flex flex-col ${isExpanded ? 'md:h-full' : 'md:h-full'}`}
              >
                <div className="pointer-events-none absolute -inset-x-16 top-[-40%] h-[420px] rounded-full bg-[radial-gradient(circle,_rgba(0,115,255,0.36)_0%,_transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                <div className="pointer-events-none absolute inset-0 bg-[url('/Banque d_images/noise.png')] opacity-[0.12] mix-blend-screen" />

                <div className="relative flex flex-col gap-4 sm:gap-6 flex-1">
                  {/* Header - Always visible */}
                  <div className="flex items-start justify-between h-[70px] sm:h-[80px] md:h-[85px] flex-shrink-0">
                    <div className="flex flex-col gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.35em] sm:tracking-[0.42em] text-white/60 sm:text-white/55">
                      <span>{offer.tag}</span>
                      <span className="h-px w-8 sm:w-9 bg-white/25 sm:bg-white/20" />
                    </div>
                    <span className="text-3xl sm:text-4xl font-black text-white/20 sm:text-white/15 md:text-5xl">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  {/* Expandable content on mobile, always visible on desktop */}
                  <div className={`flex flex-col gap-4 sm:gap-6 flex-1 transition-all duration-500 md:block ${isExpanded ? 'block' : 'hidden md:block'}`}>
                    <div className="flex-shrink-0 md:min-h-[180px]">
                      <h3 className={`text-xl sm:text-2xl font-semibold md:text-[30px] leading-tight ${index === 5 ? 'whitespace-pre-line' : ''}`}>
                        {index === 5 ? offer.title.replace('Custom website creation', 'Custom website\ncreation') : offer.title}
                      </h3>
                      <p className="text-sm text-white/70 md:text-base text-justify min-h-[80px] sm:min-h-[90px] md:min-h-[100px] mt-2 md:mt-3">{offer.description}</p>
                    </div>

                    <div className="flex flex-col gap-4 pt-4 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/45 flex-shrink-0">
                      {offer.deliverables.map((item, itemIndex) => (
                        <div
                          key={item}
                          className="flex items-center justify-between gap-4 border-b border-white/12 pb-3 transition-colors duration-500 group-hover:border-white/25 h-[2.75rem]"
                        >
                          <span className="flex-1 text-left text-white/65 transition-colors duration-500 group-hover:text-white/95 flex items-center">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expand/Collapse button - Mobile only */}
                  <button
                    onClick={toggleExpanded}
                    className="md:hidden flex items-center justify-center gap-2 mt-2 py-2 text-xs uppercase tracking-[0.3em] text-white/60 hover:text-white/90 transition-colors duration-300"
                    aria-label={isExpanded ? t("services.seeLess") : t("services.seeMore")}
                  >
                    <span>{isExpanded ? t("services.seeLess") : t("services.seeMore")}</span>
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={200} className="mx-auto flex w-full max-w-6xl flex-col gap-4 sm:flex-row sm:items-center sm:justify-between rounded-[24px] sm:rounded-[32px] md:rounded-[36px] border border-white/12 bg-white/[0.06] px-6 py-5 sm:px-8 sm:py-6 text-white backdrop-blur-2xl">
          <div className="flex flex-col gap-2 sm:gap-1">
            <span className="text-base sm:text-lg md:text-xl font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white/90 sm:text-white">{t("services.ctaTitle")}</span>
            <p className="text-xs sm:text-sm text-white/75 sm:text-white/70 leading-relaxed">
              {t("services.ctaDesc")}
            </p>
          </div>
          <LinkCTA />
        </Reveal>
      </div>
    </section>
  )
}

function LinkCTA() {
  const { t } = useTranslation()
  return (
    <a
      href="/#rendez-vous"
      className="group inline-flex items-center justify-center gap-2.5 sm:gap-3 rounded-full border-2 sm:border border-white/30 sm:border-white/25 bg-white/15 sm:bg-white/10 px-6 py-3 sm:px-8 sm:py-3 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.3em] sm:tracking-[0.35em] text-white transition-all duration-500 hover:border-white hover:bg-white/20 sm:hover:bg-white/15 active:scale-95 sm:active:scale-100"
    >
      {t("services.ctaButton")}
    </a>
  )
}
