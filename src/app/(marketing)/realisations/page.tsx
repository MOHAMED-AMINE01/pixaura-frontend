"use client"

import { useState, useEffect, useRef, useMemo } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ProjectModal } from "@/components/project-modal"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Palette, Car, Building2, Dumbbell, UtensilsCrossed, Briefcase, Users, ArrowRight } from "lucide-react"
import { SectionDivider } from "@/components/section-divider"
import { useTranslation } from "@/contexts/translation-context"
import { getAssetUrl } from "@/lib/cloudinary"

// Types de projets - will be translated in component
const formatFilters = ["Branding"]
const sectorFilters = ["Tous", "Automobile", "Immobilier", "Sport & Bien-être", "Restauration", "Artistes & Créateurs"]

// Structure de données pour les 8 projets réels basés sur les posts Instagram
const projects = [
  {
    id: 1,
    title: "Halloween avec Touraine Cars — Shooting Éphémère",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Social"],
    sector: "Automobile",
    image: getAssetUrl("/Banque d_images/Copie de IMG_7149.jpg", "image"),
    video: null,
    shortDescription: "Dans la nuit noire du 31 octobre, les feuilles orange d'automne tourbillonnent dans l'air froid, emportées par le vent comme des éclats de flamme.",
    gallery: [
      getAssetUrl("/Banque d_images/Copie de M7_00259.jpg", "image"),
      getAssetUrl("/Banque d_images/Copie de M7_00197.jpg", "image"),
      getAssetUrl("/Banque d_images/Copie de M7_00197.jpg", "image"),
      getAssetUrl("/Banque d_images/halowen.mp4", "video"),
    ],
    objective: "Créer une campagne visuelle pour Halloween avec Touraine Cars, combinant ambiance automnale et message de sécurité routière pour une soirée terrifiante mais prudente.",
    creativeIdea: "Ambiance automnale, feuilles orange tourbillonnantes, atmosphère entre deux mondes : celui des vivants et celui qui s'éveille à la tombée du jour. Silhouettes masquées avançant en silence, leurs yeux brillent d'un éclat étrange, presque hypnotique. Esthétique cinématique sombre et poétique.",
    device: "Tournage éphémère sous la direction de Julien Hochet, production Pixaura International en collaboration avec Touraine Cars, photos et vidéos exclusives capturant toute l'essence de ce moment de création.",
    results: "Engagement sur les réseaux sociaux, promotion de l'événement Halloween avec message de sécurité routière, renforcement de la visibilité de Touraine Cars.",
  },
  {
    id: 2,
    title: "Mr Microbe — Projet Artistique & Thérapeutique",
    category: "Photo",
    formats: ["Photo", "Social", "Branding"],
    sector: "Artistes & Créateurs",
    image: getAssetUrl("/Banque d_images/art1.jpg", "image"),
    video: null,
    shortDescription: "Il est né d'une solitude confinée, dans un carnet taché d'encre et d'anxiété. Chaque soir, pendant que le monde se refermait sur lui-même (Covid 2020), Maxime s'y réfugiait.",
    gallery: [
      getAssetUrl("/Banque d_images/art2.jpg", "image"),
      getAssetUrl("/Banque d_images/art3.jpg", "image"),
      getAssetUrl("/Banque d_images/art5.jpg", "image"),
      getAssetUrl("/Banque d_images/art6.jpg", "image"),
    ],
    objective: "Mettre en valeur un projet artistique thérapeutique né du confinement COVID-2020, transformation du stress et de l'anxiété en œuvre d'art, symbole d'une résistance douce.",
    creativeIdea: "Transformation de l'anxiété en art, Mr Microbe comme symbole de résistance douce. Là où d'autres voyaient la peur, Maxime voyait une forme, une matière, un visage : celui de son stress qu'il apprenait enfin à apprivoiser. Son trait devenait thérapie, son microbe miroir.",
    device: "Shooting photo créatif, mise en scène artistique pour valoriser l'univers créatif de Mr Microbe, direction artistique poussée, éclairage LED et naturel, post-production avancée Pixaura_IT.",
    results: "Visibilité du projet artistique, inspiration pour d'autres créateurs, valorisation d'une création née de la peur pour guérir de l'isolement.",
  },
  {
    id: 3,
    title: "BSK Immobilier — Interviews Conseillers Immobiliers",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Social"],
    sector: "Immobilier",
    image: getAssetUrl("/Banque d_images/Copie de M7_00487.jpg", "image"),
    video: null,
    shortDescription: "Nous avons eu le plaisir d'interviewer plusieurs conseillers immobiliers de chez BSK Immobilier. L'objectif ? Mettre en lumière leur expertise, leur personnalité et leur vision du métier.",
    gallery: [
      getAssetUrl("/Banque d_images/Copie de LDP_5182.jpg", "image"),
      getAssetUrl("/Banque d_images/Copie de LDP_5161.jpg", "image"),
      getAssetUrl("/Banque d_images/Copie de M7_00487.jpg", "image"),
      getAssetUrl("/Banque d_images/Immobilier.mp4", "video"),
    ],
    objective: "Valoriser l'image de marque BSK Immobilier et créer du contenu authentique qui permet de se démarquer dans un secteur ultra-concurrentiel, en mettant en lumière l'humain derrière le professionnel.",
    creativeIdea: "Mise en lumière de l'humain derrière le professionnel, contenu authentique qui révèle l'expertise, la personnalité et la vision du métier de chaque conseiller immobilier. Approche storytelling humaine et professionnelle.",
    device: "Interviews filmées avec mise en valeur de l'expertise et de la personnalité des conseillers, production Pixaura_IT, workflow interne, montage et étalonnage en interne.",
    results: "Différenciation dans un secteur ultra-concurrentiel, renforcement de l'image de marque BSK Immobilier, création de contenu authentique engageant.",
  },
  {
    id: 5,
    title: "Castles Rally 2025 — Première Boucle",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Photo", "Social"],
    sector: "Automobile",
    image: getAssetUrl("/Banque d_images/Copie de M7_02930.jpg", "image"),
    video: null,
    shortDescription: "La première boucle du Castles Rally 2025 vient de s'achever… et quelle entrée en matière ! Un plateau d'exception, des paysages à couper le souffle, des routes sinueuses.",
    gallery: [
      getAssetUrl("/Banque d_images/Copie de M7_02930.jpg", "image"),
      getAssetUrl("/Banque d_images/Copie de M7_03008.jpg", "image"),
      getAssetUrl("/Banque d_images/rally2.mp4", "video"),
    ],
    objective: "Documenter la première boucle du Castles Rally 2025, capturer l'énergie et l'excitation de l'événement, mettre en valeur les supercars et les paysages exceptionnels.",
    creativeIdea: "Capturer l'énergie et l'excitation de la première boucle, mettre en valeur les supercars, les paysages à couper le souffle et les routes sinueuses. Ambiance événementielle vibrante et premium.",
    device: "Production complète événementiel avec photos et vidéos de la première boucle, couverture complète du rally, production Pixaura_IT.",
    results: "Promotion de l'événement, engagement de la communauté automobile, renforcement de la visibilité du Castles Rally 2025.",
  },
  {
    id: 6,
    title: "Vouvray/Chenin — Aménagement Sur-Mesure",
    category: "Photo",
    formats: ["Photo", "Branding"],
    sector: "Restauration",
    image: getAssetUrl("/Banque d_images/Copie de M7_09197.jpg", "image"),
    video: null,
    shortDescription: "Pour ce projet, nous nous sommes inspirés directement du cépage roi de Vouvray : le Chenin. Un vin pur, régulier, précis… des qualités que nous avons voulu traduire dans l'aménagement de ce lieu.",
    gallery: [
      getAssetUrl("/Banque d_images/Copie de M7_09197.jpg", "image"),
      getAssetUrl("/Banque d_images/Copie de M7_09214.jpg", "image"),
      getAssetUrl("/Banque d_images/Copie de M7_09236.jpg", "image"),
    ],
    objective: "Créer un aménagement sur-mesure inspiré du cépage Chenin de Vouvray, traduire les qualités du vin (pur, régulier, précis) dans l'aménagement du lieu, valoriser l'histoire et l'âme du vin.",
    creativeIdea: "Inspiration directe du cépage roi de Vouvray : le Chenin. Les lames de bois, toutes de la même taille, rappellent la régularité et la rigueur du travail du viticulteur. Le thème de la barrique s'invite dans la matière et la teinte, en écho à l'élevage traditionnel. Les niches dorées soulignent la pureté et la noblesse du Chenin.",
    device: "Aménagement sur-mesure avec lames de bois, niches dorées, production Pixaura_IT en collaboration avec les artisans locaux.",
    results: "Valorisation de l'histoire et de l'âme du vin, création d'un espace unique et premium, renforcement de l'identité de marque.",
  },
  {
    id: 8,
    title: "BSD/UFC Paris — Stage MMA",
    category: "Film / Vidéo",
    formats: ["Film / Vidéo", "Photo", "Social"],
    sector: "Sport & Bien-être",
    image: getAssetUrl("/Banque d_images/StageUfc.jpg", "image"),
    video: getAssetUrl("/Banque d_images/stageMMa.mp4", "video"),
    shortDescription: "STAGE BSD + TEAM BSD POUR L'UFC PARIS 4. Retour en images sur la journée du 15 juin avec Benoît Saint-Denis, notre God of War. Plus de 80 participants réunis au MMA FIGHT CLUB GYM.",
    gallery: [
      getAssetUrl("/Banque d_images/stageMMa.mp4", "video"),
    ],
    objective: "Documenter le stage MMA avec Benoît Saint-Denis (God of War) et créer du contenu pour promouvoir l'événement UFC Paris, capturer l'énergie et l'exigence du stage.",
    creativeIdea: "Capturer l'énergie et l'exigence du stage, mise en valeur de Benoît Saint-Denis et de la Team BSD, ambiance sportive intense et professionnelle, valorisation du savoir, de l'énergie et de l'exigence.",
    device: "Production complète événementiel sportif avec photos et vidéos du stage, réalisation Julien Learnordie et Pixaura_IT, photos Paul Thirion, production multi-format.",
    results: "Promotion de l'événement UFC Paris, engagement de la communauté MMA, valorisation de la Team BSD et de Benoît Saint-Denis.",
  },
]

// Icons mapping (no longer used, but kept for potential future use)
const formatIcons: Record<string, React.ReactElement> = {
  "Branding": <Palette className="w-4 h-4" />,
}

const sectorIcons: Record<string, React.ReactElement> = {
  "Tous": <Briefcase className="w-4 h-4" />,
  "Automobile": <Car className="w-4 h-4" />,
  "Immobilier": <Building2 className="w-4 h-4" />,
  "Sport & Bien-être": <Dumbbell className="w-4 h-4" />,
  "Restauration": <UtensilsCrossed className="w-4 h-4" />,
  "Artistes & Créateurs": <Users className="w-4 h-4" />,
}

export default function RealisationsPage() {
  const { t } = useTranslation()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)


  useEffect(() => {
    setMounted(true)
    // Scroll to top immediately without animation
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' })
  }, [])

  // REMOVED: Aggressive preloads - let images load on demand to save bandwidth

  // Get translated projects
  const translatedProjects = useMemo(() => {
    return projects.map((project) => ({
      ...project,
      category: project.category === "Film / Vidéo" ? t("portfolio.categoryFilmVideo") :
        project.category === "Photo" ? t("portfolio.categoryPhoto") : project.category,
      formats: project.formats.map((format) =>
        format === "Film / Vidéo" ? t("portfolio.categoryFilmVideo") :
          format === "Photo" ? t("portfolio.categoryPhoto") :
            format === "Social" ? t("portfolio.tagSocial") :
              format === "Event" ? t("portfolio.tagEvent") :
                format === "Branding" ? t("portfolio.tagBranding") :
                  format === "Corporate" ? t("portfolio.tagCorporate") :
                    format === "Design" ? t("portfolio.tagDesign") :
                      format === "Podcast" ? t("portfolio.tagPodcast") : format
      ),
      sector: project.sector === "Automobile" ? t("realisationsPage.filterAutomobile") :
        project.sector === "Immobilier" ? t("realisationsPage.filterRealEstate") :
          project.sector === "Sport & Bien-être" ? t("realisationsPage.filterSport") :
            project.sector === "Restauration" ? t("realisationsPage.filterRestaurant") :
              project.sector === "Artistes & Créateurs" ? t("realisationsPage.filterArtists") : project.sector,
      objective: t(`projects.project${project.id}.objective`),
      creativeIdea: t(`projects.project${project.id}.creativeIdea`),
      device: t(`projects.project${project.id}.device`),
      results: t(`projects.project${project.id}.results`),
    }))
  }, [t])

  const [activeFilter, setActiveFilter] = useState<string>(t("realisationsPage.filterAll"))
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProject, setSelectedProject] = useState<typeof translatedProjects[0] | null>(null)

  const filtersRef = useRef<HTMLDivElement>(null)

  // Filter projects based on active filter (only one filter can be active at a time)
  const filteredProjects = useMemo(() => {
    if (activeFilter === t("realisationsPage.filterAll")) {
      return translatedProjects
    }

    // Map translated filters to translated values (since translatedProjects has translated values)
    const sectorMap: Record<string, string> = {
      [t("realisationsPage.filterAutomobile")]: t("realisationsPage.filterAutomobile"),
      [t("realisationsPage.filterRealEstate")]: t("realisationsPage.filterRealEstate"),
      [t("realisationsPage.filterSport")]: t("realisationsPage.filterSport"),
      [t("realisationsPage.filterRestaurant")]: t("realisationsPage.filterRestaurant"),
      [t("realisationsPage.filterArtists")]: t("realisationsPage.filterArtists"),
    }
    const formatMap: Record<string, string> = {
      [t("realisationsPage.filterBranding")]: t("portfolio.tagBranding"),
    }

    // Check if it's a format filter
    const translatedFormat = formatMap[activeFilter]
    if (translatedFormat) {
      return translatedProjects.filter((project) => project.formats.includes(translatedFormat))
    }

    // Otherwise it's a sector filter
    const translatedSector = sectorMap[activeFilter]
    if (translatedSector) {
      return translatedProjects.filter((project) => project.sector === translatedSector)
    }

    return translatedProjects
  }, [activeFilter, t, translatedProjects])

  // Calculate counts for each filter
  const filterCounts = useMemo(() => {
    const counts: Record<string, number> = {}

    // Count for "Tous"
    counts[t("realisationsPage.filterAll")] = translatedProjects.length

    // Count for format filters - use translated format since translatedProjects has translated formats
    const formatMap: Record<string, string> = {
      [t("realisationsPage.filterBranding")]: t("portfolio.tagBranding"),
    }
    Object.entries(formatMap).forEach(([translatedFilter, translatedFormat]) => {
      counts[translatedFilter] = translatedProjects.filter((p) => p.formats.includes(translatedFormat)).length
    })

    // Count for sector filters - use translated sectors since translatedProjects has translated sectors
    const sectorMap: Record<string, string> = {
      [t("realisationsPage.filterAutomobile")]: t("realisationsPage.filterAutomobile"),
      [t("realisationsPage.filterRealEstate")]: t("realisationsPage.filterRealEstate"),
      [t("realisationsPage.filterSport")]: t("realisationsPage.filterSport"),
      [t("realisationsPage.filterRestaurant")]: t("realisationsPage.filterRestaurant"),
      [t("realisationsPage.filterArtists")]: t("realisationsPage.filterArtists"),
    }
    Object.entries(sectorMap).forEach(([translatedFilter, translatedSector]) => {
      counts[translatedFilter] = translatedProjects.filter((p) => p.sector === translatedSector).length
    })

    return counts
  }, [t, translatedProjects])

  const handleProjectClick = (project: typeof translatedProjects[0]) => {
    setSelectedProject(project)
    setIsModalOpen(true)
  }

  // Sticky filters logic removed for performance/stability - using simple CSS sticky
  // Mouse position tracking removed for performance

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <Navbar />

      {/* Video background - hidden on mobile, visible on desktop */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <video
          key="realisations-bg"
          className="hidden md:block h-full w-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          style={{
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
          onLoadedMetadata={(e) => {
            // Start playing as soon as metadata is loaded (faster on Vercel)
            const video = e.currentTarget
            if (video.readyState >= 1) {
              video.play().catch(() => {
                // Retry after a short delay
                setTimeout(() => {
                  video.play().catch(() => { })
                }, 500)
              })
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
        >
          <source src={getAssetUrl("/Banque d_images/background-web-desktop.mp4", "video")} type="video/mp4" />
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

      <section className="relative pt-40 pb-20 px-6 bg-transparent overflow-visible">
        <div className="relative z-10 mx-auto max-w-6xl space-y-12">
          <div className="relative overflow-hidden px-6 py-12 text-center text-white md:px-10 md:py-16">
            <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-6">
              <span className="relative inline-flex items-center gap-3 rounded-full border border-white/30 bg-black/50 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90 shadow-[0_8px_32px_rgba(0,115,255,0.15)]">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-cyan-400/20 opacity-50" />
                <span className="relative z-10">{t("realisationsPage.badge")}</span>
              </span>
              <h1 className="text-4xl font-black leading-tight md:text-5xl relative" style={{ fontFamily: "Montserrat, sans-serif" }}>
                <span className="relative z-10">
                  {t("realisationsPage.title1")}{' '}
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-cyan-400/40 to-primary/40 blur-2xl opacity-60" />
                    <span className="relative bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text text-transparent">
                      {t("realisationsPage.title2")}
                    </span>
                  </span>
                  {' '}{t("realisationsPage.title3")}
                </span>
              </h1>
              <p className="text-sm text-white/80 md:text-base leading-relaxed max-w-2xl">
                {t("realisationsPage.description")}
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3 text-xs uppercase tracking-[0.28em]">
                <div className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-5 py-2.5 shadow-[0_4px_20px_rgba(0,115,255,0.1)]">
                  <span className="h-2 w-2 rounded-full bg-[#0073FF] shadow-[0_0_8px_rgba(0,115,255,0.6)]" />
                  <span className="text-white/80">{t("realisationsPage.filterFilmVideo")}</span>
                </div>
                <div className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-5 py-2.5 shadow-[0_4px_20px_rgba(52,211,153,0.1)]">
                  <span className="h-2 w-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
                  <span className="text-white/80">{t("realisationsPage.filterPhoto")}</span>
                </div>
                <div className="group relative inline-flex items-center gap-2 rounded-full border border-white/25 bg-black/40 px-5 py-2.5 shadow-[0_4px_20px_rgba(255,255,255,0.1)]">
                  <span className="h-2 w-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.4)]" />
                  <span className="text-white/80">{t("realisationsPage.filterActivation")}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Sticky Filters Section - Simplified */}
          <div
            ref={filtersRef}
            className="mb-12 space-y-6 sticky top-0 z-30 py-3 bg-transparent"
          >
            {/* All Filters Combined in One Line - Ultra Premium Design */}
            {/* Mobile: horizontal scroll, Desktop: centered */}
            <div
              className="relative -mx-4 px-4 flex flex-nowrap gap-2.5 justify-start md:justify-center overflow-x-auto overflow-y-visible pb-2 scrollbar-hide"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {/* Tous Button */}
              <button
                onClick={() => setActiveFilter(t("realisationsPage.filterAll"))}
                className={`group relative px-5 py-2.5 rounded-full font-medium text-xs flex items-center gap-2 flex-shrink-0 overflow-visible cursor-pointer ${activeFilter === t("realisationsPage.filterAll")
                  ? "bg-[#0073FF] text-white shadow-[0_8px_24px_rgba(0,115,255,0.4)] border border-white/40"
                  : "bg-white/10 text-white/75 border border-white/20 hover:bg-white/20 hover:text-white"
                  }`}
                aria-label="Afficher tous les projets"
                style={{
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '0.01em',
                }}
              >
                <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${activeFilter !== t("realisationsPage.filterAll") ? "group-hover:tracking-wider" : ""}`}>{t("realisationsPage.filterAll")}</span>
                <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 min-w-[18px] flex items-center justify-center ${activeFilter === t("realisationsPage.filterAll")
                  ? "bg-white/25 text-white shadow-sm"
                  : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white/90 group-hover:scale-110"
                  }`}>
                  {filterCounts[t("realisationsPage.filterAll")]}
                </span>
              </button>

              {/* Format Filters */}
              {[
                { original: "Branding", translated: t("realisationsPage.filterBranding") }
              ].map(({ original, translated }) => {
                const isActive = activeFilter === translated
                const count = filterCounts[translated] || 0
                return (
                  <button
                    key={`format-${original}`}
                    onClick={() => setActiveFilter(translated)}
                    className={`group relative px-5 py-2.5 rounded-full font-medium text-xs flex items-center gap-2 flex-shrink-0 overflow-visible cursor-pointer ${isActive
                      ? "bg-[#0073FF] text-white shadow-[0_8px_24px_rgba(0,115,255,0.4)] border border-white/40"
                      : "bg-white/10 text-white/75 border border-white/20 hover:bg-white/20 hover:text-white"
                      }`}
                    aria-label={`Filtrer par ${translated}`}
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '0.01em',
                    }}
                  >
                    <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${!isActive ? "group-hover:tracking-wider" : ""}`}>{translated}</span>
                    <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 min-w-[18px] flex items-center justify-center ${isActive
                      ? "bg-white/25 text-white shadow-sm"
                      : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white/90 group-hover:scale-110"
                      }`}>
                      {count}
                    </span>
                  </button>
                )
              })}

              {/* Sector Filters */}
              {[
                { original: "Automobile", translated: t("realisationsPage.filterAutomobile") },
                { original: "Immobilier", translated: t("realisationsPage.filterRealEstate") },
                { original: "Sport & Bien-être", translated: t("realisationsPage.filterSport") },
                { original: "Restauration", translated: t("realisationsPage.filterRestaurant") },
                { original: "Artistes & Créateurs", translated: t("realisationsPage.filterArtists") },
              ].map(({ original, translated }) => {
                const isActive = activeFilter === translated
                const count = filterCounts[translated] || 0
                return (
                  <button
                    key={`sector-${original}`}
                    onClick={() => setActiveFilter(translated)}
                    className={`group relative px-5 py-2.5 rounded-full font-medium text-xs flex items-center gap-2 flex-shrink-0 overflow-visible cursor-pointer ${isActive
                      ? "bg-[#0073FF] text-white shadow-[0_8px_24px_rgba(0,115,255,0.4)] border border-white/40"
                      : "bg-white/10 text-white/75 border border-white/20 hover:bg-white/20 hover:text-white"
                      }`}
                    aria-label={`Filtrer par ${translated}`}
                    style={{
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '0.01em',
                    }}
                  >
                    <span className={`relative z-10 whitespace-nowrap text-xs transition-all duration-300 ${!isActive ? "group-hover:tracking-wider" : ""}`}>{translated}</span>
                    <span className={`relative z-10 px-1.5 py-0.5 rounded-full text-[10px] font-bold transition-all duration-300 min-w-[18px] flex items-center justify-center ${isActive
                      ? "bg-white/25 text-white shadow-sm"
                      : "bg-white/10 text-white/60 group-hover:bg-white/20 group-hover:text-white/90 group-hover:scale-110"
                      }`}>
                      {count}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Portfolio Grid - Premium Cards */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-white/70 text-lg mb-4">{t("realisationsPage.noProjects")}</p>
              <button
                onClick={() => setActiveFilter(t("realisationsPage.filterAll"))}
                className="px-6 py-3 bg-[#0073FF] text-white font-semibold rounded-full hover:bg-[#1AA3FF] transition-all duration-300"
              >
                {t("realisationsPage.resetFilters")}
              </button>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((project, index) => (
                <div
                  key={project.id}
                  className="group relative overflow-hidden rounded-3xl border border-white/20 bg-black/40 text-white isolation-isolate transform-gpu will-change-transform"
                  style={{ transform: 'translate3d(0,0,0)', backfaceVisibility: 'hidden' }}
                >
                  <button
                    type="button"
                    onClick={() => handleProjectClick(project)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        handleProjectClick(project)
                      }
                    }}
                    className="w-full text-left"
                  >
                    <div className="relative h-64 w-full overflow-hidden bg-black/20 will-change-transform" style={{ backfaceVisibility: 'hidden', transform: 'translate3d(0,0,0)' }}>
                      {project.video && project.id !== 8 ? (
                        <video
                          src={project.video}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="relative h-full w-full">
                          <Image
                            src={project.image || "/placeholder.jpg"}
                            alt={project.title}
                            fill
                            priority={true}
                            className="object-cover"
                            style={project.id === 8 ? { transform: "rotate(-90deg) scale(1.3)" } : undefined}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                      <span className="absolute bottom-5 left-5 rounded-full border border-white/30 bg-black/40 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90 shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
                        {project.category}
                      </span>
                    </div>

                    <div className="flex flex-col gap-5 px-8 py-8 text-white">
                      <h3 className={`text-xl font-bold leading-tight md:text-2xl text-white/95 group-hover:text-white transition-colors duration-300 ${
                        project.id === 2 ? 'mb-3' : 
                        project.id === 5 || project.id === 8 ? 'mb-5' : 
                        ''
                      }`}>
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-4 text-xs uppercase tracking-[0.28em] text-white/60">
                        <span className="flex items-center gap-2">
                          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-white/70 to-white/50 shadow-[0_0_4px_rgba(255,255,255,0.5)]" />
                          <span className="text-white/70">{project.category}</span>
                        </span>
                        <span className="h-px flex-1 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                        <span className="inline-flex items-center gap-2 text-white/80 transition-all duration-300 group-hover:text-white group-hover:gap-3 whitespace-nowrap">
                          {t("realisationsPage.viewProject")}
                          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* CTA Section - Ultra Premium */}
          <div className="relative mt-24 overflow-hidden px-8 py-20 text-center text-white">
            <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-8">
              {/* Premium Badge */}
              <span className="relative inline-flex items-center gap-2 rounded-full border border-white/30 bg-gradient-to-br from-white/15 via-white/10 to-white/5 px-6 py-2.5 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,115,255,0.15)]">
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 via-transparent to-cyan-400/20 opacity-50 blur-xl" />
                <span className="relative z-10">{t("realisationsPage.ctaBadge")}</span>
              </span>

              {/* Enhanced Text */}
              <div className="text-xl font-bold md:text-2xl leading-relaxed text-white/95">
                <span>
                  {t("realisationsPage.ctaText1")}{' '}
                  <span className="relative inline-block">
                    <span className="absolute inset-0 bg-gradient-to-r from-primary/40 via-cyan-400/40 to-primary/40 blur-xl opacity-50" />
                    <span className="relative bg-gradient-to-r from-white via-primary/90 to-white bg-clip-text text-transparent">
                      {t("realisationsPage.ctaText2")}
                    </span>
                  </span>
                  {' ?'}
                </span>
                <br />
                <span>{t("realisationsPage.ctaText3")}</span>
              </div>

              {/* Premium Button */}
              <Link
                href="/#rendez-vous"
                onClick={(e) => {
                  const currentPath = window.location.pathname
                  if (currentPath !== "/") {
                    e.preventDefault()

                    // Simple navigation - NO OVERLAY, just smooth navigation
                    sessionStorage.setItem('navFromSpecialPage', 'true')

                    // Remove any existing overlay (cleanup)
                    const existingOverlay = document.getElementById('nav-transition-overlay')
                    if (existingOverlay) {
                      existingOverlay.remove()
                    }

                    // Prefetch BEFORE navigation for faster loading
                    router.prefetch(`/?skipIntro=true#rendez-vous`)

                    // Navigate immediately - simple and fast
                    router.push(`/?skipIntro=true#rendez-vous`)
                  }
                }}
                className="group relative inline-flex items-center gap-3 rounded-full bg-[#0073FF] px-12 py-5 text-sm font-bold uppercase tracking-[0.28em] text-white shadow-[0_8px_24px_rgba(0,115,255,0.4)] border border-white/20"
              >
                <span className="absolute inset-0 rounded-full bg-gradient-to-r from-white/20 via-transparent to-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="relative z-10">{t("realisationsPage.ctaButton")}</span>
                <ArrowRight className="h-4 w-4 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

        </div>

        {/* Project Modal */}
        <ProjectModal
          open={isModalOpen}
          onOpenChange={setIsModalOpen}
          project={selectedProject}
        />
      </section>
      <Footer />
    </main>
  )
}

