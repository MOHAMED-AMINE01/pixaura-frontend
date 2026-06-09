"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Sparkles, Target, BarChart3, Users, GraduationCap, Film, Shield, TrendingUp, Globe } from "lucide-react"
import { getAssetUrl } from "@/lib/cloudinary"

export default function AgencePage() {
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
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

  const values = [
    {
      icon: Sparkles,
      title: "Créativité contemporaine",
      description: "Direction artistique, storytelling visuel, esthétique inspirée des codes cinématiques.",
    },
    {
      icon: Target,
      title: "Intelligence stratégique",
      description: "Maîtrise des algorithmes, data, performance marketing et ciblage digital.",
    },
    {
      icon: GraduationCap,
      title: "Transmission & accompagnement",
      description: "Formations, ateliers, accompagnement stratégique pour faire grandir les marques.",
    },
  ]

  const teamMembers = [
    {
      name: "Franck Bourré",
      role: "CO-FONDATEUR & DIRECTEUR ADMINISTRATIF ET COMMERCIAL",
      image: getAssetUrl("/Banque d_images/Copie de M7_03372.jpg", "image"),
      description: "Entrepreneur depuis 2005, expert en gestion de projets ambitieux et en développement stratégique.",
      vision: "Allier rigueur opérationnelle, stratégie long terme et compréhension fine des enjeux économiques.",
    },
    {
      name: "Julien Hochet",
      role: "CO-FONDATEUR & DIRECTEUR MARKETING ET COMMUNICATION",
      image: getAssetUrl("/Banque d_images/Copie de M7_01248.jpg", "image"),
      description: "Ancien opérateur spécialisé des troupes parachutistes de l'armée de l'air, il incarne discipline, créativité et dépassement de soi.",
      vision: "Spécialiste du cadrage, montage et stratégie de communication digitale. Collaborations : Reebok, Adobe France, Shiftech.",
    },
  ]

  const partners = [
    {
      name: "Reebok",
      logo: "/Banque d_images/Reebok_logo19.png",
    },
    {
      name: "Adobe France",
      logo: "/Banque d_images/Adobe.png",
    },
    {
      name: "Shiftech",
      logo: "/Banque d_images/Logo_shiftech_2020.png",
    },
  ]

  const commitments = [
    {
      icon: Shield,
      title: "Transparence & contrat clair",
      description: "CGV et droit à l'image sécurisés.",
    },
    {
      icon: BarChart3,
      title: "Excellence mesurable",
      description: "KPI, reporting, ROI mensuel.",
    },
    {
      icon: Globe,
      title: "Vision responsable",
      description: "Production locale, engagement durable et éthique.",
    },
  ]

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
                  className="absolute w-1 h-1 bg-white rounded-full opacity-20"
                  style={{
                    left: `${left}%`,
                    top: `${top}%`,
                    animation: `floatAdvanced ${duration}s ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                    filter: 'blur(0.5px)',
                  }}
                />
              )
            })}
          </div>
        )}

        <div className="relative z-10">
          {/* Hero Section */}
          <section className="relative py-16 px-6 pt-24">
            <div className="max-w-7xl mx-auto text-center">
              <div className="relative mb-6">
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-50" />
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-white relative z-10 mb-4" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  letterSpacing: '-0.03em',
                  lineHeight: '1.1',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                }}>
                  Notre Agence
                </h1>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
              </div>
              <p className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-3xl mx-auto" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Une équipe passionnée dédiée à sublimer votre marque à travers la production audiovisuelle et la stratégie digitale.
              </p>
            </div>
          </section>

          {/* Section Separator */}
          <div className="relative py-6 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
              </div>
            </div>
          </div>

          {/* Section Manifeste & Valeurs */}
          <section className="relative py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-8 relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-50" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 relative z-10" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  letterSpacing: '-0.03em',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                }}>
                  Manifeste & Valeurs
                </h2>
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
              </div>

              <div className="max-w-4xl mx-auto mb-8">
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center mb-3" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Fondée par des passionnés de communication et d'image, Pixaura est née d'une conviction :
                </p>
                <p className="text-white text-xl md:text-2xl font-bold text-center mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  l'image doit à la fois inspirer et performer.
                </p>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Nous allions créativité contemporaine, rigueur stratégique et humanité dans chacune de nos productions.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
                {values.map((value, index) => {
                  const IconComponent = value.icon
                  return (
                    <div
                      key={index}
                      className="group relative"
                      style={{
                        animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                      }}
                    >
                      {/* Subtle Glow Effect - Premium */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/15 via-purple-500/15 to-purple-400/15 rounded-3xl blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                      
                      {/* Main Card - Premium Royal */}
                      <div className="relative bg-gradient-to-br from-black/85 via-slate-900/80 to-black/85 backdrop-blur-2xl rounded-2xl p-10 border border-white/15 group-hover:border-purple-400/40 transition-all duration-700 group-hover:shadow-xl group-hover:shadow-purple-500/20 group-hover:-translate-y-2">
                        {/* Subtle Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-purple-500/5 to-purple-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" style={{
                          backgroundSize: '200% 200%',
                          animation: 'gradientShiftAdvanced 8s ease infinite',
                        }} />
                        
                        {/* Icon Container - Premium Royal */}
                        <div className="relative mb-8 flex items-center justify-center z-10">
                          <div className="relative w-24 h-24 flex items-center justify-center">
                            {/* Icon Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/20 via-purple-500/20 to-purple-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                            
                            {/* Icon with Premium Animation */}
                            <IconComponent className="w-14 h-14 text-white group-hover:text-purple-400 transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(168,85,247,0.6)]" style={{ 
                              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.15))',
                              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                            }} />
                          </div>
                        </div>
                        
                        {/* Title - Premium Royal Typography */}
                        <h3 className="text-2xl font-black text-white text-center mb-4 relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-purple-500 group-hover:to-purple-400 transition-all duration-700" style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          textShadow: '0 0 15px rgba(255, 255, 255, 0.15), 0 0 30px rgba(168, 85, 247, 0.1)',
                          letterSpacing: '-0.02em',
                        }}>
                          {value.title}
                        </h3>
                        
                        {/* Description - Premium Typography */}
                        <p className="text-gray-300 text-center text-base leading-relaxed relative z-10 group-hover:text-white transition-colors duration-700" style={{ 
                          fontFamily: 'Montserrat, sans-serif',
                          textShadow: '0 0 8px rgba(255, 255, 255, 0.1)',
                        }}>
                          {value.description}
                        </p>
                        
                        {/* Subtle Bottom Accent Line */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 rounded-full group-hover:w-20 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>

          {/* Section Separator */}
          <div className="relative py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
              </div>
            </div>
          </div>

          {/* Section Équipe - Innovative Creative Design */}
          <section className="relative py-16 px-6 min-h-[85vh] flex items-center">
            <div className="max-w-7xl mx-auto w-full">
              <div className="text-center mb-12 relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-50" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 relative z-10" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  letterSpacing: '-0.03em',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                }}>
                  Les fondateurs de Pixaura
                </h2>
                <div className="absolute left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
              </div>

              {/* Innovative Split-Screen Design with Overlapping Cards */}
              <div className="relative max-w-6xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 items-stretch">
                  {teamMembers.map((member, index) => (
                    <div
                      key={index}
                      className={`group relative h-full ${index === 0 ? 'lg:pr-3 lg:z-10' : 'lg:pl-3 lg:-ml-8 lg:z-0'}`}
                      style={{
                        animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                      }}
                    >
                      {/* Mobile: THE ULTIMATE PREMIUM VERSION - BEST CREATION */}
                      <div className="lg:hidden group relative overflow-hidden rounded-[32px] sm:rounded-[40px] border border-white/25 bg-gradient-to-br from-white/10 via-white/8 to-white/6 p-8 sm:p-12 text-white backdrop-blur-3xl transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] hover:border-white/40 hover:bg-gradient-to-br hover:from-white/12 hover:via-white/10 hover:to-white/8 hover:shadow-[0_20px_60px_rgba(0,115,255,0.4),0_0_0_1px_rgba(255,255,255,0.1)] hover:-translate-y-1 shadow-[0_12px_40px_rgba(0,0,0,0.5),0_4px_16px_rgba(0,0,0,0.3)] h-full">
                        {/* Ultimate Multi-Layer Glow Effects - Always Visible */}
                        <div className="pointer-events-none absolute -inset-6 opacity-30 group-hover:opacity-60 transition-opacity duration-700">
                          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-cyan-400/25 via-purple-500/25 to-cyan-400/25 blur-3xl animate-pulse" style={{ animationDuration: '3s' }} />
                          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-br from-white/15 via-transparent to-white/15 blur-2xl" />
                          <div className="absolute inset-0 rounded-[40px] bg-gradient-to-t from-purple-500/10 via-transparent to-cyan-400/10 blur-xl" />
                        </div>

                        {/* Premium Animated Background Pattern */}
                        <div className="absolute inset-0 opacity-[0.05] group-hover:opacity-[0.08] transition-opacity duration-700">
                          <div className="absolute inset-0" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                            backgroundSize: '28px 28px',
                            animation: 'patternMove 20s linear infinite',
                          }} />
                        </div>

                        {/* Image - MAXIMUM CLARITY & BEAUTY - Ultra Clear */}
                        <div className="absolute top-0 right-0 h-full w-full sm:w-2/5 overflow-hidden rounded-r-[32px] sm:rounded-r-[40px] opacity-85 sm:opacity-90">
                          <Image
                            src={member.image}
                            alt={member.name}
                            fill
                            className="object-cover object-center scale-110 group-hover:scale-115 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                            sizes="100vw"
                            priority
                          />
                          {/* Ultra light gradient - maximum image visibility */}
                          <div className="absolute inset-0 bg-gradient-to-l from-black/60 via-black/25 to-black/10 sm:from-black/50 sm:via-black/20 sm:to-black/40" />
                          {/* Premium light effects on image */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/15 via-transparent to-transparent opacity-70" />
                          <div className="absolute inset-0 bg-gradient-to-t from-transparent via-purple-500/15 to-cyan-400/15 opacity-50" />
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent" />
                          {/* Animated light sweep */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-1000" style={{
                            transform: 'translateX(-100%)',
                            animation: 'lightSweep 3s ease-in-out infinite',
                          }} />
                        </div>

                        {/* Content - Ultimate Premium Typography & Perfect Spacing */}
                        <div className="relative flex flex-col gap-6 sm:gap-8 z-10">
                          {/* Ultimate Premium Badge - Extraordinary */}
                          <span className="inline-flex w-fit items-center gap-3 sm:gap-3.5 rounded-full border-2 border-white/30 bg-gradient-to-r from-white/20 via-white/18 to-white/20 px-6 py-2.5 sm:px-8 sm:py-3 text-xs sm:text-sm font-extrabold uppercase tracking-[0.45em] sm:tracking-[0.5em] text-white shadow-[0_0_50px_rgba(89,129,255,0.45),0_0_80px_rgba(56,189,248,0.3),0_6px_20px_rgba(0,0,0,0.4)] backdrop-blur-2xl transition-all duration-500 group-hover:shadow-[0_0_60px_rgba(89,129,255,0.55),0_0_100px_rgba(56,189,248,0.4),0_8px_24px_rgba(0,0,0,0.5)] group-hover:border-white/40 group-hover:bg-gradient-to-r group-hover:from-white/25 group-hover:via-white/20 group-hover:to-white/25 group-hover:scale-105">
                            <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-sky-300 drop-shadow-[0_0_12px_rgba(56,189,248,0.8)] animate-pulse" style={{ animationDuration: '2s' }} />
                            • FONDATEUR
                          </span>
                          
                          {/* Ultimate Premium Name - Extra Large & Beautiful */}
                          <h3 className="max-w-2xl text-4xl sm:text-5xl md:text-6xl font-black leading-[1.02] text-white tracking-tight" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                            letterSpacing: '-0.03em',
                            textShadow: '0 3px 25px rgba(0,0,0,0.6), 0 6px 50px rgba(0,0,0,0.4), 0 0 80px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.8)',
                            lineHeight: '1.02',
                          }}>
                            {member.name}
                          </h3>
                          
                          {/* Ultimate Premium Role - Beautiful Gradient */}
                          <p className="max-w-2xl min-h-[3.5rem] sm:min-h-[3.75rem] text-sm sm:text-base font-extrabold uppercase tracking-[0.25em] leading-tight bg-gradient-to-r from-purple-400 via-purple-300 via-cyan-300 to-cyan-400 bg-clip-text text-transparent drop-shadow-[0_3px_15px_rgba(168,85,247,0.5),0_0_30px_rgba(56,189,248,0.3)]" style={{
                            backgroundSize: '200% 200%',
                            animation: 'gradientShift 4s ease infinite',
                          }}>
                            {member.role}
                          </p>
                          
                          {/* Ultimate Premium Description - Perfect Readability */}
                          <p className="max-w-2xl min-h-[7rem] sm:min-h-[7.5rem] text-base sm:text-lg md:text-xl text-white leading-relaxed font-semibold" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                            textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.7)',
                            lineHeight: '1.8',
                            textAlign: 'justify',
                          }}>
                            {member.description}
                          </p>
                          
                          {/* Ultimate Premium Separator - Extraordinary Glow */}
                          <div className="max-w-2xl pt-6 border-t-2 border-white/35 relative">
                            <div className="absolute top-0 left-0 w-24 h-1 bg-gradient-to-r from-cyan-400/80 via-purple-500/80 to-cyan-400/80 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-500" />
                            <div className="absolute top-0 left-0 w-32 h-px bg-gradient-to-r from-cyan-400/60 via-purple-500/60 to-transparent blur-sm" />
                            <p className="min-h-[7rem] sm:min-h-[7.5rem] text-base sm:text-lg md:text-xl text-white leading-relaxed font-medium pt-6" style={{ 
                              fontFamily: 'Montserrat, sans-serif',
                              textShadow: '0 2px 12px rgba(0,0,0,0.5), 0 4px 24px rgba(0,0,0,0.3), 0 1px 2px rgba(0,0,0,0.7)',
                              lineHeight: '1.85',
                              textAlign: 'justify',
                            }}>
                              {member.vision}
                            </p>
                          </div>
                        </div>

                        {/* Ultimate Premium Corner Accents - Enhanced */}
                        <div className="absolute top-6 right-6 w-16 h-16 border-t-2 border-r-2 border-white/30 rounded-tr-[32px] opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:border-white/50" />
                        <div className="absolute bottom-6 left-6 w-16 h-16 border-b-2 border-l-2 border-white/30 rounded-bl-[32px] opacity-60 group-hover:opacity-90 transition-all duration-700 group-hover:border-white/50" />
                        
                        {/* Premium Light Rays */}
                        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-gradient-to-br from-cyan-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-purple-500/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                      </div>

                      {/* Desktop: Original Split Layout */}
                      <div className="hidden lg:block">
                        {/* Multi-Layer Glow Effects */}
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/25 via-purple-500/25 to-purple-400/25 rounded-2xl blur-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                        <div className="absolute -inset-2 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                        
                        {/* Main Card - Desktop: Split Layout */}
                        <div className="relative bg-gradient-to-br from-black/90 via-slate-900/85 to-black/90 backdrop-blur-2xl rounded-2xl overflow-hidden border border-white/15 group-hover:border-purple-400/50 transition-all duration-700 group-hover:shadow-2xl group-hover:shadow-purple-500/30 group-hover:-translate-y-1 h-full">
                          {/* Animated Background Gradient */}
                          <div className="absolute inset-0 bg-gradient-to-br from-purple-400/6 via-purple-500/6 to-purple-400/6 opacity-0 group-hover:opacity-100 transition-opacity duration-700" style={{
                            backgroundSize: '200% 200%',
                            animation: 'gradientShiftAdvanced 8s ease infinite',
                          }} />
                          
                          {/* Content Layout - Desktop: Side by Side */}
                          <div className="relative flex flex-row h-full min-h-[400px]">
                            {/* Image Container - Desktop Only */}
                            <div className={`relative w-full lg:w-2/5 ${index === 0 ? 'lg:order-1' : 'lg:order-2'} overflow-hidden`}>
                              <Image
                                src={member.image}
                                alt={member.name}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700 grayscale group-hover:grayscale-0"
                                sizes="(max-width: 1024px) 100vw, 40vw"
                              />
                              <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-100 transition-opacity duration-700" />
                              <div className="absolute inset-0 bg-purple-500/15 opacity-0 group-hover:opacity-25 transition-opacity duration-700" />
                            </div>
                            
                            {/* Content Container - Desktop: Side Panel */}
                            <div className={`relative w-full lg:w-3/5 p-6 sm:p-8 lg:p-8 flex flex-col justify-start ${index === 0 ? 'lg:order-2' : 'lg:order-1'} z-10`}>
                              {/* Name - Desktop Only */}
                              <div className="mb-3">
                                <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:via-purple-500 group-hover:to-purple-400 transition-all duration-700" style={{ 
                                  fontFamily: 'Montserrat, sans-serif',
                                  letterSpacing: '-0.02em',
                                  textShadow: '0 0 20px rgba(255, 255, 255, 0.2)',
                                }}>
                                  {member.name}
                                </h3>
                              </div>
                              
                              {/* Role */}
                              <p className="min-h-[3rem] text-purple-400 text-sm md:text-base font-semibold mb-3 leading-snug" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                                {member.role}
                              </p>
                              
                              {/* Description */}
                              <p className="min-h-[5.25rem] text-gray-300 text-sm md:text-base leading-relaxed mb-3" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'justify' }}>
                                {member.description}
                              </p>
                              
                              {/* Vision */}
                              <p className="min-h-[5.25rem] text-gray-400 text-sm leading-relaxed italic" style={{ fontFamily: 'Montserrat, sans-serif', textAlign: 'justify' }}>
                                {member.vision}
                              </p>
                              
                              {/* Decorative Accent */}
                              <div className="absolute bottom-4 left-6 lg:left-8 w-0 h-0.5 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-400 rounded-full group-hover:w-16 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Section Separator */}
          <div className="relative py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
              </div>
            </div>
          </div>

          {/* Section Coulisses de Production - Premium Creative */}
          <section className="relative py-20 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-12 relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-50" />
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-3 relative z-10" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  letterSpacing: '-0.03em',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                }}>
                  L'excellence naît du détail.
                </h2>
                <div className="absolute left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
              </div>

              <div className="relative max-w-6xl mx-auto">
                {/* Premium Video Background Container with Creative Design */}
                <div className="relative rounded-2xl overflow-hidden border border-white/15 group hover:border-white/30 transition-all duration-700 hover:shadow-2xl hover:shadow-purple-500/20">
                  {/* Multi-Layer Glow Effects */}
                  <div className="absolute -inset-4 bg-gradient-to-r from-purple-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-700" />
                  <div className="absolute -inset-2 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-700" />
                  
                  {/* Video Background with Enhanced Overlay */}
                  <div className="absolute inset-0">
                    <video
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-700"
                    >
                      <source src={getAssetUrl("/Banque d_images/stageMMa.mp4", "video")} type="video/mp4" />
                    </video>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/50 via-black/70 to-black/90" />
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  {/* Animated Grid Pattern Overlay */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-700" style={{
                    backgroundImage: `
                      linear-gradient(rgba(168, 85, 247, 0.1) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
                    `,
                    backgroundSize: '30px 30px',
                  }} />
                  
                  {/* Content Overlay - Premium Typography */}
                  <div className="relative z-10 p-8 md:p-12 lg:p-16">
                    <div className="max-w-4xl">
                      <p className="text-gray-100 text-lg md:text-xl lg:text-2xl leading-relaxed mb-6 font-medium" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)',
                      }}>
                        Notre studio de production interne garantit une maîtrise totale de la qualité, des délais et du rendu.
                      </p>
                      <p className="text-white text-base md:text-lg lg:text-xl leading-relaxed font-semibold" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 20px rgba(0, 0, 0, 0.5), 0 0 40px rgba(0, 0, 0, 0.3)',
                      }}>
                        De la conception à la post-production, nous contrôlons chaque étape : tournage, montage, motion design, direction artistique et stratégie de diffusion.
                      </p>
                    </div>
                    
                    {/* Decorative Accent Elements */}
                    <div className="absolute top-6 left-6 w-12 h-0.5 bg-gradient-to-r from-purple-400 via-purple-500 to-cyan-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    <div className="absolute bottom-6 right-6 w-12 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                  </div>
                  
                  {/* Corner Accents - Premium */}
                  <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-purple-400/0 group-hover:border-purple-400/50 rounded-tl-2xl transition-all duration-700" />
                  <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/50 rounded-tr-2xl transition-all duration-700" />
                  <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-400/0 group-hover:border-purple-400/50 rounded-bl-2xl transition-all duration-700" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400/0 group-hover:border-cyan-400/50 rounded-br-2xl transition-all duration-700" />
                </div>
              </div>
            </div>
          </section>

          {/* Section Separator */}
          <div className="relative py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
              </div>
            </div>
          </div>

          {/* Section Partenaires & Synergies */}
          <section className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-50" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 relative z-10" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  letterSpacing: '-0.03em',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                }}>
                  Partenaires & Synergies
                </h2>
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
              </div>

              <div className="max-w-4xl mx-auto mb-12">
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Nous collaborons avec des marques, créateurs et médias qui partagent notre vision de l'excellence visuelle.
                </p>
                <p className="text-gray-300 text-lg md:text-xl leading-relaxed text-center" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  Grâce à notre plateforme Humind, nous mettons en lumière les visages humains de ceux qui inspirent le monde.
                </p>
              </div>

              {/* Partners Logos Grid - Professional Premium */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {partners.map((partner, index) => (
                  <div
                    key={index}
                    className="group relative"
                    style={{
                      animation: `fadeInUp 0.8s ease-out ${index * 0.15}s both`,
                    }}
                  >
                    {/* Subtle Glow Effect */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-white/5 via-white/8 to-white/5 rounded-3xl blur-2xl opacity-0 group-hover:opacity-30 transition-opacity duration-500" />
                    
                    {/* Main Card - Professional Premium */}
                    <div className="relative bg-gradient-to-br from-black/95 via-slate-900/90 to-black/95 backdrop-blur-2xl rounded-2xl p-10 border border-white/15 group-hover:border-white/30 transition-all duration-500 group-hover:shadow-xl group-hover:shadow-white/10 group-hover:-translate-y-1 flex flex-col items-center justify-center min-h-[260px]">
                      {/* Subtle Background Gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/2 via-transparent to-white/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                      
                      {/* Logo Container - Enhanced Visibility */}
                      <div className="relative w-full h-44 mb-6 flex items-center justify-center z-10">
                        <Image
                          src={partner.logo}
                          alt={partner.name}
                          fill
                          className={`object-contain transition-all duration-500 group-hover:scale-105 ${
                            partner.name === "Shiftech" 
                              ? "opacity-100 brightness-110 contrast-110" 
                              : "opacity-95 group-hover:opacity-100"
                          }`}
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{
                            filter: partner.name === "Shiftech" 
                              ? "brightness(1.15) contrast(1.15) drop-shadow(0 0 8px rgba(255, 255, 255, 0.2))" 
                              : "drop-shadow(0 0 8px rgba(255, 255, 255, 0.15))",
                          }}
                        />
                      </div>
                      
                      {/* Partner Name - Professional Typography */}
                      <h3 className="text-xl md:text-2xl font-bold text-white text-center relative z-10 transition-colors duration-500 group-hover:text-gray-100" style={{ 
                        fontFamily: 'Montserrat, sans-serif',
                        textShadow: '0 0 10px rgba(255, 255, 255, 0.1)',
                        letterSpacing: '-0.01em',
                      }}>
                        {partner.name}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Section Separator */}
          <div className="relative py-12 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="h-[2px] bg-gradient-to-r from-transparent via-white/40 to-transparent rounded-full">
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-cyan-400/60 to-purple-500/60 blur-sm opacity-60" />
              </div>
            </div>
          </div>

          {/* Section Labels & Engagements - Premium Royal */}
          <section className="relative py-24 px-6">
            <div className="max-w-7xl mx-auto">
              <div className="text-center mb-16 relative">
                <div className="absolute -inset-6 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-3xl opacity-50" />
                <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-4 relative z-10" style={{ 
                  fontFamily: 'Montserrat, sans-serif', 
                  letterSpacing: '-0.03em',
                  textShadow: '0 0 40px rgba(255, 255, 255, 0.2), 0 0 80px rgba(255, 255, 255, 0.1)',
                }}>
                  Labels & Engagements
                </h2>
                <div className="absolute left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full opacity-60" style={{ animation: 'pack-glow-pulse 3s ease-in-out infinite' }} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {commitments.map((commitment, index) => {
                  const IconComponent = commitment.icon
                  return (
                    <div
                      key={index}
                      className="group relative"
                      style={{
                        animation: `fadeInUp 0.8s ease-out ${index * 0.2}s both`,
                      }}
                    >
                      {/* Subtle Glow Effect - Premium */}
                      <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/15 via-purple-500/15 to-cyan-400/15 rounded-3xl blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                      
                      {/* Main Card - Premium Royal */}
                      <div className="relative bg-gradient-to-br from-black/85 via-slate-900/80 to-black/85 backdrop-blur-2xl rounded-2xl p-9 border border-white/15 group-hover:border-white/30 transition-all duration-700 group-hover:shadow-xl group-hover:shadow-white/15 group-hover:-translate-y-2 flex flex-col h-full min-w-0">
                        {/* Subtle Animated Background Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/5 via-purple-500/5 to-cyan-400/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" style={{
                          backgroundSize: '200% 200%',
                          animation: 'gradientShiftAdvanced 8s ease infinite',
                        }} />
                        
                        {/* Icon Container - Premium Royal */}
                        <div className="relative mb-6 flex items-center justify-center z-10 flex-shrink-0">
                          <div className="relative w-20 h-20 flex items-center justify-center">
                            {/* Icon Glow Background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
                            <div className="absolute inset-0 bg-gradient-to-r from-white/10 via-white/15 to-white/10 rounded-full blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
                            
                            {/* Icon with Premium Animation */}
                            <IconComponent className="w-12 h-12 text-white group-hover:text-cyan-400 transition-all duration-700 group-hover:scale-110 group-hover:drop-shadow-[0_0_20px_rgba(34,211,238,0.6)]" style={{ 
                              filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.15))',
                              transition: 'all 0.7s cubic-bezier(0.16, 1, 0.3, 1)',
                            }} />
                          </div>
                        </div>
                        
                        {/* Title - Premium Royal Typography - Fixed Height */}
                        <div className="relative mb-4 flex-shrink-0 min-h-[60px] flex items-center justify-center px-2">
                          <h3 className="text-xl font-black text-white text-center whitespace-nowrap relative z-10 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-cyan-400 group-hover:via-purple-500 group-hover:to-cyan-400 transition-all duration-700" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                            textShadow: '0 0 15px rgba(255, 255, 255, 0.15), 0 0 30px rgba(168, 85, 247, 0.1)',
                            letterSpacing: '-0.02em',
                          }}>
                            {commitment.title}
                          </h3>
                        </div>
                        
                        {/* Description - Premium Typography - Fixed Position */}
                        <div className="relative flex-1 flex items-start justify-center mt-auto px-2">
                          <p className="text-gray-300 text-center text-base leading-relaxed relative z-10 group-hover:text-white transition-colors duration-700" style={{ 
                            fontFamily: 'Montserrat, sans-serif',
                            textShadow: '0 0 8px rgba(255, 255, 255, 0.1)',
                          }}>
                            {commitment.description}
                          </p>
                        </div>
                        
                        {/* Subtle Bottom Accent Line */}
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-cyan-400 via-purple-500 to-cyan-400 rounded-full group-hover:w-20 transition-all duration-700 opacity-0 group-hover:opacity-100" />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </section>
        </div>
      </div>
      <Footer />
    </main>
  )
}
