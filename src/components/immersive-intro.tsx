"use client"

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import Image from "next/image"
import { useTranslation } from "@/contexts/translation-context"
import { getAssetUrl } from "@/lib/cloudinary"

type Stage = "loading" | "start" | "transition" | "hold" | "finishing" | "hidden"

type ImmersiveIntroProps = {
  onComplete?: () => void
}

const LOADING_DURATION = 2600
const HOLD_DURATION = 900
const RESET_DURATION = 520
const START_TRANSITION_DELAY = 600

const LOADING_PHASES = [
  {
    threshold: 25,
    headline: "Initialisation du noyau créatif",
    detail: "Synchronisation des studios Paris • Doha • Montréal",
    ticker: "Alignement des satellites narratifs",
  },
  {
    threshold: 55,
    headline: "Calibration audiovisuelle globale",
    detail: "Orchestration lumière, audio 360° et FX immersifs",
    ticker: "Harmonisation des fréquences premium",
  },
  {
    threshold: 100,
    headline: "Prêt pour le décollage Pixaura",
    detail: "Dernières vérifications de l'expérience immersive",
    ticker: "Validation du protocole d'entrée",
  },
]

export function ImmersiveIntro({ onComplete }: ImmersiveIntroProps = {}) {
  const { t } = useTranslation()
  const [stage, setStage] = useState<Stage>("transition")
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [holdProgress, setHoldProgress] = useState(0)
  const holdProgressRef = useRef(0)
  const soundOn = true
  const [isFadingOut, setIsFadingOut] = useState(false)
  const [startAnimation, setStartAnimation] = useState(false)

  const holdRafRef = useRef<number | null>(null)
  const resetRafRef = useRef<number | null>(null)
  const holdStartRef = useRef<number | null>(null)
  const stageRef = useRef<Stage>("loading")
  const startTimeoutRef = useRef<number | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioStarted, setAudioStarted] = useState(false)
  const holdPulseRef = useRef<number | null>(null)
  const holdTrailRef = useRef<number | null>(null)
  const [holdPulse, setHoldPulse] = useState(0)
  const [trailPositions, setTrailPositions] = useState<{ id: number; progress: number }[]>([])
  const lastTrailProgressRef = useRef(0)
  const [flashActive, setFlashActive] = useState(false)

  const displayLoading = useMemo(() => Math.round(loadingProgress), [loadingProgress])
  const displayHold = useMemo(() => Math.round(holdProgress), [holdProgress])

  const backgroundVideo =
    stage === "hold" || stage === "transition" || stage === "finishing"
      ? getAssetUrl("/Banque d_images/Backv2.mp4", "video")
      : getAssetUrl("/Banque d_images/Backv2.mp4", "video") // Using Backv2 instead of deleted back3

  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const preloadVideoRef = useRef<HTMLVideoElement | null>(null)
  const nextVideoRef = useRef<HTMLVideoElement | null>(null)
  const [preloadVideoReady, setPreloadVideoReady] = useState(false)
  const [preloadVideoBuffered, setPreloadVideoBuffered] = useState(false)
  const preloadCheckIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const [nextVideoLoaded, setNextVideoLoaded] = useState(false)
  const [showNextVideo, setShowNextVideo] = useState(false)
  
  // Track initial video loaded state to prevent flicker
  const initialVideoLoadedRef = useRef(false)

  const overlayTone =
    stage === "hold" || stage === "finishing"
      ? "bg-black/55"
      : stage === "transition"
        ? "bg-black/35"
        : "bg-black/20"

  const clearHoldAnimations = useCallback(() => {
    if (holdRafRef.current) cancelAnimationFrame(holdRafRef.current)
    if (resetRafRef.current) cancelAnimationFrame(resetRafRef.current)
    if (holdTrailRef.current) cancelAnimationFrame(holdTrailRef.current)
    holdRafRef.current = null
    resetRafRef.current = null
    holdTrailRef.current = null
  }, [])

  const finishIntro = useCallback(() => {
    setHoldProgress(100)
    setStage("finishing")
    // Désactiver le flash à la fin
    setFlashActive(false)
    setTimeout(() => setIsFadingOut(true), 260)
    setTimeout(() => {
      setStage("hidden")
      onComplete?.()
    }, 1100)
  }, [onComplete])

  const animateHold = useCallback(
    (timestamp: number) => {
      if (holdStartRef.current === null) {
        holdStartRef.current = timestamp
      }
      const elapsed = timestamp - holdStartRef.current
      const next = Math.min(100, (elapsed / HOLD_DURATION) * 100)
      setHoldProgress(next)

      if (next >= 100) {
        clearHoldAnimations()
        finishIntro()
        return
      }

      holdRafRef.current = requestAnimationFrame(animateHold)
    },
    [clearHoldAnimations, finishIntro]
  )

  const animateReset = useCallback(
    (timestamp: number, startValue: number, startTimestamp: number) => {
      const elapsed = timestamp - startTimestamp
      const easing = Math.min(1, elapsed / RESET_DURATION)
      const eased = startValue * (1 - easing * easing)
      setHoldProgress(eased)

      if (easing < 1) {
        resetRafRef.current = requestAnimationFrame((next) => animateReset(next, startValue, startTimestamp))
      } else {
        setHoldProgress(0)
      }
    },
    []
  )

  const startHold = useCallback(() => {
    if (stageRef.current !== "hold") return
    clearHoldAnimations()
    holdStartRef.current = null
    holdRafRef.current = requestAnimationFrame(animateHold)
    const now = Date.now()
    setTrailPositions((prev) => [...prev.slice(-8), { id: now, progress: holdProgressRef.current }])
    lastTrailProgressRef.current = holdProgressRef.current
    if (holdTrailRef.current) cancelAnimationFrame(holdTrailRef.current)
    const trailLoop = () => {
      setTrailPositions((prev) =>
        prev
          .map((trail) => ({
            ...trail,
            progress: Math.min(100, trail.progress + 0.8),
          }))
          .filter((trail) => trail.progress <= holdProgressRef.current + 32)
      )
      holdTrailRef.current = requestAnimationFrame(trailLoop)
    }
    holdTrailRef.current = requestAnimationFrame(trailLoop)
    // Activer le flash lumineux pendant toute la durée de l'appui
    setFlashActive(true)
  }, [animateHold, clearHoldAnimations])

  const cancelHold = useCallback(() => {
    if (stageRef.current !== "hold") return
    clearHoldAnimations()
    if (holdProgress === 0) return

    const current = holdProgress
    const startTimestamp = performance.now()
    resetRafRef.current = requestAnimationFrame((timestamp) => animateReset(timestamp, current, startTimestamp))
    if (holdTrailRef.current) cancelAnimationFrame(holdTrailRef.current)
    setTrailPositions([])
    lastTrailProgressRef.current = 0
    // Désactiver le flash quand on relâche
    setFlashActive(false)
  }, [animateReset, clearHoldAnimations, holdProgress])

  useEffect(() => {
    stageRef.current = stage
  }, [stage])

  // Loading stage removed - start directly at transition (Immersion screen)

  useEffect(() => {
    if (stage === "hold") {
      setIsFadingOut(false)
      setHoldProgress((value) => (value === 100 ? 0 : value))
    }
    if (stage !== "start") {
      setStartAnimation(false)
    }
  }, [stage])

  useEffect(() => {
    if (stage === "transition") {
      setHoldProgress(0)
      // Go directly to hold stage (Immersion screen) - no delay
      setStage("hold")
    }
  }, [stage])

  useEffect(() => {
    if (stage !== "hold") return

    const handleWindowMouseUp = () => cancelHold()
    window.addEventListener("mouseup", handleWindowMouseUp)
    window.addEventListener("touchend", handleWindowMouseUp)
    return () => {
      window.removeEventListener("mouseup", handleWindowMouseUp)
      window.removeEventListener("touchend", handleWindowMouseUp)
    }
  }, [cancelHold, stage])

  useEffect(() => () => clearHoldAnimations(), [clearHoldAnimations])
  useEffect(() => {
    let animationId: number
    const animate = () => {
      setHoldPulse((value) => (value + 0.75) % 360)
      animationId = requestAnimationFrame(animate)
    }
    animationId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationId)
  }, [])
  useEffect(() => {
    return () => {
      if (startTimeoutRef.current) clearTimeout(startTimeoutRef.current)
      if (holdTrailRef.current) cancelAnimationFrame(holdTrailRef.current)
    }
  }, [])

  useEffect(() => {
    // Audio file stays local (not uploaded to Cloudinary)
    const audio = new Audio("/Banque d_images/mixkit-relaxing-harp-sweep-2628.wav")
    audio.loop = false
    audio.volume = 0.65
    audio.preload = "auto"
    audio.muted = true
    audioRef.current = audio

    audio
      .play()
      .then(() => {
        audio.pause()
        audio.currentTime = 0
      })
      .catch(() => {
        audio.pause()
        audio.currentTime = 0
      })
      .finally(() => {
        audio.muted = false
      })

    return () => {
      audio.pause()
      audioRef.current = null
    }
  }, [])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (stage === "start" || stage === "hold") {
      let cancelled = false

      const tryPlay = () => {
        if (cancelled) return
        if (stageRef.current !== "start" && stageRef.current !== "hold") return

        audio
          .play()
          .then(() => {
            setAudioStarted(true)
          })
          .catch(() => {
            setAudioStarted(false)
            audio.pause()
            audio.currentTime = 0
            if (!cancelled) {
              setTimeout(tryPlay, 320)
            }
          })
      }

      if (!audioStarted || audio.paused) {
        audio.currentTime = 0
        tryPlay()
      }

      return () => {
        cancelled = true
      }
    }
  }, [stage, audioStarted])

  // Loading stage removed - audio starts immediately
  useEffect(() => {
    // Audio will start when stage is "start" or "hold"
  }, [stage])

  // ULTRA-AGGRESSIVE PRELOAD for Backv2.mp4 - CRITICAL for Vercel CDN performance
  // This ensures the video is 100% ready before user can click START
  useEffect(() => {
    const preloadVideo = preloadVideoRef.current
    if (!preloadVideo) return

    let isReady = false

    const markAsReady = () => {
      if (!isReady) {
        isReady = true
        setPreloadVideoReady(true)
        // Check if enough data is buffered for smooth playback
        if (preloadVideo.readyState >= 3 || preloadVideo.buffered.length > 0) {
          setPreloadVideoBuffered(true)
        }
      }
    }

    const handleCanPlay = () => {
      markAsReady()
    }

    const handleCanPlayThrough = () => {
      // Video can play through without stopping - BEST state for Vercel
      markAsReady()
      setPreloadVideoBuffered(true)
    }

    const handleLoadedData = () => {
      markAsReady()
      // Check buffered data
      if (preloadVideo.buffered.length > 0 && preloadVideo.buffered.end(0) > 1) {
        setPreloadVideoBuffered(true)
      }
    }

    const handleProgress = () => {
      // Aggressive check - mark ready as soon as we have ANY data buffered
      if (preloadVideo.readyState >= 2) {
        markAsReady()
      }
      // Check if we have at least 1 second buffered for smooth playback
      if (preloadVideo.buffered.length > 0) {
        const bufferedEnd = preloadVideo.buffered.end(preloadVideo.buffered.length - 1)
        if (bufferedEnd >= 1 || preloadVideo.readyState >= 3) {
          setPreloadVideoBuffered(true)
        }
      }
    }

    const handleLoadedMetadata = () => {
      // Metadata loaded - start checking buffered progress
      if (preloadVideo.readyState >= 1) {
        markAsReady()
      }
    }

    // Add all event listeners
    preloadVideo.addEventListener('canplay', handleCanPlay, { passive: true })
    preloadVideo.addEventListener('canplaythrough', handleCanPlayThrough, { passive: true })
    preloadVideo.addEventListener('loadeddata', handleLoadedData, { passive: true })
    preloadVideo.addEventListener('loadedmetadata', handleLoadedMetadata, { passive: true })
    preloadVideo.addEventListener('progress', handleProgress, { passive: true })
    preloadVideo.addEventListener('playing', markAsReady, { passive: true })

    // ULTRA-AGGRESSIVE preload settings for Vercel CDN
    preloadVideo.preload = "auto"
    preloadVideo.src = getAssetUrl("/Banque d_images/Backv2.mp4", "video")
    
    // Force load immediately
    preloadVideo.load()

    // CRITICAL: Force buffering by playing and pausing immediately
    // This triggers aggressive downloading on Vercel CDN
    const forceBuffer = async () => {
      try {
        await preloadVideo.play()
        // Let it buffer for a moment
        await new Promise(resolve => setTimeout(resolve, 100))
        preloadVideo.pause()
        preloadVideo.currentTime = 0
        markAsReady()
      } catch (err) {
        // Autoplay blocked - that's okay, browser will still buffer
        markAsReady()
      }
    }
    forceBuffer()

    // AGGRESSIVE polling check for Vercel CDN (some events may not fire reliably)
    const checkProgress = () => {
      if (isReady) {
        if (preloadCheckIntervalRef.current) {
          clearInterval(preloadCheckIntervalRef.current)
          preloadCheckIntervalRef.current = null
        }
        return
      }

      if (preloadVideo.readyState >= 2) {
        markAsReady()
      }

      // Check buffered data
      if (preloadVideo.buffered.length > 0) {
        const bufferedEnd = preloadVideo.buffered.end(preloadVideo.buffered.length - 1)
        if (bufferedEnd >= 0.5) { // At least 0.5 seconds buffered
          setPreloadVideoBuffered(true)
          markAsReady()
        }
      }
    }

    // Check every 100ms for first 5 seconds, then every 500ms
    let checkCount = 0
    preloadCheckIntervalRef.current = setInterval(() => {
      checkProgress()
      checkCount++
      // After 5 seconds, reduce polling frequency
      if (checkCount > 50 && preloadCheckIntervalRef.current) {
        clearInterval(preloadCheckIntervalRef.current)
        preloadCheckIntervalRef.current = setInterval(checkProgress, 500)
      }
      // Stop after 30 seconds total
      if (checkCount > 300) {
        if (preloadCheckIntervalRef.current) {
          clearInterval(preloadCheckIntervalRef.current)
          preloadCheckIntervalRef.current = null
        }
      }
    }, 100)

    return () => {
      if (preloadCheckIntervalRef.current) {
        clearInterval(preloadCheckIntervalRef.current)
        preloadCheckIntervalRef.current = null
      }
      preloadVideo.removeEventListener('canplay', handleCanPlay)
      preloadVideo.removeEventListener('canplaythrough', handleCanPlayThrough)
      preloadVideo.removeEventListener('loadeddata', handleLoadedData)
      preloadVideo.removeEventListener('loadedmetadata', handleLoadedMetadata)
      preloadVideo.removeEventListener('progress', handleProgress)
      preloadVideo.removeEventListener('playing', markAsReady)
    }
  }, [])

  // PRELOAD NEXT VIDEO LAYER when approaching transition - START EARLY
  useEffect(() => {
    const nextVideo = nextVideoRef.current
    if (!nextVideo) return

    // Start preloading NEXT video as soon as we're on "start" stage
    // This ensures it's ready BEFORE the transition happens
    if (stage === "start" && preloadVideoReady && preloadVideoRef.current) {
      const preloadVideo = preloadVideoRef.current
      if (preloadVideo.readyState >= 2 || preloadVideoBuffered) {
        nextVideo.src = getAssetUrl("/Banque d_images/Backv2.mp4", "video")
        nextVideo.preload = "auto"
        nextVideo.currentTime = 0
        nextVideo.load()
        setShowNextVideo(true)
        // Show immediately when ANY data is available
        const checkNext = () => {
          if (nextVideo.readyState >= 1) {
            // Show as soon as we have metadata - don't wait!
            setNextVideoLoaded(true)
          } else {
            requestAnimationFrame(checkNext)
          }
        }
        requestAnimationFrame(checkNext)
      }
    } else if (stage === "transition" || stage === "hold" || stage === "finishing") {
      // Keep next video visible during transition stages
      // It will fade out once main video is ready
    } else {
      // Clear next video only if we're going back
      setShowNextVideo(false)
      setNextVideoLoaded(false)
    }
  }, [stage, preloadVideoReady, preloadVideoBuffered])

  // Load current video when it changes - ZERO BLACK SCREEN strategy
  useEffect(() => {
    const video = videoRef.current
    if (!video || !backgroundVideo) return

    // CRITICAL: When switching to Backv2.mp4, use preloaded video INSTANTLY
    if (backgroundVideo === getAssetUrl("/Banque d_images/Backv2.mp4", "video") && preloadVideoReady && preloadVideoRef.current) {
      const preloadVideo = preloadVideoRef.current
      
      if (preloadVideo.readyState >= 2 || preloadVideoBuffered) {
        // ABSOLUTELY CRITICAL: DO NOT reset videoLoaded - keep current video visible!
        // The next video layer is already showing, so we maintain continuity
        
        // ABSOLUTE PRIORITY: Keep current video visible, use preloaded video directly
        // If next video layer exists and is ready, keep it visible
        if (showNextVideo && nextVideoLoaded) {
          // Next video is already visible - keep it visible!
          // Just prepare main video in background without changing visibility
          video.src = backgroundVideo
          video.preload = "auto"
          video.currentTime = 0
          video.load()
          
          // Once main video is ready, switch seamlessly
          const switchToMain = () => {
            if (video.readyState >= 2) {
              setVideoLoaded(true)
              setVideoError(false)
              video.play().catch(() => {
                setTimeout(() => video.play().catch(() => {}), 50)
              })
              // Fade out next layer smoothly
              setTimeout(() => {
                setShowNextVideo(false)
              }, 100)
            } else if (video.readyState >= 1) {
              // Even with just metadata, show it to prevent black
              setVideoLoaded(true)
              setVideoError(false)
              video.play().catch(() => {})
              setTimeout(() => setShowNextVideo(false), 150)
            } else {
              requestAnimationFrame(switchToMain)
            }
          }
          requestAnimationFrame(switchToMain)
          return
        }
        
        // CRITICAL: If preloaded video is ready, show it IMMEDIATELY
        // Don't wait, don't reset - use it NOW
        video.src = backgroundVideo
        video.preload = "auto"
        video.currentTime = 0
        video.load()
        
        // Show video IMMEDIATELY - even before readyState check
        // This prevents any black screen
        setVideoLoaded(true)
        setVideoError(false)
        
        // Then ensure it plays
        const ensurePlaying = () => {
          if (video.readyState >= 2) {
            video.play().catch(() => {
              setTimeout(() => video.play().catch(() => {}), 50)
            })
          } else if (video.readyState >= 1) {
            video.play().catch(() => {})
          } else {
            requestAnimationFrame(ensurePlaying)
          }
        }
        requestAnimationFrame(ensurePlaying)
        return
      }
    }

    // Only reset for initial video - this is safe
    // BUT: If we're coming from a stage where Backv2 was showing, keep it visible
    if (stage === "loading") {
      // Only reset on initial load
      setVideoLoaded(false)
      setShowNextVideo(false)
    }
    // For Backv2.mp4 or other stages, NEVER reset - maintain continuity

    // Aggressive preloading
    video.src = backgroundVideo
    video.preload = "auto"
    video.load()
  }, [backgroundVideo, preloadVideoReady, preloadVideoBuffered, showNextVideo, nextVideoLoaded])

  useEffect(() => {
    if (stage === "hold") return
    if (holdTrailRef.current) cancelAnimationFrame(holdTrailRef.current)
    setTrailPositions([])
    lastTrailProgressRef.current = 0
  }, [stage])

  useEffect(() => {
    holdProgressRef.current = holdProgress
  }, [holdProgress])

  useEffect(() => {
    if (stage !== "hold") return
    if (holdProgress - lastTrailProgressRef.current < 6) return
    lastTrailProgressRef.current = holdProgress
    const id = Date.now()
    setTrailPositions((prev) => [...prev.slice(-10), { id, progress: holdProgress }])
  }, [holdProgress, stage])

  const handleStart = () => {
    if (stage !== "start" || startAnimation) return
    setStartAnimation(true)
    startTimeoutRef.current = window.setTimeout(() => {
      setStage("transition")
      setStartAnimation(false)
    }, START_TRANSITION_DELAY)
  }

  const currentPhase = useMemo(() => {
    return LOADING_PHASES.find((phase) => displayLoading <= phase.threshold) ?? LOADING_PHASES[LOADING_PHASES.length - 1]
  }, [displayLoading])

  const progressScale = useMemo(() => Math.max(displayLoading, 2) / 100, [displayLoading])
  const progressRatio = useMemo(() => Math.min(1, Math.max(0, displayLoading / 100)), [displayLoading])
  const progressFormatted = useMemo(() => displayLoading.toString().padStart(3, "0"), [displayLoading])
  const progressCircleBackground = useMemo(() => {
    const angle = progressRatio * 360
    return `conic-gradient(
      from -90deg,
      rgba(78,129,255,0.85) 0deg,
      rgba(130,84,255,0.9) ${Math.max(angle - 12, 0)}deg,
      rgba(101,225,255,0.95) ${angle}deg,
      rgba(255,255,255,0.08) ${angle}deg 360deg
    )`
  }, [progressRatio])
  const progressAngle = useMemo(() => progressRatio * 360, [progressRatio])

  if (stage === "hidden") return null

  return (
    <div
      className={`fixed inset-0 z-[9999] overflow-hidden bg-transparent transition-opacity duration-700 ${isFadingOut ? "pointer-events-none opacity-0" : "opacity-100"
        }`}
    >
      {/* PRELOAD VIDEO - Hidden, aggressively preloads Backv2.mp4 for INSTANT transition on Vercel */}
      <video
        ref={preloadVideoRef}
        className="hidden"
        preload="auto"
        muted
        playsInline
        src={getAssetUrl("/Banque d_images/Backv2.mp4", "video")}
      />
      {/* NEXT VIDEO LAYER - Preloads and shows Backv2.mp4 BEFORE transition to prevent black screen */}
      {showNextVideo && (
        <video
          ref={nextVideoRef}
          className="hidden md:block absolute inset-0 h-full w-full object-cover z-[1]"
          autoPlay={true}
          loop={true}
          muted={true}
          playsInline={true}
          preload="auto"
          style={{
            opacity: nextVideoLoaded ? 1 : 0,
            transition: 'opacity 0.05s ease-in-out',
          }}
          onLoadedData={() => {
            setNextVideoLoaded(true)
          }}
          onCanPlay={() => {
            setNextVideoLoaded(true)
          }}
          onProgress={() => {
            const video = nextVideoRef.current
            if (video && video.readyState >= 1) {
              setNextVideoLoaded(true)
            }
          }}
        >
          <source src={getAssetUrl("/Banque d_images/Backv2.mp4", "video")} type="video/mp4" />
        </video>
      )}
      
      {/* Background video - hidden on mobile, visible on desktop */}
      {/* REMOVED key prop - it was causing React to recreate element and reset state */}
      <video
        ref={videoRef}
        className="hidden md:block absolute inset-0 h-full w-full object-cover"
        autoPlay={true}
        loop={true}
        muted={true}
        playsInline={true}
        preload="auto"
        onLoadedMetadata={(e) => {
          // Start playing as soon as metadata is loaded (faster on Vercel)
          const video = e.currentTarget
          setVideoLoaded(true)
          setVideoError(false)
          if (video.readyState >= 1) {
            video.play().catch(() => {
              // Retry after a short delay
              setTimeout(() => {
                video.play().catch(() => { })
              }, 500)
            })
          }
        }}
        onLoadedData={() => {
          setVideoLoaded(true)
          setVideoError(false)
        }}
        onCanPlay={() => {
          setVideoLoaded(true)
          setVideoError(false)
        }}
        onProgress={() => {
          // Show video as soon as we have some data for Vercel
          const video = videoRef.current
          if (video && video.readyState >= 1) {
            // readyState >= 1 (HAVE_METADATA) means we can start showing it
            // readyState >= 2 (HAVE_CURRENT_DATA) means we can play current frame
            setVideoLoaded(true)
            setVideoError(false)
          }
          // Additional check: if we have buffered data, definitely show
          if (video && video.buffered.length > 0 && video.buffered.end(0) > 0) {
            setVideoLoaded(true)
            setVideoError(false)
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
            } else {
              console.warn('Video loading error after retries:', backgroundVideo)
              setVideoError(true)
              setVideoLoaded(false)
            }
          }
          retryLoad()
        }}
        onLoadStart={() => {
          // Don't reset loaded state on load start to prevent flickering
        }}
        style={{
          opacity: videoLoaded || (showNextVideo && nextVideoLoaded) ? 1 : 0,
          transition: 'opacity 0.05s ease-in-out',
        }}
      >
        <source src={backgroundVideo} type="video/mp4" />
      </video>
      {/* Fallback black background - NEVER show if ANY video is loading/loaded */}
      {/* This ensures zero black screen - if ANY video exists (even loading), don't show black */}
      {!videoLoaded && !videoError && !showNextVideo && !nextVideoLoaded && (
        <div className="hidden md:block absolute inset-0 bg-transparent" />
      )}
      {/* Background image - visible only on mobile */}
      <img
        src={getAssetUrl("/Banque d_images/backnoiree.png", "image")}
        alt="Background"
        className="block md:hidden absolute inset-0 h-full w-full object-cover"
      />

      <div className={`absolute inset-0 ${overlayTone}`} />
      <div className="absolute inset-0 bg-[url('/Banque d_images/noise.png')] opacity-[0.08] mix-blend-overlay" />

      {stage === "loading" && (
        <div className="relative z-10 flex h-full w-full flex-col justify-between px-4 py-6 sm:px-8 sm:py-14 text-white md:px-16">
          <div className="pointer-events-none absolute inset-x-0 top-[-14%] mx-auto h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,_rgba(68,109,255,0.28),_transparent_78%)] blur-[160px]" />
          <div className="pointer-events-none absolute inset-x-0 bottom-[-18%] mx-auto h-[540px] w-[540px] rounded-full bg-[radial-gradient(circle,_rgba(255,206,92,0.32),_transparent_80%)] blur-[190px]" />

          <header className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.4em] sm:tracking-[0.52em] text-white/70">
            <div className="flex items-center gap-2 sm:gap-3 text-white/60">
              <span className="rounded-full border border-white/20 bg-white/5 px-3 py-1 sm:px-4 sm:py-1.5 text-[9px] sm:text-[10px] font-medium uppercase tracking-[0.35em] sm:tracking-[0.5em] text-white/80 whitespace-nowrap">
                SYNC {progressFormatted}%
              </span>
            </div>
          </header>

          <main className="relative flex flex-1 flex-col items-center justify-center px-4">
            <div className="relative flex flex-col items-center gap-8 sm:gap-12">
              <div className="flex flex-col items-center gap-2 sm:gap-3 text-[10px] sm:text-xs uppercase tracking-[0.5em] sm:tracking-[0.62em] text-white/50 text-center">
                <span className="text-white/75 text-[11px] sm:text-xs leading-tight">SÉQUENCE DE CHARGEMENT IMMERSIVE</span>
              </div>

              <div className="relative flex items-center justify-center w-full max-w-[340px] aspect-square">
                <div className="relative w-full h-full rounded-full border border-white/20 bg-white/5 backdrop-blur-3xl shadow-[0_40px_70px_rgba(8,14,46,0.55)]">
                  <div className="absolute inset-[4%] sm:inset-6 rounded-full border border-white/15 bg-black/55 backdrop-blur-3xl shadow-[inset_0_0_65px_rgba(17,33,84,0.55)]" />
                  <div className="absolute inset-[4%] sm:inset-6 rounded-full opacity-90" style={{ background: progressCircleBackground }} />
                  <div className="absolute inset-[4%] sm:inset-6 rounded-full">
                    <div
                      className="absolute left-1/2 top-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2"
                      style={{ transform: `rotate(${progressAngle}deg)` }}
                    >
                      <div className="absolute left-1/2 top-[5%] sm:top-[18px] h-3 w-3 sm:h-4 sm:w-4 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,_rgba(255,224,150,0.98),_rgba(255,164,63,0.8))] shadow-[0_0_25px_rgba(255,193,79,0.95)]" />
                    </div>
                  </div>
                  <div className="absolute inset-[30%] sm:inset-[102px] rounded-full border border-white/25 bg-[radial-gradient(circle,_rgba(24,35,72,0.9),_transparent_85%)] backdrop-blur-xl" />
                  <div className="absolute inset-[35%] sm:inset-[118px] flex flex-col items-center justify-center gap-3 sm:gap-4 text-center uppercase">
                    <span className="text-[9px] sm:text-[11px] tracking-[0.4em] sm:tracking-[0.55em] text-white/50 leading-tight">STATUS</span>
                    <span className="text-[clamp(32px,12vw,70px)] font-black tracking-tight text-white drop-shadow-[0_0_35px_rgba(255,196,111,0.45)] leading-none">
                      {progressFormatted}%
                    </span>
                    <span className="text-[8px] sm:text-[10px] tracking-[0.35em] sm:tracking-[0.48em] text-white/55 leading-tight px-2">EXPERIENCE BOOT SEQUENCE</span>
                  </div>
                  <div className="absolute inset-[10%] sm:inset-[36px] rounded-full border border-white/15" />
                  <div className="absolute inset-[10%] sm:inset-[36px] rounded-full border border-white/10 border-dashed opacity-40 animate-[spin_14s_linear_infinite]" />
                  <div className="absolute inset-[44%] sm:inset-[150px] flex items-center justify-between px-3 sm:px-5 text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.38em] text-white/55">
                    <span>0%</span>
                    <span>100%</span>
                  </div>
                </div>
                <div className="pointer-events-none absolute inset-0 -z-10 rounded-full bg-[radial-gradient(circle,_rgba(92,110,255,0.38),_transparent_70%)] blur-2xl animate-[pulse_4.5s_ease-in-out_infinite]" />
                <div className="pointer-events-none absolute inset-0 -z-20 animate-[spin_18s_linear_infinite] rounded-full border border-white/10 opacity-40" />
                <div className="pointer-events-none absolute inset-[-5%] -z-30 w-[110%] h-[110%] rounded-full border border-white/20 opacity-30 blur-sm" />
              </div>

              <div className="flex flex-col items-center gap-2 sm:gap-3 text-[11px] sm:text-sm uppercase tracking-[0.4em] sm:tracking-[0.48em] text-white/70 text-center px-4">
                <span className="leading-tight">{currentPhase.headline}</span>
                <span className="text-white/50 text-[10px] sm:text-sm leading-tight">{currentPhase.detail}</span>
              </div>
            </div>
          </main>
        </div>
      )}

      {stage === "transition" && (
        <div className="relative z-10 flex h-full w-full flex-col items-center justify-center gap-16 px-8 py-10 text-white md:px-16">
          <div className="flex flex-col items-center gap-4 text-center uppercase tracking-[0.5em] text-white/70">
            <span className="text-xs text-white/55">Séquence d&apos;activation</span>
            <div className="flex flex-wrap items-center justify-center gap-4 text-[clamp(36px,8vw,72px)] font-black">
              <span>Immersion</span>
              <span className="inline-flex items-center gap-3 rounded-full border border-white/30 bg-white/10 px-6 py-2 text-xs font-semibold tracking-[0.4em] text-white">
                lancement
              </span>
            </div>
            <span className="text-xs text-white/55">Préparez-vous à maintenir pour débloquer</span>
          </div>

          <div className="relative h-64 w-64 max-w-[70vw]">
            <div className="absolute inset-0 rounded-full border border-white/15 opacity-60" />
            <div className="absolute inset-6 rounded-full border border-white/20 opacity-40" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative h-full w-full">
                <span className="launch-ring absolute inset-0 rounded-full border border-white/30" />
                <span className="launch-ring launch-ring-delay absolute inset-[12%] rounded-full border border-white/20" />
                <span className="launch-core absolute left-1/2 top-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(145,196,255,0.82),_rgba(22,36,84,0.92))] shadow-[0_0_45px_rgba(64,162,255,0.7)]" />
              </div>
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="launch-particles relative h-[88%] w-[88%] rounded-full border border-white/10">
                {[...Array(12)].map((_, index) => (
                  <span
                    key={index}
                    className="launch-particle absolute h-1.5 w-1.5 rounded-full bg-white/80 shadow-[0_0_12px_rgba(255,255,255,0.65)]"
                    style={{ transform: `rotate(${index * 30}deg) translateX(48%)` }}
                  />
                ))}
              </div>
            </div>
          </div>

          <p className="text-xs uppercase tracking-[0.4em] text-white/55">
            Synchronisation globale • Hologramme orbital en cours d&apos;initialisation
          </p>
        </div>
      )}

      {(stage === "hold" || stage === "finishing") && (
        <div className="relative z-10 flex h-full w-full flex-col justify-between px-8 py-10 text-white md:px-16">
          {/* Flash lumineux amélioré pendant l'appui */}
          {flashActive && (
            <>
              {/* Flash principal - intensité variable selon la progression */}
              <div
                className="pointer-events-none fixed inset-0 z-[10000] transition-opacity duration-200"
                style={{
                  opacity: 0.3 + (holdProgress / 100) * 0.4,
                  background: `radial-gradient(circle at center, 
                    rgba(255,255,255,${0.6 + (holdProgress / 100) * 0.3}) 0%, 
                    rgba(100,180,255,${0.5 + (holdProgress / 100) * 0.3}) 15%, 
                    rgba(150,100,255,${0.4 + (holdProgress / 100) * 0.2}) 35%, 
                    rgba(50,150,255,${0.2 + (holdProgress / 100) * 0.2}) 50%, 
                    transparent 75%)`,
                }}
              />
              {/* Halo pulsant autour du bouton */}
              <div
                className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center transition-opacity duration-200"
                style={{
                  opacity: 0.4 + (holdProgress / 100) * 0.3,
                }}
              >
                <div
                  className="absolute rounded-full blur-3xl transition-all duration-300"
                  style={{
                    width: `${200 + (holdProgress / 100) * 300}px`,
                    height: `${200 + (holdProgress / 100) * 300}px`,
                    background: `radial-gradient(circle, 
                      rgba(255,255,255,${0.8 + (holdProgress / 100) * 0.2}) 0%, 
                      rgba(100,200,255,${0.7 + (holdProgress / 100) * 0.2}) 30%, 
                      rgba(150,100,255,${0.5 + (holdProgress / 100) * 0.2}) 60%, 
                      transparent 100%)`,
                    animation: 'pulse 1.5s ease-in-out infinite',
                  }}
                />
              </div>
              {/* Effet de lueur supplémentaire */}
              <div
                className="pointer-events-none fixed inset-0 z-[9998] transition-opacity duration-200"
                style={{
                  opacity: 0.2 + (holdProgress / 100) * 0.25,
                  background: `conic-gradient(from 0deg at 50% 50%, 
                    rgba(255,255,255,${0.3 + (holdProgress / 100) * 0.2}) 0deg, 
                    rgba(100,200,255,${0.25 + (holdProgress / 100) * 0.15}) 90deg, 
                    rgba(150,100,255,${0.2 + (holdProgress / 100) * 0.15}) 180deg, 
                    rgba(255,255,255,${0.3 + (holdProgress / 100) * 0.2}) 360deg)`,
                  filter: 'blur(60px)',
                }}
              />
            </>
          )}
          <header className="flex flex-col items-center justify-center gap-4 sm:gap-5 pt-8 sm:pt-10 md:pt-12">
            <Image
              src={getAssetUrl("/Banque d_images/PIXaura-soft white.png", "image")}
              alt="Pixaura logo"
              width={560}
              height={168}
              className="h-[clamp(80px,15vw,160px)] w-auto object-contain drop-shadow-[0_0_30px_rgba(0,0,0,0.45)]"
              priority
            />
            <span className="text-[clamp(14px,2.5vw,20px)] font-normal uppercase tracking-[0.45em] text-white/70 mt-1 sm:mt-2 text-center">
              Agence créative française
            </span>
          </header>
          <main className="flex flex-1 flex-col items-center justify-center gap-14">

            <button
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
              onTouchStart={(event) => {
                event.preventDefault()
                startHold()
              }}
              onTouchEnd={(event) => {
                event.preventDefault()
                cancelHold()
              }}
              onTouchMove={(event) => {
                // Empêcher la sélection de texte sur mobile
                event.preventDefault()
              }}
              onContextMenu={(event) => {
                // Empêcher le menu contextuel sur mobile (peut causer la sélection)
                if (window.innerWidth < 768) {
                  event.preventDefault()
                }
              }}
              disabled={stage !== "hold"}
              className="group relative flex h-40 w-40 items-center justify-center rounded-full border border-white/45 bg-white/10 text-[11px] font-semibold uppercase tracking-[0.35em] text-white shadow-[0_30px_60px_rgba(8,13,38,0.55)] transition-all duration-500 hover:scale-[1.06] disabled:cursor-default disabled:opacity-80"
              style={{
                WebkitUserSelect: 'none',
                userSelect: 'none',
                WebkitTouchCallout: 'none',
                touchAction: 'manipulation',
              }}
            >
              <span 
                className="relative z-20 tracking-[0.38em] select-none md:select-auto"
                style={{
                  WebkitUserSelect: 'none',
                  userSelect: 'none',
                  WebkitTouchCallout: 'none',
                }}
              >
                cliquez & maintenez
              </span>
              <div className="pointer-events-none absolute inset-0 rounded-full bg-[radial-gradient(circle,_rgba(112,162,255,0.2),_transparent_75%)] blur-[18px]" />
              <div className="absolute inset-3 rounded-full border border-white/25 opacity-60" />
              <div className="absolute inset-[10px] rounded-full border border-white/15 opacity-60" />
              <div
                className="pointer-events-none absolute inset-1 rounded-full opacity-80 blur-[8px] transition-opacity duration-500"
                style={{
                  opacity: stage === "hold" ? 0.95 : 0.6,
                  background: `conic-gradient(from ${holdPulse}deg, rgba(92,144,255,0.45), rgba(148,99,255,0.6), rgba(86,229,255,0.45), rgba(92,144,255,0.45))`,
                }}
              />
              <div
                className="pointer-events-none absolute inset-[18px] rounded-full border border-white/40"
                style={{
                  opacity: 0.35 + holdProgress / 220,
                  boxShadow: `0 0 ${12 + holdProgress / 4}px rgba(102, 183, 255, 0.45)`,
                }}
              />
              <div className="pointer-events-none absolute inset-[26px] rounded-full border border-white/30 opacity-30 animate-[spin_10s_linear_infinite]" />
              <div className="pointer-events-none absolute inset-[6px] rounded-full">
                {trailPositions.map((trail) => {
                  const angle = (trail.progress / 100) * 360
                  const distance = 60 + (holdProgress / 100) * 8
                  const alpha = Math.max(0, 1 - Math.abs(holdProgress - trail.progress) / 35)
                  const scale = 1 + holdProgress / 220
                  return (
                    <span
                      key={trail.id}
                      className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,_rgba(130,214,255,0.9),_rgba(90,132,255,0.6))] shadow-[0_0_12px_rgba(90,150,255,0.85)] transition-transform duration-150"
                      style={{
                        transform: `rotate(${angle}deg) translateX(${distance}px) scale(${scale})`,
                        opacity: alpha,
                      }}
                    />
                  )
                })}
              </div>
              <div className="pointer-events-none absolute inset-[22px] animate-[pulse_2.4s_ease-in-out_infinite] rounded-full border border-white/15 opacity-40" />
              <svg className="absolute inset-0 z-10 h-full w-full rotate-[-90deg]" viewBox="0 0 160 160">
                <circle cx="80" cy="80" r="74" stroke="rgba(255,255,255,0.22)" strokeWidth="3" fill="none" />
                <circle
                  cx="80"
                  cy="80"
                  r="74"
                  stroke="url(#holdGradient)"
                  strokeWidth="5"
                  strokeLinecap="round"
                  strokeDasharray={2 * Math.PI * 74}
                  strokeDashoffset={((100 - holdProgress) / 100) * 2 * Math.PI * 74}
                  fill="none"
                />
                <defs>
                  <linearGradient id="holdGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
                    <stop offset="50%" stopColor="rgba(124,51,255,0.9)" />
                    <stop offset="100%" stopColor="rgba(26,163,255,0.95)" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="pointer-events-none absolute inset-[34px] rounded-full border border-white/10 opacity-20 animate-[spin_18s_linear_infinite_reverse]" />
            </button>

            <div className="flex flex-col items-center gap-2 text-[11px] uppercase tracking-[0.35em] text-white/65">
              <div className="flex items-center gap-4 text-white/75">
                <span>progression</span>
                <span>{displayHold.toString().padStart(3, "0")}%</span>
              </div>
              <div className="flex items-center gap-4">
                <span>experience</span>
                <div className="h-[2px] w-32 overflow-hidden rounded-full bg-white/20">
                  <div
                    className="h-full w-full origin-left bg-white transition-transform duration-100"
                    style={{ transform: `scaleX(${Math.max(displayHold, 2) / 100})` }}
                  />
                </div>
              </div>
            </div>
          </main>
        </div>
      )}
    </div>
  )
}
