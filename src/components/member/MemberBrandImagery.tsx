"use client";

import { type ReactNode } from "react";
import { Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { MEMBER_LOGO_SOFT } from "@/lib/memberBrandAssets";

/**
 * Bandeau de marque NEUTRE (dégradé Pixaura + logo), sans aucune photo de
 * projet/client tiers. Remplace les anciens carrousels portfolio qui prêtaient
 * à confusion dans l'espace client (retour client : « pas de photos d'autres
 * clients sur mes demandes »).
 */
function BrandBanner({
  className,
  heightClass = "h-24 sm:h-28",
  logoClassName = "h-7 w-auto sm:h-9",
}: {
  className?: string;
  /** Hauteur fixe et compacte (évite l'aspect-ratio qui explose sur grand écran). */
  heightClass?: string;
  logoClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full items-center justify-center overflow-hidden rounded-3xl border border-white/12 bg-gradient-to-br from-violet-950/45 via-black to-indigo-950/35 ring-1 ring-violet-400/20",
        heightClass,
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(124,58,255,0.25),transparent_55%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_80%,rgba(0,115,255,0.20),transparent_55%)]" />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={MEMBER_LOGO_SOFT}
        alt="Pixaura"
        className={cn("relative z-10 w-auto object-contain opacity-95 drop-shadow-lg", logoClassName)}
      />
    </div>
  );
}

function HeaderText({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="max-w-3xl space-y-3 sm:space-y-4">
      {eyebrow ? (
        <p className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[0.35em] text-violet-200/90 sm:text-xs">
          <Sparkles className="h-3.5 w-3.5" />
          {eyebrow}
        </p>
      ) : null}
      <h2 className="bg-gradient-to-b from-white to-white/60 bg-clip-text text-2xl font-black uppercase leading-[1.1] tracking-tight text-transparent sm:text-3xl md:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-sm leading-relaxed text-neutral-400 sm:text-base">{description}</p>
      ) : null}
    </div>
  );
}

type HeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  className?: string;
};

/** En-tête page P2C (bandeau de marque neutre + texte). */
export function MemberP2cPageHeader({ eyebrow, title, description, className }: HeaderProps) {
  return (
    <div className={cn("mb-6 space-y-4 sm:mb-7 sm:space-y-5", className)}>
      <BrandBanner heightClass="h-20 sm:h-24 md:h-28" />
      <HeaderText eyebrow={eyebrow} title={title} description={description} />
    </div>
  );
}

/** En-tête « Mes demandes » (bandeau de marque neutre + texte). */
export function MemberDemandesHero({ eyebrow, title, description, className }: HeaderProps) {
  return (
    <div className={cn("space-y-5 sm:space-y-6", className)}>
      <BrandBanner heightClass="h-24 sm:h-28 md:h-32" />
      <HeaderText eyebrow={eyebrow} title={title} description={description} />
    </div>
  );
}

/** En-tête « Modifier » (bandeau de marque neutre + texte). */
export function MemberCinematicHero({ eyebrow, title, description, className }: HeaderProps) {
  return (
    <div className={cn("space-y-5 sm:space-y-6", className)}>
      <BrandBanner heightClass="h-20 sm:h-24 md:h-28" />
      <HeaderText eyebrow={eyebrow} title={title} description={description} />
    </div>
  );
}

/** Panneau « Vos coordonnées » du formulaire P2C : branding neutre + champs. */
export function MemberContactPanel({
  children,
  className,
  compact,
}: {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border border-violet-400/20 bg-gradient-to-br from-violet-950/30 via-black/50 to-indigo-950/20 ring-1 ring-white/10",
        className
      )}
    >
      <div
        className={cn(
          "grid min-w-0",
          compact ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1fr)]"
        )}
      >
        <div className="flex flex-col border-b border-white/10 bg-black/40 lg:border-b-0 lg:border-r">
          <BrandBanner
            heightClass={compact ? "h-16 sm:h-20" : "h-20 sm:h-24"}
            className="rounded-none border-0 ring-0"
          />
          <div className="border-t border-white/10 bg-black/55 px-4 py-3 sm:px-5 sm:py-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-white/90 sm:text-xs">
              Vos coordonnées
            </p>
            <p className="mt-1.5 text-xs leading-relaxed text-neutral-300 sm:text-sm">
              Renseignez l&apos;entreprise et le contact pour que Pixaura vous accompagne sur votre tournage.
            </p>
          </div>
        </div>
        <div className="min-w-0 p-4 sm:p-5 lg:p-6">{children}</div>
      </div>
    </div>
  );
}

/** État vide « Mes demandes » : branding neutre + message (aucune photo tierce). */
export function MemberEmptyStateVisual() {
  return (
    <div className="overflow-hidden rounded-2xl border border-dashed border-violet-400/25 bg-gradient-to-br from-violet-950/30 via-black to-indigo-950/20">
      <div className="relative flex min-h-[220px] flex-col items-center justify-center gap-4 px-6 py-10 text-center">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(124,58,255,0.20),transparent_60%)]" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={MEMBER_LOGO_SOFT}
          alt="Pixaura"
          className="relative z-10 h-10 w-auto object-contain opacity-90 sm:h-12"
        />
        <p className="relative z-10 max-w-md text-sm leading-relaxed text-neutral-200 sm:text-base">
          Votre première demande commence ici — l&apos;équipe Pixaura vous répond après envoi du formulaire P2C.
        </p>
      </div>
    </div>
  );
}
