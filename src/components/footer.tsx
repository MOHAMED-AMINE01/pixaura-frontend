"use client"

import Link from "next/link"
import Image from "next/image"
import { Mail, Phone, MapPin, Clock, Instagram, Linkedin, Music2, Youtube } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

export function Footer() {
  const { t, language } = useTranslation()
  return (
    <footer className="relative bg-transparent border-t border-white/10 md:border-white/20 py-12 sm:py-16 md:py-20 px-4 sm:px-6 overflow-hidden">
      {/* Premium Animated Background Effects - Mobile Only */}
      <div className="md:hidden absolute inset-0 pointer-events-none overflow-hidden">
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-gradient-to-r from-purple-500/20 via-cyan-400/20 to-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        {/* Subtle Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(0, 200, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 200, 255, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }} />
      </div>

      {/* Desktop readability layer (stronger text contrast on video background) */}
      <div className="hidden md:block absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/45 to-black/20" />
        <div className="absolute inset-0 backdrop-blur-xl" />
      </div>

      <div className="relative mx-auto flex max-w-6xl flex-col gap-10 sm:gap-12 md:gap-16 text-white z-10">
        <div className="flex flex-col gap-8 sm:gap-10 md:gap-12 md:grid md:grid-cols-[1.3fr_1fr] md:gap-16 md:items-start">
          {/* Brand Section - Premium Mobile Design */}
          <div className="space-y-6 sm:space-y-8 md:pt-0">
            {/* Mobile: Logo aligned with Contact/Navigation titles */}
            <div className="relative group md:hidden">
              {/* Glow Effect Behind Logo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/Banque d_images/PIXaura-soft white.png"
                alt="Pixaura International"
                width={140}
                height={42}
                className="relative h-8 sm:h-10 w-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Desktop: Logo aligned with Contact/Navigation titles */}
            <div className="hidden md:block relative group">
              {/* Glow Effect Behind Logo */}
              <div className="absolute -inset-4 bg-gradient-to-r from-cyan-400/20 via-purple-500/20 to-cyan-400/20 rounded-2xl blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <Image
                src="/Banque d_images/PIXaura-soft white.png"
                alt="Pixaura International"
                width={140}
                height={42}
                className="relative h-8 sm:h-10 w-auto transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            
            {/* Grouped Content: Tagline, Badge, and Social Icons */}
            <div className="space-y-6 sm:space-y-8">
              <p className="text-xs sm:text-sm text-white/70 md:text-white/90 md:font-medium leading-relaxed relative md:mt-7 md:[text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
                <span className="absolute -left-2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400/50 to-purple-500/50 opacity-0 md:opacity-100" />
                <span className="md:pl-4 block">{t("footer.tagline")}</span>
              </p>
              
              {/* Premium Badge */}
              <div className="relative group inline-flex items-center gap-2 rounded-full border border-white/20 bg-gradient-to-r from-white/10 via-white/5 to-white/10 px-4 py-2 text-[10px] sm:text-xs uppercase tracking-[0.3em] text-white/70 backdrop-blur-md overflow-hidden">
                {/* Animated Background Gradient */}
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/10 via-purple-500/10 to-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{
                  backgroundSize: '200% 200%',
                  animation: 'gradientShift 3s ease infinite',
                }} />
                {/* Animated Border Glow */}
                <div className="absolute inset-0 rounded-full border border-cyan-400/0 group-hover:border-cyan-400/30 transition-all duration-500" />
                <span className="relative">{t("footer.production")}</span>
              </div>

              {/* Premium Social Icons */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                {[{
                  href: "https://www.instagram.com/pixaura_it",
                  icon: Instagram,
                  color: "from-pink-500 to-purple-600",
                },
                {
                  href: "https://www.linkedin.com/company/pixaura-international/posts/?feedView=all",
                  icon: Linkedin,
                  color: "from-blue-500 to-blue-700",
                },
                {
                  href: "https://www.tiktok.com/@pixaura_it",
                  icon: Music2,
                  color: "from-black to-gray-800",
                },
                {
                  href: "https://www.youtube.com/@Humind_Pixaura",
                  icon: Youtube,
                  color: "from-red-500 to-red-700",
                }].map(({ href, icon: Icon, color }) => (
                  <Link
                    key={href}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative flex h-11 w-11 sm:h-12 sm:w-12 items-center justify-center rounded-full overflow-hidden transition-all duration-500"
                  >
                    {/* Animated Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                    
                    {/* Glassmorphism Border */}
                    <div className="absolute inset-0 rounded-full border-2 border-white/20 group-hover:border-white/40 transition-all duration-500 backdrop-blur-sm" />
                    
                    {/* Glow Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/0 via-cyan-400/20 to-cyan-400/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500" />
                    
                    {/* Icon */}
                    <Icon className="relative h-4 w-4 sm:h-5 sm:w-5 text-white/80 group-hover:text-white transition-all duration-500 group-hover:scale-110 z-10" />
                    
                    {/* Shine Effect */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Ultra Premium Contact & Navigation - Mobile Only */}
          <div className="md:hidden relative">
            {/* Elegant Vertical Divider */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent -translate-x-1/2" />
            
            <div className="grid grid-cols-2 gap-6">
              {/* Ultra Premium Contact Section */}
              <div className="relative">
                {/* Subtle Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 rounded-lg blur opacity-0 hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative">
                  {/* Elegant Title with Underline */}
                  <div className="mb-4 pb-3 border-b border-white/10">
                    <h3 className="text-[11px] uppercase tracking-[0.4em] text-white/40 font-medium mb-1">{t("footer.contact")}</h3>
                    <div className="h-px w-12 bg-gradient-to-r from-cyan-400 to-transparent" />
                  </div>
                  
                  {/* Premium Contact Items */}
                  <ul className="space-y-3.5">
                    <li className="group/item">
                      <a 
                        href="mailto:contact@pixaura.eu" 
                        className="flex items-start gap-3 text-xs text-white/70 hover:text-white transition-all duration-400"
                      >
                        <div className="relative mt-0.5 flex-shrink-0">
                          <div className="absolute inset-0 bg-cyan-400/20 rounded blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-400" />
                          <Mail className="relative h-3.5 w-3.5 text-white/40 group-hover/item:text-cyan-400 transition-all duration-400" />
                        </div>
                        <span className="break-all leading-relaxed group-hover/item:translate-x-1 transition-transform duration-400">
                          contact@pixaura.eu
                        </span>
                      </a>
                    </li>
                    
                    <li className="group/item">
                      <a 
                        href="tel:+33677884469" 
                        className="flex items-start gap-3 text-xs text-white/70 hover:text-white transition-all duration-400"
                      >
                        <div className="relative mt-0.5 flex-shrink-0">
                          <div className="absolute inset-0 bg-cyan-400/20 rounded blur-sm opacity-0 group-hover/item:opacity-100 transition-opacity duration-400" />
                          <Phone className="relative h-3.5 w-3.5 text-white/40 group-hover/item:text-cyan-400 transition-all duration-400" />
                        </div>
                        <span className="leading-relaxed group-hover/item:translate-x-1 transition-transform duration-400">
                          {language === 'en' ? '+33 6 77 88 44 69' : '06 77 88 44 69'}
                        </span>
                      </a>
                    </li>
                    
                    <li className="flex items-start gap-3 text-xs text-white/50">
                      <MapPin className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span>{t("footer.location")}</span>
                    </li>
                    
                    <li className="flex items-start gap-3 text-xs text-white/50">
                      <Clock className="h-3.5 w-3.5 flex-shrink-0 mt-0.5" />
                      <span>{t("footer.hours")}</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Ultra Premium Navigation Section */}
              <div className="relative">
                {/* Subtle Glow Effect */}
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-400/0 via-purple-400/10 to-purple-400/0 rounded-lg blur opacity-0 hover:opacity-100 transition-opacity duration-700" />
                
                <div className="relative">
                  {/* Elegant Title with Underline */}
                  <div className="mb-4 pb-3 border-b border-white/10">
                    <h3 className="text-[11px] uppercase tracking-[0.4em] text-white/40 font-medium mb-1">{t("footer.navigation")}</h3>
                    <div className="h-px w-12 bg-gradient-to-r from-purple-400 to-transparent" />
                  </div>
                  
                  {/* Premium Navigation Links - Three columns on desktop */}
                  <div className="flex flex-col md:flex-row md:gap-12 md:justify-center md:items-center">
                    {/* Colonne 1: Accueil, Services */}
                    <ul className="space-y-0 md:space-y-2.5">
                      {[
                        { label: t("footer.home"), href: "/" },
                        { label: t("footer.services"), href: "#services" },
                      ].map(({ label, href }, index) => (
                        <li key={label} style={{ animationDelay: `${index * 30}ms` }}>
                          <Link 
                            href={href}
                            className="group/link relative block text-xs text-white/70 hover:text-white transition-all duration-400"
                          >
                            <div className="flex items-center gap-2">
                              {/* Elegant Dot Indicator */}
                              <div className="w-1 h-1 rounded-full bg-white/20 group-hover/link:bg-cyan-400 transition-all duration-400 group-hover/link:scale-150 group-hover/link:shadow-lg group-hover/link:shadow-cyan-400/50" />
                              
                              {/* Link Text with Smooth Animation */}
                              <span className="relative flex-1 group-hover/link:translate-x-1 transition-transform duration-400">
                                {label}
                                {/* Elegant Underline */}
                                <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent group-hover/link:w-full transition-all duration-500 ease-out" />
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Colonne 2: Offre, Agence */}
                    <ul className="space-y-0 md:space-y-2.5">
                      {[
                        { label: t("footer.offre"), href: "/#offre" },
                        { label: t("footer.agence"), href: "/#agence" },
                      ].map(({ label, href }, index) => (
                        <li key={label} style={{ animationDelay: `${(index + 2) * 30}ms` }}>
                          <Link 
                            href={href}
                            className="group/link relative block text-xs text-white/70 hover:text-white transition-all duration-400"
                          >
                            <div className="flex items-center gap-2">
                              {/* Elegant Dot Indicator */}
                              <div className="w-1 h-1 rounded-full bg-white/20 group-hover/link:bg-cyan-400 transition-all duration-400 group-hover/link:scale-150 group-hover/link:shadow-lg group-hover/link:shadow-cyan-400/50" />
                              
                              {/* Link Text with Smooth Animation */}
                              <span className="relative flex-1 group-hover/link:translate-x-1 transition-transform duration-400">
                                {label}
                                {/* Elegant Underline */}
                                <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent group-hover/link:w-full transition-all duration-500 ease-out" />
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {/* Colonne 3: Humind, Contact */}
                    <ul className="space-y-0 md:space-y-2.5">
                      {[
                        { label: t("footer.humind"), href: "/humind" },
                        { label: t("footer.contact"), href: "/#contact" },
                      ].map(({ label, href }, index) => (
                        <li key={label} style={{ animationDelay: `${(index + 4) * 30}ms` }}>
                          <Link 
                            href={href}
                            className="group/link relative block text-xs text-white/70 hover:text-white transition-all duration-400"
                          >
                            <div className="flex items-center gap-2">
                              {/* Elegant Dot Indicator */}
                              <div className="w-1 h-1 rounded-full bg-white/20 group-hover/link:bg-cyan-400 transition-all duration-400 group-hover/link:scale-150 group-hover/link:shadow-lg group-hover/link:shadow-cyan-400/50" />
                              
                              {/* Link Text with Smooth Animation */}
                              <span className="relative flex-1 group-hover/link:translate-x-1 transition-transform duration-400">
                                {label}
                                {/* Elegant Underline */}
                                <span className="absolute bottom-0 left-0 w-0 h-[0.5px] bg-gradient-to-r from-cyan-400 via-purple-400 to-transparent group-hover/link:w-full transition-all duration-500 ease-out" />
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Desktop Contact & Navigation */}
          <div className="hidden md:grid md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.35em] text-white/85 font-bold md:[text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">{t("footer.contact")}</p>
              <ul className="space-y-3 text-sm text-white/85 md:[text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
                <li className="group flex items-start gap-3 hover:text-white transition-colors h-[1.75rem]">
                  <Mail className="h-4 w-4 text-white/80 group-hover:text-cyan-300 transition-colors flex-shrink-0 mt-0.5" />
                  <a href="mailto:contact@pixaura.eu" className="break-all hover:text-cyan-400 transition-colors">contact@pixaura.eu</a>
                </li>
                <li className="group flex items-start gap-3 hover:text-white transition-colors h-[1.75rem]">
                  <Phone className="h-4 w-4 text-white/80 group-hover:text-cyan-300 transition-colors flex-shrink-0 mt-0.5" />
                  <a href="tel:+33677884469" className="hover:text-cyan-400 transition-colors">{language === 'en' ? '+33 6 77 88 44 69' : '06 77 88 44 69'}</a>
                </li>
                <li className="flex items-start gap-3 text-white/80 h-[1.75rem]">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 text-white/80" />
                  <span>{t("footer.location")}</span>
                </li>
                <li className="flex items-start gap-3 text-white/80 h-[1.75rem]">
                  <Clock className="h-4 w-4 flex-shrink-0 mt-0.5 text-white/80" />
                  <span>{t("footer.hours")}</span>
                </li>
              </ul>
            </div>

            <div className="space-y-4 md:ml-auto md:mr-8">
              <p className="text-xs uppercase tracking-[0.35em] text-white/85 font-bold md:[text-shadow:0_2px_14px_rgba(0,0,0,0.75)] text-center">{t("footer.navigation")}</p>
              <div className="flex gap-12 justify-center">
                {/* Colonne 1: Accueil, Services */}
                <ul className="space-y-3 text-sm text-white/85 md:[text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
                  {[
                    { label: t("footer.home"), href: "/" },
                    { label: t("footer.services"), href: "#services" },
                  ].map(({ label, href }) => (
                    <li key={label} className="h-[1.75rem] flex items-center">
                      <Link className="group transition-all duration-300 hover:text-cyan-400 hover:translate-x-1 block w-full" href={href}>
                        <span className="relative inline-block">
                          {label}
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Colonne 2: Offre, Agence */}
                <ul className="space-y-3 text-sm text-white/85 md:[text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
                  {[
                    { label: t("footer.offre"), href: "/#offre" },
                    { label: t("footer.agence"), href: "/#agence" },
                  ].map(({ label, href }) => (
                    <li key={label} className="h-[1.75rem] flex items-center">
                      <Link className="group transition-all duration-300 hover:text-cyan-400 hover:translate-x-1 block w-full" href={href}>
                        <span className="relative inline-block">
                          {label}
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>

                {/* Colonne 3: Humind, Contact */}
                <ul className="space-y-3 text-sm text-white/85 md:[text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
                  {[
                    { label: t("footer.humind"), href: "/humind" },
                    { label: t("footer.contact"), href: "/#contact" },
                  ].map(({ label, href }) => (
                    <li key={label} className="h-[1.75rem] flex items-center">
                      <Link className="group transition-all duration-300 hover:text-cyan-400 hover:translate-x-1 block w-full" href={href}>
                        <span className="relative inline-block">
                          {label}
                          <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-cyan-400 transition-all duration-300 group-hover:w-full"></span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Premium Copyright Section - Full Width */}
      <div className="relative mt-8 sm:mt-10 md:mt-12 border-t border-white/10 pt-3 sm:pt-4">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 md:mx-0 md:max-w-none md:pl-4 md:pr-6">
          {/* Animated Gradient Line - Mobile Only */}
          <div className="md:hidden absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 md:gap-4 text-[10px] sm:text-xs text-white/50 md:text-sm md:text-white/80 md:[text-shadow:0_2px_14px_rgba(0,0,0,0.75)]">
            <p className="text-center md:text-left">{t("footer.copyright")}</p>
            
            <div className="flex flex-wrap justify-center md:justify-end gap-4 md:gap-6">
              <Link href="/mentions-legales" className="hover:text-white transition-colors md:text-white/80">
                Mentions légales
              </Link>
              <Link href="/politique-de-confidentialite" className="hover:text-white transition-colors md:text-white/80">
                Politique de confidentialité
              </Link>
              <Link href="/cookies" className="hover:text-white transition-colors md:text-white/80">
                Cookies
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
