"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as VisuallyHidden from "@radix-ui/react-visually-hidden"
import Image from "next/image"
import { X } from "lucide-react"
import { useTranslation } from "@/contexts/translation-context"

interface OffreModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  offre: {
    title: string
    subtitle: string
    image: string
    intro: string
    points: string[]
    conclusion: string
  } | null
}

export function OffreModal({ open, onOpenChange, offre }: OffreModalProps) {
  const { t } = useTranslation()
  
  if (!offre) return null

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[92vh] overflow-y-auto rounded-[32px] border border-white/15 bg-white/8 text-white backdrop-blur-2xl shadow-[0_45px_120px_rgba(0,0,0,0.35)]">
        {/* DialogTitle for accessibility */}
        <VisuallyHidden.Root>
          <DialogTitle>
            {offre.title}
          </DialogTitle>
        </VisuallyHidden.Root>
        
        <DialogHeader className="space-y-4 text-left">
          {/* Offre Image */}
          <div className="relative w-full h-64 md:h-72 overflow-hidden rounded-[28px]">
            <Image
              src={offre.image || "/placeholder.jpg"}
              alt={offre.title}
              fill
              className="object-cover brightness-110 saturate-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Badge */}
            <div className="absolute top-3 left-3">
              <span className="rounded-full border border-white/25 bg-white/12 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-white/80 backdrop-blur-sm">
                {offre.title}
              </span>
            </div>
            
            {/* Title - Visual only */}
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <h2 className="text-2xl md:text-3xl font-black text-white mb-1 drop-shadow-xl" style={{ 
                fontFamily: 'Montserrat, sans-serif',
                letterSpacing: '-0.02em',
              }}>
                {offre.title}
              </h2>
              <p className="text-sm text-white/80 font-medium">
                {offre.subtitle}
              </p>
            </div>
          </div>

          {/* Content Sections */}
          <div className="space-y-4 sm:space-y-5 p-2 sm:p-5 text-left">
            {/* Présentation */}
            <div className="rounded-[24px] border border-white/15 bg-white/8 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-xl text-left">
              <h3 className="text-base sm:text-lg font-semibold uppercase tracking-[0.25em] text-white/85 mb-3 text-left">
                {t("offreHome.modalPresentation")}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed text-left">
                {offre.intro}
              </p>
            </div>

            {/* Points clés */}
            <div className="rounded-[24px] border border-white/15 bg-white/8 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-xl text-left">
              <h3 className="text-base sm:text-lg font-semibold uppercase tracking-[0.25em] text-white/85 mb-4 text-left">
                {t("offreHome.modalKeyPoints")}
              </h3>
              <ul className="space-y-3.5 text-left">
                {offre.points.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 text-left text-sm text-white/75 leading-relaxed">
                    <span className="text-white/80 shrink-0 font-bold select-none text-base leading-none mt-1" aria-hidden="true">•</span>
                    <span className="flex-1 text-left">{point}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* En résumé */}
            <div className="rounded-[24px] border border-white/15 bg-white/8 p-5 sm:p-6 shadow-lg shadow-black/40 backdrop-blur-xl text-left">
              <h3 className="text-base sm:text-lg font-semibold uppercase tracking-[0.25em] text-white/85 mb-3 text-left">
                {t("offreHome.modalSummary")}
              </h3>
              <p className="text-sm text-white/75 leading-relaxed italic text-left">
                {offre.conclusion}
              </p>
            </div>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}

