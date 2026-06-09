"use client"

import { ReactNode, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react"
import { motion, useMotionValue, useTransform } from "framer-motion"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"
import { getAssetUrl } from "@/lib/cloudinary"

const heroProjects = [
  {
    id: 1,
    client: "Touraine Cars",
    title: "Night Drive Experience",
    category: "Film • Activation",
    image: getAssetUrl("/Banque d_images/Copie de M7_03225.jpg", "image"),
  },
  {
    id: 2,
    client: "BSD / UFC Paris",
    title: "Stage MMA Immersion",
    category: "Social • Event",
    image: getAssetUrl("/Banque d_images/StageUfc.jpg", "image"),
  },
]

const DISPLAY_DURATION = 5200
const ANIMATION_DURATION = 900

const getNodeText = (node: ReactNode): string => {
  if (typeof node === "string" || typeof node === "number") {
    return String(node)
  }
  if (Array.isArray(node)) {
    return node.map((child) => getNodeText(child)).join("")
  }
  if (node && typeof node === "object" && "props" in (node as any)) {
    return getNodeText((node as any).props?.children)
  }
  return ""
}

interface VideoCardHolographicProps {
  videoRef: React.RefObject<HTMLVideoElement | null>
  videoSrc: string
  isMuted: boolean
  toggleMute: () => void
}

const VideoCardHolographic: React.FC<VideoCardHolographicProps> = ({
  videoRef,
  videoSrc,
  isMuted,
  toggleMute,
}) => {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const maxRotateX = 15
  const maxRotateY = 15
  const perspective = 2000
  const dragElastic = 0.16
  const rotateX = useTransform(y, [-100, 100], [maxRotateX, -maxRotateX])
  const rotateY = useTransform(x, [-100, 100], [-maxRotateY, maxRotateY])

  const gradientFrom = "rgba(168, 85, 247, 0.2)"
  const gradientVia = "rgba(59, 130, 246, 0)"
  const gradientTo = "rgba(20, 184, 166, 0.2)"
  const blob1Color = "#9333ea"
  const blob2Color = "#2563eb"
  const blob1Size = "16rem"
  const blob2Size = "16rem"
  const blob1Duration = 4
  const blob2Duration = 5
  const blob1Delay = 0
  const noiseOpacity = 0.2
  const backgroundColor = "#0a0a0a"
  const borderColor = "rgba(255, 255, 255, 0.1)"

  return (
    <div style={{ perspective }} className="w-full">
      <motion.div
        style={{ 
          x, 
          y, 
          rotateX, 
          rotateY, 
          z: 100,
          backgroundColor,
          borderColor,
        }}
        drag
        dragElastic={dragElastic}
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        whileTap={{ cursor: "grabbing" }}
        className="group relative isolate flex h-[480px] w-full flex-col overflow-hidden rounded-[30px] border cursor-grab shadow-2xl xl:h-[520px]"
      >
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `linear-gradient(to bottom right, ${gradientFrom}, ${gradientVia}, ${gradientTo})`,
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "url('https://grainy-gradients.vercel.app/noise.svg')",
            opacity: noiseOpacity,
          }}
        />

        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: blob1Duration, repeat: Infinity }}
          className="absolute -top-20 -right-20 rounded-full blur-[80px] opacity-40 mix-blend-screen pointer-events-none"
          style={{
            width: blob1Size,
            height: blob1Size,
            backgroundColor: blob1Color,
          }}
        />
        <motion.div
          animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.4, 0.2] }}
          transition={{ duration: blob2Duration, repeat: Infinity, delay: blob1Delay }}
          className="absolute -bottom-20 -left-20 rounded-full blur-[80px] opacity-40 mix-blend-screen pointer-events-none"
          style={{
            width: blob2Size,
            height: blob2Size,
            backgroundColor: blob2Color,
          }}
        />

        {/* High-Tech Outer Glow Layers */}
        <div className="pointer-events-none absolute -inset-[1px] rounded-[31px] bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 opacity-60 blur-sm" />
        <div className="pointer-events-none absolute -inset-[2px] rounded-[32px] bg-gradient-to-br from-cyan-500/20 via-purple-500/20 to-cyan-500/20 opacity-40 blur-md" />

        {/* Multi-layer glow effects - outside only */}
        <div className="pointer-events-none absolute -inset-8 rounded-[38px] bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
        <div className="pointer-events-none absolute -inset-4 rounded-[34px] bg-gradient-to-br from-white/10 via-cyan-500/10 to-purple-500/10 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

        {/* High-Tech Frame Structure */}
        <div className="absolute inset-0 rounded-[30px] border-[3px] border-transparent bg-gradient-to-r from-cyan-400/40 via-purple-500/40 to-cyan-400/40 p-[3px]">
          <div className="h-full w-full rounded-[27px] bg-black/95" />
        </div>

        {/* Inner Tech Grid Pattern */}
        <div className="absolute inset-[4px] rounded-[26px] opacity-20 pointer-events-none" style={{
          backgroundImage: `
            linear-gradient(rgba(34,211,238,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(34,211,238,0.1) 1px, transparent 1px),
            linear-gradient(rgba(168,85,247,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(168,85,247,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px, 20px 20px, 4px 4px, 4px 4px',
          backgroundPosition: '0 0, 0 0, 0 0, 0 0'
        }} />

        {/* Corner Tech Accents - Top Left */}
        <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none z-20">
          <div className="absolute top-0 left-0 w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
          <div className="absolute top-0 left-0 h-12 w-[2px] bg-gradient-to-b from-cyan-400 to-transparent" />
          <div className="absolute top-2 left-2 w-2 h-2 bg-cyan-400/60 blur-sm" />
        </div>

        {/* Corner Tech Accents - Top Right */}
        <div className="absolute top-0 right-0 w-16 h-16 pointer-events-none z-20">
          <div className="absolute top-0 right-0 w-12 h-[2px] bg-gradient-to-l from-purple-500 to-transparent" />
          <div className="absolute top-0 right-0 h-12 w-[2px] bg-gradient-to-b from-purple-500 to-transparent" />
          <div className="absolute top-2 right-2 w-2 h-2 bg-purple-500/60 blur-sm" />
        </div>

        {/* Corner Tech Accents - Bottom Left */}
        <div className="absolute bottom-0 left-0 w-16 h-16 pointer-events-none z-20">
          <div className="absolute bottom-0 left-0 w-12 h-[2px] bg-gradient-to-r from-cyan-400 to-transparent" />
          <div className="absolute bottom-0 left-0 h-12 w-[2px] bg-gradient-to-t from-cyan-400 to-transparent" />
          <div className="absolute bottom-2 left-2 w-2 h-2 bg-cyan-400/60 blur-sm" />
        </div>

        {/* Corner Tech Accents - Bottom Right */}
        <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none z-20">
          <div className="absolute bottom-0 right-0 w-12 h-[2px] bg-gradient-to-l from-purple-500 to-transparent" />
          <div className="absolute bottom-0 right-0 h-12 w-[2px] bg-gradient-to-t from-purple-500 to-transparent" />
          <div className="absolute bottom-2 right-2 w-2 h-2 bg-purple-500/60 blur-sm" />
        </div>

        {/* Side Tech Lines - Vertical */}
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[2px] h-24 bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent pointer-events-none z-20" />
        <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[2px] h-24 bg-gradient-to-b from-transparent via-purple-500/40 to-transparent pointer-events-none z-20" />

        {/* Side Tech Lines - Horizontal */}
        <div className="absolute left-1/2 top-0 -translate-x-1/2 h-[2px] w-24 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent pointer-events-none z-20" />
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 h-[2px] w-24 bg-gradient-to-r from-transparent via-purple-500/40 to-transparent pointer-events-none z-20" />

        {/* Video container - full width, no padding */}
        <div className="relative h-full w-full overflow-hidden rounded-[26px] m-[4px] z-10">
          <video
            ref={videoRef}
            src={videoSrc}
            autoPlay
            loop
            muted={isMuted}
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
            style={{
              transform: 'translateZ(0)',
              willChange: 'transform'
            }}
          />

          {/* Subtle gradient overlay - minimal */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/20" />

          {/* Tech Scan Line Effect */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.03] bg-[linear-gradient(transparent_50%,rgba(34,211,238,0.03)_50%)] bg-[length:100%_4px]" />

          {/* Mute/Unmute button - Enhanced */}
          <button
            onClick={toggleMute}
            className="absolute bottom-6 right-6 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-black/80 backdrop-blur-xl border-2 border-cyan-400/40 transition-all duration-500 hover:bg-black/90 hover:border-cyan-400/60 hover:scale-110 hover:shadow-[0_0_40px_rgba(34,211,238,0.8),0_0_80px_rgba(34,211,238,0.4)]"
            aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-purple-500/20 opacity-0 hover:opacity-100 transition-opacity duration-500" />
            {isMuted ? (
              <VolumeX className="h-6 w-6 text-white relative z-10 transition-all duration-300" />
            ) : (
              <Volume2 className="h-6 w-6 text-white relative z-10 transition-all duration-300" />
            )}
          </button>
        </div>

        {/* Inner Tech Border Rings */}
        <div className="absolute inset-[6px] rounded-[24px] border border-cyan-400/20 pointer-events-none opacity-60 z-20" />
        <div className="absolute inset-[8px] rounded-[22px] border border-purple-500/15 pointer-events-none opacity-40 z-20" />
        <div className="absolute inset-[10px] rounded-[20px] border border-cyan-400/10 pointer-events-none opacity-30 z-20" />

        {/* Holographic Overlay Effect */}
        <div className="pointer-events-none absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10" style={{
          background: 'linear-gradient(135deg, rgba(34,211,238,0.05) 0%, transparent 25%, transparent 75%, rgba(168,85,247,0.05) 100%)'
        }} />
      </motion.div>
    </div>
  )
}

export function HeroSection() {
  const { t, language } = useTranslation()
  const [activeIndex, setActiveIndex] = useState(0)
  const [previousIndex, setPreviousIndex] = useState<number | null>(null)
  const [isAnimating, setIsAnimating] = useState(false)
  const [isMuted, setIsMuted] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)

  const headlineVariants = useMemo(() => {
    // Split headline1 for better spacing
    const headline1Parts = t("hero.headline1").split(" ")
    const headline1EndParts = t("hero.headline1End").split(" ")
    const isEnglish = language === 'en'

    return [
      (
        <>
          {isEnglish ? (
            // English: "the aura of" / "ambitious" / "brands on every" / "continent."
            <>
              <span className="block leading-tight">{headline1Parts.join(" ")}</span>
              <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">
                <span className="hero-highlight">{t("hero.headline1Highlight")}</span>
              </span>
              <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3">{headline1EndParts[0]} {headline1EndParts[1]}</span>
              <span className="block leading-tight -mt-2 sm:-mt-2 md:-mt-3 mb-0">{headline1EndParts.slice(2).join(" ")}</span>
            </>
          ) : (
            // French (forced lines): "l'aura des" / "marques" / "ambitieuses" / "sur chaque" / "continent."
            <>
              <span className="block leading-tight">{headline1Parts.slice(0, 2).join(" ")}</span>
              <span className="block leading-tight -mt-1 sm:mt-0">{headline1Parts.slice(2).join(" ")}</span>
              <span className="block leading-tight -mt-1 sm:mt-0">
                <span className="hero-highlight">{t("hero.headline1Highlight")}</span>
              </span>
              <span className="block leading-tight -mt-1 sm:mt-0">
                {headline1EndParts.slice(0, 2).join(" ")}
              </span>
              <span className="block leading-tight -mt-1 sm:mt-0 mb-0">
                {headline1EndParts.slice(2).join(" ")}
              </span>
            </>
          )}
        </>
      ),
      (
        <>
          {(() => {
            const isEnglish = language === 'en'

            if (isEnglish) {
              // English: "Bold Ideas" / "That Make" / "Radiate" / "Every" / "Brand."
              const line1Words = t("hero.headline2Line1").split(" ")
              const line2Words = t("hero.headline2Line2").split(" ")
              return (
                <>
                  <span className="block leading-tight">{line1Words[0]} {line1Words[1]}</span>
                  <span className="block leading-tight -mt-2 sm:-mt-1 md:-mt-1">{line1Words[2]} {line2Words[0]}</span>
                  <span className="block leading-tight -mt-2 sm:-mt-1 md:-mt-1">
                    <span className="hero-highlight">{line2Words[1]}</span>
                  </span>
                  <span className="block leading-tight -mt-2 sm:-mt-1 md:-mt-1">{line2Words[2]}</span>
                  <span className="block leading-tight -mt-2 sm:-mt-1 md:-mt-1 mb-0">{t("hero.headline2Line3")}</span>
                </>
              )
            } else {
              // French (forced lines): "des idées" / "audacieuses" / "qui" / "font rayonner" / "chaque marque."
              const line1Words = t("hero.headline2Line1").split(" ")
              const line2Words = t("hero.headline2Line2").split(" ")
              const line1 = line1Words.slice(0, 2).join(" ")
              const line2 = line1Words[2] ?? ""
              const line3 = line1Words[3] ?? "" // "qui"
              const line4Prefix = line2Words[0] ?? "" // "font"
              const line4Highlight = line2Words[1] ?? "" // "rayonner"
              // Use non‑breaking spaces so the browser doesn't split the 3rd and 4th lines into extra lines
              const line4 = `${line2Words[2] ?? ""}\u00A0${t("hero.headline2Line3")}`.trim() // "chaque marque."

              return (
                <>
                  <span className="block leading-tight">{line1}</span>
                  <span className="block leading-tight -mt-1 sm:mt-0">{line2}</span>
                  <span className="block leading-tight -mt-1 sm:mt-0">{line3}</span>
                  <span className="block leading-tight -mt-1 sm:mt-0 whitespace-normal md:whitespace-nowrap">
                    {line4Prefix}
                    {"\u00A0"}
                    <span className="hero-highlight">{line4Highlight}</span>
                  </span>
                  <span className="block leading-tight -mt-1 sm:mt-0 whitespace-normal md:whitespace-nowrap mb-0">
                    {line4}
                  </span>
                </>
              )
            }
          })()}
        </>
      ),
      (
        <>
          {(() => {
            const headline3Parts = t("hero.headline3").split(" ")
            const highlightParts = t("hero.headline3Highlight").split(" ")
            const endParts = t("hero.headline3End").split(" ")

            // French: "des activations créatives" / "haute performance" / "pour amplifier l'impact."
            // English: "high-performance" / "creative activations" / "to amplify impact."
            if (t("hero.headline3").includes("activations")) {
              // French version
              return (
                <>
                  <span className="block leading-tight">{headline3Parts.slice(0, 2).join(" ")}</span>
                  <span className="block leading-tight -mt-1 sm:mt-0">{headline3Parts[2]} {highlightParts[0]}</span>
                  <span className="block leading-tight -mt-1 sm:mt-0">
                    <span className="hero-highlight">{highlightParts[1]}</span>
                  </span>
                  <span className="block leading-tight -mt-1 sm:mt-0">{endParts.slice(0, 2).join(" ")}</span>
                  <span className="block leading-tight -mt-1 sm:mt-0 mb-0">
                    {endParts.slice(2).join(" ")}
                  </span>
                </>
              )
            } else {
              // English version: "Activations" / "Creative" / "To" / "Amplify" / "Impact."
              const creativeParts = highlightParts[1].split(" ")
              const endPartsWords = endParts.join(" ").split(" ")
              return (
                <>
                  <span className="block leading-tight">
                    <span className="hero-highlight">{creativeParts[1]}</span>
                  </span>
                  <span className="block leading-tight -mt-3 sm:-mt-2 md:-mt-2">
                    <span className="hero-highlight">{creativeParts[0]}</span>
                  </span>
                  <span className="block leading-tight -mt-3 sm:-mt-2 md:-mt-2">{endPartsWords[0]}</span>
                  <span className="block leading-tight -mt-3 sm:-mt-2 md:-mt-2">
                    {endPartsWords[1]}
                  </span>
                  <span className="block leading-tight -mt-3 sm:-mt-2 md:-mt-2" style={{ marginBottom: '-3.5rem' }}>
                    {endPartsWords[2]}
                  </span>
                </>
              )
            }
          })()}
        </>
      ),
    ]
  }, [t, language])

  const longestHeadlineIndex = useMemo(() => {
    let longest = 0
    let length = 0
    headlineVariants.forEach((variant, index) => {
      const currentLength = getNodeText(variant).length
      if (currentLength > length) {
        length = currentLength
        longest = index
      }
    })
    return longest
  }, [headlineVariants])

  const placeholderRef = useRef<HTMLDivElement>(null)
  const [placeholderHeight, setPlaceholderHeight] = useState<number>()

  useEffect(() => {
    const intervalId = setInterval(() => {
      setIsAnimating(true)
      setActiveIndex((current) => {
        setPreviousIndex(current)
        return (current + 1) % headlineVariants.length
      })
    }, DISPLAY_DURATION)

    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (!isAnimating) return
    const timeoutId = setTimeout(() => {
      setPreviousIndex(null)
      setIsAnimating(false)
    }, ANIMATION_DURATION)
    return () => clearTimeout(timeoutId)
  }, [isAnimating])

  useEffect(() => {
    const measure = () => {
      if (placeholderRef.current) {
        const { height } = placeholderRef.current.getBoundingClientRect()
        setPlaceholderHeight(height)
      }
    }

    measure()
    window.addEventListener("resize", measure)
    return () => {
      window.removeEventListener("resize", measure)
    }
  }, [])

  // Handle video mute/unmute
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted
    }
  }, [isMuted])

  const toggleMute = () => {
    setIsMuted(prev => !prev)
  }

  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden">

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 pt-32 pb-20 sm:px-6 sm:pt-36 sm:pb-24 md:px-12 lg:gap-16 lg:pb-8 xl:max-w-7xl xl:pb-6">
        <div className="grid gap-14 text-white lg:grid-cols-[minmax(0,1.05fr)_minmax(280px,0.95fr)] lg:gap-10 xl:gap-14">
          <div className="flex flex-col gap-12 relative z-10">
            <div>
              <Reveal delay={100}>
                <div className="relative max-w-4xl z-20">
                  <span className="absolute -left-4 top-2 h-10 w-10 rounded-full bg-[radial-gradient(circle,_rgba(87,140,255,0.35),_rgba(0,0,0,0)_70%)] blur-xl z-0 sm:-left-6 sm:h-14 sm:w-14" />
                  <div className="flex flex-col gap-2 md:gap-3">
                    <span className="text-base font-semibold uppercase tracking-[0.4em] text-white/70 sm:text-lg md:text-xl">
                      {t("hero.reveal")}
                    </span>
                    <div
                      className="hero-headline-container text-[28px] font-black leading-[1.1] tracking-tight text-white sm:text-[36px] sm:leading-[1.08] md:text-[56px] md:leading-[1.05] lg:text-[72px] lg:leading-[1.04] pb-0"
                      aria-live="polite"
                      style={{
                        minHeight: placeholderHeight ? `${placeholderHeight}px` : 'auto',
                        marginBottom: (activeIndex === 2 && language === 'en') ? '0.5rem' : '2rem',
                        paddingBottom: 0
                      }}
                    >
                      <div ref={placeholderRef} className="hero-headline hero-headline--ghost">
                        {headlineVariants[longestHeadlineIndex]}
                      </div>
                      <span
                        key={activeIndex}
                        className={`hero-headline ${isAnimating ? "hero-headline--enter" : ""}`}
                      >
                        {headlineVariants[activeIndex]}
                      </span>
                      {previousIndex !== null && (
                        <span className="hero-headline hero-headline--exit">{headlineVariants[previousIndex]}</span>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>

              <Reveal delay={240}>
                <p className="max-w-2xl text-sm text-white/80 sm:text-base md:text-lg lg:text-xl relative z-10 leading-relaxed text-justify text-justify-smooth mt-0">
                  {t("hero.subheadline")}
                </p>
              </Reveal>
            </div>

            <Reveal delay={360}>
              <div className="flex flex-col gap-6 lg:gap-8">
                <div className="flex flex-col gap-4 justify-center sm:justify-start sm:flex-row sm:items-center sm:gap-4">
                  <Link
                    href="/#contact"
                    className="group inline-flex items-center justify-center gap-3 rounded-full border border-white/25 px-9 py-4 text-sm font-semibold uppercase tracking-[0.32em] text-white transition-all duration-500 hover:border-white hover:bg-white/10"
                  >
                    {t("hero.contactUs")}
                    <Play className="h-4 w-4 transition-transform duration-500 group-hover:scale-110" />
                  </Link>
                </div>

                <div className="lg:hidden">
                  <Reveal
                    delay={140}
                    className="group relative isolate flex w-full flex-col overflow-hidden rounded-[28px] border-2 border-white/20 bg-black/40 backdrop-blur-2xl transition-all duration-700 hover:-translate-y-2 hover:border-white/40 hover:bg-black/50 hover:shadow-[0_45px_140px_rgba(0,0,0,0.7),0_0_80px_rgba(34,211,238,0.3)]"
                  >
                    {/* Multi-layer glow effects - outside only */}
                    <div className="pointer-events-none absolute -inset-6 rounded-[36px] bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 blur-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    <div className="pointer-events-none absolute -inset-3 rounded-[32px] bg-gradient-to-br from-white/10 via-cyan-500/10 to-purple-500/10 blur-2xl opacity-0 transition-opacity duration-700 group-hover:opacity-100" />
                    
                    {/* Video container - full width, no padding */}
                    <div className="relative h-[320px] w-full overflow-hidden sm:h-[380px]">
                      <video
                        ref={videoRef}
                        src={getAssetUrl("/Banque d_images/halowen.mp4", "video")}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                        style={{
                          transform: 'translateZ(0)',
                          willChange: 'transform'
                        }}
                      />
                      
                      {/* Subtle gradient overlay - minimal */}
                      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/5 to-black/20" />
                      
                      {/* Mute/Unmute button */}
                      <button
                        onClick={toggleMute}
                        className="absolute bottom-4 right-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/70 backdrop-blur-xl border-2 border-white/30 transition-all duration-500 hover:bg-black/80 hover:border-white/50 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.6)]"
                        aria-label={isMuted ? "Activer le son" : "Désactiver le son"}
                      >
                        {isMuted ? (
                          <VolumeX className="h-5 w-5 text-white transition-all duration-300" />
                        ) : (
                          <Volume2 className="h-5 w-5 text-white transition-all duration-300" />
                        )}
                      </button>
                    </div>
                    
                    {/* Border rings - outside only, don't overlap video */}
                    <div className="absolute inset-0 rounded-[28px] border-2 border-white/20 pointer-events-none" />
                    <div className="absolute inset-[2px] rounded-[26px] border border-white/10 pointer-events-none opacity-50" />
                  </Reveal>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="relative hidden w-full items-start justify-end lg:flex lg:mt-32 xl:mt-40">
            <div className="flex w-full max-w-[85%] justify-end">
              <Reveal delay={180}>
                <VideoCardHolographic 
                  videoRef={videoRef}
                  videoSrc={getAssetUrl("/Banque d_images/halowen.mp4", "video")}
                  isMuted={isMuted}
                  toggleMute={toggleMute}
                />
              </Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
