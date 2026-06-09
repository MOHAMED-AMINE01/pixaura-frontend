"use client"

import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react"
import { getAssetUrl } from "@/lib/cloudinary"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { HomeVideoCarousel } from "@/components/home-video-carousel"
import { ClientHighlights } from "@/components/client-highlights"
import { ServicesSection } from "@/components/services-section"
import { PortfolioSection } from "@/components/portfolio-section"
import { OffreSection } from "@/components/offre-section"
import { AgenceHomeSection } from "@/components/agence-home-section"
import { HumindSection } from "@/components/humind-section"
import { ContactHomeSection } from "@/components/contact-home-section"
import { SectionDivider } from "@/components/section-divider"
import { GlobalAtmosphere } from "@/components/global-atmosphere"
import { ImmersiveIntro } from "@/components/immersive-intro"
import { CookieConsent } from "@/components/cookie-consent"

export default function Home() {
  // Always start with false to avoid hydration mismatch
  const [introComplete, setIntroComplete] = useState(false)
  const backgroundVideoRef = useRef<HTMLVideoElement>(null)
  const [desktopVideoReady, setDesktopVideoReady] = useState(false)
  const [showDesktopVideo, setShowDesktopVideo] = useState(false)

  // Preload hero section images immediately - before first render
  useLayoutEffect(() => {
    if (typeof document === 'undefined') return

    // Preload all hero images immediately
    const heroImages = [
      getAssetUrl("/Banque d_images/Copie de M7_03225.jpg", "image"),
      getAssetUrl("/Banque d_images/StageUfc.jpg", "image"),
      getAssetUrl("/Banque d_images/Copie de M7_01248.jpg", "image")
    ]

    // Create link elements for aggressive preloading
    const links: HTMLLinkElement[] = []

    heroImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      link.fetchPriority = 'high'
      document.head.appendChild(link)
      links.push(link)

      // Also construct Image object for immediate browser cache priming
      const img = new Image()
      img.src = src
    })

    // We can leave these in the head as they are beneficial for the session
    // but cleaning them up on unmount is good practice
    return () => {
      links.forEach(link => {
        if (link.parentNode) {
          link.parentNode.removeChild(link)
        }
      })
    }
  }, [])

  // Use useLayoutEffect to check URL parameter and handle scroll
  // This runs synchronously before paint, preventing intro from showing
  useLayoutEffect(() => {
    // Check URL parameter directly (available immediately on client)
    const urlParams = new URLSearchParams(window.location.search)
    const skipIntroParam = urlParams.get('skipIntro')
    const hash = window.location.hash.substring(1) // Remove the # symbol

    // Check if we should skip intro based on sessionStorage (when returning from realisations/humind)
    const skipIntroOnReturn = sessionStorage.getItem('skipIntroOnReturn') === 'true'
    if (skipIntroOnReturn) {
      sessionStorage.removeItem('skipIntroOnReturn')
    }

    if (skipIntroParam === 'true' || skipIntroOnReturn) {
      // Skip intro immediately - before any paint happens
      setIntroComplete(true)

      // Remove the parameter from URL without reload
      if (skipIntroParam === 'true') {
        urlParams.delete('skipIntro')
        const newUrl = urlParams.toString()
          ? `${window.location.pathname}?${urlParams.toString()}${hash ? `#${hash}` : ''}`
          : `${window.location.pathname}${hash ? `#${hash}` : ''}`
        window.history.replaceState({}, '', newUrl)
      }

      // Don't scroll here - let useEffect handle it after content renders
      // Just ensure we're at top initially
      window.scrollTo({ top: 0, behavior: 'instant' })
    } else {
      // Always ensure page starts at top if not skipping intro
      window.scrollTo({ top: 0, behavior: 'instant' })
    }
  }, [])

  const handleIntroComplete = useCallback(() => {
    setIntroComplete(true)
  }, [])

  // Desktop background: show image first, then fade to video (only after intro + video ready)
  useEffect(() => {
    const video = backgroundVideoRef.current
    if (!video) return

    // Ensure video properties
    video.muted = true
    video.loop = true
    video.playsInline = true

    // Mark ready when it can play
    const handleCanPlay = () => {
      setDesktopVideoReady(true)
    }
    video.addEventListener('canplay', handleCanPlay)

    // Start loading early (but keep it hidden until we decide to show it)
    try {
      video.load()
    } catch {}

    return () => {
      video.removeEventListener('canplay', handleCanPlay)
    }
  }, [])

  useEffect(() => {
    if (!introComplete || !desktopVideoReady) return
    setShowDesktopVideo(true)
  }, [introComplete, desktopVideoReady])

  useEffect(() => {
    const video = backgroundVideoRef.current
    if (!video) return
    if (!showDesktopVideo) return

    // Force play when we actually reveal the video (handle autoplay restrictions)
    const playVideo = async () => {
      try {
        await video.play()
      } catch (error) {
        // Autoplay was prevented, try again after user interaction
        const handleUserInteraction = () => {
          video.play().catch(() => {})
          document.removeEventListener('click', handleUserInteraction)
          document.removeEventListener('touchstart', handleUserInteraction)
        }
        document.addEventListener('click', handleUserInteraction)
        document.addEventListener('touchstart', handleUserInteraction)
      }
    }

    playVideo()
  }, [showDesktopVideo])

  // Handle scroll to section after content is rendered
  useEffect(() => {
    if (introComplete) {
      const hash = window.location.hash.substring(1)
      if (hash) {
        // Check if we came from realisations or humind (via sessionStorage)
        const cameFromSpecialPage = sessionStorage.getItem('navFromSpecialPage') === 'true'
        sessionStorage.removeItem('navFromSpecialPage')

        // Scroll immediately if coming from special page, otherwise wait a bit
        const scrollToSection = () => {
          try {
            const element = document.getElementById(hash)
            if (element) {
              // Calculate offset for navbar
              const navbarHeight = 80
              const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
              const offsetPosition = elementPosition - navbarHeight

              // Use instant scroll if coming from realisations/humind to avoid white flash
              window.scrollTo({
                top: offsetPosition,
                behavior: cameFromSpecialPage ? 'instant' : 'smooth'
              })
            }
          } catch (error) {
            // Silent error handling - don't break navigation
          }
        }

        if (cameFromSpecialPage) {
          // Try immediately, then retry if element not ready
          scrollToSection()
          const timer = setTimeout(() => {
            scrollToSection()
          }, 10)
          return () => clearTimeout(timer)
        } else {
          const timer = setTimeout(scrollToSection, 200)
          return () => clearTimeout(timer)
        }
      }
    }
  }, [introComplete])

  // Check if coming from special page for instant render
  const [cameFromSpecialPage] = useState(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('navFromSpecialPage') === 'true'
    }
    return false
  })

  const contentTransition = useMemo(
    () =>
      [
        "relative z-10",
        // Instant render if coming from special page, otherwise use transition
        cameFromSpecialPage
          ? "opacity-100 translate-y-0 scale-100 blur-0"
          : introComplete
            ? "transition-all duration-[1400ms] ease-[cubic-bezier(0.16,0.84,0.34,1)] opacity-100 translate-y-0 scale-100 blur-0"
            : "pointer-events-none opacity-0 translate-y-6 scale-[0.97] blur-sm",
      ].join(" "),
    [introComplete, cameFromSpecialPage]
  )

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Desktop placeholder image (shown first) */}
        <img
          src={getAssetUrl("/Banque d_images/ippppp1.png", "image")}
          alt="Background"
          className="hidden md:block absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{
            opacity: showDesktopVideo ? 0 : 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%',
          }}
        />

        {/* Background video - visible on desktop only */}
        <video
          ref={backgroundVideoRef}
          loop
          muted
          playsInline
          preload="auto"
          className="hidden md:block absolute inset-0 h-full w-full object-cover transition-opacity duration-700"
          style={{
            opacity: showDesktopVideo ? 1 : 0,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        >
          <source src={getAssetUrl("/Banque d_images/Copie de BACKGROUND WEB DESKTOP.mp4", "video")} type="video/mp4" />
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

      {!introComplete && (
        <div data-intro-wrapper>
          <ImmersiveIntro onComplete={handleIntroComplete} />
        </div>
      )}

      {introComplete && (
        <>
          <Navbar />
          <GlobalAtmosphere />

          <div className={contentTransition}>
            <HeroSection />
            <HomeVideoCarousel />
            <ClientHighlights />
            <SectionDivider label="Services" />
            <ServicesSection />
            <SectionDivider label="Réalisations" />
            <PortfolioSection />
            <SectionDivider label="Humind" />
            <HumindSection />
            <SectionDivider label="Offres" />
            <OffreSection />
            <SectionDivider label="Agence" />
            <AgenceHomeSection />
            <SectionDivider label="Contact" />
            <ContactHomeSection />
            <Footer />
          </div>
          
          {/* Cookie Consent Banner - S'affiche uniquement après l'intro sur la page d'accueil */}
          <CookieConsent />
        </>
      )}
    </main>
  )
}
