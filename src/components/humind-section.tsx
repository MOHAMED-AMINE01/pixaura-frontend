"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"

const featuredEpisode = {
  title: "IL A JOUÉ AVEC MARADONA : RAÚL VARGAS RÍOS SUR HUMIND",
  description:
    "Interview exclusive avec Raúl Vargas Ríos sur son parcours exceptionnel dans le football professionnel.",
  image: "/Banque d_images/Copie de M7_03385.jpg",
  duration: "43:00",
  format: "YouTube & Podcast",
  guest: "Raúl Vargas Ríos",
  category: "Sport",
}

const episodeSnippets = [
  {
    id: 1,
    title: "Siam Lee — Construire une marque média sur TikTok",
    duration: "28 min",
  },
  {
    id: 2,
    title: "Marie Rutt — La stratégie LinkedIn qui performe",
    duration: "24 min",
  },
  {
    id: 3,
    title: "Pape Seck — L'art du storytelling pour les athlètes",
    duration: "30 min",
  },
]

export function HumindSection() {
  const { t } = useTranslation()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <>
      <section id="humind" className="humind-section relative overflow-hidden py-24 px-6 md:py-32">
      {/* Premium background effects */}
      <div className="humind-bg absolute inset-0 opacity-30" />
      <div className="humind-glow absolute inset-0 opacity-20" />
      
      {/* Animated particles */}
      <div className="humind-particles absolute inset-0 pointer-events-none" />
      
      {/* Mouse-following gradient */}
      <div 
        className="humind-mouse-glow absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 400px at ${mousePosition.x}px ${mousePosition.y}px, rgba(80, 120, 255, 0.15) 0%, transparent 70%)`,
        }}
      />
      
      <div className="mx-auto relative z-10 flex max-w-6xl flex-col gap-12 text-white lg:grid lg:grid-cols-[1.3fr_1fr] lg:items-start lg:gap-16">
        {/* Content section - Desktop: left column, Mobile: order-3 (after badge and image) */}
        <div className="space-y-8 lg:space-y-10 order-3 lg:order-none">
          {/* Humind Badge - Desktop: visible, Mobile: hidden (shown separately above) */}
          <Reveal className="hidden lg:block space-y-6">
            <div className="humind-badge inline-flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-white/12 via-white/8 to-white/5 px-7 py-3 text-[0.7rem] font-black uppercase tracking-[0.5em] text-white/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_12px_40px_rgba(80,120,255,0.2)]">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-transparent opacity-0 hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              <span className="relative z-10">Humind</span>
            </div>
          </Reveal>

          <Reveal className="space-y-6">
            <h2 className="humind-heading text-4xl font-black leading-[1.12] md:text-5xl lg:text-6xl text-white relative">
              <span className="bg-gradient-to-br from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_2px_8px_rgba(0,0,0,0.3)]">
                {t("humindHome.heading")}
              </span>
            </h2>
            <p className="text-base text-white/70 md:text-lg leading-relaxed max-w-xl text-justify text-justify-smooth" style={{ wordSpacing: 'normal', whiteSpace: 'normal' }}>
              {t("humindHome.description")}
            </p>
          </Reveal>

          <Reveal delay={100} className="grid gap-5 md:grid-cols-2">
            <div className="humind-card group relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-white/8 via-white/6 to-white/4 p-6 backdrop-blur-2xl transition-all duration-500 hover:border-white/25 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/9 hover:to-white/6 hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(80,120,255,0.25)]">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/12 via-transparent to-purple-500/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.45em] text-white/60 font-bold">{t("humindHome.formatsLabel")}</p>
                </div>
                <p className="text-base md:text-lg font-bold leading-snug text-white/95">{t("humindHome.formatsDesc")}</p>
              </div>
            </div>
            <div className="humind-card group relative overflow-hidden rounded-2xl border border-white/12 bg-gradient-to-br from-white/8 via-white/6 to-white/4 p-6 backdrop-blur-2xl transition-all duration-500 hover:border-white/25 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/9 hover:to-white/6 hover:scale-[1.02] hover:shadow-[0_12px_48px_rgba(124,58,237,0.25)]">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/12 via-transparent to-blue-500/12 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/20 via-blue-500/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <p className="text-[0.7rem] uppercase tracking-[0.45em] text-white/60 font-bold">{t("humindHome.distributionLabel")}</p>
                </div>
                <p className="text-base md:text-lg font-bold leading-snug text-white/95">{t("humindHome.distributionDesc")}</p>
              </div>
            </div>
          </Reveal>

          <Reveal delay={180} className="flex flex-wrap items-center gap-5">
            <Link
              href="/humind"
              prefetch={true}
              className="humind-cta group relative inline-flex items-center gap-3 rounded-full border border-white/25 bg-gradient-to-r from-white/10 via-white/7 to-white/5 px-10 py-4 text-[0.7rem] font-black uppercase tracking-[0.4em] text-white backdrop-blur-2xl transition-all duration-400 hover:border-white/45 hover:from-white/18 hover:via-white/12 hover:to-white/10 hover:scale-110 hover:shadow-[0_12px_40px_rgba(80,120,255,0.4)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-400 -z-10" />
              <span className="relative z-10">{t("humindHome.exploreEpisodes")}</span>
              <span className="text-base transition-transform duration-400 group-hover:translate-x-2 relative z-10">→</span>
            </Link>
          </Reveal>
        </div>

        {/* Image - Desktop: right column, Mobile: order-2 (right after badge) */}
        <Reveal delay={220} className="flex w-full items-start order-2 lg:order-none">
          <div className="humind-preview group relative w-full overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-white/12 via-white/8 to-white/6 backdrop-blur-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)] transition-all duration-600 hover:border-white/35 hover:shadow-[0_28px_80px_-10px_rgba(80,120,255,0.4)] hover:scale-[1.04]">
            {/* Animated border gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 via-purple-500/30 to-cyan-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-3xl blur-2xl -z-10" />
            <div className="absolute -inset-2 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-600 rounded-3xl blur-3xl -z-20" />
            
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl">
              <Image
                src={featuredEpisode.image}
                alt={featuredEpisode.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 1024px) 100vw, 40vw"
                quality={95}
                priority
              />
              
              {/* Subtle gradient overlay on hover only */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/8 via-transparent to-purple-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
          </div>
        </Reveal>

        {/* Humind Badge - Mobile only: order-1 (first), Desktop: hidden (shown in content section) */}
        <Reveal className="order-1 lg:hidden">
          <div className="humind-badge inline-flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-white/12 via-white/8 to-white/5 px-7 py-3 text-[0.7rem] font-black uppercase tracking-[0.5em] text-white/95 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.3)] relative overflow-hidden transition-all duration-500 hover:border-white/30 hover:shadow-[0_12px_40px_rgba(80,120,255,0.2)]">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/25 via-purple-500/25 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-transparent opacity-0 hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />
            <span className="relative z-10">Humind</span>
          </div>
        </Reveal>
      </div>
    </section>
    </>
  )
}
