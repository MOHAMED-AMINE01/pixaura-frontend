"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import Image from "next/image"
import { ChevronLeft, ChevronRight, X, Video, Image as ImageIcon, Play, ZoomIn } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

interface ProjectModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  project: {
    id: number
    title: string
    category: string
    sector: string
    image: string
    video?: string | null
    gallery?: string[]
    shortDescription?: string
    objective: string
    creativeIdea: string
    device: string
    results: string
  } | null
}

export function ProjectModal({ open, onOpenChange, project }: ProjectModalProps) {
  const { t } = useTranslation()
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [mediaLoaded, setMediaLoaded] = useState(false)
  const [showFullText, setShowFullText] = useState(false)
  const lightboxVideoRef = useRef<HTMLVideoElement>(null)
  const galleryVideoRefs = useRef<Map<number, HTMLVideoElement>>(new Map())

  const galleryImages = project?.gallery ?? (project?.image ? [project.image] : [])
  const galleryLength = galleryImages.length

  useEffect(() => {
    if (project) {
      setCurrentImageIndex(0)
      setMediaLoaded(false)
      setShowFullText(false)
    }
  }, [project?.id])

  const handleNext = useCallback(() => {
    if (galleryLength === 0) return

    // Pause current video if any
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause()
      lightboxVideoRef.current.currentTime = 0
    }

    // Immediate transition - no blocking at all
    setCurrentImageIndex((prev) => (prev + 1) % galleryLength)
    setMediaLoaded(false)
    // Set to true after a micro delay to allow render
    requestAnimationFrame(() => {
      setMediaLoaded(true)
    })
  }, [galleryLength])

  const handlePrevious = useCallback(() => {
    if (galleryLength === 0) return

    // Pause current video if any
    if (lightboxVideoRef.current) {
      lightboxVideoRef.current.pause()
      lightboxVideoRef.current.currentTime = 0
    }

    // Immediate transition - no blocking at all
    setCurrentImageIndex((prev) => (prev - 1 + galleryLength) % galleryLength)
    setMediaLoaded(false)
    // Set to true after a micro delay to allow render
    requestAnimationFrame(() => {
      setMediaLoaded(true)
    })
  }, [galleryLength])

  useEffect(() => {
    if (!lightboxOpen || galleryLength === 0) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        handlePrevious()
      } else if (e.key === "ArrowRight") {
        handleNext()
      } else if (e.key === "Escape") {
        setLightboxOpen(false)
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen, galleryLength, handleNext, handlePrevious])

  // Pause all gallery videos when lightbox opens or closes
  useEffect(() => {
    if (!lightboxOpen) {
      galleryVideoRefs.current.forEach((video) => {
        if (video) {
          video.pause()
          video.currentTime = 0
        }
      })
    }
  }, [lightboxOpen])

  // Handle video transitions in lightbox - optimized for speed
  useEffect(() => {
    if (!lightboxOpen || !project) return

    const currentMedia = galleryImages[currentImageIndex] ?? galleryImages[0] ?? project.image ?? ""
    const isCurrentVideo = currentMedia.endsWith(".mp4") || currentMedia.endsWith(".webm") || currentMedia.endsWith(".mov")

    if (isCurrentVideo && lightboxVideoRef.current) {
      const video = lightboxVideoRef.current

      // Reset video quickly
      video.pause()
      video.currentTime = 0

      // Fast load - use loadedmetadata instead of canplay for faster response
      const handleLoadedMetadata = () => {
        setMediaLoaded(true)
      }

      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true })
      video.load()

      return () => {
        video.removeEventListener('loadedmetadata', handleLoadedMetadata)
      }
    } else if (!isCurrentVideo) {
      // For images, set loaded immediately - no delay
      setMediaLoaded(true)
    }
  }, [currentImageIndex, lightboxOpen, galleryImages, project])

  const openLightbox = useCallback((index: number) => {
    if (galleryLength === 0) return
    const safeIndex = Math.max(0, Math.min(index, galleryLength - 1))
    setCurrentImageIndex(safeIndex)
    setMediaLoaded(true) // Set to true immediately so navigation works
    setLightboxOpen(true)
  }, [galleryLength])

  if (!project) return null

  const currentMedia = galleryImages[currentImageIndex] ?? galleryImages[0] ?? project.image ?? ""
  const isCurrentVideo = currentMedia.endsWith(".mp4") || currentMedia.endsWith(".webm") || currentMedia.endsWith(".mov")

  const photos = galleryImages.filter((media) => !media.endsWith(".mp4") && !media.endsWith(".webm") && !media.endsWith(".mov"))
  const videos = galleryImages.filter((media) => media.endsWith(".mp4") || media.endsWith(".webm") || media.endsWith(".mov"))

  return (
    <>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] border border-white/15 bg-white/8 text-white backdrop-blur-2xl shadow-[0_45px_120px_rgba(0,0,0,0.35)]">
          {/* DialogTitle for accessibility - must be directly in DialogContent */}
          <VisuallyHidden.Root>
            <DialogTitle>
              {project.title}
            </DialogTitle>
          </VisuallyHidden.Root>

          <DialogHeader className="space-y-4">
            {/* Project Image */}
            <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-[28px]">
              <Image
                src={project.image || "/placeholder.jpg"}
                alt={project.title}
                fill
                className="object-cover brightness-110 saturate-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

              {/* Badges */}
              <div className="absolute top-3 left-3 flex gap-2">
                {(() => {
                  // Détection intelligente du format principal basé sur le contenu réel
                  const hasVideo = project.gallery?.some((item: string) => item.endsWith('.mp4')) || project.video
                  const hasImage = project.gallery?.some((item: string) => item.endsWith('.jpg') || item.endsWith('.png') || item.endsWith('.jpeg')) || project.image
                  const videoCount = project.gallery?.filter((item: string) => item.endsWith('.mp4')).length || 0
                  const imageCount = project.gallery?.filter((item: string) => !item.endsWith('.mp4')).length || 0

                  let badgeText = project.category

                  // Logique intelligente pour déterminer le badge le plus significatif
                  if (videoCount > imageCount && videoCount > 0) {
                    badgeText = t("projectModal.productionVideo")
                  } else if (imageCount > videoCount && imageCount > 0) {
                    badgeText = t("projectModal.shootingPhoto")
                  } else if (videoCount > 0 && imageCount > 0 && videoCount === imageCount) {
                    badgeText = t("projectModal.multiMedia")
                  } else if (hasVideo && !hasImage) {
                    badgeText = t("projectModal.productionVideo")
                  } else if (hasImage && !hasVideo) {
                    badgeText = t("projectModal.shootingPhoto")
                  } else if (project.sector === "Artistes & Créateurs" || project.sector === t("realisationsPage.filterArtists")) {
                    badgeText = t("projectModal.artisticCreation")
                  } else if (project.sector === "Immobilier" || project.sector === t("realisationsPage.filterRealEstate")) {
                    badgeText = t("projectModal.realEstateProduction")
                  } else if (project.sector === "Automobile" || project.sector === t("realisationsPage.filterAutomobile")) {
                    badgeText = t("projectModal.automotiveProduction")
                  } else if (project.title.toLowerCase().includes("interview") || project.title.toLowerCase().includes("entrevue")) {
                    badgeText = t("projectModal.videoInterview")
                  } else if (project.title.toLowerCase().includes("rally") || project.title.toLowerCase().includes("rallye")) {
                    badgeText = t("projectModal.eventCoverage")
                  } else if (project.title.toLowerCase().includes("halloween") || project.title.toLowerCase().includes("shooting") || project.title.toLowerCase().includes("tournage")) {
                    badgeText = t("projectModal.creativeShooting")
                  }

                  return (
                    <span className="rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-sm">
                      {badgeText}
                    </span>
                  )
                })()}
                <span className="rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-sm">
                  {project.sector}
                </span>
              </div>

              {/* Title - Visual only */}
              <div className="absolute bottom-3 left-3 right-3">
                <h2 className="text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-xl" style={{
                  fontFamily: 'Montserrat, sans-serif',
                  letterSpacing: '-0.02em',
                }}>
                  {project.title}
                </h2>
              </div>
            </div>

            {/* Content Sections */}
            <div className="space-y-5 pt-5 px-5 pb-5">
              {/* Objectif */}
              <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/40">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  {t("projectModal.objective")}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify hyphens-auto">
                  {project.objective}
                </p>
              </div>

              {/* Idée créative */}
              <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/40">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  {t("projectModal.creativeIdea")}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify hyphens-auto">
                  {project.creativeIdea}
                </p>
              </div>

              {/* Dispositif */}
              <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/40">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  {t("projectModal.device")}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify hyphens-auto">
                  {project.device}
                </p>
              </div>

              {/* Résultats */}
              <div className="rounded-[24px] border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/40">
                <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/80 mb-3">
                  {t("projectModal.results")}
                </h3>
                <p className="text-sm text-white/70 leading-relaxed text-justify hyphens-auto">
                  {project.results}
                </p>
              </div>

              {/* Galerie visuelle - Design Ultra Innovant avec Séparation Radicale */}
              {galleryImages.length > 0 && (
                <div className="relative space-y-6 rounded-[24px] border border-white/15 bg-white/5 p-6 shadow-lg shadow-black/35">

                  <div className="relative z-10 flex items-center gap-3">
                    <span className="inline-flex h-2 w-2 rounded-full bg-primary/70" />
                    <h3 className="text-lg font-semibold uppercase tracking-[0.25em] text-white/85">
                      {t("projectModal.visualGallery")}
                    </h3>
                    <div className="h-px flex-1 bg-white/12" />
                  </div>

                  {/* Section VIDÉOS - Hidden on mobile, visible on desktop */}
                  {videos.length > 0 && (
                    <div className="relative z-10 space-y-4 hidden md:block">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75 backdrop-blur-sm">
                          <Video className="h-4 w-4 text-white/80" />
                          {t("projectModal.videos")}
                          <span className="rounded-full bg-white/18 px-2 py-0.5 text-[10px]">
                            {videos.length}
                          </span>
                        </div>
                        <div className="h-px flex-1 bg-white/12" />
                      </div>

                      <div className="grid gap-4">
                        {videos.map((media, videoIndex) => {
                          const globalIndex = galleryImages.indexOf(media)
                          const displayNumber = videoIndex + 1
                          return (
                            <div
                              key={`video-${globalIndex}`}
                              className="group relative h-48 md:h-56 overflow-hidden rounded-[22px] border border-white/18 bg-white/6 shadow-md shadow-black/30 transition hover:border-white/35 hover:bg-white/12"
                              onClick={() => openLightbox(globalIndex)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault()
                                  openLightbox(globalIndex)
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              aria-label={`${t("projectModal.viewVideo")} ${videoIndex + 1}`}
                            >
                              <video
                                ref={(el) => {
                                  if (el) {
                                    galleryVideoRefs.current.set(globalIndex, el)
                                  } else {
                                    galleryVideoRefs.current.delete(globalIndex)
                                  }
                                }}
                                src={media}
                                className="h-full w-full object-cover brightness-110 saturate-120"
                                muted
                                loop
                                playsInline
                                preload="auto"
                                onMouseEnter={(e) => {
                                  const video = e.currentTarget
                                  video.play().catch(() => { })
                                }}
                                onMouseLeave={(e) => {
                                  const video = e.currentTarget
                                  video.pause()
                                  video.currentTime = 0
                                }}
                              />
                              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                              <div className="absolute inset-0 bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                              <span className="absolute top-3 left-3 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/85 backdrop-blur-sm">
                                <Video className="h-4 w-4" />
                                {t("projectModal.video")}
                              </span>
                              <span className="absolute top-3 right-3 inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/35 bg-white/15 text-xs font-semibold text-white/90 backdrop-blur-sm">
                                {displayNumber}
                              </span>
                              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-white/35 bg-white/15 text-white backdrop-blur-sm shadow-md">
                                  <Play className="h-8 w-8" />
                                </div>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Section PHOTOS - Hidden on mobile, visible on desktop */}
                  {photos.length > 0 && (
                    <div className="relative z-10 space-y-4 hidden md:block">
                      <div className="flex items-center gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white/75 backdrop-blur-sm">
                          <ImageIcon className="h-4 w-4 text-white/80" />
                          {t("projectModal.photos")}
                          <span className="rounded-full bg-white/18 px-2 py-0.5 text-[10px]">
                            {photos.length}
                          </span>
                        </div>
                        <div className="h-px flex-1 bg-white/12" />
                      </div>

                      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                        {photos.map((media, photoIndex) => {
                          const globalIndex = galleryImages.indexOf(media)
                          const displayNumber = videos.length + photoIndex + 1
                          return (
                            <div
                              key={`photo-${photoIndex}`}
                              className="group relative aspect-square overflow-hidden rounded-[18px] border border-white/18 bg-white/6 shadow-md shadow-black/30 transition hover:border-white/35 hover:bg-white/12"
                              onClick={() => openLightbox(globalIndex)}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  e.preventDefault()
                                  openLightbox(globalIndex)
                                }
                              }}
                              role="button"
                              tabIndex={0}
                              aria-label={`${t("projectModal.viewPhoto")} ${photoIndex + 1}`}
                            >
                              <Image
                                src={media}
                                alt={`${project.title} - Photo ${photoIndex + 1}`}
                                fill
                                className="object-cover opacity-0 transition-opacity duration-300"
                                // Thumbnail sizes (modal max width is limited): keep requests small
                                sizes="(min-width: 1024px) 200px, (min-width: 768px) 25vw, 45vw"
                                quality={60}
                                // Progressive loading: only first thumbnails are eager; rest lazy
                                priority={photoIndex === 0}
                                loading={photoIndex < 4 ? "eager" : "lazy"}
                                fetchPriority={photoIndex === 0 ? "high" : "low"}
                                onLoadingComplete={(img) => {
                                  img.style.opacity = "1"
                                }}
                              />
                              <span className="absolute -top-2 -right-2 flex h-8 w-8 items-center justify-center rounded-full border border-white/25 bg-white/20 text-[11px] font-semibold text-white shadow-[0_8px_20px_rgba(0,0,0,0.35)] backdrop-blur-sm">
                                {displayNumber}
                              </span>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )}

                  {/* Mobile Alternative - Visual Design Better Than Images */}
                  {(videos.length > 0 || photos.length > 0) && (
                    <div className="relative z-10 block md:hidden">
                      {/* Compact Visual Impact Card */}
                      <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/8 via-white/5 to-white/3 p-4 backdrop-blur-xl">
                        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-cyan-400/5" />
                        <div className="absolute top-0 right-0 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />

                        <div className="relative z-10 space-y-3">
                          {/* Compact Header */}
                          <div className="flex items-center">
                            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80">
                              Creative Impact
                            </span>
                          </div>

                          {/* Visual Metrics Grid - Compact */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm text-center">
                              <div className="text-base font-bold text-white/95 mb-0.5">
                                {videos.length + photos.length}
                              </div>
                              <div className="text-[9px] font-medium text-white/60">
                                Assets
                              </div>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm text-center">
                              <div className="text-base font-bold text-white/95 mb-0.5">
                                {videos.length > 0 ? videos.length : '0'}
                              </div>
                              <div className="text-[9px] font-medium text-white/60">
                                Video
                              </div>
                            </div>

                            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 backdrop-blur-sm text-center">
                              <div className="text-base font-bold text-white/95 mb-0.5">
                                {photos.length > 0 ? photos.length : '0'}
                              </div>
                              <div className="text-[9px] font-medium text-white/60">
                                Photo
                              </div>
                            </div>
                          </div>

                          {/* Visual Progress Indicator - Elegant */}
                          <div className="relative rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-[10px] font-medium text-white/70">Project Status</span>
                              <span className="text-[10px] font-medium text-white/80">Complete</span>
                            </div>
                            <div className="relative h-1 rounded-full bg-white/10 overflow-hidden">
                              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary/70 via-cyan-400/60 to-primary/70 rounded-full" style={{ width: '100%' }} />
                            </div>
                          </div>

                          {/* Compact Project Essence */}
                          <div className="rounded-lg border border-white/10 bg-white/5 p-3 backdrop-blur-sm">
                            <div className={`text-[11px] font-medium text-white/85 leading-snug ${showFullText ? '' : 'line-clamp-1'}`}>
                              {showFullText
                                ? (project.objective || project.creativeIdea || 'Creative project execution')
                                : (project.objective?.split('.')[0]?.substring(0, 80) || project.creativeIdea?.split('.')[0]?.substring(0, 80) || 'Creative project execution')
                              }
                            </div>
                            {project.results && (
                              <>
                                <div className="h-px bg-white/10 my-2" />
                                <div className={`text-[10px] text-white/65 leading-snug ${showFullText ? '' : 'line-clamp-1'}`}>
                                  {showFullText
                                    ? project.results
                                    : project.results.split('.')[0]?.substring(0, 80)
                                  }
                                </div>
                              </>
                            )}
                          </div>

                          {/* Visual Category Badge */}
                          <div className="flex items-center gap-2">
                            <div className="rounded-lg border border-white/10 bg-gradient-to-r from-primary/10 to-cyan-400/10 px-3 py-1.5">
                              <span className="text-[10px] font-semibold text-white/80">{project.category}</span>
                            </div>
                            <div className="h-px flex-1 bg-white/10" />
                            <div className="text-[10px] text-white/60">{project.sector}</div>
                          </div>

                          {/* View More Text Button */}
                          <button
                            onClick={() => setShowFullText(!showFullText)}
                            className="w-full rounded-lg border border-white/20 bg-gradient-to-r from-primary/20 to-cyan-400/20 px-4 py-2.5 text-[11px] font-semibold text-white/90 hover:from-primary/30 hover:to-cyan-400/30 transition-all duration-300"
                          >
                            {showFullText ? 'Voir moins' : 'Voir plus'}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Lightbox - Simple and Clean */}
      {lightboxOpen && (
        <div
          className="fixed inset-0 z-[100] bg-black flex items-center justify-center p-4"
          onClick={() => setLightboxOpen(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              setLightboxOpen(false)
            }
          }}
          role="dialog"
          aria-label={t("projectModal.visualGallery")}
        >
          <div className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center">
            {/* Previous Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handlePrevious()
                }}
                type="button"
                className="absolute left-4 z-20 p-3 bg-black/60 hover:bg-black/80 rounded-full border border-white/20 cursor-pointer"
                aria-label={t("projectModal.previousImage")}
                style={{ pointerEvents: 'auto', userSelect: 'none' }}
              >
                <ChevronLeft className="w-5 h-5 text-white pointer-events-none" />
              </button>
            )}

            {/* Image or Video - Clean and Simple */}
            <div
              className="relative w-full h-full max-w-6xl max-h-[85vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              {!mediaLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="h-4 w-4 rounded-full border border-white/40 border-t-white/80 animate-spin" />
                </div>
              )}

              <div className="w-full h-full" style={{ opacity: mediaLoaded ? 1 : 0, transition: 'opacity 0.15s' }}>
                {isCurrentVideo ? (
                  <video
                    ref={lightboxVideoRef}
                    src={currentMedia}
                    className="w-full h-full object-contain"
                    controls
                    loop
                    playsInline
                    preload="auto"
                    onLoadedData={() => setMediaLoaded(true)}
                    onCanPlay={() => setMediaLoaded(true)}
                    onError={() => setMediaLoaded(true)}
                  />
                ) : (
                  <Image
                    src={currentMedia}
                    alt={`${project.title} - Image ${currentImageIndex + 1}`}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    quality={85}
                    priority

                    onLoad={() => setMediaLoaded(true)}
                    onError={() => setMediaLoaded(true)}
                  />
                )}
              </div>
            </div>

            {/* Next Button */}
            {galleryImages.length > 1 && (
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.stopPropagation()
                  handleNext()
                }}
                type="button"
                className="absolute right-4 z-20 p-3 bg-black/60 hover:bg-black/80 rounded-full border border-white/20 cursor-pointer"
                aria-label={t("projectModal.nextImage")}
                style={{ pointerEvents: 'auto', userSelect: 'none' }}
              >
                <ChevronRight className="w-5 h-5 text-white pointer-events-none" />
              </button>
            )}

            {/* Simple Counter */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-4 py-2 bg-black/60 rounded-full text-white text-sm font-medium border border-white/20">
                {currentImageIndex + 1} / {galleryImages.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}
