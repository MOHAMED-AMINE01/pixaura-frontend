"use client"

import { useCallback, useEffect, useRef, useState, useMemo } from "react"
import { Pause, Play, Volume2, VolumeX } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"
import { getAssetUrl } from "@/lib/cloudinary"

export function HomeVideoCarousel() {
  const { t } = useTranslation()

  const slide1 = useMemo(() => ({
    id: 2,
    title: t("portfolio.carouselSlide2Title"),
    description: t("portfolio.carouselSlide2Description"),
    video: getAssetUrl("/Banque d_images/rally1.mp4", "video"),
    tags: [t("portfolio.carouselSlide2Tag1"), t("portfolio.carouselSlide2Tag2"), t("portfolio.carouselSlide2Tag3")],
  }), [t])

  const slide2 = useMemo(() => ({
    id: 1,
    title: t("portfolio.carouselSlide1Title"),
    description: t("portfolio.carouselSlide1Description"),
    video: getAssetUrl("/Banque d_images/Immobilier.mp4", "video"),
    tags: [t("portfolio.carouselSlide1Tag1"), t("portfolio.carouselSlide1Tag2"), t("portfolio.carouselSlide1Tag3")],
  }), [t])

  // First video states
  const [isMuted1, setIsMuted1] = useState(true)
  const [isPlaying1, setIsPlaying1] = useState(true)
  const [isVisible1, setIsVisible1] = useState(false)
  const videoRef1 = useRef<HTMLVideoElement | null>(null)
  const sectionRef1 = useRef<HTMLDivElement>(null)

  // Second video states
  const [isMuted2, setIsMuted2] = useState(true)
  const [isPlaying2, setIsPlaying2] = useState(true)
  const [isVisible2, setIsVisible2] = useState(false)
  const videoRef2 = useRef<HTMLVideoElement | null>(null)
  const sectionRef2 = useRef<HTMLDivElement>(null)

  const containerRef = useRef<HTMLDivElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Intersection Observer - First Video
  useEffect(() => {
    if (!sectionRef1.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible1) {
            setIsVisible1(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    )

    observer.observe(sectionRef1.current)

    return () => {
      observer.disconnect()
    }
  }, [isVisible1])

  // Intersection Observer - Second Video
  useEffect(() => {
    if (!sectionRef2.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible2) {
            setIsVisible2(true)
            observer.disconnect()
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px',
      }
    )

    observer.observe(sectionRef2.current)

    return () => {
      observer.disconnect()
    }
  }, [isVisible2])

  // MAIN VIDEO LOGIC: First Video
  useEffect(() => {
    const video = videoRef1.current
    if (!video) return

    video.muted = isMuted1

    if (isPlaying1) {
      if (video.getAttribute('src')) {
        if (video.paused) {
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise.catch(() => {})
          }
        }
      }
    } else {
      if (!video.paused) {
        video.pause()
      }
    }
  }, [isPlaying1, isMuted1])

  // MAIN VIDEO LOGIC: Second Video
  useEffect(() => {
    const video = videoRef2.current
    if (!video) return

    video.muted = isMuted2

    if (isPlaying2) {
      if (video.getAttribute('src')) {
        if (video.paused) {
          const playPromise = video.play()
          if (playPromise !== undefined) {
            playPromise.catch(() => {})
          }
        }
      }
    } else {
      if (!video.paused) {
        video.pause()
      }
    }
  }, [isPlaying2, isMuted2])

  const togglePlay1 = useCallback(() => {
    setIsPlaying1(prev => !prev)
  }, [])

  const toggleMute1 = useCallback(() => {
    setIsMuted1(prev => !prev)
  }, [])

  const togglePlay2 = useCallback(() => {
    setIsPlaying2(prev => !prev)
  }, [])

  const toggleMute2 = useCallback(() => {
    setIsMuted2(prev => !prev)
  }, [])

  // Helper to handle canPlay event - First Video
  const handleCanPlay1 = () => {
    if (isPlaying1) {
      const video = videoRef1.current
      if (video && video.paused) {
        video.play().catch(() => { })
      }
    }
  }

  // Helper to handle canPlay event - Second Video
  const handleCanPlay2 = () => {
    if (isPlaying2) {
      const video = videoRef2.current
      if (video && video.paused) {
        video.play().catch(() => { })
      }
    }
  }

  // Inject custom CSS animations for separator
  useEffect(() => {
    const styleId = 'separator-animations'
    if (document.getElementById(styleId)) return

    const style = document.createElement('style')
    style.id = styleId
    style.textContent = `
      @keyframes shimmer {
        0% {
          transform: translateX(-100%);
          opacity: 0;
        }
        50% {
          opacity: 1;
        }
        100% {
          transform: translateX(400%);
          opacity: 0;
        }
      }
      @keyframes float {
        0%, 100% {
          transform: translateY(0) scale(1);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-8px) scale(1.2);
          opacity: 1;
        }
      }
      @keyframes splatter-float {
        0%, 100% {
          transform: translateY(0) translateX(0) rotate(0deg) scale(1);
          opacity: 0.4;
        }
        25% {
          transform: translateY(-5px) translateX(3px) rotate(5deg) scale(1.1);
          opacity: 0.6;
        }
        50% {
          transform: translateY(-10px) translateX(-2px) rotate(-3deg) scale(1.15);
          opacity: 0.7;
        }
        75% {
          transform: translateY(-5px) translateX(-3px) rotate(2deg) scale(1.05);
          opacity: 0.5;
        }
      }
    `
    document.head.appendChild(style)

    return () => {
      const existingStyle = document.getElementById(styleId)
      if (existingStyle) {
        existingStyle.remove()
      }
    }
  }, [])

  // Helper function to render a video block
  const renderVideoBlock = (
    slide: typeof slide1,
    videoRef: React.RefObject<HTMLVideoElement | null>,
    sectionRef: React.RefObject<HTMLDivElement | null>,
    isVisible: boolean,
    isPlaying: boolean,
    isMuted: boolean,
    togglePlay: () => void,
    toggleMute: () => void,
    handleCanPlay: () => void
  ) => (
    <div
      ref={sectionRef}
      className="relative min-h-[85vh] w-full overflow-hidden py-8"
    >
      {/* Main Container */}
      <div
        className={`relative z-10 flex h-full w-full items-center justify-center px-4 lg:px-6 xl:px-8 transition-opacity duration-700 ease-out ${isVisible ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          }`}
      >
        <div className="grid w-full max-w-7xl grid-cols-1 gap-6 lg:grid-cols-[1fr_2fr_1fr] lg:gap-6 xl:gap-8 items-center relative">

          {/* Left Side */}
          <div
            className={`order-2 lg:order-1 lg:pr-2 xl:pr-4 relative transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
                ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
                : 'opacity-0 -translate-x-20 translate-y-10 scale-95'
              }`}
          >
            <div
              className={`space-y-6 transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] opacity-100 translate-x-0 scale-100`}
            >
              <div className="flex flex-wrap gap-2">
                {slide.tags.map((tag, index) => (
                  <span
                    key={tag}
                    className={`group/tag inline-flex items-center rounded-full border border-white/30 bg-gradient-to-br from-white/12 via-white/8 to-white/5 px-5 py-2 text-[10px] font-black uppercase tracking-[0.45em] text-white backdrop-blur-2xl transition-all duration-700 hover:border-cyan-300/50 hover:bg-gradient-to-br hover:from-cyan-400/20 hover:via-cyan-300/15 hover:to-cyan-400/10 hover:scale-110 hover:shadow-[0_0_30px_rgba(34,211,238,0.5),0_0_60px_rgba(34,211,238,0.2)] ${isVisible
                        ? 'opacity-100 translate-y-0 scale-100'
                        : 'opacity-0 translate-y-8 scale-90'
                      }`}
                    style={{
                      transitionDelay: isVisible ? `${400 + index * 100}ms` : '0ms',
                      textShadow: '0 0 20px rgba(34,211,238,0.3)',
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <h2
                className={`text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extralight leading-[1.1] text-white transition-all duration-[1800ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-12 scale-95'
                  }`}
                style={{
                  letterSpacing: '-0.03em',
                  textShadow: '0 0 60px rgba(255,255,255,0.2), 0 0 100px rgba(34,211,238,0.15), 0 6px 40px rgba(0,0,0,0.8)',
                  background: 'linear-gradient(135deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0.95) 50%, rgba(34,211,238,0.9) 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {slide.title}
              </h2>

              <p
                className={`text-base md:text-lg lg:text-xl text-white/85 font-extralight leading-relaxed max-w-md transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-10'
                  }`}
                style={{
                  textShadow: '0 3px 25px rgba(0,0,0,0.7), 0 0 30px rgba(34,211,238,0.1)',
                }}
              >
                {slide.description}
              </p>
            </div>
          </div>

          {/* Center - Video Frame */}
          <div
            className={`relative order-1 lg:order-2 transition-all duration-[2500ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
                ? 'opacity-100 translate-y-0 scale-100'
                : 'opacity-0 translate-y-20 scale-90'
              }`}
          >
            {/* Glow Effects - Static (no animations) */}
            <div className="absolute -inset-8 rounded-[44px] bg-gradient-to-r from-cyan-400/12 via-white/18 to-purple-400/12 opacity-80 blur-3xl" />
            <div className="absolute -inset-6 rounded-[40px] bg-gradient-to-br from-white/15 via-cyan-500/12 to-purple-500/12 blur-2xl" />
            <div className="absolute -inset-4 rounded-[36px] bg-gradient-to-t from-white/12 via-transparent to-white/12 blur-xl" />
            <div className="absolute -inset-3 rounded-[32px] bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 blur-lg opacity-70" />
            <div className="absolute -inset-2 rounded-[28px] bg-gradient-to-br from-cyan-300/15 via-transparent to-purple-300/15 blur-md" />

            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl bg-black shadow-[0_0_150px_rgba(0,0,0,0.95),0_50px_120px_rgba(0,0,0,0.9),inset_0_0_0_2.5px_rgba(255,255,255,0.25)]">
              {/* Borders */}
              <div className="absolute inset-0 rounded-3xl border-[3px] border-white/35" />
              <div className="absolute inset-[1px] rounded-3xl border-[2px] border-white/25" />
              <div className="absolute inset-[3px] rounded-3xl border-[1.5px] border-white/15" />
              <div className="absolute inset-[5px] rounded-3xl border border-white/10" />
              <div className="absolute inset-[7px] rounded-3xl border border-cyan-500/20" />

              {/* Video */}
              <div className="absolute inset-0">
                <div className="absolute inset-0 flex items-center justify-center bg-black">
                  <video
                    ref={videoRef}
                    className="h-full w-full object-contain"
                    loop
                    playsInline
                    src={slide.video}
                    preload="auto"
                    onCanPlay={handleCanPlay}
                    style={{
                      transform: 'translateZ(0)',
                    }}
                  />
                </div>
              </div>

              {/* Light Accents */}
              <div className="absolute top-0 left-0 h-64 w-64 bg-gradient-to-br from-white/20 via-cyan-400/10 to-transparent rounded-tl-3xl" />
              <div className="absolute top-0 right-0 h-64 w-64 bg-gradient-to-bl from-white/20 via-purple-400/10 to-transparent rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 h-48 w-48 bg-gradient-to-tr from-cyan-400/8 to-transparent rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 h-48 w-48 bg-gradient-to-tl from-purple-400/8 to-transparent rounded-br-3xl" />

              <div className="absolute top-0 left-0 h-48 w-48 bg-gradient-to-br from-cyan-400/25 via-cyan-300/15 to-transparent rounded-tl-3xl" />
              <div className="absolute top-0 right-0 h-48 w-48 bg-gradient-to-bl from-purple-400/25 via-purple-300/15 to-transparent rounded-tr-3xl" />
              <div className="absolute bottom-0 left-0 h-40 w-40 bg-gradient-to-tr from-cyan-400/20 via-transparent to-transparent rounded-bl-3xl" />
              <div className="absolute bottom-0 right-0 h-40 w-40 bg-gradient-to-tl from-purple-400/20 via-transparent to-transparent rounded-br-3xl" />

              <div className="absolute inset-0 bg-gradient-to-t from-black/12 via-transparent to-transparent pointer-events-none z-20" />

              {/* Controls */}
              <div
                className={`absolute bottom-6 right-6 z-30 flex items-center gap-3 transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
                    ? 'opacity-100 translate-y-0 scale-100'
                    : 'opacity-0 translate-y-10 scale-90'
                  }`}
                style={{ transitionDelay: isVisible ? '200ms' : '0ms' }}
              >
                <button
                  onClick={togglePlay}
                  className="group/btn flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-2xl border-2 border-white/35 transition-all duration-300 hover:bg-black/90"
                  aria-label={isPlaying ? t("portfolio.carouselPause") : t("portfolio.carouselPlay")}
                >
                  {isPlaying ? (
                    <Pause className="h-6 w-6 text-white transition-all duration-300" />
                  ) : (
                    <Play className="h-6 w-6 text-white translate-x-0.5 transition-all duration-300" />
                  )}
                </button>

                <button
                  onClick={toggleMute}
                  className="group/btn flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-2xl border-2 border-white/35 transition-all duration-300 hover:bg-black/90"
                  aria-label={isMuted ? t("portfolio.carouselUnmute") : t("portfolio.carouselMute")}
                >
                  {isMuted ? (
                    <VolumeX className="h-6 w-6 text-white transition-all duration-300" />
                  ) : (
                    <Volume2 className="h-6 w-6 text-white transition-all duration-300" />
                  )}
                </button>
              </div>

              {/* Decorative Rings */}
              <div className="absolute inset-0 rounded-3xl ring-2 ring-white/15 ring-inset" />
              <div className="absolute inset-[1px] rounded-3xl ring-1 ring-white/10 ring-inset" />
              <div className="absolute inset-[2px] rounded-3xl ring-1 ring-cyan-400/12 ring-inset" />
              <div className="absolute inset-[3px] rounded-3xl ring-1 ring-purple-400/10 ring-inset" />
              <div className="absolute inset-[4px] rounded-3xl ring-1 ring-cyan-300/8 ring-inset" />
            </div>
          </div>

          {/* Right Side */}
          <div
            className={`order-3 hidden lg:block lg:pl-2 xl:pl-4 relative transition-all duration-[2000ms] ease-[cubic-bezier(0.16,1,0.3,1)] ${isVisible
                ? 'opacity-100 translate-x-0 translate-y-0 scale-100'
                : 'opacity-0 translate-x-20 translate-y-10 scale-95'
              }`}
          >
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-black"
    >
      {/* Background */}
      <div className="absolute inset-0" style={{ contain: 'strict' }}>
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/95 via-black/90 to-black/95" />

        {/* Particles */}
        <div className="absolute inset-0" style={{ contain: 'layout style paint', pointerEvents: 'none' }}>
          {[...Array(12)].map((_, i) => {
            const size = 2 + Math.random() * 2
            return (
              <div
                key={i}
                className="absolute rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: `${size}px`,
                  height: `${size}px`,
                  background: `rgba(34,211,238,0.15)`,
                  boxShadow: `0 0 ${size * 2}px rgba(34,211,238,0.2)`,
                  transform: 'translateZ(0)',
                  opacity: 0.4,
                }}
              />
            )
          })}
        </div>

        <div
          className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-cyan-400/3 via-white/2 to-purple-400/3 blur-3xl"
          style={{
            transform: 'translate(-50%, -50%) translateZ(0)',
            pointerEvents: 'none',
          }}
        />

        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 0%, transparent 60%, rgba(0,0,0,0.4) 100%)',
            pointerEvents: 'none',
          }}
        />
      </div>

      {/* First Video Block */}
      {renderVideoBlock(
        slide1,
        videoRef1,
        sectionRef1,
        isVisible1,
        isPlaying1,
        isMuted1,
        togglePlay1,
        toggleMute1,
        handleCanPlay1
      )}

      {/* Decorative Separator */}
      <div className="relative w-full py-12 overflow-hidden">
        {/* Animated gradient line */}
        <div className="relative h-[2px] w-full">
          {/* Main gradient line */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/60 via-purple-400/60 to-transparent" />
          
          {/* Animated glow effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/80 via-purple-400/80 to-transparent animate-pulse" />
          
          {/* Moving light effect */}
          <div 
            className="absolute top-0 h-full w-1/3 bg-gradient-to-r from-cyan-400/0 via-cyan-400/100 to-cyan-400/0 blur-sm"
            style={{
              animation: 'shimmer 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Decorative particles */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                width: '4px',
                height: '4px',
                background: `rgba(34,211,238,0.6)`,
                boxShadow: `0 0 8px rgba(34,211,238,0.8), 0 0 16px rgba(34,211,238,0.4)`,
                animation: `float ${2 + i * 0.5}s ease-in-out infinite`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>

        {/* Side decorative elements */}
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-r from-cyan-400/40 to-transparent" />
        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-16 h-px bg-gradient-to-l from-purple-400/40 to-transparent" />

        {/* Animated orbs */}
        <div className="absolute left-1/4 top-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/60 blur-sm animate-ping" style={{ animationDuration: '2s' }} />
        <div className="absolute right-1/4 top-1/2 translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400/60 blur-sm animate-ping" style={{ animationDuration: '2.5s', animationDelay: '0.5s' }} />

        {/* Additional decorative lines */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-24 h-px bg-gradient-to-r from-cyan-400/30 via-purple-400/30 to-cyan-400/30" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent blur-sm" />
      </div>

      {/* Second Video Block */}
      {renderVideoBlock(
        slide2,
        videoRef2,
        sectionRef2,
        isVisible2,
        isPlaying2,
        isMuted2,
        togglePlay2,
        toggleMute2,
        handleCanPlay2
      )}
    </section>
  )
}
