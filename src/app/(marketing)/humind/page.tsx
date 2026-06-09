"use client"

import { useState, useMemo, useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Play, ArrowRight, Sparkles, Heart, Zap, Users, Globe, Film, Mic, BarChart3, Lightbulb, Target, Rocket } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import { getAssetUrl } from "@/lib/cloudinary"

// Structure de données pour les épisodes
interface Episode {
  id: string
  title: string
  guest: string
  category: "Sport" | "Réinsertion" | "Artisanat" | "Création" | "Luxe"
  duration: string
  date: string
  youtubeId: string
  description: string
}

// Données des épisodes - sera traduit dans le composant
const getEpisodes = (t: (key: string) => string): Episode[] => [
  {
    id: "1",
    title: t("humindPage.episode1Title"),
    guest: "Raúl Vargas Ríos",
    category: "Sport",
    duration: "43:00",
    date: t("humindPage.episodeDate2Weeks"),
    youtubeId: "EMCtYNYLwyE",
    description: t("humindPage.episode1Description")
  },
  {
    id: "2",
    title: t("humindPage.episode2Title"),
    guest: "Kamel Madani",
    category: "Réinsertion",
    duration: "24:55",
    date: t("humindPage.episodeDate4Weeks"),
    youtubeId: "sRM6w8wUk2s",
    description: t("humindPage.episode2Description")
  },
  {
    id: "3",
    title: t("humindPage.episode3Title"),
    guest: "Alex Choussy",
    category: "Artisanat",
    duration: "24:53",
    date: t("humindPage.episodeDate1Month"),
    youtubeId: "ztysZbvECf8",
    description: t("humindPage.episode3Description")
  },
  {
    id: "4",
    title: t("humindPage.episode4Title"),
    guest: "Michel Audiard",
    category: "Création",
    duration: "44:14",
    date: t("humindPage.episodeDate1Month"),
    youtubeId: "puawY9rH6T0",
    description: t("humindPage.episode4Description")
  },
  {
    id: "5",
    title: t("humindPage.episode5Title"),
    guest: t("humindPage.episodeGuestToDefine"),
    category: "Luxe",
    duration: "30:00",
    date: t("humindPage.episodeDate2Months"),
    youtubeId: "SfaIXswMO_c",
    description: t("humindPage.episode5Description")
  }
]

export default function HumindPage() {
  const { t, language } = useTranslation()
  const categories = [t("humindPage.categoryAll"), t("humindPage.categorySport"), t("humindPage.categoryReinsertion"), t("humindPage.categoryCraft"), t("humindPage.categoryCreation"), t("humindPage.categoryLuxury")] as const

  const episodes = getEpisodes(t)
  const [activeFilter, setActiveFilter] = useState<string>(t("humindPage.categoryAll"))
  const [clickedFilter, setClickedFilter] = useState<string | null>(null)
  const [showStradaleVideo, setShowStradaleVideo] = useState(false)
  const stradaleVideoRef = useRef<HTMLVideoElement | null>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const preloadVideoRef = useRef<HTMLVideoElement | null>(null)

  // Réinitialiser le filtre quand la langue change
  useEffect(() => {
    setActiveFilter(t("humindPage.categoryAll"))
  }, [language, t])

  useEffect(() => {
    // Scroll to top immediately without animation - instant navigation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  // AGGRESSIVE PRELOAD - Preload video in hidden element before main video
  useEffect(() => {
    const preloadVideo = document.createElement('video')
    preloadVideo.src = getAssetUrl('/Banque d_images/noir.mp4', 'video')
    preloadVideo.preload = 'auto'
    preloadVideo.muted = true
    preloadVideo.playsInline = true
    preloadVideo.load()
    preloadVideoRef.current = preloadVideo

    return () => {
      if (preloadVideoRef.current) {
        preloadVideoRef.current = null
      }
    }
  }, [])

  // Force video to load immediately on mount and show it right away
  useEffect(() => {
    const video = videoRef.current
    if (video) {
      // Show video IMMEDIATELY - don't wait for load
      setVideoLoaded(true)
      
      // Check if video was preloaded from navbar
      const wasPreloaded = sessionStorage.getItem('humindVideoPreloaded') === 'true'
      
      // Set video source and force immediate load
      video.src = getAssetUrl('/Banque d_images/noir.mp4', 'video')
      video.preload = 'auto'
      
      // If preloaded, video should be ready faster
      if (wasPreloaded) {
        // Video was preloaded, try to play immediately
        video.load()
        // Try to play immediately - multiple attempts
        const tryPlay = () => {
          if (video.readyState >= 1) {
            video.play().catch(() => {
              setTimeout(() => {
                video.play().catch(() => {})
              }, 10)
            })
          } else {
            setTimeout(tryPlay, 5)
          }
        }
        tryPlay()
      } else {
        // Normal load
        video.load()
        const tryPlay = () => {
          if (video.readyState >= 1) {
            video.play().catch(() => {
              setTimeout(() => {
                video.play().catch(() => {})
              }, 10)
            })
          } else {
            setTimeout(tryPlay, 10)
          }
        }
        tryPlay()
      }
    }
  }, [])

  useEffect(() => {
    if (showStradaleVideo && stradaleVideoRef.current) {
      stradaleVideoRef.current.play().catch(() => { })
    }
  }, [showStradaleVideo])

  // Filtrer les épisodes
  const filteredEpisodes = useMemo(() => {
    if (activeFilter === t("humindPage.categoryAll")) {
      return episodes
    }
    // Map translated categories back to original
    const categoryMap: Record<string, string> = {
      [t("humindPage.categorySport")]: "Sport",
      [t("humindPage.categoryReinsertion")]: "Réinsertion",
      [t("humindPage.categoryCraft")]: "Artisanat",
      [t("humindPage.categoryCreation")]: "Création",
      [t("humindPage.categoryLuxury")]: "Luxe",
    }
    const originalCategory = categoryMap[activeFilter] || activeFilter
    return episodes.filter(ep => ep.category === originalCategory)
  }, [activeFilter, t, episodes])

  // Traduire les catégories des épisodes pour l'affichage
  const translateCategory = useMemo(() => {
    const categoryTranslationMap: Record<string, string> = {
      "Sport": t("humindPage.categorySport"),
      "Réinsertion": t("humindPage.categoryReinsertion"),
      "Artisanat": t("humindPage.categoryCraft"),
      "Création": t("humindPage.categoryCreation"),
      "Luxe": t("humindPage.categoryLuxury"),
    }
    return (category: string) => categoryTranslationMap[category] || category
  }, [t])

  // Compteurs par catégorie
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {}
    counts[t("humindPage.categoryAll")] = episodes.length
    const categoryMap: Record<string, string> = {
      [t("humindPage.categorySport")]: "Sport",
      [t("humindPage.categoryReinsertion")]: "Réinsertion",
      [t("humindPage.categoryCraft")]: "Artisanat",
      [t("humindPage.categoryCreation")]: "Création",
      [t("humindPage.categoryLuxury")]: "Luxe",
    }
    categories.slice(1).forEach(cat => {
      const originalCategory = categoryMap[cat] || cat
      counts[cat] = episodes.filter(ep => ep.category === originalCategory).length
    })
    return counts
  }, [t, episodes, categories])

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <Navbar />

      {/* Video background - hidden on mobile, visible on desktop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* HIDDEN PRELOAD VIDEO - Aggressively preloads before main video */}
        <video
          ref={preloadVideoRef}
          className="hidden"
          preload="auto"
          muted
          playsInline
          src={getAssetUrl("/Banque d_images/noir.mp4", "video")}
        />
        <video
          ref={videoRef}
          key="humind-bg"
          className="hidden md:block h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          style={{
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
          onLoadedMetadata={(e) => {
            // Video metadata loaded - ensure it plays
            const video = e.currentTarget
            setVideoLoaded(true)
            if (video.readyState >= 1) {
              video.play().catch(() => {
                setTimeout(() => {
                  video.play().catch(() => { })
                }, 10)
              })
            }
          }}
          onLoadedData={() => {
            // Video data loaded
            setVideoLoaded(true)
          }}
          onCanPlay={() => {
            // Video can play
            setVideoLoaded(true)
          }}
          onProgress={(e) => {
            // Show video as soon as we have some data
            const video = e.currentTarget
            if (video.readyState >= 1) {
              setVideoLoaded(true)
            }
          }}
          onError={(e) => {
            // Retry loading on error (common on Vercel CDN)
            const video = e.currentTarget
            let retryCount = 0
            const maxRetries = 2
            const retryLoad = () => {
              if (retryCount < maxRetries) {
                retryCount++
                setTimeout(() => {
                  video.load()
                }, 1000 * retryCount)
              }
            }
            retryLoad()
          }}
          onLoadStart={() => {
            // Video loading started - show immediately
            setVideoLoaded(true)
            // Try to play immediately on load start
            const video = videoRef.current
            if (video && video.readyState >= 1) {
              video.play().catch(() => {})
            }
          }}
        >
          <source src={getAssetUrl("/Banque d_images/noir.mp4", "video")} type="video/mp4" />
        </video>
        {/* Background image - visible only on mobile */}
        <img
          src={getAssetUrl("/Banque d_images/backnoiree.png", "image")}
          alt="Background"
          className="block md:hidden h-full w-full object-cover"
          style={{
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
      </div>

      <div className="relative z-30">
        {/* Hero Section - Section 01 */}
        <section className="relative z-30 flex min-h-screen w-full items-center justify-center overflow-hidden pt-36 pb-24">
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col gap-12 px-6 md:px-12">
            <div className="grid lg:grid-cols-12 gap-16 items-start text-white">
              {/* Left Column - Ultra Premium Header */}
              <div className="lg:col-span-5 flex flex-col gap-8">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="h-px w-12 bg-gradient-to-r from-blue-400/60 to-transparent" />
                    <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Section 01</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
                    <span className="block bg-gradient-to-br from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                      {t("humindPage.heroTitle1")}
                    </span>
                    <span className="block mt-2 bg-gradient-to-br from-blue-200 via-cyan-200 to-purple-200 bg-clip-text text-transparent">
                      {t("humindPage.heroTitle2")}
                    </span>
                  </h1>
                </div>
              </div>

              {/* Right Column - Content */}
              <div className="lg:col-span-7 space-y-6 lg:pt-[104px]">
                <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
                  Humind
                </div>
                <div>
                  <p className="max-w-2xl text-base text-white/80 md:text-lg lg:text-xl leading-relaxed">
                    {t("humindPage.heroDescription1")}
                  </p>
                  <p className="max-w-2xl mt-3 text-base text-white/70 md:text-lg lg:text-xl leading-relaxed">
                    {t("humindPage.heroDescription2")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Signature Highlight - Stradale x Humind */}
        <section className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-4 md:px-12">
          <div className="grid lg:grid-cols-12 gap-10 items-stretch text-white">
            {/* Visual Card */}
            <div className="lg:col-span-7">
              <div className={`group relative h-full ${showStradaleVideo ? 'min-h-[600px] md:min-h-[700px]' : 'min-h-[320px]'} overflow-hidden rounded-[32px] border border-white/15 bg-black/40 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.6)]`}>
                {showStradaleVideo ? (
                  <>
                    {/* Full-card video */}
                    <video
                      ref={stradaleVideoRef}
                      id="stradale-video-player"
                      src={getAssetUrl("/Banque d_images/pod1.mp4", "video")}
                      controls
                      playsInline
                      className="absolute inset-0 h-full w-full object-contain"
                      poster={getAssetUrl("/Banque d_images/Copie de M7_03194.jpg", "image")}
                    />

                    {/* Back button over video - top-left, styled like white pill CTA */}
                    <div className="absolute left-5 top-5 z-10 flex items-center justify-start">
                      <button
                        type="button"
                        onClick={() => setShowStradaleVideo(false)}
                        className="group/button inline-flex items-center justify-center gap-1.5 rounded-full bg-white/90 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.28em] text-black shadow-[0_6px_18px_rgba(15,23,42,0.6)] hover:bg-white transition-colors duration-300"
                      >
                        <ArrowRight className="h-3 w-3 rotate-180" />
                        <span className="relative z-10">{t("humindPage.stradaleBackToText")}</span>
                      </button>
                    </div>
                  </>
                ) : (
                  <>
                    {/* Background image */}
                    <div className="absolute inset-0">
                      <Image
                        src={getAssetUrl("/Banque d_images/Copie de M7_03194.jpg", "image")}
                        alt="Stradale Events x Humind"
                        fill
                        priority
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tr from-black/85 via-black/40 to-transparent" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
                    </div>

                    {/* Content overlay */}
                    <div className="relative z-10 flex h-full flex-col justify-between p-8 md:p-10 gap-8">
                      <div className="flex flex-col gap-4">
                        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.5em] text-white/80 backdrop-blur-md">
                          Humind
                          <span className="h-1 w-1 rounded-full bg-white/70 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                          Stradale
                        </span>
                        <h2 className="text-2xl md:text-3xl lg:text-4xl font-black leading-tight">
                          <span className="block bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                            {t("humindPage.stradaleTitle1")}
                          </span>
                          <span className="mt-1 block text-sm md:text-base font-medium text-white/70">
                            {t("humindPage.stradaleTitle2")}
                          </span>
                        </h2>
                      </div>

                      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <p className="max-w-xl text-sm md:text-base text-white/75 leading-relaxed">
                          {t("humindPage.stradaleDescription")}
                        </p>

                        <button
                          type="button"
                          onClick={() => setShowStradaleVideo(true)}
                          className="group/button inline-flex items-center justify-center gap-2 rounded-full bg-white/90 px-6 py-3 text-[11px] font-bold uppercase tracking-[0.32em] text-black shadow-[0_10px_30px_rgba(15,23,42,0.7)] hover:bg-white transition-colors duration-300"
                        >
                          <span className="relative z-10">{t("humindPage.stradaleCta")}</span>
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/button:translate-x-1" />
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Concept Column */}
            <div className="lg:col-span-5 flex flex-col gap-6 lg:pl-4">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="h-px w-10 bg-gradient-to-r from-blue-400/70 to-transparent" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.6em] text-white/30">
                    Humind × Stradale
                  </span>
                </div>
                <p className="text-sm md:text-base text-white/70 leading-relaxed">
                  {t("humindPage.stradaleIntro")}
                </p>
              </div>

              <div className="grid gap-4 md:gap-5">
                <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:bg-white/10">
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(59,130,246,0.9)]" />
                    <span>{t("humindPage.stradalePillar1Title")}</span>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {t("humindPage.stradalePillar1Desc")}
                  </p>
                </div>

                <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:bg-white/10">
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.9)]" />
                    <span>{t("humindPage.stradalePillar2Title")}</span>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {t("humindPage.stradalePillar2Desc")}
                  </p>
                </div>

                <div className="group relative rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl transition-all duration-500 hover:border-white/25 hover:bg-white/10">
                  <div className="mb-2 flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.4em] text-white/45">
                    <span className="h-1.5 w-1.5 rounded-full bg-indigo-400 shadow-[0_0_10px_rgba(129,140,248,0.9)]" />
                    <span>{t("humindPage.stradalePillar3Title")}</span>
                  </div>
                  <p className="text-sm text-white/75 leading-relaxed">
                    {t("humindPage.stradalePillar3Desc")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Episodes Section - Section 02 */}
        <section className="relative mx-auto w-full max-w-7xl px-6 pb-24 pt-12 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start text-white mb-12">
            {/* Left Column - Ultra Premium Header */}
            <div className="lg:col-span-5 flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-purple-400/60 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Section 02</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight">
                  <span className="block bg-gradient-to-br from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    {t("humindPage.episodesTitle1")}
                  </span>
                  <span className="block mt-2 bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200 bg-clip-text text-transparent">
                    {t("humindPage.episodesTitle2")}
                  </span>
                </h2>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 text-white">

            {/* World-Class Premium Filters */}
            <div>
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide pb-6">
                {categories.map((category) => {
                  const isActive = activeFilter === category
                  const count = categoryCounts[category] || 0

                  return (
                    <button
                      key={category}
                      onClick={() => {
                        setClickedFilter(category)
                        setActiveFilter(category)
                        setTimeout(() => setClickedFilter(null), 300)
                      }}
                      className="group relative flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-300 flex-shrink-0"
                    >
                      {/* Main button - clean and minimal */}
                      <div className={`relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 ${isActive
                        ? "border-white/20 bg-white/10 text-white backdrop-blur-sm"
                        : "border-white/8 bg-white/5 text-white/60 hover:border-white/15 hover:bg-white/8 hover:text-white/90"
                        }`}>
                        <span className="relative z-10 font-medium">{category}</span>

                        {/* Minimal badge */}
                        {count > 0 && (
                          <span className={`relative z-10 text-[10px] px-2 py-0.5 rounded-full font-semibold transition-all duration-300 ${isActive
                            ? "bg-white/15 text-white"
                            : "bg-white/8 text-white/50 group-hover:bg-white/12 group-hover:text-white/70"
                            }`}>
                            {count}
                          </span>
                        )}
                      </div>

                      {/* Subtle click feedback */}
                      {clickedFilter === category && (
                        <div className="absolute inset-0 rounded-full bg-white/10 pointer-events-none"
                          style={{
                            animation: 'filterRipple 0.3s ease-out',
                          }} />
                      )}
                    </button>
                  )
                })}
              </div>

              {/* Minimal counter */}
              <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.3em] text-white/40 mt-4">
                <span>{String(filteredEpisodes.length).padStart(2, "0")}</span>
                <div className="h-px flex-1 bg-white/10" />
                <span>{filteredEpisodes.length > 1 ? t("humindPage.episodesFoundPlural") : t("humindPage.episodesFound")}</span>
              </div>
            </div>

            {/* Episodes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mt-8">
              {filteredEpisodes.map((episode) => (
                <a
                  key={episode.id}
                  href={`https://www.youtube.com/watch?v=${episode.youtubeId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative isolate flex flex-col overflow-hidden rounded-[24px] border border-white/15 bg-white/5 pb-5 text-white backdrop-blur-xl transition duration-700 hover:-translate-y-2 hover:border-white/30 hover:bg-white/10"
                >
                  <div className="relative h-[280px] w-full overflow-hidden rounded-t-[24px]">
                    {/* YouTube Thumbnail - Premium Styling with Better Positioning */}
                    <img
                      src={`https://img.youtube.com/vi/${episode.youtubeId}/maxresdefault.jpg`}
                      alt={episode.title}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      style={{
                        objectPosition: 'center center',
                        width: '100%',
                        height: '100%',
                      }}
                      onError={(e) => {
                        // Fallback si l'image ne charge pas
                        const target = e.target as HTMLImageElement
                        target.src = `https://img.youtube.com/vi/${episode.youtubeId}/hqdefault.jpg`
                      }}
                    />
                    {/* Play button overlay - Premium */}
                    <div className="absolute inset-0 flex items-center justify-center transition-all duration-700">
                      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/40 bg-black/50 text-white backdrop-blur-xl transition-all duration-700 group-hover:border-white/80 group-hover:bg-white/25 group-hover:scale-110 shadow-[0_0_30px_rgba(0,0,0,0.5)] group-hover:shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                        <Play className="h-7 w-7 fill-current ml-1" />
                      </div>
                    </div>
                    {/* Subtle border glow on hover */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-all duration-700 rounded-t-[24px]" />
                  </div>

                  <div className="flex flex-1 flex-col justify-between px-6 pt-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70">
                        <span>{translateCategory(episode.category)}</span>
                        <span className="h-px w-4 bg-white/20" />
                        <span>{episode.duration}</span>
                      </div>
                      <h3 className="text-lg font-semibold leading-snug text-white">{episode.title}</h3>
                      <p className="text-sm text-white/60">{episode.guest}</p>
                      <p className="text-xs text-white/50 uppercase tracking-[0.28em]">{episode.date}</p>
                    </div>
                    <div className="mt-6 flex items-center gap-4 text-[10px] uppercase tracking-[0.28em] text-white/50">
                      <span className="h-px flex-1 bg-white/20" />
                      <span className="inline-flex items-center gap-2 text-white transition hover:text-white/70">
                        {t("humindPage.watchOnYouTube")}
                        <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* Ultra Premium Separator */}
        <div className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400/80 via-purple-500/80 via-cyan-400/80 to-transparent rounded-full blur-md" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 bg-white/60 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Section 4 - Nos valeurs fondamentales - Ultra Premium */}
        <section className="relative z-30 mx-auto w-full max-w-7xl px-6 pb-32 pt-12 md:px-12 overflow-visible">
          <div className="grid lg:grid-cols-12 gap-16 items-start text-white relative z-30">
            {/* Left Column - Ultra Premium Header */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-blue-400/60 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Section 03</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight">
                  <span className="block bg-gradient-to-br from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    {t("humindPage.conceptTitle1")}
                  </span>
                  <span className="block mt-2 bg-gradient-to-br from-blue-200 via-purple-200 to-cyan-200 bg-clip-text text-transparent">
                    {t("humindPage.conceptTitle2")}
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Column - Ultra Premium Content */}
            <div className="lg:col-span-8 space-y-10">
              <p className="text-xl text-white/70 max-w-3xl leading-[1.8] font-light whitespace-pre-line">
                {t("humindPage.conceptDescription")}
              </p>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Card 1 - Ultra Premium */}
                <div className="group relative">
                  {/* Multi-layer glow effects */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent rounded-[32px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000" />

                  {/* Main card with 3D effect */}
                  <div className="relative h-full rounded-[32px] border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-3xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:border-white/25 group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-[1.02] group-hover:-translate-y-1">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ transform: 'skewX(-20deg)' }} />
                    </div>

                    <div className="relative z-10">
                      {/* Premium icon */}
                      <div className="mb-8">
                        <div className="relative inline-block">
                          <div className="absolute -inset-3 bg-gradient-to-br from-blue-400/40 via-cyan-400/40 to-blue-400/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-blue-500/30 backdrop-blur-xl border border-blue-400/30 shadow-[0_8px_24px_rgba(59,130,246,0.4)] group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.6)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                            <Film className="w-7 h-7 text-white relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] group-hover:scale-110 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-[11px] uppercase tracking-[0.5em] text-white/40 font-bold mb-3">{t("humindPage.shortFormat")}</p>
                        <p className="text-4xl font-black text-white mb-3 leading-none">
                          <span className="bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">{t("humindPage.shortFormatDuration")}</span>
                          <span className="text-white/60 text-2xl ml-2">min</span>
                        </p>
                      </div>
                      <p className="text-base text-white/60 leading-relaxed font-light">{t("humindPage.shortFormatDesc")}</p>
                    </div>
                  </div>
                </div>

                {/* Card 2 - Ultra Premium */}
                <div className="group relative">
                  {/* Multi-layer glow effects */}
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent rounded-[32px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000" />

                  {/* Main card with 3D effect */}
                  <div className="relative h-full rounded-[32px] border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-3xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:border-white/25 group-hover:shadow-[0_20px_60px_rgba(168,85,247,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-[1.02] group-hover:-translate-y-1">
                    {/* Animated gradient overlay */}
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

                    {/* Shine effect */}
                    <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ transform: 'skewX(-20deg)' }} />
                    </div>

                    <div className="relative z-10">
                      {/* Premium icon */}
                      <div className="mb-8">
                        <div className="relative inline-block">
                          <div className="absolute -inset-3 bg-gradient-to-br from-purple-400/40 via-pink-400/40 to-purple-400/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-purple-500/30 backdrop-blur-xl border border-purple-400/30 shadow-[0_8px_24px_rgba(168,85,247,0.4)] group-hover:shadow-[0_12px_40px_rgba(168,85,247,0.6)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                            <Mic className="w-7 h-7 text-white relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>

                      <div className="mb-6">
                        <p className="text-[11px] uppercase tracking-[0.5em] text-white/40 font-bold mb-3">{t("humindPage.longFormat")}</p>
                        <p className="text-4xl font-black text-white mb-3 leading-none">
                          <span className="bg-gradient-to-r from-white via-purple-100 to-white bg-clip-text text-transparent">{t("humindPage.longFormatDuration")}</span>
                          <span className="text-white/60 text-2xl ml-2">min</span>
                        </p>
                      </div>
                      <p className="text-base text-white/60 leading-relaxed font-light">{t("humindPage.longFormatDesc")}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ultra Premium Separator */}
        <div className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-32 h-1 bg-gradient-to-r from-transparent via-purple-400/80 via-pink-500/80 via-rose-400/80 to-transparent rounded-full blur-md" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 bg-white/60 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Section 2 - Nos valeurs fondamentales - Ultra Premium */}
        <section className="relative z-50 mx-auto w-full max-w-7xl px-6 pb-32 pt-12 md:px-12 overflow-visible">
          <div className="grid lg:grid-cols-12 gap-16 items-start text-white relative z-50">
            {/* Left Column - Ultra Premium Header */}
            <div className="lg:col-span-5 flex flex-col gap-8 relative z-[60] overflow-visible pr-8">
              <div className="space-y-4 relative z-[60] overflow-visible w-full">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-purple-400/60 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Section 04</span>
                </div>
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black leading-[1.05] tracking-tight relative z-[60] min-h-[120px] md:min-h-[140px] lg:min-h-[160px] overflow-visible w-full">
                  <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] relative z-[60] whitespace-normal break-words">
                    {t("humindPage.valuesTitle1")}
                  </span>
                  {t("humindPage.valuesTitle2") && (
                    <span className="inline-block mt-2 bg-gradient-to-br from-purple-200 via-pink-200 to-rose-200 bg-clip-text text-transparent relative z-[60] whitespace-nowrap overflow-visible pr-8" style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', position: 'relative', display: 'inline-block', width: 'fit-content', maxWidth: '100%' }}>
                      {t("humindPage.valuesTitle2")}
                    </span>
                  )}
                </h2>
              </div>
            </div>

            {/* Right Column - Ultra Premium Content */}
            <div className="lg:col-span-7 space-y-10 relative z-30 lg:pt-[104px]">
              <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-6">
                {[
                  // Ligne du haut : Authenticité, Inspiration
                  { icon: Heart, title: t("humindPage.authenticity"), desc: t("humindPage.authenticityDesc"), gradient: "from-red-500/40 via-pink-500/40 to-rose-500/40", iconGlow: "rgba(239,68,68,0.6)" },
                  { icon: Zap, title: t("humindPage.inspiration"), desc: t("humindPage.inspirationDesc"), gradient: "from-yellow-500/40 via-orange-500/40 to-amber-500/40", iconGlow: "rgba(234,179,8,0.6)" },
                  // Ligne du bas : Diversité, Accessibilité
                  { icon: Sparkles, title: t("humindPage.diversity"), desc: t("humindPage.diversityDesc"), gradient: "from-purple-500/40 via-violet-500/40 to-fuchsia-500/40", iconGlow: "rgba(168,85,247,0.6)" },
                  { icon: Globe, title: t("humindPage.accessibility"), desc: t("humindPage.accessibilityDesc"), gradient: "from-green-500/40 via-emerald-500/40 to-teal-500/40", iconGlow: "rgba(34,197,94,0.6)" },
                ].map((value, idx) => {
                  const Icon = value.icon
                  return (
                    <div key={idx} className="group relative z-30 h-full flex flex-col">
                      {/* Multi-layer glow */}
                      <div className={`absolute -inset-0.5 bg-gradient-to-br ${value.gradient} rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                      <div className={`absolute -inset-1 bg-gradient-to-br ${value.gradient} rounded-[28px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000`} />

                      {/* Main card */}
                      <div className="relative flex flex-col h-full rounded-[28px] border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:border-white/25 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-[1.03] group-hover:-translate-y-1 z-30 overflow-visible">
                        <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${value.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

                        {/* Shine */}
                        <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ transform: 'skewX(-20deg)' }} />
                        </div>

                        <div className="relative z-30 flex flex-col flex-1 overflow-visible">
                          {/* Premium icon */}
                          <div className="mb-6">
                            <div className="relative inline-block">
                              <div className={`absolute -inset-3 bg-gradient-to-br ${value.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                              <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${value.gradient} backdrop-blur-xl border border-white/20 shadow-[0_8px_24px_${value.iconGlow}] group-hover:shadow-[0_12px_40px_${value.iconGlow}] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3`}>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                                <Icon className="w-6 h-6 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-transform duration-700" />
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-black text-white mb-2 leading-tight break-words overflow-visible whitespace-normal">{value.title}</h3>
                          <p className="text-sm text-white/60 leading-relaxed font-light break-words overflow-visible whitespace-normal flex-1">{value.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ultra Premium Separator */}
        <div className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-32 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 via-blue-500/80 via-indigo-400/80 to-transparent rounded-full blur-md" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 bg-white/60 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Section 3 - Notre approche éditoriale - Ultra Premium */}
        <section className="relative mx-auto w-full max-w-7xl px-6 pb-32 pt-12 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start text-white">
            {/* Left Column - Ultra Premium Header */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-cyan-400/60 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Section 05</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight">
                  <span className="block bg-gradient-to-br from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    {t("humindPage.editorialTitle1")}
                  </span>
                  <span className="block mt-2 bg-gradient-to-br from-cyan-200 via-blue-200 to-indigo-200 bg-clip-text text-transparent">
                    {t("humindPage.editorialTitle2")}
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Column - Ultra Premium Content */}
            <div className="lg:col-span-8 space-y-10">
              <div className="grid md:grid-cols-2 gap-8">
                {/* Card 1 */}
                <div className="group relative h-full flex flex-col">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-blue-500/20 via-cyan-500/20 to-blue-500/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -inset-1 bg-gradient-to-br from-blue-500/10 via-cyan-500/10 to-transparent rounded-[32px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000" />
                  <div className="relative flex flex-col h-full rounded-[32px] border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-3xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:border-white/25 group-hover:shadow-[0_20px_60px_rgba(59,130,246,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-[1.02] group-hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/5 via-transparent to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ transform: 'skewX(-20deg)' }} />
                    </div>
                    <div className="relative z-10 flex flex-col flex-1">
                      <div className="mb-8">
                        <div className="relative inline-block">
                          <div className="absolute -inset-3 bg-gradient-to-br from-blue-400/40 via-cyan-400/40 to-blue-400/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-blue-500/30 via-cyan-500/20 to-blue-500/30 backdrop-blur-xl border border-blue-400/30 shadow-[0_8px_24px_rgba(59,130,246,0.4)] group-hover:shadow-[0_12px_40px_rgba(59,130,246,0.6)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                            <Film className="w-7 h-7 text-white relative z-10 drop-shadow-[0_0_15px_rgba(59,130,246,0.8)] group-hover:scale-110 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-6">{t("humindPage.formatTitle")}</h3>
                      <ul className="space-y-4 text-base text-white/70 leading-relaxed font-light flex-1">
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                          <span>{t("humindPage.formatPoint1")}</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                          <span>{t("humindPage.formatPoint2")}</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0 shadow-[0_0_12px_rgba(59,130,246,0.6)]" />
                          <span>{t("humindPage.formatPoint3")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="group relative h-full flex flex-col">
                  <div className="absolute -inset-0.5 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  <div className="absolute -inset-1 bg-gradient-to-br from-purple-500/10 via-pink-500/10 to-transparent rounded-[32px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000" />
                  <div className="relative flex flex-col h-full rounded-[32px] border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-3xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:border-white/25 group-hover:shadow-[0_20px_60px_rgba(168,85,247,0.4),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-[1.02] group-hover:-translate-y-1">
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ transform: 'skewX(-20deg)' }} />
                    </div>
                    <div className="relative z-10 flex flex-col flex-1">
                      <div className="mb-8">
                        <div className="relative inline-block">
                          <div className="absolute -inset-3 bg-gradient-to-br from-purple-400/40 via-pink-400/40 to-purple-400/40 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                          <div className="relative p-5 rounded-2xl bg-gradient-to-br from-purple-500/30 via-pink-500/20 to-purple-500/30 backdrop-blur-xl border border-purple-400/30 shadow-[0_8px_24px_rgba(168,85,247,0.4)] group-hover:shadow-[0_12px_40px_rgba(168,85,247,0.6)] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3">
                            <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                            <Mic className="w-7 h-7 text-white relative z-10 drop-shadow-[0_0_15px_rgba(168,85,247,0.8)] group-hover:scale-110 transition-transform duration-700" />
                          </div>
                        </div>
                      </div>
                      <h3 className="text-2xl font-black text-white mb-6">{t("humindPage.toneTitle")}</h3>
                      <ul className="space-y-4 text-base text-white/70 leading-relaxed font-light flex-1">
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                          <span>{t("humindPage.tonePoint1")}</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                          <span>{t("humindPage.tonePoint2")}</span>
                        </li>
                        <li className="flex items-start gap-4">
                          <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0 shadow-[0_0_12px_rgba(168,85,247,0.6)]" />
                          <span>{t("humindPage.tonePoint3")}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Ultra Premium Separator */}
        <div className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-32 h-1 bg-gradient-to-r from-transparent via-blue-400/80 via-indigo-500/80 via-purple-400/80 to-transparent rounded-full blur-md" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 bg-white/60 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Section 4 - Un projet signé Pixaura - Ultra Premium */}
        <section className="relative mx-auto w-full max-w-7xl px-6 pb-32 pt-12 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start text-white">
            {/* Left Column - Ultra Premium Header */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-blue-400/60 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Section 06</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight">
                  <span className="block bg-gradient-to-br from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    {t("humindPage.pixauraTitle1")}
                  </span>
                  <span className="block mt-2 bg-gradient-to-br from-blue-200 via-indigo-200 to-purple-200 bg-clip-text text-transparent">
                    {t("humindPage.pixauraTitle2")}
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Column - Ultra Premium Content */}
            <div className="lg:col-span-8 space-y-10">
              <p className="text-xl text-white/70 max-w-3xl leading-[1.8] font-light">
                {t("humindPage.pixauraDescription")}
              </p>

              {/* Important Notice */}
              <div className="relative rounded-[24px] border border-white/20 bg-white/5 backdrop-blur-xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
                <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-50" />
                <p className="relative text-base text-white/80 max-w-3xl leading-[1.8] font-light whitespace-pre-line">
                  {t("humindPage.pixauraImportant")}
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Film, title: t("humindPage.narrationTitle"), desc: t("humindPage.narrationDesc"), gradient: "from-blue-500/40 via-cyan-500/40 to-sky-500/40", iconGlow: "rgba(59,130,246,0.6)" },
                  { icon: Sparkles, title: t("humindPage.aestheticTitle"), desc: t("humindPage.aestheticDesc"), gradient: "from-purple-500/40 via-pink-500/40 to-fuchsia-500/40", iconGlow: "rgba(168,85,247,0.6)" },
                  { icon: BarChart3, title: t("humindPage.formatsTitle"), desc: t("humindPage.formatsDesc"), gradient: "from-green-500/40 via-emerald-500/40 to-teal-500/40", iconGlow: "rgba(34,197,94,0.6)" },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="group relative h-full flex flex-col">
                      <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                      <div className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} rounded-[28px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000`} />
                      <div className="relative flex flex-col h-full rounded-[28px] border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:border-white/25 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-[1.03] group-hover:-translate-y-1">
                        <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                        <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ transform: 'skewX(-20deg)' }} />
                        </div>
                        <div className="relative z-10 flex flex-col flex-1">
                          <div className="mb-6">
                            <div className="relative inline-block">
                              <div className={`absolute -inset-3 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                              <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-xl border border-white/20 shadow-[0_8px_24px_${item.iconGlow}] group-hover:shadow-[0_12px_40px_${item.iconGlow}] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3`}>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                                <Icon className="w-6 h-6 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-transform duration-700" />
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-black text-white mb-2 leading-tight">{item.title}</h3>
                          <p className="text-sm text-white/60 leading-relaxed font-light flex-1">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ultra Premium Separator */}
        <div className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-32 h-1 bg-gradient-to-r from-transparent via-indigo-400/80 via-purple-500/80 via-pink-400/80 to-transparent rounded-full blur-md" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 bg-white/60 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Section 5 - Humind dans l'écosystème Pixaura - Ultra Premium */}
        <section className="relative z-30 mx-auto w-full max-w-7xl px-6 pb-32 pt-12 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start text-white relative z-30">
            {/* Left Column - Ultra Premium Header */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-indigo-400/60 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Section 07</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight relative z-40 min-h-[120px] md:min-h-[140px] lg:min-h-[160px]">
                  <span className="block text-white drop-shadow-[0_0_40px_rgba(255,255,255,0.3)] relative z-40">
                    {t("humindPage.ecosystemTitle1")}
                  </span>
                  <span className="block mt-2 bg-gradient-to-br from-indigo-200 via-purple-200 to-pink-200 bg-clip-text text-transparent relative z-40">
                    {t("humindPage.ecosystemTitle2")}
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Column - Ultra Premium Content */}
            <div className="lg:col-span-8 space-y-10 relative z-30 lg:pt-[104px] lg:pl-8">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { icon: Rocket, title: t("humindPage.labTitle"), desc: t("humindPage.labDesc"), gradient: "from-blue-500/40 via-cyan-500/40 to-sky-500/40", iconGlow: "rgba(59,130,246,0.6)" },
                  { icon: Target, title: t("humindPage.mediaTitle"), desc: t("humindPage.mediaDesc"), gradient: "from-purple-500/40 via-pink-500/40 to-fuchsia-500/40", iconGlow: "rgba(168,85,247,0.6)" },
                  { icon: Zap, title: t("humindPage.influenceTitle"), desc: t("humindPage.influenceDesc"), gradient: "from-yellow-500/40 via-orange-500/40 to-amber-500/40", iconGlow: "rgba(234,179,8,0.6)" },
                ].map((item, idx) => {
                  const Icon = item.icon
                  return (
                    <div key={idx} className="group relative z-30 h-full flex flex-col">
                      <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-[28px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                      <div className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} rounded-[28px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000`} />
                      <div className="relative flex flex-col h-full rounded-[28px] border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-3xl p-8 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:border-white/25 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-[1.03] group-hover:-translate-y-1">
                        <div className={`absolute inset-0 rounded-[28px] bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />
                        <div className="absolute inset-0 rounded-[28px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/8 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ transform: 'skewX(-20deg)' }} />
                        </div>
                        <div className="relative z-10 flex flex-col flex-1">
                          <div className="mb-6">
                            <div className="relative inline-block">
                              <div className={`absolute -inset-3 bg-gradient-to-br ${item.gradient} rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700`} />
                              <div className={`relative p-4 rounded-2xl bg-gradient-to-br ${item.gradient} backdrop-blur-xl border border-white/20 shadow-[0_8px_24px_${item.iconGlow}] group-hover:shadow-[0_12px_40px_${item.iconGlow}] transition-all duration-700 group-hover:scale-110 group-hover:rotate-3`}>
                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50" />
                                <Icon className="w-6 h-6 text-white relative z-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.8)] group-hover:scale-110 transition-transform duration-700" />
                              </div>
                            </div>
                          </div>
                          <h3 className="text-xl font-black text-white mb-2 leading-tight">{item.title}</h3>
                          <p className="text-sm text-white/60 leading-relaxed font-light flex-1">{item.desc}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ultra Premium Separator */}
        <div className="relative py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative">
              <div className="absolute left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-transparent via-white/30 to-transparent" />
              <div className="absolute left-1/2 -translate-x-1/2 -top-2 w-32 h-1 bg-gradient-to-r from-transparent via-pink-400/80 via-rose-500/80 via-red-400/80 to-transparent rounded-full blur-md" />
              <div className="absolute left-1/2 -translate-x-1/2 top-0 w-2 h-2 bg-white/60 rounded-full blur-sm" />
            </div>
          </div>
        </div>

        {/* Section 6 - Ils nous ont inspirés - Ultra Premium */}
        <section className="relative mx-auto w-full max-w-7xl px-6 pb-32 pt-12 md:px-12">
          <div className="grid lg:grid-cols-12 gap-16 items-start text-white">
            {/* Left Column - Ultra Premium Header */}
            <div className="lg:col-span-4 flex flex-col gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="h-px w-12 bg-gradient-to-r from-pink-400/60 to-transparent" />
                  <span className="text-[10px] uppercase tracking-[0.6em] text-white/30 font-bold">Section 08</span>
                </div>
                <h2 className="text-5xl md:text-6xl font-black leading-[0.95] tracking-tight">
                  <span className="block bg-gradient-to-br from-white via-white/95 to-white/80 bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(255,255,255,0.3)]">
                    {t("humindPage.inspiredTitle1")}
                  </span>
                  <span className="block mt-2 bg-gradient-to-br from-pink-200 via-rose-200 to-red-200 bg-clip-text text-transparent">
                    {t("humindPage.inspiredTitle2")}
                  </span>
                </h2>
              </div>
            </div>

            {/* Right Column - Ultra Premium Content */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { quote: t("humindPage.quote1Kamel"), author: "Kamel Madani", gradient: "from-red-500/40 via-orange-500/40 to-amber-500/40", iconGradient: "from-red-400 to-orange-400" },
                  { quote: t("humindPage.quote2Michel"), author: "Michel Audiard", gradient: "from-blue-500/40 via-cyan-500/40 to-sky-500/40", iconGradient: "from-blue-400 to-cyan-400" },
                  { quote: t("humindPage.quote3Alex"), author: "Alex Choussy", gradient: "from-purple-500/40 via-pink-500/40 to-fuchsia-500/40", iconGradient: "from-purple-400 to-pink-400" },
                  { quote: t("humindPage.quote4Raul"), author: "Raúl Vargas Ríos", gradient: "from-indigo-500/40 via-purple-500/40 to-violet-500/40", iconGradient: "from-indigo-400 to-purple-400" },
                ].map((item, idx) => (
                  <blockquote key={idx} className="group relative h-full flex flex-col">
                    {/* Multi-layer glow */}
                    <div className={`absolute -inset-0.5 bg-gradient-to-br ${item.gradient} rounded-[32px] blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000`} />
                    <div className={`absolute -inset-1 bg-gradient-to-br ${item.gradient} rounded-[32px] blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-1000`} />

                    {/* Main card */}
                    <div className="relative flex flex-col h-full rounded-[32px] border border-white/10 bg-gradient-to-br from-white/12 via-white/6 to-white/4 backdrop-blur-3xl p-10 shadow-[0_8px_32px_rgba(0,0,0,0.4),inset_0_1px_0_rgba(255,255,255,0.1)] transition-all duration-700 group-hover:border-white/25 group-hover:shadow-[0_20px_60px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.2)] group-hover:scale-[1.02] group-hover:-translate-y-1">
                      <div className={`absolute inset-0 rounded-[32px] bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700`} />

                      {/* Shine */}
                      <div className="absolute inset-0 rounded-[32px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" style={{ transform: 'skewX(-20deg)' }} />
                      </div>

                      <div className="relative z-10 flex flex-col flex-1">
                        <p className="text-2xl md:text-3xl font-black italic text-white leading-[1.3] mb-8 flex-1">
                          "{item.quote}"
                        </p>

                        <div className="flex items-center gap-4 pt-6 border-t border-white/10 mt-auto">
                          <div className={`w-1.5 h-10 bg-gradient-to-b ${item.iconGradient} rounded-full shadow-[0_0_12px_rgba(0,0,0,0.4)]`} />
                          <p className="text-sm text-white/60 font-bold uppercase tracking-[0.3em]">
                            {item.author}
                          </p>
                        </div>
                      </div>
                    </div>
                  </blockquote>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  )
}

