"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { OffreModal } from "@/components/offre-modal"
import { useTranslation } from "@/contexts/translation-context"

export function OffreSection() {
  const { t } = useTranslation()
  
  const differentiatorDetails = {
    production: {
      title: t("offreHome.productionTitle"),
      subtitle: t("offreHome.productionSubtitle"),
      image: "/Banque d_images/Copie de M7_00487.jpg",
      intro: t("offreHome.productionIntro"),
      points: [
        t("offreHome.productionPoint1"),
        t("offreHome.productionPoint2"),
        t("offreHome.productionPoint3"),
        t("offreHome.productionPoint4")
      ],
      conclusion: t("offreHome.productionConclusion"),
      gradient: "from-blue-500 via-cyan-400 to-blue-600",
      glow: "rgba(59, 130, 246, 0.4)",
      iconBg: "from-blue-500/20 to-cyan-500/20"
    },
    creativite: {
      title: t("offreHome.creativityTitle"),
      subtitle: t("offreHome.creativitySubtitle"),
      image: "/Banque d_images/art1.jpg",
      intro: t("offreHome.creativityIntro"),
      points: [
        t("offreHome.creativityPoint1"),
        t("offreHome.creativityPoint2"),
        t("offreHome.creativityPoint3")
      ],
      conclusion: t("offreHome.creativityConclusion"),
      gradient: "from-purple-500 via-pink-400 to-purple-600",
      glow: "rgba(168, 85, 247, 0.4)",
      iconBg: "from-purple-500/20 to-pink-500/20"
    },
    suivi: {
      title: t("offreHome.suiviTitle"),
      subtitle: t("offreHome.suiviSubtitle"),
      image: "/Banque d_images/Copie de M7_03194.jpg",
      intro: t("offreHome.suiviIntro"),
      points: [
        t("offreHome.suiviPoint1"),
        t("offreHome.suiviPoint2"),
        t("offreHome.suiviPoint3")
      ],
      conclusion: t("offreHome.suiviConclusion"),
      gradient: "from-emerald-500 via-teal-400 to-emerald-600",
      glow: "rgba(16, 185, 129, 0.4)",
      iconBg: "from-emerald-500/20 to-teal-500/20"
    }
  }

  const packs = [
    {
      name: t("offreHome.starterName"),
      price: t("offreHome.starterPrice"),
      priceDetail: t("offreHome.starterPriceDetail"),
      description: t("offreHome.starterDesc"),
      image: "/Banque d_images/Copie de M7_00487.jpg",
      features: [
        t("offreHome.starterFeature1"),
        t("offreHome.starterFeature2"),
        t("offreHome.starterFeature3"),
        t("offreHome.starterFeature4"),
      ],
      gradient: "from-blue-500 via-cyan-400 to-blue-600",
      glow: "rgba(59, 130, 246, 0.3)",
      accent: "blue",
      badge: t("offreHome.starterName")
    },
    {
      name: t("offreHome.croissanceName"),
      price: t("offreHome.croissancePrice"),
      priceDetail: t("offreHome.croissancePriceDetail"),
      description: t("offreHome.croissanceDesc"),
      image: "/Banque d_images/art1.jpg",
      features: [
        t("offreHome.croissanceFeature1"),
        t("offreHome.croissanceFeature2"),
        t("offreHome.croissanceFeature3"),
        t("offreHome.croissanceFeature4"),
      ],
      gradient: "from-purple-500 via-pink-400 to-purple-600",
      glow: "rgba(168, 85, 247, 0.3)",
      accent: "purple",
      badge: t("offreHome.croissanceName")
    },
    {
      name: t("offreHome.signatureName"),
      price: t("offreHome.signaturePrice"),
      priceDetail: t("offreHome.signaturePriceDetail"),
      description: t("offreHome.signatureDesc"),
      image: "/Banque d_images/Copie de M7_03194.jpg",
      features: [
        t("offreHome.signatureFeature1"),
        t("offreHome.signatureFeature2"),
        t("offreHome.signatureFeature3"),
      ].filter(f => f && f.trim() !== ""), // Filtrer les features vides
      gradient: "from-amber-500 via-yellow-400 to-amber-600",
      glow: "rgba(245, 158, 11, 0.3)",
      accent: "amber",
      premium: true,
      badge: t("offreHome.signatureName")
    }
  ]
  const [mounted, setMounted] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedOffre, setSelectedOffre] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const rect = sectionRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        })
      }
    }

    if (sectionRef.current) {
      sectionRef.current.addEventListener('mousemove', handleMouseMove)
      return () => {
        if (sectionRef.current) {
          sectionRef.current.removeEventListener('mousemove', handleMouseMove)
        }
      }
    }
  }, [])

  return (
    <section ref={sectionRef} id="offre" className="relative overflow-hidden px-6 py-24">
      {/* Subtle Background Effect */}
      <div className="pointer-events-none absolute inset-0">
        <div 
          className="absolute inset-0 opacity-20 transition-opacity duration-1000"
          style={{
            background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(59, 130, 246, 0.1) 0%, rgba(168, 85, 247, 0.08) 30%, transparent 60%)`,
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Premium Header */}
        <Reveal>
          <div className="mb-16 text-left">
            <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
              {t("offreHome.badge")}
            </span>
            <h2 className="mt-8 text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl text-left">
              {t("offreHome.title")}
            </h2>
            <p className="mt-6 text-base text-white/70 md:text-lg text-left whitespace-nowrap">
              {t("offreHome.description")}
            </p>
          </div>
        </Reveal>

        {/* Premium Design Cards - Style Réalisations */}
        <div className="mb-24 grid gap-8 md:grid-cols-3">
          {[
            { key: "production", badge: t("offreHome.productionBadge") },
            { key: "creativite", badge: t("offreHome.creativityBadge") },
            { key: "suivi", badge: t("offreHome.analyticsBadge") }
          ].map(({ key, badge }) => {
            const detail = differentiatorDetails[key as keyof typeof differentiatorDetails]

            return (
              <Reveal key={key} delay={key === "production" ? 0 : key === "creativite" ? 100 : 200}>
                <div className="group relative overflow-hidden rounded-3xl border border-white/15 bg-white/5 text-white backdrop-blur-xl transition duration-700 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:border-white/25 hover:bg-white/10 hover:shadow-[0_45px_140px_rgba(0,0,0,0.55)] h-full flex flex-col">
                  {/* Premium Glow Effects - Style Réalisations */}
                  <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                    <div className={`absolute -inset-6 rounded-[40px] bg-gradient-to-r ${detail.gradient} blur-3xl animate-pulse`} style={{ opacity: 0.2 }} />
                    <div className="absolute inset-0 rounded-[30px] border border-white/20 opacity-60" />
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      setSelectedOffre(key)
                      setIsModalOpen(true)
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        setSelectedOffre(key)
                        setIsModalOpen(true)
                      }
                    }}
                    className="w-full h-full flex flex-col text-left"
                  >
                    {/* Image Section - Enhanced Premium Style */}
                    <div className="relative h-72 w-full overflow-hidden flex-shrink-0">
                      <Image
                        src={detail.image}
                        alt={detail.title}
                        fill
                        className="object-cover transition duration-700 ease-out group-hover:scale-110"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 30vw"
                        loading="lazy"
                      />
                      {/* Enhanced Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
                      {/* Animated gradient on hover */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${detail.gradient} opacity-0 transition-opacity duration-700 group-hover:opacity-20`} />
                      
                      {/* Premium Badge with enhanced styling */}
                      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
                        <span className="rounded-full border border-white/30 bg-white/20 px-5 py-2.5 text-[11px] font-bold uppercase tracking-[0.35em] text-white backdrop-blur-md shadow-lg transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/25 group-hover:scale-105">
                          {badge}
                        </span>
                      </div>
                    </div>

                    {/* Enhanced Content Section with Premium Typography */}
                    <div className="flex flex-col gap-5 px-8 py-10 text-white flex-1 min-h-0">
                      {/* Title with enhanced styling - Fixed height for alignment */}
                      <div className="space-y-2 text-center flex-shrink-0 min-h-[120px] flex flex-col justify-start">
                        <h3 className="text-xl font-black leading-tight tracking-tight md:text-2xl lg:text-3xl bg-gradient-to-r from-white via-white to-white/80 bg-clip-text text-transparent group-hover:from-white group-hover:via-white group-hover:to-white transition-all duration-500 md:whitespace-nowrap">
                          {detail.title}
                        </h3>
                        <p className="text-sm font-medium text-white/60 md:text-base leading-relaxed text-center">
                          {detail.subtitle}
                        </p>
                      </div>
                      
                      {/* Spacer to push CTA to bottom */}
                      <div className="flex-1" />
                      
                      {/* Enhanced CTA Section - Positioned at bottom */}
                      <div className="flex items-center gap-4 pt-2 border-t border-white/10 flex-shrink-0">
                        <span className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                        <span className="inline-flex items-center gap-2.5 text-xs font-bold uppercase tracking-[0.3em] text-white/90 transition-all duration-300 group-hover:text-white group-hover:gap-3">
                          {t("offreHome.seeDetails")}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                        <span className="flex-1 h-px bg-gradient-to-l from-transparent via-white/20 to-transparent" />
                      </div>
                    </div>
                  </button>
                </div>
              </Reveal>
            )
          })}
        </div>

        {/* Premium Divider */}
        <div className="relative mb-20 py-8">
          <div className="mx-auto max-w-7xl">
            <div className="relative h-px bg-gradient-to-r from-transparent via-white/25 to-transparent">
              <div className="absolute left-1/2 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-blue-400/50 via-purple-400/70 to-cyan-400/50" />
            </div>
          </div>
        </div>

        {/* Ultra Premium Packs Section */}
        <Reveal>
          <div className="mb-12 text-center">
            <h2 className="text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl">
              {t("offreHome.packsTitle")}
            </h2>
            <p className="mx-auto mt-6 max-w-3xl text-base text-white/70 md:text-lg">
              {t("offreHome.packsDesc")}
            </p>
          </div>
        </Reveal>

        {/* Premium Packs Cards - Style 3 Piliers */}
        <div className="grid gap-8 md:grid-cols-3 md:items-stretch">
          {packs.map((pack, index) => (
            <Reveal key={pack.name} delay={index * 100}>
              <Link 
                href="#rendez-vous"
                className="group relative overflow-hidden rounded-3xl border border-white/15 bg-black/70 text-white backdrop-blur-xl transition duration-700 ease-out hover:-translate-y-3 hover:scale-[1.01] hover:border-white/25 hover:bg-black/80 hover:shadow-[0_45px_140px_rgba(0,0,0,0.85),inset_0_0_60px_rgba(0,0,0,0.5)] h-full flex flex-col cursor-pointer"
                style={{
                  boxShadow: '0 20px 80px rgba(0, 0, 0, 0.6), inset 0 0 40px rgba(0, 0, 0, 0.3)',
                }}
              >
                {/* Premium Glow Effects - Style Réalisations */}
                <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 ease-out group-hover:opacity-100">
                  <div className={`absolute -inset-6 rounded-[40px] bg-gradient-to-r ${pack.gradient} blur-3xl animate-pulse`} style={{ opacity: 0.2 }} />
                  <div className="absolute inset-0 rounded-[30px] border border-white/20 opacity-60" />
                </div>

                {/* Image Section - Style 3 Piliers */}
                <div className="relative h-32 w-full overflow-hidden flex items-center justify-center">
                  {/* Premium Badge with enhanced styling */}
                  <div className="flex items-center justify-center w-full">
                    <span className={`rounded-full border border-white/30 bg-white/20 px-8 py-3.5 text-sm font-bold uppercase tracking-[0.35em] text-white backdrop-blur-md shadow-lg transition-all duration-500 group-hover:border-white/40 group-hover:bg-white/25 group-hover:scale-105 ${pack.premium ? 'bg-gradient-to-r from-amber-500/30 to-yellow-500/30 border-amber-400/40' : ''}`}>
                      {pack.badge}
                    </span>
                  </div>
                </div>

                {/* Separator Line */}
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/60 to-transparent" />

                {/* Enhanced Content Section */}
                <div className="flex flex-col gap-5 px-8 py-10 text-white flex-1">
                  {/* Description - Fixed height for alignment - Hauteur fixe pour aligner toutes les descriptions */}
                  <div className="space-y-2 text-center h-[180px] md:h-[200px] flex flex-col justify-center flex-shrink-0">
                    <p className="text-sm font-medium text-white/60 md:text-base leading-relaxed text-center">
                      {pack.description}
                    </p>
                  </div>

                  {/* Price Section - Premium Design - Fixed height for alignment */}
                  <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/5 p-6 backdrop-blur-sm transition-all duration-500 group-hover:border-white/30 group-hover:bg-white/10 min-h-[140px] flex flex-col items-center justify-center flex-shrink-0">
                    <div className={`absolute inset-0 bg-gradient-to-br ${pack.gradient} opacity-0 transition-opacity duration-500 group-hover:opacity-10`} />
                    <div className="relative z-10 space-y-2 text-center w-full">
                      <div className="text-2xl font-black text-white md:text-3xl leading-tight">{pack.price}</div>
                      {pack.priceDetail && (
                        <div className="text-xs font-semibold text-white/50 md:text-sm uppercase tracking-wide mt-2">{pack.priceDetail}</div>
                      )}
                    </div>
                  </div>

                  {/* Features List - Compact Premium Design */}
                  <div className="space-y-3 pt-2 flex-1">
                    {pack.features.filter(f => f && f.trim() !== "").map((feature, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 text-sm text-white/70 transition-colors duration-300 group-hover:text-white/90"
                      >
                        <Check className="h-4 w-4 text-white/60 mt-0.5 flex-shrink-0 transition-colors duration-300 group-hover:text-white/80" />
                        <span className="leading-relaxed flex-1">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Offre Modal */}
      <OffreModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
        offre={selectedOffre ? differentiatorDetails[selectedOffre as keyof typeof differentiatorDetails] : null}
      />
    </section>
  )
}
