"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Shield, User, Database, Target, Users, Clock, Lock, Mail, ArrowRight } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

export default function PolitiqueConfidentialitePage() {
  const { t } = useTranslation()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const sections = [
    {
      id: "introduction",
      icon: Shield,
      title: t("politiqueConfidentialite.introduction.title"),
      content: [
        {
          value: t("politiqueConfidentialite.introduction.content1")
        },
        {
          value: t("politiqueConfidentialite.introduction.content2")
        }
      ]
    },
    {
      id: "responsable",
      icon: User,
      title: t("politiqueConfidentialite.responsable.title"),
      content: [
        {
          label: t("politiqueConfidentialite.responsable.label"),
          value: t("politiqueConfidentialite.responsable.company")
        },
        {
          value: t("politiqueConfidentialite.responsable.address")
        },
        {
          label: t("politiqueConfidentialite.responsable.email"),
          value: "contact@pixaura.eu",
          type: "email"
        }
      ]
    },
    {
      id: "donnees",
      icon: Database,
      title: t("politiqueConfidentialite.donnees.title"),
      content: [
        {
          value: t("politiqueConfidentialite.donnees.content1")
        },
        {
          value: t("politiqueConfidentialite.donnees.item1")
        },
        {
          value: t("politiqueConfidentialite.donnees.item2")
        },
        {
          value: t("politiqueConfidentialite.donnees.item3")
        },
        {
          value: t("politiqueConfidentialite.donnees.item4")
        },
        {
          value: t("politiqueConfidentialite.donnees.item5")
        },
        {
          value: t("politiqueConfidentialite.donnees.content2")
        },
        {
          value: t("politiqueConfidentialite.donnees.content3")
        }
      ]
    },
    {
      id: "finalites",
      icon: Target,
      title: t("politiqueConfidentialite.finalites.title"),
      content: [
        {
          value: t("politiqueConfidentialite.finalites.content1")
        },
        {
          value: t("politiqueConfidentialite.finalites.item1")
        },
        {
          value: t("politiqueConfidentialite.finalites.item2")
        },
        {
          value: t("politiqueConfidentialite.finalites.item3")
        }
      ]
    },
    {
      id: "destinataires",
      icon: Users,
      title: t("politiqueConfidentialite.destinataires.title"),
      content: [
        {
          value: t("politiqueConfidentialite.destinataires.content")
        }
      ]
    },
    {
      id: "duree",
      icon: Clock,
      title: t("politiqueConfidentialite.duree.title"),
      content: [
        {
          value: t("politiqueConfidentialite.duree.content1")
        },
        {
          value: t("politiqueConfidentialite.duree.item1")
        },
        {
          value: t("politiqueConfidentialite.duree.item2")
        }
      ]
    },
    {
      id: "droits",
      icon: Lock,
      title: t("politiqueConfidentialite.droits.title"),
      content: [
        {
          value: t("politiqueConfidentialite.droits.content1")
        },
        {
          value: t("politiqueConfidentialite.droits.item1")
        },
        {
          value: t("politiqueConfidentialite.droits.item2")
        },
        {
          value: t("politiqueConfidentialite.droits.item3")
        },
        {
          value: t("politiqueConfidentialite.droits.item4")
        },
        {
          value: t("politiqueConfidentialite.droits.item5")
        },
        {
          value: t("politiqueConfidentialite.droits.item6")
        },
        {
          value: t("politiqueConfidentialite.droits.content2")
        },
        {
          label: t("politiqueConfidentialite.droits.exercise"),
          value: "contact@pixaura.eu",
          type: "email"
        }
      ]
    }
  ]

  return (
    <main className="relative min-h-screen overflow-hidden bg-transparent">
      <Navbar />
      
      {/* Background - Same as homepage */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        {/* Background image - visible on desktop */}
        <img
          src="/Banque d_images/ippppp1.png"
          alt="Background"
          className="hidden md:block h-full w-full object-cover"
          style={{
            opacity: 1,
            visibility: 'visible',
            objectFit: 'cover',
            width: '100%',
            height: '100%'
          }}
        />
        {/* Background image - visible only on mobile */}
        <img
          src="/Banque d_images/backnoiree.png"
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

      <div className="relative z-10 pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          {/* Professional Hero Section */}
          <div className="mb-20 text-center">
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-black text-white mb-6 tracking-tight text-center mx-auto">
              {t("politiqueConfidentialite.title")}
            </h1>
            
            <div className="flex items-center justify-center gap-3 mb-8">
              <div className="h-px w-16 bg-gradient-to-r from-transparent to-white/20" />
              <div className="w-1.5 h-1.5 rounded-full bg-cyan-400/60" />
              <div className="h-px w-16 bg-gradient-to-l from-transparent to-white/20" />
            </div>
          </div>

          {/* Professional Sections Grid */}
          <div className="space-y-6">
            {sections.map((section, index) => {
              const Icon = section.icon
              // Unified style for all cards - Inspired by Cookies page
              return (
                <div
                  key={section.id}
                  className="relative overflow-hidden rounded-2xl border border-white/15 bg-gradient-to-br from-white/[0.08] via-white/[0.06] to-white/[0.04] backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]"
                >
                  {/* Header Section - Premium Professional Design */}
                  <div className="border-b border-white/15 bg-gradient-to-br from-white/[0.12] via-white/[0.08] to-white/[0.06] p-7 sm:p-9">
                    <div className="flex items-center justify-between gap-5">
                      <div className="flex-1">
                        <h2 className="text-2xl sm:text-3xl font-black text-white mb-3 tracking-tight leading-tight">
                          {section.title}
                        </h2>
                        <div className="h-0.5 w-16 bg-gradient-to-r from-cyan-400/70 to-transparent mt-2" />
                      </div>
                    </div>
                  </div>

                  {/* Main Content Section */}
                  <div className="p-7 sm:p-9">
                    <div className="space-y-5">
                      {section.content.map((item, itemIndex) => (
                        <div key={itemIndex} className="space-y-2">
                          {item.label && (
                            <p className="text-base font-bold text-white/90 uppercase tracking-wide">
                              {item.label}
                            </p>
                          )}
                          {item.type === "email" ? (
                            <a
                              href={`mailto:${item.value}`}
                              className="inline-flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors font-medium text-base sm:text-lg"
                            >
                              <ArrowRight className="h-5 w-5 flex-shrink-0" />
                              <span className="border-b-2 border-cyan-400/40 hover:border-cyan-300 font-medium">
                                {item.value}
                              </span>
                            </a>
                          ) : (
                            <p className="text-white/90 leading-relaxed text-base sm:text-lg font-medium">
                              {item.value}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}

