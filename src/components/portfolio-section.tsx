"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { Reveal } from "@/components/reveal"
import { useTranslation } from "@/contexts/translation-context"
import { getAssetUrl } from "@/lib/cloudinary"

// Optimized mobile video component with lazy loading and smooth playback
function MobileVideo({ src, index }: { src: string; index: number }) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [shouldLoad, setShouldLoad] = useState(index < 2) // Load first 2 immediately
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (shouldLoad || !containerRef.current) return

    // Use IntersectionObserver to load when visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setShouldLoad(true)
            observer.disconnect()
          }
        })
      },
      { rootMargin: '100px' } // Start loading 100px before visible
    )

    observer.observe(containerRef.current)

    return () => {
      observer.disconnect()
    }
  }, [shouldLoad])

  useEffect(() => {
    if (!shouldLoad || !videoRef.current) return

    const video = videoRef.current
    
    // Optimized play handler - only try once to avoid blocking
    const handleCanPlay = () => {
      if (video && video.paused) {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          playPromise.catch(() => {
            // Silent fail - video will show black background
          })
        }
      }
    }

    const handleLoadedMetadata = () => {
      // Start playing as soon as metadata is available
      if (video.readyState >= 1 && video.paused) {
        video.play().catch(() => {
          // Retry once after short delay
          setTimeout(() => {
            if (video.paused) {
              video.play().catch(() => {})
            }
          }, 200)
        })
      }
    }

    video.addEventListener('canplay', handleCanPlay, { once: true, passive: true })
    video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true, passive: true })

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
      video.removeEventListener('loadedmetadata', handleLoadedMetadata)
    }
  }, [shouldLoad])

  return (
    <div ref={containerRef} style={{ width: '100%', height: '100%', backgroundColor: '#000000' }}>
      {shouldLoad && (
        <video
          ref={videoRef}
          src={src}
          muted
          loop
          playsInline
          preload="metadata"
          autoPlay
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center',
            backgroundColor: 'transparent'
          }}
          onError={(e) => {
            // Silent error handling - show black background
            console.warn('Mobile video error:', src)
            e.currentTarget.style.opacity = '0'
          }}
        />
      )}
    </div>
  )
}

export function PortfolioSection() {
  const { t } = useTranslation()
  
  const latestProjects = [
    {
      id: 1,
      client: "Touraine Cars",
      title: t("portfolio.project1TitleAlt"), // "Expérience de Conduite Nocturne" (FR) / "Night Drive Experience" (EN)
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.tagSocial"), t("portfolio.tagEvent")],
      video: getAssetUrl("/Banque d_images/halowen.mp4", "video"),
      poster: getAssetUrl("/Banque d_images/Copie de IMG_7149.jpg", "image"),
    },
    {
      id: 2,
      client: "Mr Microbe",
      title: t("portfolio.project2Title"),
      category: t("portfolio.categoryPhoto"),
      tags: [t("portfolio.categoryPhoto"), t("portfolio.tagSocial"), t("portfolio.tagBranding")],
      video: null,
      poster: getAssetUrl("/Banque d_images/art1.jpg", "image"),
    },
    {
      id: 3,
      client: "BSK Immobilier",
      title: t("portfolio.project3TitleAlt2"), // "Résidences Lumière" (FR) / "Light Residences" (EN)
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.tagSocial"), t("portfolio.tagCorporate")],
      video: getAssetUrl("/Banque d_images/Immobilier.mp4", "video"),
      poster: getAssetUrl("/Banque d_images/Copie de M7_00487.jpg", "image"),
    },
    {
      id: 5,
      client: "Castles Rally",
      title: t("portfolio.project5Title"),
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.categoryPhoto"), t("portfolio.tagEvent")],
      video: getAssetUrl("/Banque d_images/rally2.mp4", "video"),
      poster: getAssetUrl("/Banque d_images/Copie de M7_02930.jpg", "image"),
    },
    {
      id: 6,
      client: "Vouvray/Chenin",
      title: t("portfolio.project6Title"),
      category: t("portfolio.categoryPhoto"),
      tags: [t("portfolio.categoryPhoto"), t("portfolio.tagBranding"), t("portfolio.tagDesign")],
      video: null,
      poster: getAssetUrl("/Banque d_images/Copie de M7_09197.jpg", "image"),
    },
    {
      id: 8,
      client: "BSD / UFC Paris",
      title: t("portfolio.project8TitleAlt"), // "Stage d'Immersion MMA" (FR) / "MMA Training Immersion" (EN)
      category: t("portfolio.categoryFilmVideo"),
      tags: [t("portfolio.categoryFilmVideo"), t("portfolio.categoryPhoto"), t("portfolio.tagSocial")],
      video: getAssetUrl("/Banque d_images/stageMMa.mp4", "video"),
      poster: getAssetUrl("/Banque d_images/StageUfc.jpg", "image"),
    },
  ]
  const [activeId, setActiveId] = useState<number>(latestProjects[0]?.id ?? 0)
  const [previewTransform, setPreviewTransform] = useState("translate3d(0, 0, 0)")
  const [stageHeight, setStageHeight] = useState<number | undefined>(undefined)
  const [isDesktop, setIsDesktop] = useState<boolean>(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const listRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)
  const previewStageRef = useRef<HTMLDivElement>(null)
  const rowRefs = useRef<Record<number, HTMLButtonElement | null>>({})

  const activeProject = latestProjects.find((project) => project.id === activeId) ?? latestProjects[0]

  const renderPreviewCard = (withRef: boolean) => (
    <div ref={withRef ? previewRef : undefined} className="latest-preview-card">
      <div className="latest-preview-media">
        {activeProject?.video ? (
          <video
            ref={videoRef}
            key={`video-${activeProject.id}`}
            muted
            loop
            autoPlay
            playsInline
            preload="auto"
            style={{
              opacity: 1,
              willChange: 'auto',
              pointerEvents: 'none',
              backgroundColor: 'transparent'
            }}
            onError={(e) => {
              // Silent error handling for Vercel
              console.warn('Video load error:', activeProject.video)
            }}
            onLoadedData={(e) => {
              // Play immediately when data is loaded
              const video = e.currentTarget
              if (video.readyState >= 2) {
                video.play().catch(() => {
                  // Silent fail
                })
              }
            }}
            onCanPlay={(e) => {
              // Play as soon as video can play
              const video = e.currentTarget
              video.play().catch(() => {
                // Silent fail
              })
            }}
          />
        ) : (
          <Image
            src={activeProject?.poster ?? "/placeholder.jpg"}
            alt={activeProject?.title ?? "Project preview"}
            fill
            className="object-cover"
            priority={activeProject.id === latestProjects[0]?.id || 
                     activeProject.id === latestProjects[1]?.id || 
                     activeProject.id === latestProjects[2]?.id}
          />
        )}
        <div className="latest-preview-glass" />
      </div>

      <div className="latest-preview-meta">
        <div className="latest-preview-tags">
          <span>{activeProject?.client}</span>
          <span className="divider" />
          <span>{activeProject?.category}</span>
        </div>
        <h3 className="text-center">{activeProject?.title}</h3>
      </div>
    </div>
  )

  const updatePreviewPosition = (projectId: number) => {
    if (!listRef.current || !previewRef.current || !previewStageRef.current) return
    const row = rowRefs.current[projectId]
    if (!row) return

    const listRect = listRef.current.getBoundingClientRect()
    const rowRect = row.getBoundingClientRect()
    const previewHeight = previewRef.current.getBoundingClientRect().height
    const listHeight = listRect.height

    const offsetTop = rowRect.top - listRect.top
    const target = offsetTop
    const clamped = Math.max(0, Math.min(target, listHeight - previewHeight))

    setPreviewTransform(`translate3d(0, ${clamped}px, 0)`)
    // Only sync stage height on desktop to avoid mobile gap
    if (isDesktop) {
      setStageHeight(listHeight)
    }
  }

  const isChangingRef = useRef(false)
  const videoLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  
  const handleActivate = (projectId: number) => {
    // Prevent rapid changes that could cause blocking
    if (isChangingRef.current || projectId === activeId) return
    
    // Cancel any pending video loads
    if (videoLoadTimeoutRef.current) {
      clearTimeout(videoLoadTimeoutRef.current)
      videoLoadTimeoutRef.current = null
    }
    
    isChangingRef.current = true
    
    // Use requestIdleCallback for non-blocking state update
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        setActiveId(projectId)
        isChangingRef.current = false
      }, { timeout: 50 })
    } else {
      // Fallback for browsers without requestIdleCallback
      requestAnimationFrame(() => {
        setActiveId(projectId)
        setTimeout(() => {
          isChangingRef.current = false
        }, 50)
      })
    }
  }

  useEffect(() => {
    // Track viewport to toggle desktop-only behavior
    const mq = window.matchMedia("(min-width: 1024px)")
    const handleChange = (e: MediaQueryListEvent | MediaQueryList) => {
      const desktop = e.matches
      setIsDesktop(desktop)
      // Reset stage height when switching to mobile to remove any inline minHeight
      if (!desktop) {
        setStageHeight(undefined)
        setPreviewTransform("translate3d(0, 0, 0)")
      } else {
        // Recompute on entering desktop
        requestAnimationFrame(() => updatePreviewPosition(activeId))
      }
    }
    // Initialize
    handleChange(mq)
    // Listen for changes
    const listener = (e: MediaQueryListEvent) => handleChange(e)
    mq.addEventListener?.("change", listener)
    return () => {
      mq.removeEventListener?.("change", listener)
    }
  }, [activeId])

  useEffect(() => {
    // Defer position update to avoid blocking
    let rafId: number | null = null
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        rafId = requestAnimationFrame(() => updatePreviewPosition(activeId))
      }, { timeout: 100 })
    } else {
      rafId = requestAnimationFrame(() => updatePreviewPosition(activeId))
    }
    return () => {
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [activeId])

  useEffect(() => {
    if (!listRef.current) return
    
    let timeoutId: NodeJS.Timeout
    let rafId: number | null = null
    
    const observer = new ResizeObserver(() => {
      // Debounce resize updates with error handling
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        if (rafId) cancelAnimationFrame(rafId)
        rafId = requestAnimationFrame(() => {
          try {
            if (listRef.current) {
              updatePreviewPosition(activeId)
              if (isDesktop) {
                setStageHeight(listRef.current.getBoundingClientRect().height)
              }
            }
          } catch (error) {
            // Silent error handling - prevent crashes
            console.warn('ResizeObserver callback error:', error)
          }
        })
      }, 50)
    })
    
    try {
      observer.observe(listRef.current)
    } catch (error) {
      // Fallback if ResizeObserver fails
      console.warn('ResizeObserver setup failed:', error)
    }
    
    return () => {
      clearTimeout(timeoutId)
      if (rafId) cancelAnimationFrame(rafId)
      try {
        observer.disconnect()
      } catch (error) {
        // Silent cleanup error
      }
    }
  }, [activeId, isDesktop])

  useEffect(() => {
    let timeoutId: NodeJS.Timeout
    const onResize = () => {
      // Debounce resize events
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        requestAnimationFrame(() => updatePreviewPosition(activeId))
      }, 100)
    }
    window.addEventListener("resize", onResize, { passive: true })
    return () => {
      clearTimeout(timeoutId)
      window.removeEventListener("resize", onResize)
    }
  }, [activeId])

  useEffect(() => {
    setTimeout(() => updatePreviewPosition(activeId), 120)
  }, [])

  // Ultra-simplified video loading - OPTIMIZED FOR VERCEL
  useEffect(() => {
    const video = videoRef.current
    if (!video || !activeProject?.video) {
      return
    }

    // Complete cleanup first
    video.pause()
    video.removeAttribute('src')
    video.load()
    
    let isMounted = true
    let playTimeout: NodeJS.Timeout | null = null
    let retryCount = 0
    const maxRetries = 3

    // FORCE IMMEDIATE LOAD FOR ALL FIRST 3 CARDS ON VERCEL
    const isFirstThreeCards = activeProject.id === latestProjects[0]?.id || 
                              activeProject.id === latestProjects[1]?.id || 
                              activeProject.id === latestProjects[2]?.id

    // Defer video loading to avoid blocking
    const handleCanPlay = () => {
      if (!isMounted || !video) return
      // FORCE IMMEDIATE PLAY FOR FIRST 3 CARDS ON VERCEL
      const playDelay = isFirstThreeCards ? 0 : 100
      playTimeout = setTimeout(() => {
        if (video && isMounted && video.readyState >= 2) {
          // Force play with aggressive retry for Vercel
          const forcePlay = (attempt = 0) => {
            video.play().catch(() => {
              if (attempt < 10 && video && isMounted) {
                setTimeout(() => forcePlay(attempt + 1), 100 * (attempt + 1))
              }
            })
          }
          forcePlay()
        }
      }, playDelay)
    }

    const handleLoadedMetadata = () => {
      // FORCE PLAY ON VERCEL - Start playing as soon as metadata is available
      if (!isMounted || !video) return
      if (video.readyState >= 1) {
          // Aggressive retry for Vercel, especially for first 3 cards
          const forcePlay = (attempt = 0) => {
            video.play().catch(() => {
              if (attempt < (isFirstThreeCards ? 10 : maxRetries) && video && isMounted) {
                setTimeout(() => forcePlay(attempt + 1), isFirstThreeCards ? 50 * (attempt + 1) : 500 * (attempt + 1))
              }
            })
          }
          forcePlay()
      }
    }

    const handleError = () => {
      // Retry loading on error (common on Vercel CDN)
      try {
        if (isMounted && video && retryCount < maxRetries) {
          retryCount++
          setTimeout(() => {
            try {
              if (isMounted && video) {
                video.src = activeProject.video
                video.load()
              }
            } catch (err) {
              console.warn('Video retry error:', err)
            }
          }, 1000 * retryCount)
        } else if (isMounted && video) {
          // Just pause on final error - show poster
          try {
            video.pause()
          } catch (err) {
            // Silent error
          }
        }
      } catch (err) {
        console.warn('Video error handler error:', err)
      }
    }

    const loadDelay = isFirstThreeCards ? 0 : 200 // Load first 3 cards IMMEDIATELY

    // Delay video loading to prevent blocking on hover
    videoLoadTimeoutRef.current = setTimeout(() => {
      if (!isMounted || !video) return

      // FORCE AUTO PRELOAD FOR ALL VIDEOS ON VERCEL
      video.src = activeProject.video
      video.preload = 'auto'
      
      // Simple event listeners
      video.addEventListener('canplay', handleCanPlay, { once: true, passive: true })
      video.addEventListener('loadedmetadata', handleLoadedMetadata, { once: true, passive: true })
      video.addEventListener('error', handleError, { once: false, passive: true })

      // FORCE IMMEDIATE LOAD FOR FIRST 3 CARDS ON VERCEL
      if (isFirstThreeCards) {
        // Load IMMEDIATELY for first 3 cards - no delays, no idle callbacks
        video.load()
        // Also try to play immediately if ready
        if (video.readyState >= 1) {
          video.play().catch(() => {
            // Will retry in handleLoadedMetadata
          })
        }
      } else if ('requestIdleCallback' in window) {
        requestIdleCallback(() => {
          if (isMounted && video) {
            video.load()
          }
        }, { timeout: 200 })
      } else {
        // Fallback - use setTimeout for non-blocking
        setTimeout(() => {
          if (isMounted && video) {
            video.load()
          }
        }, 200)
      }
    }, loadDelay)

    return () => {
      isMounted = false
      if (playTimeout) clearTimeout(playTimeout)
      if (videoLoadTimeoutRef.current) {
        clearTimeout(videoLoadTimeoutRef.current)
        videoLoadTimeoutRef.current = null
      }
      if (video) {
        try {
          video.removeEventListener('canplay', handleCanPlay)
          video.removeEventListener('error', handleError)
          video.pause()
          video.removeAttribute('src')
          video.load()
        } catch (err) {
          // Silent cleanup error
          console.warn('Video cleanup error:', err)
        }
      }
    }
  }, [activeProject?.video, activeId, latestProjects])

  return (
    <section id="portfolio" className="portfolio-latest-section relative overflow-hidden px-4 pb-24 pt-24 text-white md:px-8">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal className="latest-header-top">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div className="space-y-4 flex-1 max-w-6xl">
              <span className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.5em] text-white shadow-[0_0_35px_rgba(89,129,255,0.25)] backdrop-blur-md">
                {t("portfolio.badge")}
              </span>
              <h2 className="latest-heading">
                {t("portfolio.title")}
                <br />
                {t("portfolio.titleLine2")}
              </h2>
              <p className="latest-subheading">
                {t("portfolio.description")}
                <br />
                <span className="latest-subheading-highlight">
                  {t("portfolio.descriptionHighlight")}
                </span>
              </p>
            </div>
            <div className="flex-shrink-0">
              <span className="latest-count">+{String(latestProjects.length).padStart(2, "0")} {t("portfolio.projectsCount")}</span>
            </div>
          </div>
        </Reveal>

        <div className="latest-layout">
          <div
            className="latest-preview-stage"
            ref={previewStageRef}
            // Apply minHeight only on desktop to prevent large gaps on mobile
            style={isDesktop && stageHeight ? { minHeight: stageHeight } : undefined}
          >
            <div className="latest-preview-wrapper" style={{ transform: previewTransform }}>
              <Reveal delay={100} className="latest-preview-reveal">
                {renderPreviewCard(true)}
              </Reveal>
            </div>
          </div>

          <div className="latest-content">
            <div className="latest-list" ref={listRef}>
              {latestProjects.map((project, index) => {
                const isActive = project.id === activeProject?.id
                return (
                  <Reveal key={project.id} delay={index * 90} className="w-full">
                    <button
                      type="button"
                      ref={(node) => {
                        rowRefs.current[project.id] = node
                      }}
                      onMouseEnter={() => handleActivate(project.id)}
                      onFocus={() => handleActivate(project.id)}
                      onClick={() => handleActivate(project.id)}
                      className={`latest-card ${isActive ? "is-active" : ""}`}
                      aria-pressed={isActive}
                    >
                      <div className="latest-card-left">
                        <span className="latest-client">{project.client}</span>
                        <span className="latest-title text-center">{project.title}</span>
                      </div>
                      <div className="latest-card-right">
                        <span className="latest-category">{project.category}</span>
                        <div className="latest-tags">
                          {project.tags.map((tag) => (
                            <span key={tag} className="latest-tag">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      {!isDesktop && (
                        <div className="latest-card-thumb">
                          <div className="latest-card-thumb-media">
                            {project.video ? (
                              <MobileVideo
                                src={project.video}
                                index={index}
                              />
                            ) : (
                              <Image
                                src={project.poster}
                                alt={project.title}
                                fill
                                className="object-cover"
                              />
                            )}
                          </div>
                          <div className="latest-card-thumb-meta">
                            <div className="latest-card-thumb-title">
                              {project.title}
                            </div>
                          </div>
                        </div>
                      )}
                    </button>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>

        {/* Instagram CTA - Élément innovant */}
        <Reveal delay={600} className="mt-12">
          <a
            href="https://www.instagram.com/pixaura_it/"
            target="_blank"
            rel="noopener noreferrer"
            className="group relative block overflow-hidden rounded-3xl border border-white/20 bg-gradient-to-br from-purple-500/20 via-pink-500/20 to-blue-500/20 backdrop-blur-xl p-8 md:p-12 text-white transition-all duration-700 hover:border-white/40 hover:shadow-[0_30px_80px_rgba(168,85,247,0.4)]"
          >
            {/* Animated gradient background */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600/30 via-pink-600/30 to-blue-600/30 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            
            {/* Glowing effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 rounded-3xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex-1 space-y-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full blur-md opacity-50" />
                    <div className="relative w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.98-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.98-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                      </svg>
                    </div>
                  </div>
                  <span className="text-sm font-bold uppercase tracking-[0.3em] text-white/80">Instagram</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black leading-tight">
                  {t("portfolio.instagramTitle")}
                  <br />
                  <span className="bg-gradient-to-r from-purple-300 via-pink-300 to-blue-300 bg-clip-text text-transparent">
                    {t("portfolio.instagramTitleHighlight")}
                  </span>
                </h3>
                <p className="text-base md:text-lg text-white/70 leading-relaxed max-w-2xl">
                  {t("portfolio.instagramDescription")}
                </p>
              </div>
              <div className="flex-shrink-0">
                <div className="group/arrow relative inline-flex items-center gap-3 rounded-full border-2 border-white/30 bg-white/10 px-6 py-4 backdrop-blur-md transition-all duration-500 group-hover:border-white group-hover:bg-white/20">
                  <span className="text-sm font-semibold uppercase tracking-[0.2em]">{t("portfolio.instagramCta")}</span>
                  <svg className="w-5 h-5 transition-transform duration-500 group-hover/arrow:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </div>
              </div>
            </div>
          </a>
        </Reveal>
      </div>
    </section>
  )
}
