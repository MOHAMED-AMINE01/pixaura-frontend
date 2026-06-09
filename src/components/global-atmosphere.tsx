"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useIsMobile } from "@/hooks/use-mobile"

export function GlobalAtmosphere() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })
  const isMobile = useIsMobile()
  const rafId = useRef<number | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })

  const updateMouse = useCallback(() => {
    setMouse({ ...mouseRef.current })
    rafId.current = null
  }, [])

  const handleMouseMove = useCallback((event: MouseEvent) => {
    mouseRef.current = { x: event.clientX, y: event.clientY }
    
    // Utiliser requestAnimationFrame pour throttler les mises à jour
    if (rafId.current === null) {
      rafId.current = requestAnimationFrame(updateMouse)
    }
  }, [updateMouse])

  useEffect(() => {
    // Désactiver le suivi de la souris sur mobile pour les performances
    if (isMobile) {
      return
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current)
      }
    }
  }, [isMobile, handleMouseMove])

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(45%_40%_at_80%_10%,rgba(68,120,255,0.08),transparent_80%)]" />
      {!isMobile && (
        <div
          className="absolute inset-0 opacity-35 transition-[background] duration-700"
          style={{
            background: `radial-gradient(circle at ${mouse.x}px ${mouse.y}px, rgba(26,163,255,0.18), transparent 70%)`,
          }}
        />
      )}
      <div className="absolute inset-0 bg-[url('/Banque d_images/noise.png')] opacity-[0.05]" />
    </div>
  )
}
