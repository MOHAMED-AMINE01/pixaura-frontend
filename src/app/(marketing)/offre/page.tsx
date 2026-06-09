"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Factory, Sparkles, BarChart3, Check, Calendar, FileText, ChevronDown, X } from "lucide-react"
import * as Dialog from "@radix-ui/react-dialog"

// Structure de données pour les fiches détaillées
const differentiatorDetails = {
  production: {
    title: "Production intégrée",
    subtitle: "Studio interne = maîtrise qualité et délais",
    intro: "Chez Pixaura_IT, la production est totalement intégrée : studio photo, tournage vidéo, montage et post-production sont gérés en interne.",
    points: [
      "Une cohérence visuelle entre tous les contenus produits (photo, vidéo, social).",
      "Une maîtrise totale des délais et de la qualité, sans sous-traitance.",
      "Des shootings réguliers adaptés au calendrier éditorial de chaque client.",
      "Des contenus optimisés pour les différents formats digitaux (reels, ads, bannières, etc.)."
    ],
    conclusion: "Le studio interne permet à Pixaura_IT de produire plus vite, avec plus de contrôle et de créativité, tout en conservant une signature esthétique forte."
  },
  creativite: {
    title: "Créativité stratégique",
    subtitle: "Storytelling + direction artistique + performance",
    intro: "L'équipe créative de Pixaura_IT fusionne la stratégie marketing et la création artistique. Chaque contenu est pensé comme un mini-film publicitaire, au service d'un objectif clair : émouvoir, convertir et fidéliser.",
    points: [
      "Le storytelling de marque, pour révéler l'ADN et les valeurs de chaque client.",
      "La direction artistique, qui définit les palettes, typographies et styles visuels cohérents.",
      "L'optimisation stratégique, pour que chaque publication atteigne ses KPIs (clics, engagement, leads)."
    ],
    conclusion: "L'émotion guide la création, la stratégie en assure l'efficacité."
  },
  suivi: {
    title: "Suivi mesurable",
    subtitle: "Reporting, KPI, ROI",
    intro: "Pixaura_IT place la donnée au cœur de la performance. Chaque campagne fait l'objet d'un reporting régulier, accompagné d'une analyse claire et visuelle des indicateurs :",
    points: [
      "Taux d'engagement, portée, clics, conversions",
      "ROI publicitaire (ROAS) et évolution du trafic qualifié",
      "Recommandations d'optimisation continue"
    ],
    conclusion: "Ces analyses sont présentées via des tableaux de bord intuitifs et partagées lors des points de suivi. Objectif : prouver la valeur de chaque action, ajuster en temps réel et maximiser la rentabilité marketing."
  }
}

export default function OffrePage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [expandedCard, setExpandedCard] = useState<string | null>(null)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <main ref={sectionRef} className="relative bg-black min-h-screen overflow-hidden">
      <Navbar />
      <div className="pt-20">
      {/* Enhanced Background - Deep dark with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-slate-950/50 to-black" />
      
      {/* Animated gradient overlay - Follows mouse */}
      <div
        className="absolute inset-0 opacity-30 pointer-events-none transition-opacity duration-1000"
        style={{
          background: `radial-gradient(circle 600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(0, 200, 255, 0.15) 0%, rgba(124, 58, 237, 0.1) 30%, transparent 60%)`,
        }}
      />
      
      {/* Enhanced digital patterns - Animated */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              repeating-linear-gradient(90deg, transparent, transparent 99px, rgba(0, 200, 255, 0.08) 100px),
              repeating-linear-gradient(0deg, transparent, transparent 99px, rgba(124, 58, 237, 0.08) 100px)
            `,
            backgroundSize: '200px 200px',
            animation: 'patternMove 20s linear infinite',
          }}
        />
      </div>

      {/* Enhanced scattered light points */}
      {mounted && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(35)].map((_, i) => {
            const seed = i * 0.1375
            const left = ((seed * 100) % 100)
            const top = ((seed * 137.5) % 100)
            const duration = 4 + ((seed * 4) % 4)
            const delay = (seed * 3) % 3
            
            return (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-15"
                style={{
                  left: `${left}%`,
                  top: `${top}%`,
                  animation: `floatAdvanced ${duration}s ease-in-out infinite`,
                  animationDelay: `${delay}s`,
                }}
              />
            )
          })}
        </div>
      )}

      {/* Subtle light streaks - Enhanced */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
        <div className="absolute top-2/4 right-0 w-1/4 h-px bg-gradient-to-l from-transparent via-white/10 to-transparent" />
        <div className="absolute bottom-1/4 left-1/2 w-1/4 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        <div className="absolute top-3/4 left-1/3 w-1/4 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent opacity-50" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section - Ultra Premium Enhanced Typography */}
        <section className="relative py-16 px-6">
          <div className="max-w-7xl mx-auto text-center">
            <div className="relative inline-block mb-6">
              {/* Multi-Layer Glow Behind Title */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 blur-3xl opacity-50 animate-pulse" style={{ 
                transform: 'scale(1.2)',
                zIndex: 0,
              }} />
              <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-2xl opacity-40" style={{ 
                transform: 'scale(1.1)',
                zIndex: 0,
              }} />
              
              {/* Main Title - Ultra Premium Enhanced */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white relative z-10 mb-3 group/title" style={{ 
                fontFamily: 'Montserrat, sans-serif', 
                letterSpacing: '-0.03em',
                lineHeight: '1.1',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.15), 0 0 80px rgba(255, 255, 255, 0.08), 0 0 120px rgba(255, 255, 255, 0.04)',
                transition: 'all 0.5s ease',
              }}>
                <span className="relative inline-block">
                  Nos Offres
                  {/* Animated Glow Overlay */}
                  <span className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent blur-2xl opacity-0 group-hover/title:opacity-60 transition-opacity duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    Nos Offres
                  </span>
                </span>
              </h1>
              
              {/* Enhanced Professional Underline with Animation */}
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-60 group-hover/title:opacity-100 group-hover/title:w-56 transition-all duration-500" />
              <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40" />
              
              {/* Decorative Corner Elements */}
              <div className="absolute -top-1 -left-6 w-3 h-3 border-t-2 border-l-2 border-white/30 rounded-tl-lg opacity-0 group-hover/title:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-1 -right-6 w-3 h-3 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover/title:opacity-100 transition-opacity duration-500" />
            </div>
            
            {/* Subtitle - Enhanced Professional */}
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-3xl mx-auto font-medium group/subtitle" style={{ 
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '-0.01em',
              lineHeight: '1.4',
              transition: 'all 0.5s ease',
            }}>
              <span className="group-hover/subtitle:text-white transition-colors duration-500">
                Des solutions marketing complètes adaptées à votre ambition
              </span>
            </p>
          </div>
        </section>

        {/* Bloc différenciateur Pixaura - Ultra Premium Enhanced Design */}
        <section className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Production intégrée - Ultra Premium Enhanced Card */}
              <div 
                className="relative group/card cursor-pointer"
                onMouseEnter={() => setHoveredCard('production')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Multi-Layer Glow Effects - Premium */}
                <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" style={{ animation: expandedCard === 'production' || hoveredCard === 'production' ? 'border-glow-premium 2s ease-in-out infinite' : 'none' }} />
                <div className="absolute -inset-1 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-80 transition-opacity duration-700" />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ 
                    animation: 'light-sweep-premium 1.5s ease-in-out',
                  }} />
                </div>
                
                {/* Main Card - Ultra Premium Enhanced */}
                <div className={`relative bg-black/70 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 group-hover/card:border-white/30 transition-all duration-700 group-hover/card:shadow-2xl group-hover/card:shadow-white/20 overflow-hidden ${expandedCard === 'production' ? 'border-white/40 shadow-2xl shadow-white/30' : ''}`} style={{ 
                  transform: expandedCard === 'production' ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (expandedCard !== 'production') {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedCard !== 'production') {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }
                }}>
                  {/* Animated Background Gradient - Premium */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-white/8 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating Particles - Premium */}
                  {mounted && [...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover/card:opacity-40"
                      style={{
                        left: `${15 + i * 12}%`,
                        top: `${20 + i * 10}%`,
                        animation: `particle-float-premium ${1.5 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon Container - Ultra Premium Enhanced */}
                    <div className="relative mb-6">
                      {/* Multi-Layer Icon Glow */}
                      <div className="absolute -inset-3 bg-white/15 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                      <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-80 transition-opacity duration-700" />
                      
                      <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/card:bg-white/15 group-hover/card:border-white/30 transition-all duration-700 shadow-lg group-hover/card:shadow-xl group-hover/card:shadow-white/20" style={{ 
                        animation: 'icon-float 2s ease-in-out infinite',
                        animationPlayState: 'paused',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animationPlayState = 'running';
                      }}>
                        <Factory className="w-10 h-10 text-white/80 group-hover/card:text-white transition-all duration-700 group-hover/card:scale-110" style={{ 
                          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                        }} />
                      </div>
                    </div>
                    
                    {/* Title - Ultra Premium Enhanced */}
                    <h3 className="text-2xl font-black text-white mb-4 transition-all duration-700 group-hover/card:text-white" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                      animation: 'text-glow-premium 2s ease-in-out infinite',
                      animationPlayState: 'paused',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animationPlayState = 'running';
                    }}>
                      {differentiatorDetails.production.title}
                    </h3>
                    
                    {/* Description - Ultra Premium Enhanced */}
                    <p className="text-gray-400 text-sm leading-relaxed group-hover/card:text-white transition-all duration-700" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
                    }}>
                      {differentiatorDetails.production.subtitle}
                    </p>
                  </div>
                  
                  {/* Premium "Voir détails" Button - Always Visible */}
                  <div className="relative z-10 mt-6 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(expandedCard === 'production' ? null : 'production');
                      }}
                      className="relative w-full px-6 py-3.5 bg-gradient-to-r from-white/10 via-white/15 to-white/10 border border-white/20 rounded-xl overflow-hidden group/btn transition-all duration-500 hover:from-white/20 hover:via-white/25 hover:to-white/20 hover:border-white/40 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/20"
                    >
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" style={{
                        backgroundSize: '200% 200%',
                        animation: 'gradientShiftAdvanced 3s ease infinite',
                      }} />
                      
                      {/* Light Sweep Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ 
                          animation: 'light-sweep-premium 1.5s ease-in-out',
                        }} />
                      </div>
                      
                      {/* Button Content */}
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <span className="text-white font-bold text-sm tracking-wide" style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                        }}>
                          {expandedCard === 'production' ? 'Masquer les détails' : 'Voir les détails'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-white transition-transform duration-500 ${expandedCard === 'production' ? 'rotate-180' : ''}`} style={{
                          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))',
                        }} />
                      </div>
                      
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-white/10 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    </button>
                  </div>
                  
                  {/* Expandable Details Section - Enhanced Typography */}
                  <div 
                    className={`relative z-10 mt-4 overflow-hidden transition-all duration-700 ease-in-out ${expandedCard === 'production' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-gray-200 text-base leading-relaxed mb-5 text-left font-medium" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.7',
                      }}>
                        {differentiatorDetails.production.intro}
                      </p>
                      <p className="text-white text-base font-bold mb-4 text-left" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        letterSpacing: '-0.01em',
                      }}>
                        Cela garantit :
                      </p>
                      <ul className="space-y-3 mb-5 text-left">
                        {differentiatorDetails.production.points.map((point, index) => (
                          <li key={index} className="text-gray-200 text-base leading-relaxed flex items-start font-medium" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                            lineHeight: '1.6',
                          }}>
                            <span className="text-white/80 mr-3 mt-1.5 text-lg font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-white/95 text-base leading-relaxed italic text-left font-medium" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.7',
                      }}>
                        {differentiatorDetails.production.conclusion}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated Corner Accents - Premium */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-white/20 rounded-tl-2xl opacity-0 group-hover/card:opacity-100 group-hover/card:w-6 group-hover/card:h-6 transition-all duration-700" style={{ 
                    animation: 'corner-expand 0.7s ease-out',
                  }} />
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-white/20 rounded-br-2xl opacity-0 group-hover/card:opacity-100 group-hover/card:w-6 group-hover/card:h-6 transition-all duration-700" style={{ 
                    animation: 'corner-expand 0.7s ease-out',
                  }} />
                </div>
              </div>

              {/* Créativité stratégique - Ultra Premium Enhanced Card */}
              <div 
                className="relative group/card cursor-pointer"
                onMouseEnter={() => setHoveredCard('creativite')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Multi-Layer Glow Effects - Premium */}
                <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" style={{ animation: expandedCard === 'creativite' || hoveredCard === 'creativite' ? 'border-glow-premium 2s ease-in-out infinite' : 'none' }} />
                <div className="absolute -inset-1 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-80 transition-opacity duration-700" />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ 
                    animation: 'light-sweep-premium 1.5s ease-in-out',
                  }} />
                </div>
                
                {/* Main Card - Ultra Premium Enhanced */}
                <div className={`relative bg-black/70 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 group-hover/card:border-white/30 transition-all duration-700 group-hover/card:shadow-2xl group-hover/card:shadow-white/20 overflow-hidden ${expandedCard === 'creativite' ? 'border-white/40 shadow-2xl shadow-white/30' : ''}`} style={{ 
                  transform: expandedCard === 'creativite' ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (expandedCard !== 'creativite') {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedCard !== 'creativite') {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }
                }}>
                  {/* Animated Background Gradient - Premium */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-white/8 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating Particles - Premium */}
                  {mounted && [...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover/card:opacity-40"
                      style={{
                        left: `${15 + i * 12}%`,
                        top: `${20 + i * 10}%`,
                        animation: `particle-float-premium ${1.5 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon Container - Ultra Premium Enhanced */}
                    <div className="relative mb-6">
                      {/* Multi-Layer Icon Glow */}
                      <div className="absolute -inset-3 bg-white/15 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                      <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-80 transition-opacity duration-700" />
                      
                      <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/card:bg-white/15 group-hover/card:border-white/30 transition-all duration-700 shadow-lg group-hover/card:shadow-xl group-hover/card:shadow-white/20" style={{ 
                        animation: 'icon-float 2s ease-in-out infinite',
                        animationPlayState: 'paused',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animationPlayState = 'running';
                      }}>
                        <Sparkles className="w-10 h-10 text-white/80 group-hover/card:text-white transition-all duration-700 group-hover/card:scale-110" style={{ 
                          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                        }} />
                      </div>
                    </div>
                    
                    {/* Title - Ultra Premium Enhanced */}
                    <h3 className="text-2xl font-black text-white mb-4 transition-all duration-700 group-hover/card:text-white" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                      animation: 'text-glow-premium 2s ease-in-out infinite',
                      animationPlayState: 'paused',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animationPlayState = 'running';
                    }}>
                      {differentiatorDetails.creativite.title}
                    </h3>
                    
                    {/* Description - Ultra Premium Enhanced */}
                    <p className="text-gray-400 text-sm leading-relaxed group-hover/card:text-white transition-all duration-700" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
                    }}>
                      {differentiatorDetails.creativite.subtitle}
                    </p>
                  </div>
                  
                  {/* Premium "Voir détails" Button - Always Visible */}
                  <div className="relative z-10 mt-6 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(expandedCard === 'creativite' ? null : 'creativite');
                      }}
                      className="relative w-full px-6 py-3.5 bg-gradient-to-r from-white/10 via-white/15 to-white/10 border border-white/20 rounded-xl overflow-hidden group/btn transition-all duration-500 hover:from-white/20 hover:via-white/25 hover:to-white/20 hover:border-white/40 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/20"
                    >
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" style={{
                        backgroundSize: '200% 200%',
                        animation: 'gradientShiftAdvanced 3s ease infinite',
                      }} />
                      
                      {/* Light Sweep Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ 
                          animation: 'light-sweep-premium 1.5s ease-in-out',
                        }} />
                      </div>
                      
                      {/* Button Content */}
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <span className="text-white font-bold text-sm tracking-wide" style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                        }}>
                          {expandedCard === 'creativite' ? 'Masquer les détails' : 'Voir les détails'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-white transition-transform duration-500 ${expandedCard === 'creativite' ? 'rotate-180' : ''}`} style={{
                          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))',
                        }} />
                      </div>
                      
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-white/10 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    </button>
                  </div>
                  
                  {/* Expandable Details Section - Enhanced Typography */}
                  <div 
                    className={`relative z-10 mt-4 overflow-hidden transition-all duration-700 ease-in-out ${expandedCard === 'creativite' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-gray-200 text-base leading-relaxed mb-5 text-left font-medium" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.7',
                      }}>
                        {differentiatorDetails.creativite.intro}
                      </p>
                      <p className="text-white text-base font-bold mb-4 text-left" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        letterSpacing: '-0.01em',
                      }}>
                        Cette approche repose sur trois leviers :
                      </p>
                      <ul className="space-y-3 mb-5 text-left">
                        {differentiatorDetails.creativite.points.map((point, index) => (
                          <li key={index} className="text-gray-200 text-base leading-relaxed flex items-start font-medium" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                            lineHeight: '1.6',
                          }}>
                            <span className="text-white/80 mr-3 mt-1.5 text-lg font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-white/95 text-base leading-relaxed italic text-left font-medium" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.7',
                      }}>
                        {differentiatorDetails.creativite.conclusion}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated Corner Accents - Premium */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-white/20 rounded-tl-2xl opacity-0 group-hover/card:opacity-100 group-hover/card:w-6 group-hover/card:h-6 transition-all duration-700" style={{ 
                    animation: 'corner-expand 0.7s ease-out',
                  }} />
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-white/20 rounded-br-2xl opacity-0 group-hover/card:opacity-100 group-hover/card:w-6 group-hover/card:h-6 transition-all duration-700" style={{ 
                    animation: 'corner-expand 0.7s ease-out',
                  }} />
                </div>
              </div>

              {/* Suivi mesurable - Ultra Premium Enhanced Card */}
              <div 
                className="relative group/card cursor-pointer"
                onMouseEnter={() => setHoveredCard('suivi')}
                onMouseLeave={() => setHoveredCard(null)}
              >
                {/* Multi-Layer Glow Effects - Premium */}
                <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" style={{ animation: expandedCard === 'suivi' || hoveredCard === 'suivi' ? 'border-glow-premium 2s ease-in-out infinite' : 'none' }} />
                <div className="absolute -inset-1 bg-white/5 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-80 transition-opacity duration-700" />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent" style={{ 
                    animation: 'light-sweep-premium 1.5s ease-in-out',
                  }} />
                </div>
                
                {/* Main Card - Ultra Premium Enhanced */}
                <div className={`relative bg-black/70 backdrop-blur-2xl rounded-2xl border border-white/10 p-8 group-hover/card:border-white/30 transition-all duration-700 group-hover/card:shadow-2xl group-hover/card:shadow-white/20 overflow-hidden ${expandedCard === 'suivi' ? 'border-white/40 shadow-2xl shadow-white/30' : ''}`} style={{ 
                  transform: expandedCard === 'suivi' ? 'translateY(-8px) scale(1.03)' : 'translateY(0) scale(1)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  if (expandedCard !== 'suivi') {
                    e.currentTarget.style.transform = 'translateY(-8px) scale(1.03)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (expandedCard !== 'suivi') {
                    e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  }
                }}>
                  {/* Animated Background Gradient - Premium */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/8 via-white/3 to-white/8 opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                  
                  {/* Floating Particles - Premium */}
                  {mounted && [...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-white rounded-full opacity-0 group-hover/card:opacity-40"
                      style={{
                        left: `${15 + i * 12}%`,
                        top: `${20 + i * 10}%`,
                        animation: `particle-float-premium ${1.5 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.15}s`,
                      }}
                    />
                  ))}
                  
                  {/* Content */}
                  <div className="relative z-10 flex flex-col items-center text-center">
                    {/* Icon Container - Ultra Premium Enhanced */}
                    <div className="relative mb-6">
                      {/* Multi-Layer Icon Glow */}
                      <div className="absolute -inset-3 bg-white/15 rounded-2xl blur-xl opacity-0 group-hover/card:opacity-100 transition-opacity duration-700" />
                      <div className="absolute -inset-2 bg-white/10 rounded-2xl blur-lg opacity-0 group-hover/card:opacity-80 transition-opacity duration-700" />
                      
                      <div className="relative w-20 h-20 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center group-hover/card:bg-white/15 group-hover/card:border-white/30 transition-all duration-700 shadow-lg group-hover/card:shadow-xl group-hover/card:shadow-white/20" style={{ 
                        animation: 'icon-float 2s ease-in-out infinite',
                        animationPlayState: 'paused',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.animationPlayState = 'running';
                      }}>
                        <BarChart3 className="w-10 h-10 text-white/80 group-hover/card:text-white transition-all duration-700 group-hover/card:scale-110" style={{ 
                          filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.3))',
                        }} />
                      </div>
                    </div>
                    
                    {/* Title - Ultra Premium Enhanced */}
                    <h3 className="text-2xl font-black text-white mb-4 transition-all duration-700 group-hover/card:text-white" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      letterSpacing: '-0.02em',
                      textShadow: '0 0 20px rgba(255, 255, 255, 0.1)',
                      animation: 'text-glow-premium 2s ease-in-out infinite',
                      animationPlayState: 'paused',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.animationPlayState = 'running';
                    }}>
                      {differentiatorDetails.suivi.title}
                    </h3>
                    
                    {/* Description - Ultra Premium Enhanced */}
                    <p className="text-gray-400 text-sm leading-relaxed group-hover/card:text-white transition-all duration-700" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      textShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
                    }}>
                      {differentiatorDetails.suivi.subtitle}
                    </p>
                  </div>
                  
                  {/* Premium "Voir détails" Button - Always Visible */}
                  <div className="relative z-10 mt-6 w-full">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setExpandedCard(expandedCard === 'suivi' ? null : 'suivi');
                      }}
                      className="relative w-full px-6 py-3.5 bg-gradient-to-r from-white/10 via-white/15 to-white/10 border border-white/20 rounded-xl overflow-hidden group/btn transition-all duration-500 hover:from-white/20 hover:via-white/25 hover:to-white/20 hover:border-white/40 hover:scale-[1.02] hover:shadow-xl hover:shadow-white/20"
                    >
                      {/* Animated Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-white/5 via-white/10 to-white/5 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" style={{
                        backgroundSize: '200% 200%',
                        animation: 'gradientShiftAdvanced 3s ease infinite',
                      }} />
                      
                      {/* Light Sweep Effect */}
                      <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500 overflow-hidden pointer-events-none">
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent" style={{ 
                          animation: 'light-sweep-premium 1.5s ease-in-out',
                        }} />
                      </div>
                      
                      {/* Button Content */}
                      <div className="relative z-10 flex items-center justify-center gap-2">
                        <span className="text-white font-bold text-sm tracking-wide" style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          textShadow: '0 0 10px rgba(255, 255, 255, 0.2)',
                        }}>
                          {expandedCard === 'suivi' ? 'Masquer les détails' : 'Voir les détails'}
                        </span>
                        <ChevronDown className={`w-4 h-4 text-white transition-transform duration-500 ${expandedCard === 'suivi' ? 'rotate-180' : ''}`} style={{
                          filter: 'drop-shadow(0 0 4px rgba(255, 255, 255, 0.3))',
                        }} />
                      </div>
                      
                      {/* Glow Effect */}
                      <div className="absolute -inset-1 bg-white/10 rounded-xl blur-lg opacity-0 group-hover/btn:opacity-100 transition-opacity duration-500" />
                    </button>
                  </div>
                  
                  {/* Expandable Details Section - Enhanced Typography */}
                  <div 
                    className={`relative z-10 mt-4 overflow-hidden transition-all duration-700 ease-in-out ${expandedCard === 'suivi' ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
                  >
                    <div className="pt-6 border-t border-white/10">
                      <p className="text-gray-200 text-base leading-relaxed mb-5 text-left font-medium" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.7',
                      }}>
                        {differentiatorDetails.suivi.intro}
                      </p>
                      <ul className="space-y-3 mb-5 text-left">
                        {differentiatorDetails.suivi.points.map((point, index) => (
                          <li key={index} className="text-gray-200 text-base leading-relaxed flex items-start font-medium" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                            lineHeight: '1.6',
                          }}>
                            <span className="text-white/80 mr-3 mt-1.5 text-lg font-bold">•</span>
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                      <p className="text-white/95 text-base leading-relaxed text-left font-medium" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        lineHeight: '1.7',
                      }}>
                        {differentiatorDetails.suivi.conclusion}
                      </p>
                    </div>
                  </div>
                  
                  {/* Animated Corner Accents - Premium */}
                  <div className="absolute top-0 left-0 w-0 h-0 border-t-2 border-l-2 border-white/20 rounded-tl-2xl opacity-0 group-hover/card:opacity-100 group-hover/card:w-6 group-hover/card:h-6 transition-all duration-700" style={{ 
                    animation: 'corner-expand 0.7s ease-out',
                  }} />
                  <div className="absolute bottom-0 right-0 w-0 h-0 border-b-2 border-r-2 border-white/20 rounded-br-2xl opacity-0 group-hover/card:opacity-100 group-hover/card:w-6 group-hover/card:h-6 transition-all duration-700" style={{ 
                    animation: 'corner-expand 0.7s ease-out',
                  }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator - Enhanced */}
        <div className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
              <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
            </div>
          </div>
        </div>

        {/* Section principale — LES 3 PACKS - Enhanced */}
        <section className="relative py-8 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-8">
              <div className="relative inline-block mb-6">
                {/* Multi-Layer Glow Behind Title */}
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-white/30 to-white/20 blur-3xl opacity-50 animate-pulse" style={{ 
                  transform: 'scale(1.2)',
                  zIndex: 0,
                }} />
                <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/20 to-white/10 blur-2xl opacity-40" style={{ 
                  transform: 'scale(1.1)',
                  zIndex: 0,
                }} />
                
                {/* Main Title - Ultra Premium Enhanced */}
                <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white relative z-10 mb-3 group/title" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  letterSpacing: '-0.03em',
                  lineHeight: '1.1',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.15), 0 0 80px rgba(255, 255, 255, 0.08), 0 0 120px rgba(255, 255, 255, 0.04)',
                  transition: 'all 0.5s ease',
                }}>
                  <span className="relative inline-block">
                    Les 3 Packs
                    {/* Animated Glow Overlay */}
                    <span className="absolute inset-0 bg-gradient-to-r from-white via-white/90 to-white bg-clip-text text-transparent blur-2xl opacity-0 group-hover/title:opacity-60 transition-opacity duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Les 3 Packs
                    </span>
                  </span>
                </h2>
                
                {/* Enhanced Professional Underline with Animation */}
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-0.5 bg-gradient-to-r from-transparent via-white/60 to-transparent opacity-60 group-hover/title:opacity-100 group-hover/title:w-56 transition-all duration-500" />
                <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-40" />
                
                {/* Decorative Corner Elements */}
                <div className="absolute -top-1 -left-6 w-3 h-3 border-t-2 border-l-2 border-white/30 rounded-tl-lg opacity-0 group-hover/title:opacity-100 transition-opacity duration-500" />
                <div className="absolute -top-1 -right-6 w-3 h-3 border-t-2 border-r-2 border-white/30 rounded-tr-lg opacity-0 group-hover/title:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Pack Starter - Ultra Premium Royal */}
              <div className="relative group/pack" style={{ animationDelay: '0.1s' }}>
                {/* Multi-Layer Glow Effects - Ultra Premium */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/40 via-cyan-400/50 to-cyan-400/40 rounded-3xl blur-3xl opacity-60 group-hover/pack:opacity-100 transition-all duration-1000" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
                <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400/30 via-cyan-400/40 to-cyan-400/30 rounded-3xl blur-2xl opacity-50 group-hover/pack:opacity-90 transition-opacity duration-1000" />
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-cyan-400/30 to-cyan-400/20 rounded-2xl blur-xl opacity-40 group-hover/pack:opacity-80 transition-opacity duration-1000" />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent" style={{ 
                    animation: 'light-sweep-premium 2s ease-in-out infinite',
                  }} />
                </div>
                
                {/* Main Card - Ultra Premium Royal */}
                <div className="relative bg-black/95 backdrop-blur-2xl rounded-3xl border-2 border-cyan-400/50 p-5 group-hover/pack:border-cyan-400/90 transition-all duration-700 group-hover/pack:shadow-2xl group-hover/pack:shadow-cyan-400/40 overflow-hidden" style={{ 
                  transform: 'translateY(0) scale(1)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 25px 100px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(0, 0, 0, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}>
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-transparent to-cyan-400/5 opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShiftAdvanced 4s ease infinite',
                  }} />
                  
                  {/* Floating Particles */}
                  {mounted && [...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-0 group-hover/pack:opacity-60"
                      style={{
                        left: `${10 + i * 11}%`,
                        top: `${15 + i * 9}%`,
                        animation: `particle-float-premium ${1.8 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                  
                  {/* Badge - Ultra Premium */}
                  <div className="relative mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/40 via-cyan-400/50 to-cyan-400/40 rounded-xl blur-xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                    <span className="relative inline-block px-4 py-1.5 bg-gradient-to-r from-cyan-400/40 via-cyan-400/50 to-cyan-400/40 text-cyan-300 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-cyan-400/60 shadow-2xl shadow-cyan-400/40 group-hover/pack:shadow-cyan-400/60 transition-all duration-700 group-hover/pack:scale-105" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      backgroundSize: '200% 200%',
                      animation: 'pack-badge-shine 3s linear infinite',
                      textShadow: '0 0 10px rgba(0, 212, 255, 0.5)',
                    }}>
                      Pack Starter
                    </span>
                  </div>
                  
                  {/* Title - Ultra Premium */}
                  <h3 className="text-3xl font-black text-white mb-3 group-hover/pack:text-cyan-300 transition-all duration-700 relative" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '-0.03em',
                    textShadow: '0 0 30px rgba(0, 212, 255, 0.3), 0 0 60px rgba(0, 212, 255, 0.2)',
                    animation: 'pack-price-glow 3s ease-in-out infinite',
                  }}>
                    Starter
                  </h3>
                  
                  {/* Description - Enhanced */}
                  <p className="text-gray-200 text-base mb-4 font-medium leading-relaxed" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    lineHeight: '1.6',
                  }}>
                    PME / marques locales qui veulent poser une base solide
                  </p>
                  
                  {/* Pricing Block - Ultra Premium */}
                  <div className="relative mb-4 p-4 bg-gradient-to-br from-cyan-400/15 via-cyan-400/10 to-cyan-400/5 rounded-2xl border-2 border-cyan-400/40 group-hover/pack:border-cyan-400/70 group-hover/pack:shadow-2xl group-hover/pack:shadow-cyan-400/30 transition-all duration-700 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-cyan-400/20 to-cyan-400/10 opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" style={{
                      backgroundSize: '200% 200%',
                      animation: 'gradientShiftAdvanced 3s ease infinite',
                    }} />
                    
                    <div className="relative z-10">
                      <div className="text-3xl font-black text-white mb-2 group-hover/pack:text-cyan-200 transition-colors duration-700" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 20px rgba(0, 212, 255, 0.4)',
                        animation: 'pack-price-glow 3s ease-in-out infinite',
                      }}>
                        1 499 €
                      </div>
                      <div className="text-xs text-gray-300 mb-2 font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        TTC premier mois + 11 × 375 €
                      </div>
                      <div className="text-sm text-cyan-300 font-bold mt-2 group-hover/pack:text-cyan-200 transition-colors duration-700" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 15px rgba(0, 212, 255, 0.5)',
                      }}>
                        5 999 € TTC / an
                      </div>
                    </div>
                  </div>
                  
                  {/* Features List - Enhanced */}
                  <div className="space-y-4 mb-8">
                    {[
                      "Audit et stratégie initiale complète",
                      "1 shooting photo/vidéo de lancement",
                      "Plan éditorial sur 3 mois",
                      "6 publications/mois (visuels ou vidéos)",
                      "Gestion d'un réseau social (Instagram OU LinkedIn)",
                      "Reporting mensuel + ajustements"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-4 group/item">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <div className="absolute -inset-1 bg-cyan-400/30 rounded-lg blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                          <div className="relative w-5 h-5 rounded-lg bg-gradient-to-br from-cyan-400/40 to-cyan-400/30 flex items-center justify-center border border-cyan-400/50 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-500 shadow-lg shadow-cyan-400/30" style={{
                            animation: 'pack-check-bounce 2s ease-in-out infinite',
                            animationDelay: `${index * 0.1}s`,
                          }}>
                            <Check className="w-3 h-3 text-cyan-300 group-hover/item:text-white transition-colors duration-500" style={{
                              filter: 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.6))',
                            }} />
                          </div>
                        </div>
                        <span className="text-gray-200 text-sm leading-relaxed font-medium group-hover/item:text-white transition-colors duration-500" style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          lineHeight: '1.6',
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Delivery Times - Enhanced */}
                  <div className="relative p-3 bg-gradient-to-br from-white/8 to-white/5 rounded-xl border border-white/20 group-hover/pack:border-white/40 group-hover/pack:bg-white/10 transition-all duration-700">
                    <p className="text-xs text-gray-200 leading-relaxed font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      <span className="font-bold text-white">Délais moyens :</span> 2 semaines pour la mise en route, puis livrables mensuels
                    </p>
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-3xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/60 rounded-br-3xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                </div>
              </div>

              {/* Pack Croissance - Ultra Premium Royal */}
              <div className="relative group/pack" style={{ animationDelay: '0.2s' }}>
                {/* Multi-Layer Glow Effects - Ultra Premium */}
                <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/40 via-purple-500/50 to-purple-500/40 rounded-3xl blur-3xl opacity-60 group-hover/pack:opacity-100 transition-all duration-1000" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite', boxShadow: '0 0 50px rgba(168, 85, 247, 0.2), 0 0 100px rgba(168, 85, 247, 0.1)' }} />
                <div className="absolute -inset-3 bg-gradient-to-r from-purple-500/30 via-purple-500/40 to-purple-500/30 rounded-3xl blur-2xl opacity-50 group-hover/pack:opacity-90 transition-opacity duration-1000" />
                <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/20 via-purple-500/30 to-purple-500/20 rounded-2xl blur-xl opacity-40 group-hover/pack:opacity-80 transition-opacity duration-1000" />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/30 to-transparent" style={{ 
                    animation: 'light-sweep-premium 2s ease-in-out infinite',
                  }} />
                </div>
                
                {/* Main Card - Ultra Premium Royal */}
                <div className="relative bg-black/95 backdrop-blur-2xl rounded-3xl border-2 border-purple-500/50 p-5 group-hover/pack:border-purple-500/90 transition-all duration-700 group-hover/pack:shadow-2xl group-hover/pack:shadow-purple-500/40 overflow-hidden" style={{ 
                  transform: 'translateY(0) scale(1)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 25px 100px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(0, 0, 0, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}>
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-purple-500/5 opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShiftAdvanced 4s ease infinite',
                  }} />
                  
                  {/* Floating Particles */}
                  {mounted && [...Array(8)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-purple-400 rounded-full opacity-0 group-hover/pack:opacity-60"
                      style={{
                        left: `${10 + i * 11}%`,
                        top: `${15 + i * 9}%`,
                        animation: `particle-float-premium ${1.8 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                  
                  {/* Badge - Ultra Premium */}
                  <div className="relative mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-r from-purple-500/40 via-purple-500/50 to-purple-500/40 rounded-xl blur-xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                    <span className="relative inline-block px-4 py-1.5 bg-gradient-to-r from-purple-500/40 via-purple-500/50 to-purple-500/40 text-purple-300 rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-purple-500/60 shadow-2xl shadow-purple-500/40 group-hover/pack:shadow-purple-500/60 transition-all duration-700 group-hover/pack:scale-105" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      backgroundSize: '200% 200%',
                      animation: 'pack-badge-shine 3s linear infinite',
                      textShadow: '0 0 10px rgba(168, 85, 247, 0.5)',
                    }}>
                      Pack Croissance
                    </span>
                  </div>
                  
                  {/* Title - Ultra Premium */}
                  <h3 className="text-2xl font-black text-white mb-3 group-hover/pack:text-purple-300 transition-all duration-700 relative" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '-0.03em',
                    textShadow: '0 0 30px rgba(168, 85, 247, 0.3), 0 0 60px rgba(168, 85, 247, 0.2)',
                    animation: 'pack-price-glow 3s ease-in-out infinite',
                  }}>
                    Croissance
                  </h3>
                  
                  {/* Description - Enhanced */}
                  <p className="text-gray-200 text-base mb-4 font-medium leading-relaxed" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    lineHeight: '1.6',
                  }}>
                    Marques actives qui veulent accélérer leur visibilité et leurs ventes
                  </p>
                  
                  {/* Pricing Block - Ultra Premium */}
                  <div className="relative mb-4 p-4 bg-gradient-to-br from-purple-500/15 via-purple-500/10 to-purple-500/5 rounded-2xl border-2 border-purple-500/40 group-hover/pack:border-purple-500/70 group-hover/pack:shadow-2xl group-hover/pack:shadow-purple-500/30 transition-all duration-700 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-purple-500/20 to-purple-500/10 opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" style={{
                      backgroundSize: '200% 200%',
                      animation: 'gradientShiftAdvanced 3s ease infinite',
                    }} />
                    
                    <div className="relative z-10">
                      <div className="text-2xl font-black text-white mb-2 group-hover/pack:text-purple-200 transition-colors duration-700" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 20px rgba(168, 85, 247, 0.4)',
                        animation: 'pack-price-glow 3s ease-in-out infinite',
                      }}>
                        Sur devis
                      </div>
                      <div className="text-sm text-purple-300 font-bold mt-2 group-hover/pack:text-purple-200 transition-colors duration-700" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 15px rgba(168, 85, 247, 0.5)',
                      }}>
                        À partir de 9 000 € HT / an
                      </div>
                    </div>
                  </div>
                  
                  {/* Features List - Enhanced */}
                  <div className="space-y-2 mb-4">
                    {[
                      "Refonte ou optimisation du branding existant",
                      "2 shootings par trimestre (photo + vidéo)",
                      "Stratégie éditoriale multi-plateforme (Instagram, TikTok, LinkedIn)",
                      "Campagnes publicitaires (Meta, Google, TikTok)",
                      "Optimisation et reporting bi-mensuel"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 group/item">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <div className="absolute -inset-1 bg-purple-500/30 rounded-lg blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                          <div className="relative w-5 h-5 rounded-lg bg-gradient-to-br from-purple-500/40 to-purple-500/30 flex items-center justify-center border border-purple-500/50 group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-500 shadow-lg shadow-purple-500/30" style={{
                            animation: 'pack-check-bounce 2s ease-in-out infinite',
                            animationDelay: `${index * 0.1}s`,
                          }}>
                            <Check className="w-3 h-3 text-purple-300 group-hover/item:text-white transition-colors duration-500" style={{
                              filter: 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))',
                            }} />
                          </div>
                        </div>
                        <span className="text-gray-200 text-sm leading-relaxed font-medium group-hover/item:text-white transition-colors duration-500" style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          lineHeight: '1.6',
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Delivery Times - Enhanced */}
                  <div className="relative p-3 bg-gradient-to-br from-white/8 to-white/5 rounded-xl border border-white/20 group-hover/pack:border-white/40 group-hover/pack:bg-white/10 transition-all duration-700">
                    <p className="text-xs text-gray-200 leading-relaxed font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      <span className="font-bold text-white">Délais moyens :</span> 2 à 3 semaines pour le setup initial, suivi mensuel continu
                    </p>
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-500/60 rounded-tl-3xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/60 rounded-br-3xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                </div>
              </div>

              {/* Pack Signature - Ultra Premium Royal */}
              <div className="relative group/pack" style={{ animationDelay: '0.3s' }}>
                {/* Multi-Layer Glow Effects - Ultra Premium */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 via-purple-500/40 via-cyan-400/30 to-purple-500/40 rounded-3xl blur-3xl opacity-60 group-hover/pack:opacity-100 transition-all duration-1000" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
                <div className="absolute -inset-3 bg-gradient-to-r from-cyan-400/25 via-purple-500/35 to-cyan-400/25 rounded-3xl blur-2xl opacity-50 group-hover/pack:opacity-90 transition-opacity duration-1000" />
                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/20 via-purple-500/25 to-cyan-400/20 rounded-2xl blur-xl opacity-40 group-hover/pack:opacity-80 transition-opacity duration-1000" />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/20 via-purple-500/20 to-transparent" style={{ 
                    animation: 'light-sweep-premium 2s ease-in-out infinite',
                  }} />
                </div>
                
                {/* Main Card - Ultra Premium Royal */}
                <div className="relative bg-black/95 backdrop-blur-2xl rounded-3xl border-2 border-cyan-400/40 border-purple-500/40 p-5 group-hover/pack:border-cyan-400/80 group-hover/pack:border-purple-500/80 transition-all duration-700 group-hover/pack:shadow-2xl group-hover/pack:shadow-cyan-400/30 group-hover/pack:shadow-purple-500/30 overflow-hidden" style={{ 
                  transform: 'translateY(0) scale(1)',
                  transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                  boxShadow: '0 25px 100px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(0, 0, 0, 0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px) scale(1.04)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                }}>
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-cyan-400/5 opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShiftAdvanced 4s ease infinite',
                  }} />
                  
                  {/* Floating Particles */}
                  {mounted && [...Array(10)].map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-1.5 h-1.5 rounded-full opacity-0 group-hover/pack:opacity-60 ${i % 2 === 0 ? 'bg-cyan-400' : 'bg-purple-400'}`}
                      style={{
                        left: `${10 + i * 9}%`,
                        top: `${15 + i * 8}%`,
                        animation: `particle-float-premium ${1.8 + i * 0.2}s ease-in-out infinite`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                  
                  {/* Badge - Ultra Premium */}
                  <div className="relative mb-4">
                    <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/30 via-purple-500/40 to-cyan-400/30 rounded-xl blur-xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                    <span className="relative inline-block px-4 py-1.5 bg-gradient-to-r from-cyan-400/30 via-purple-500/40 to-cyan-400/30 text-white rounded-xl text-[10px] font-black uppercase tracking-widest border-2 border-cyan-400/50 border-purple-500/50 shadow-2xl shadow-cyan-400/30 shadow-purple-500/30 group-hover/pack:shadow-cyan-400/50 group-hover/pack:shadow-purple-500/50 transition-all duration-700 group-hover/pack:scale-105" style={{ 
                      fontFamily: 'Montserrat, sans-serif',
                      backgroundSize: '200% 200%',
                      animation: 'pack-badge-shine 3s linear infinite',
                      textShadow: '0 0 10px rgba(0, 212, 255, 0.5), 0 0 10px rgba(168, 85, 247, 0.5)',
                    }}>
                      Pack Signature
                    </span>
                  </div>
                  
                  {/* Title - Ultra Premium */}
                  <h3 className="text-2xl font-black text-white mb-3 group-hover/pack:text-transparent group-hover/pack:bg-clip-text group-hover/pack:bg-gradient-to-r group-hover/pack:from-cyan-300 group-hover/pack:to-purple-300 transition-all duration-700 relative" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    letterSpacing: '-0.03em',
                    textShadow: '0 0 30px rgba(0, 212, 255, 0.3), 0 0 30px rgba(168, 85, 247, 0.3)',
                    animation: 'pack-price-glow 3s ease-in-out infinite',
                  }}>
                    Signature
                  </h3>
                  
                  {/* Description - Enhanced */}
                  <p className="text-gray-200 text-base mb-4 font-medium leading-relaxed" style={{ 
                    fontFamily: 'Montserrat, sans-serif',
                    lineHeight: '1.6',
                  }}>
                    Marques premium ou internationales cherchant un accompagnement complet.
                  </p>
                  
                  {/* Pricing Block - Ultra Premium */}
                  <div className="relative mb-4 p-4 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-cyan-400/5 rounded-2xl border-2 border-cyan-400/40 border-purple-500/40 group-hover/pack:border-cyan-400/70 group-hover/pack:border-purple-500/70 group-hover/pack:shadow-2xl group-hover/pack:shadow-cyan-400/30 group-hover/pack:shadow-purple-500/30 transition-all duration-700 overflow-hidden">
                    {/* Animated Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/20 via-cyan-400/10 to-purple-500/20 opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" style={{
                      backgroundSize: '200% 200%',
                      animation: 'gradientShiftAdvanced 3s ease infinite',
                    }} />
                    
                    <div className="relative z-10">
                      <div className="text-2xl font-black text-white mb-2 group-hover/pack:text-transparent group-hover/pack:bg-clip-text group-hover/pack:bg-gradient-to-r group-hover/pack:from-cyan-200 group-hover/pack:to-purple-200 transition-all duration-700" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 20px rgba(0, 212, 255, 0.4), 0 0 20px rgba(168, 85, 247, 0.4)',
                        animation: 'pack-price-glow 3s ease-in-out infinite',
                      }}>
                        Sur devis
                      </div>
                      <div className="text-sm text-cyan-300 font-bold mt-2 group-hover/pack:text-transparent group-hover/pack:bg-clip-text group-hover/pack:bg-gradient-to-r group-hover/pack:from-cyan-200 group-hover/pack:to-purple-200 transition-all duration-700" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 15px rgba(0, 212, 255, 0.5), 0 0 15px rgba(168, 85, 247, 0.5)',
                      }}>
                        &gt; 15 000 € HT / an
                      </div>
                    </div>
                  </div>
                  
                  {/* Features List - Enhanced */}
                  <div className="space-y-2 mb-4">
                    {[
                      "Direction artistique complète (refonte identité + brandbook)",
                      "Production audiovisuelle premium (vidéos cinématiques, studio, drone)",
                      "Campagnes cross-plateformes (Meta, TikTok, Google, YouTube, LinkedIn)",
                      "Intégration du format Humind (interview premium, storytelling marque)",
                      "Stratégie trimestrielle pilotée par les fondateurs",
                      "Reporting avancé + support prioritaire"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-start gap-3 group/item">
                        <div className="relative flex-shrink-0 mt-0.5">
                          <div className={`absolute -inset-1 rounded-lg blur-md opacity-0 group-hover/item:opacity-100 transition-opacity duration-500 ${index % 2 === 0 ? 'bg-cyan-400/30' : 'bg-purple-500/30'}`} />
                          <div className={`relative w-5 h-5 rounded-lg flex items-center justify-center border group-hover/item:scale-125 group-hover/item:rotate-12 transition-all duration-500 shadow-lg ${index % 2 === 0 ? 'bg-gradient-to-br from-cyan-400/40 to-cyan-400/30 border-cyan-400/50 shadow-cyan-400/30' : 'bg-gradient-to-br from-purple-500/40 to-purple-500/30 border-purple-500/50 shadow-purple-500/30'}`} style={{
                            animation: 'pack-check-bounce 2s ease-in-out infinite',
                            animationDelay: `${index * 0.1}s`,
                          }}>
                            <Check className={`w-3 h-3 group-hover/item:text-white transition-colors duration-500 ${index % 2 === 0 ? 'text-cyan-300' : 'text-purple-300'}`} style={{
                              filter: index % 2 === 0 ? 'drop-shadow(0 0 4px rgba(0, 212, 255, 0.6))' : 'drop-shadow(0 0 4px rgba(168, 85, 247, 0.6))',
                            }} />
                          </div>
                        </div>
                        <span className="text-gray-200 text-sm leading-relaxed font-medium group-hover/item:text-white transition-colors duration-500" style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          lineHeight: '1.6',
                        }}>
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                  
                  {/* Delivery Times - Enhanced */}
                  <div className="relative p-3 bg-gradient-to-br from-white/8 to-white/5 rounded-xl border border-white/20 group-hover/pack:border-white/40 group-hover/pack:bg-white/10 transition-all duration-700">
                    <p className="text-xs text-gray-200 leading-relaxed font-medium" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      <span className="font-bold text-white">Délais moyens :</span> 3 à 4 semaines d'onboarding, production et diffusion mensuelles
                    </p>
                  </div>
                  
                  {/* Corner Accents */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400/60 rounded-tl-3xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-purple-500/60 rounded-br-3xl opacity-0 group-hover/pack:opacity-100 transition-opacity duration-700" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator - Enhanced */}
        <div className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
              <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
            </div>
          </div>
        </div>

        {/* Bloc comparaison (tableau) - Ultra Premium Enhanced */}
        <section className="relative py-24 px-6">
          <div className="max-w-7xl mx-auto">
            {/* Title with Enhanced Glow */}
            <div className="relative mb-16 text-center">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white relative z-10 mb-4" style={{ 
                fontFamily: 'Montserrat, sans-serif', 
                letterSpacing: '-0.03em',
                textShadow: '0 0 40px rgba(255, 255, 255, 0.3), 0 0 80px rgba(0, 212, 255, 0.2)',
              }}>
                Comparaison des Packs
              </h2>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
            </div>
            
            <div className="overflow-x-auto scrollbar-hide" style={{ 
              scrollbarWidth: 'none', 
              msOverflowStyle: 'none',
              WebkitOverflowScrolling: 'touch',
              scrollBehavior: 'smooth',
            }}>
              <div className="relative group/table">
                {/* Multi-Layer Glow Effects */}
                <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-3xl blur-3xl opacity-40 group-hover/table:opacity-70 transition-opacity duration-1000" style={{ animation: 'pack-glow-pulse 4s ease-in-out infinite' }} />
                <div className="absolute -inset-2 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-2xl blur-2xl opacity-30 group-hover/table:opacity-50 transition-opacity duration-1000" />
                
                {/* Light Sweep Effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent" style={{ 
                    animation: 'light-sweep-premium 3s ease-in-out infinite',
                  }} />
                </div>
                
                {/* Main Table Container */}
                <div className="relative bg-black/80 backdrop-blur-3xl rounded-3xl border-2 border-white/20 p-8 md:p-12 shadow-2xl shadow-black/70 group-hover/table:border-cyan-400/40 group-hover/table:shadow-cyan-400/20 group-hover/table:shadow-purple-500/20 transition-all duration-700">
                  {/* Animated Background Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-cyan-400/3 rounded-3xl opacity-0 group-hover/table:opacity-100 transition-opacity duration-700" style={{
                    backgroundSize: '200% 200%',
                    animation: 'gradientShiftAdvanced 6s ease infinite',
                  }} />
                  
                  <div className="relative z-10">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="border-b-2 border-white/30">
                          <th className="pb-6 pt-2 text-white font-black text-sm uppercase tracking-wider" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}>
                            Caractéristiques
                          </th>
                          <th className="pb-6 pt-2 text-cyan-400 font-black text-base uppercase tracking-wider text-center relative" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}>
                            <span className="relative z-10">Starter</span>
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-cyan-400 to-cyan-400/50 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 2s ease-in-out infinite' }} />
                          </th>
                          <th className="pb-6 pt-2 text-purple-400 font-black text-base uppercase tracking-wider text-center relative" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}>
                            <span className="relative z-10">Croissance</span>
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-purple-500 to-purple-500/50 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 2s ease-in-out infinite' }} />
                          </th>
                          <th className="pb-6 pt-2 text-cyan-400 font-black text-base uppercase tracking-wider text-center relative" style={{ fontFamily: 'Montserrat, sans-serif', letterSpacing: '0.1em' }}>
                            <span className="relative z-10">Signature</span>
                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-1 bg-gradient-to-r from-cyan-400 to-cyan-400/50 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 2s ease-in-out infinite' }} />
                          </th>
                        </tr>
                      </thead>
                      <tbody className="text-gray-200 text-sm md:text-base" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <tr className="border-b border-white/15 hover:bg-gradient-to-r hover:from-cyan-400/5 hover:via-purple-500/5 hover:to-cyan-400/5 transition-all duration-500 group/row">
                          <td className="py-6 font-bold text-white group-hover/row:text-cyan-400 transition-colors duration-500">Shootings / mois</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">1 initial</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-purple-300 transition-colors duration-500">2 / trimestre</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">Sur mesure</td>
                        </tr>
                        <tr className="border-b border-white/15 hover:bg-gradient-to-r hover:from-cyan-400/5 hover:via-purple-500/5 hover:to-cyan-400/5 transition-all duration-500 group/row">
                          <td className="py-6 font-bold text-white group-hover/row:text-cyan-400 transition-colors duration-500">Gestion réseaux</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">1 réseau</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-purple-300 transition-colors duration-500">Multi-plateformes</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">Cross-plateformes</td>
                        </tr>
                        <tr className="border-b border-white/15 hover:bg-gradient-to-r hover:from-cyan-400/5 hover:via-purple-500/5 hover:to-cyan-400/5 transition-all duration-500 group/row">
                          <td className="py-6 font-bold text-white group-hover/row:text-cyan-400 transition-colors duration-500">Ads incluses</td>
                          <td className="py-6 text-center font-semibold text-gray-500">-</td>
                          <td className="py-6 text-center font-semibold text-purple-400 group-hover/row:text-purple-300 transition-colors duration-500">
                            <Check className="w-5 h-5 mx-auto text-purple-400" />
                          </td>
                          <td className="py-6 text-center font-semibold text-cyan-400 group-hover/row:text-cyan-300 transition-colors duration-500">
                            <Check className="w-5 h-5 mx-auto text-cyan-400" />
                          </td>
                        </tr>
                        <tr className="border-b border-white/15 hover:bg-gradient-to-r hover:from-cyan-400/5 hover:via-purple-500/5 hover:to-cyan-400/5 transition-all duration-500 group/row">
                          <td className="py-6 font-bold text-white group-hover/row:text-cyan-400 transition-colors duration-500">Direction artistique</td>
                          <td className="py-6 text-center font-semibold text-gray-500">-</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-purple-300 transition-colors duration-500">Optimisation</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">Complète</td>
                        </tr>
                        <tr className="border-b border-white/15 hover:bg-gradient-to-r hover:from-cyan-400/5 hover:via-purple-500/5 hover:to-cyan-400/5 transition-all duration-500 group/row">
                          <td className="py-6 font-bold text-white group-hover/row:text-cyan-400 transition-colors duration-500">Suivi & reporting</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">Mensuel</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-purple-300 transition-colors duration-500">Bi-mensuel</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">Avancé</td>
                        </tr>
                        <tr className="border-b-2 border-white/30 hover:bg-gradient-to-r hover:from-cyan-400/10 hover:via-purple-500/10 hover:to-cyan-400/10 transition-all duration-500 group/row">
                          <td className="py-6 font-bold text-white text-lg group-hover/row:text-cyan-400 transition-colors duration-500">Prix indicatif</td>
                          <td className="py-6 text-center text-cyan-400 font-black text-lg group-hover/row:text-cyan-300 transition-colors duration-500" style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}>
                            5 999 € TTC/an
                          </td>
                          <td className="py-6 text-center text-purple-400 font-black text-lg group-hover/row:text-purple-300 transition-colors duration-500" style={{ textShadow: '0 0 20px rgba(168, 85, 247, 0.5)' }}>
                            À partir de 9 000 € HT/an
                          </td>
                          <td className="py-6 text-center text-cyan-400 font-black text-lg group-hover/row:text-cyan-300 transition-colors duration-500" style={{ textShadow: '0 0 20px rgba(0, 212, 255, 0.5)' }}>
                            &gt; 15 000 € HT/an
                          </td>
                        </tr>
                        <tr className="hover:bg-gradient-to-r hover:from-cyan-400/5 hover:via-purple-500/5 hover:to-cyan-400/5 transition-all duration-500 group/row">
                          <td className="py-6 font-bold text-white group-hover/row:text-cyan-400 transition-colors duration-500">Délais moyens</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">2 semaines</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-purple-300 transition-colors duration-500">2-3 semaines</td>
                          <td className="py-6 text-center font-semibold group-hover/row:text-cyan-300 transition-colors duration-500">3-4 semaines</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator - Enhanced */}
        <div className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
              <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
            </div>
          </div>
        </div>

        {/* Bloc Conférence Pixaura - Ultra Premium Royal */}
        <section className="relative py-24 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="relative group/conference">
              {/* Multi-Layer Glow Effects - Ultra Premium */}
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-3xl blur-4xl opacity-40 group-hover/conference:opacity-70 transition-opacity duration-1000" style={{ animation: 'pack-glow-pulse 4s ease-in-out infinite' }} />
              <div className="absolute -inset-4 bg-gradient-to-r from-white/15 via-white/20 to-white/15 rounded-3xl blur-3xl opacity-30 group-hover/conference:opacity-50 transition-opacity duration-1000" />
              <div className="absolute -inset-2 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-2xl blur-2xl opacity-20 group-hover/conference:opacity-40 transition-opacity duration-1000" />
              
              {/* Light Sweep Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/conference:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ 
                  animation: 'light-sweep-premium 3s ease-in-out infinite',
                }} />
              </div>
              
              {/* Main Card Container - Ultra Premium Royal */}
              <div className="relative bg-black/90 backdrop-blur-3xl rounded-3xl p-10 md:p-16 shadow-2xl shadow-black/70 transition-all duration-700 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-purple-500/8 to-cyan-400/5 opacity-0 group-hover/conference:opacity-100 transition-opacity duration-700" style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradientShiftAdvanced 6s ease infinite',
                }} />
                
                {/* Floating Particles */}
                {mounted && [...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full opacity-0 group-hover/conference:opacity-50 ${i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-white'}`}
                    style={{
                      left: `${15 + i * 8}%`,
                      top: `${20 + i * 7}%`,
                      animation: `particle-float-premium ${2.5 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                      filter: 'blur(1px)',
                    }}
                  />
                ))}
                
                {/* Corner Glow Effects */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tl-3xl opacity-0 group-hover/conference:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-tr-3xl opacity-0 group-hover/conference:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-bl-3xl opacity-0 group-hover/conference:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-br-3xl opacity-0 group-hover/conference:opacity-100 transition-opacity duration-700 blur-2xl" />
                
                <div className="relative z-10">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Text Content - Ultra Premium */}
                    <div className="space-y-6">
                      {/* Title - Ultra Premium */}
                      <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-2xl opacity-50 group-hover/conference:opacity-80 transition-opacity duration-700" />
                        <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white relative z-10 mb-8 group-hover/conference:text-transparent group-hover/conference:bg-clip-text group-hover/conference:bg-gradient-to-r group-hover/conference:from-cyan-400 group-hover/conference:via-purple-500 group-hover/conference:to-cyan-400 transition-all duration-700" style={{ 
                          fontFamily: 'Montserrat, sans-serif', 
                          letterSpacing: '-0.03em',
                          lineHeight: '1.1',
                          textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                        }}>
                          La Conférence Pixaura
                        </h2>
                        {/* Professional Underline */}
                        <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60 group-hover/conference:opacity-100 group-hover/conference:w-48 transition-all duration-700" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
                      </div>
                      
                      {/* Content Paragraphs - Premium Typography */}
                      <div className="space-y-5">
                        <p className="text-gray-200 text-lg md:text-xl leading-relaxed group-hover/conference:text-white transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Tous les 3 mois, nos clients sont invités à un événement exclusif : la Conférence Pixaura.
                        </p>
                        <p className="text-gray-300 text-base md:text-lg leading-relaxed group-hover/conference:text-gray-100 transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Un moment d'échange, de partage et de stratégie animé par les fondateurs, avec présentation des performances, tendances marketing et opportunités à venir.
                        </p>
                        <p className="text-gray-400 text-sm italic pt-2 border-t border-white/10 group-hover/conference:text-gray-300 transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          *Inclus pour les clients engagés (selon pack).
                        </p>
                      </div>
                    </div>
                    
                    {/* Image Container - Ultra Premium */}
                    <div className="relative aspect-[4/3] rounded-2xl overflow-hidden group/image">
                      {/* Multi-Layer Image Glow */}
                      <div className="absolute -inset-4 bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-3xl blur-3xl opacity-40 group-hover/image:opacity-70 transition-opacity duration-700" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
                      <div className="absolute -inset-2 bg-gradient-to-br from-white/20 via-white/15 to-white/20 rounded-2xl blur-xl opacity-30 group-hover/image:opacity-50 transition-opacity duration-700" />
                      
                      {/* Image Overlay Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-black/40 via-transparent to-black/40 opacity-60 group-hover/image:opacity-40 transition-opacity duration-700 z-10" />
                      
                      {/* Main Image */}
                      <Image
                        src="/Banque d_images/Copie de M7_09214.jpg"
                        alt="Conférence Pixaura - Événement exclusif"
                        fill
                        className="object-cover group-hover/image:scale-110 transition-transform duration-700"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                        priority
                      />
                      
                    </div>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator - Enhanced */}
        <div className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
              <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
            </div>
          </div>
        </div>

        {/* Section "Tarifs & Modalités" - Ultra Premium Royal */}
        <section className="relative py-24 px-6">
          <div className="max-w-5xl mx-auto">
            <div className="relative group/pricing">
              {/* Multi-Layer Glow Effects - Ultra Premium */}
              <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-3xl blur-4xl opacity-40 group-hover/pricing:opacity-70 transition-opacity duration-1000" style={{ animation: 'pack-glow-pulse 4s ease-in-out infinite' }} />
              <div className="absolute -inset-4 bg-gradient-to-r from-white/15 via-white/20 to-white/15 rounded-3xl blur-3xl opacity-30 group-hover/pricing:opacity-50 transition-opacity duration-1000" />
              <div className="absolute -inset-2 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-2xl blur-2xl opacity-20 group-hover/pricing:opacity-40 transition-opacity duration-1000" />
              
              {/* Light Sweep Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ 
                  animation: 'light-sweep-premium 3s ease-in-out infinite',
                }} />
              </div>
              
              {/* Main Card Container - Ultra Premium Royal */}
              <div className="relative bg-black/90 backdrop-blur-3xl rounded-3xl border-2 border-white/25 p-10 md:p-16 shadow-2xl shadow-black/70 group-hover/pricing:border-white/40 group-hover/pricing:shadow-cyan-400/20 group-hover/pricing:shadow-purple-500/20 transition-all duration-700 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-purple-500/8 to-cyan-400/5 opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700" style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradientShiftAdvanced 6s ease infinite',
                }} />
                
                {/* Floating Particles */}
                {mounted && [...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full opacity-0 group-hover/pricing:opacity-50 ${i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-white'}`}
                    style={{
                      left: `${20 + i * 10}%`,
                      top: `${25 + i * 8}%`,
                      animation: `particle-float-premium ${2.5 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                      filter: 'blur(1px)',
                    }}
                  />
                ))}
                
                {/* Corner Glow Effects */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tl-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-tr-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-bl-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-br-3xl opacity-0 group-hover/pricing:opacity-100 transition-opacity duration-700 blur-2xl" />
                
                <div className="relative z-10">
                  {/* Title - Ultra Premium */}
                  <div className="relative mb-10">
                    <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-2xl opacity-50 group-hover/pricing:opacity-80 transition-opacity duration-700" />
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white relative z-10 mb-4 group-hover/pricing:text-transparent group-hover/pricing:bg-clip-text group-hover/pricing:bg-gradient-to-r group-hover/pricing:from-cyan-400 group-hover/pricing:via-purple-500 group-hover/pricing:to-cyan-400 transition-all duration-700" style={{ 
                      fontFamily: 'Montserrat, sans-serif', 
                      letterSpacing: '-0.03em',
                      lineHeight: '1.1',
                      textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                    }}>
                      Tarifs & Modalités
                    </h2>
                    {/* Professional Underline */}
                    <div className="absolute -bottom-2 left-0 w-40 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60 group-hover/pricing:opacity-100 group-hover/pricing:w-56 transition-all duration-700" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
                  </div>
                  
                  {/* Content Paragraphs - Premium Typography */}
                  <div className="space-y-5 mb-10">
                    <p className="text-gray-200 text-lg md:text-xl leading-relaxed group-hover/pricing:text-white transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Notre stratégie marketing globale accompagne chaque marque sur 12 mois complets.
                    </p>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed group-hover/pricing:text-gray-100 transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Nous assurons la production de contenus réguliers, la gestion stratégique des réseaux, et un accompagnement créatif sur mesure.
                    </p>
                    <p className="text-gray-300 text-base md:text-lg leading-relaxed group-hover/pricing:text-gray-100 transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Toutes nos prestations sont encadrées par un contrat clair et un droit à l'image professionnel.
                    </p>
                  </div>
                  
                  {/* Starter Pack Highlight - Premium */}
                  <div className="relative mb-10 group/highlight">
                    <div className="absolute -inset-3 bg-gradient-to-br from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-2xl blur-2xl opacity-40 group-hover/highlight:opacity-70 transition-opacity duration-700" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
                    <div className="relative bg-gradient-to-br from-white/15 via-white/10 to-white/5 rounded-2xl border-2 border-white/30 p-6 md:p-8 shadow-xl shadow-black/50 group-hover/highlight:border-cyan-400/50 group-hover/highlight:shadow-cyan-400/20 transition-all duration-500">
                      <p className="text-white font-bold text-base md:text-lg leading-relaxed" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <span className="text-cyan-400">Starter :</span> 1 499 € TTC le 1er mois, puis 11 × 375 €. Engagement 12 mois, préavis 3 mois.
                      </p>
                    </div>
                  </div>
                  
                  {/* Premium Button for Modal */}
                  <Dialog.Root>
                    <Dialog.Trigger asChild>
                      <button className="group relative w-full px-8 py-5 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 text-white font-bold rounded-2xl hover:scale-105 transition-all duration-500 shadow-2xl shadow-cyan-400/30 hover:shadow-cyan-400/50 overflow-hidden" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                        <span className="relative z-10 flex items-center justify-center gap-3">
                          <FileText className="w-5 h-5" />
                          Voir les conditions détaillées
                        </span>
                      </button>
                    </Dialog.Trigger>
                    
                    {/* Premium Modal/Lightbox */}
                    <Dialog.Portal>
                      <Dialog.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
                      <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-4xl max-h-[85vh] bg-black/95 backdrop-blur-3xl rounded-3xl border-2 border-white/30 p-8 md:p-12 shadow-2xl shadow-black/80 z-50 overflow-y-auto data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95">
                        {/* Modal Glow Effects */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-3xl blur-4xl opacity-50" style={{ animation: 'pack-glow-pulse 4s ease-in-out infinite' }} />
                        <div className="absolute -inset-2 bg-gradient-to-r from-white/15 via-white/20 to-white/15 rounded-2xl blur-2xl opacity-30" />
                        
                        {/* Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-purple-500/8 to-cyan-400/5 rounded-3xl" style={{
                          backgroundSize: '200% 200%',
                          animation: 'gradientShiftAdvanced 6s ease infinite',
                        }} />
                        
                        <div className="relative z-10">
                          {/* Modal Header */}
                          <div className="flex items-center justify-between mb-8">
                            <div className="relative">
                              <Dialog.Title className="text-4xl md:text-5xl font-black text-white relative z-10" style={{ 
                                fontFamily: 'Montserrat, sans-serif', 
                                letterSpacing: '-0.03em',
                                textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                              }}>
                                Conditions Détaillées
                              </Dialog.Title>
                              <div className="absolute -bottom-2 left-0 w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
                            </div>
                            <Dialog.Close asChild>
                              <button className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 hover:border-cyan-400/50 flex items-center justify-center transition-all duration-300 hover:scale-110 group/close">
                                <X className="w-5 h-5 text-white group-hover/close:text-cyan-400 transition-colors duration-300" />
                              </button>
                            </Dialog.Close>
                          </div>
                          
                          {/* Modal Content */}
                          <div className="space-y-6">
                            {[
                              {
                                title: "Engagement et Durée",
                                content: "Tous nos packs sont proposés sur une base d'engagement de 12 mois complets, permettant un accompagnement stratégique approfondi et des résultats mesurables."
                              },
                              {
                                title: "Modalités de Paiement",
                                content: "Pour le Pack Starter : paiement initial de 1 499 € TTC au démarrage, suivi de 11 mensualités de 375 € TTC. Les autres packs font l'objet d'un devis personnalisé avec modalités adaptées."
                              },
                              {
                                title: "Préavis et Résiliation",
                                content: "Un préavis de 3 mois est requis pour toute résiliation anticipée. Cette période permet d'assurer une transition en douceur et de finaliser les projets en cours."
                              },
                              {
                                title: "Droit à l'Image",
                                content: "Toutes nos prestations incluent un droit à l'image professionnel, garantissant l'utilisation légale et éthique de tous les contenus produits dans le cadre de nos services."
                              },
                              {
                                title: "Contrat et Garanties",
                                content: "Chaque prestation est encadrée par un contrat clair et détaillé, définissant précisément les livrables, les délais, et les responsabilités de chaque partie. Nous garantissons la qualité professionnelle de tous nos services."
                              }
                            ].map((item, index) => (
                              <div key={index} className="relative group/item">
                                <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-cyan-400/10 rounded-xl opacity-0 group-hover/item:opacity-100 transition-opacity duration-500" />
                                <div className="relative bg-white/5 rounded-xl border border-white/10 p-6 group-hover/item:border-cyan-400/30 group-hover/item:bg-white/8 transition-all duration-500">
                                  <h3 className="text-white font-bold text-xl mb-3 group-hover/item:text-cyan-400 transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    {item.title}
                                  </h3>
                                  <p className="text-gray-300 text-base leading-relaxed group-hover/item:text-gray-100 transition-colors duration-500" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                    {item.content}
                                  </p>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </Dialog.Content>
                    </Dialog.Portal>
                  </Dialog.Root>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section Separator - Enhanced */}
        <div className="relative py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
              <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
            </div>
          </div>
        </div>

        {/* CTA final - Ultra Premium Royal */}
        <section className="relative py-32 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="relative group/cta">
              {/* Multi-Layer Glow Effects - Ultra Premium */}
              <div className="absolute -inset-8 bg-gradient-to-r from-cyan-400/30 via-purple-500/30 to-cyan-400/30 rounded-3xl blur-4xl opacity-40 group-hover/cta:opacity-70 transition-opacity duration-1000" style={{ animation: 'pack-glow-pulse 4s ease-in-out infinite' }} />
              <div className="absolute -inset-6 bg-gradient-to-r from-white/15 via-white/20 to-white/15 rounded-3xl blur-3xl opacity-30 group-hover/cta:opacity-50 transition-opacity duration-1000" />
              <div className="absolute -inset-4 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-2xl blur-2xl opacity-20 group-hover/cta:opacity-40 transition-opacity duration-1000" />
              
              {/* Light Sweep Effect */}
              <div className="absolute inset-0 rounded-3xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/15 to-transparent" style={{ 
                  animation: 'light-sweep-premium 3s ease-in-out infinite',
                }} />
              </div>
              
              {/* Main Container - Ultra Premium Royal */}
              <div className="relative bg-black/90 backdrop-blur-3xl rounded-3xl p-12 md:p-20 shadow-2xl shadow-black/70 transition-all duration-700 overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/8 via-purple-500/8 to-cyan-400/5 opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700" style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradientShiftAdvanced 6s ease infinite',
                }} />
                
                {/* Floating Particles */}
                {mounted && [...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className={`absolute w-2 h-2 rounded-full opacity-0 group-hover/cta:opacity-50 ${i % 3 === 0 ? 'bg-cyan-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-white'}`}
                    style={{
                      left: `${10 + i * 7}%`,
                      top: `${15 + i * 6}%`,
                      animation: `particle-float-premium ${2.5 + i * 0.3}s ease-in-out infinite`,
                      animationDelay: `${i * 0.3}s`,
                      filter: 'blur(1px)',
                    }}
                  />
                ))}
                
                {/* Corner Glow Effects */}
                <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-cyan-400/20 to-transparent rounded-tl-3xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-purple-500/20 to-transparent rounded-tr-3xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-cyan-400/20 to-transparent rounded-bl-3xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 blur-2xl" />
                <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-purple-500/20 to-transparent rounded-br-3xl opacity-0 group-hover/cta:opacity-100 transition-opacity duration-700 blur-2xl" />
                
                <div className="relative z-10">
                  {/* Title - Ultra Premium */}
                  <div className="relative mb-12">
                    <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-50 group-hover/cta:opacity-80 transition-opacity duration-700" />
                    <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white relative z-10 mb-6 group-hover/cta:text-transparent group-hover/cta:bg-clip-text group-hover/cta:bg-gradient-to-r group-hover/cta:from-cyan-400 group-hover/cta:via-purple-500 group-hover/cta:to-cyan-400 transition-all duration-700" style={{ 
                      fontFamily: 'Montserrat, sans-serif', 
                      letterSpacing: '-0.03em',
                      lineHeight: '1.1',
                      textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                    }}>
                      Discutons de votre projet
                    </h2>
                    {/* Professional Underline */}
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60 group-hover/cta:opacity-100 group-hover/cta:w-56 transition-all duration-700" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
                  </div>
                  
                  {/* Premium Button - Centered */}
                  <div className="flex justify-center">
                    <Link
                      href="/contact#rendez-vous"
                      className="group/button relative px-12 py-6 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 text-white font-bold text-lg rounded-2xl hover:scale-110 transition-all duration-500 shadow-2xl shadow-cyan-400/30 hover:shadow-cyan-400/50 hover:shadow-purple-500/30 flex items-center justify-center gap-4 overflow-hidden"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      {/* Multi-Layer Glow */}
                      <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-2xl blur-xl opacity-50 group-hover/button:opacity-80 transition-opacity duration-500" style={{ animation: 'pack-glow-pulse 2s ease-in-out infinite' }} />
                      
                      {/* Light Sweep */}
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover/button:translate-x-full transition-transform duration-1000" />
                      
                      {/* Border Glow */}
                      <div className="absolute inset-0 rounded-2xl border-2 border-white/30 group-hover/button:border-cyan-400/60 group-hover/button:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-500" />
                      
                      {/* Content */}
                      <Calendar className="w-6 h-6 relative z-10 group-hover/button:scale-110 transition-transform duration-500" />
                      <span className="relative z-10">Prendre rendez-vous</span>
                      
                    </Link>
                  </div>
                </div>
                
              </div>
            </div>
          </div>
        </section>
      </div>
      </div>
      <Footer />
    </main>
  )
}
