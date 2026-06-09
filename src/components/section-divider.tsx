"use client"

interface SectionDividerProps {
  label?: string
}

export function SectionDivider({ label }: SectionDividerProps) {
  return (
    <div className="relative mx-auto my-24 flex w-full max-w-6xl items-center justify-center px-6">
      <div className="relative h-[3px] w-full overflow-hidden rounded-full bg-gradient-to-r from-transparent via-white/70 to-transparent">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.9),transparent_75%)]" />
        <div className="absolute inset-0 animate-[shimmer_2.5s_linear_infinite] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,1),transparent)] opacity-90" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_50%,rgba(0,210,255,0.6),transparent_70%)] opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_85%_50%,rgba(186,71,255,0.6),transparent_70%)] opacity-60" />
        <div className="absolute left-6 h-[3px] w-48 bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
        <div className="absolute right-6 h-[3px] w-48 bg-gradient-to-r from-transparent via-white to-transparent opacity-90" />
      </div>

      {label ? (
        <div className="absolute flex items-center gap-5">
          <div className="relative flex items-center justify-center rounded-full border border-white/45 bg-white/15 px-12 py-3 backdrop-blur-2xl shadow-[0_0_40px_rgba(255,255,255,0.35)]">
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-200/70 via-white/60 to-purple-300/70" />
            <div className="absolute -inset-[6px] rounded-full border border-white/40" />
            <div className="absolute -inset-[16px] h-full w-full animate-[rotateGlow_6s_linear_infinite] rounded-full border-2 border-white/25 opacity-90" />
            <span className="relative text-xs font-semibold uppercase tracking-[0.7em] text-white">
              {label}
            </span>
          </div>
        </div>
      ) : null}

      <div className="pointer-events-none absolute inset-0 flex items-center justify-between px-16">
        <span className="h-28 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
        <span className="h-28 w-px bg-gradient-to-b from-transparent via-white/60 to-transparent" />
      </div>

      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <span className="h-40 w-[80%] max-w-4xl animate-[pulseGlow_4s_ease-in-out_infinite] rounded-full bg-gradient-to-r from-cyan-200/25 via-white/15 to-purple-300/25 blur-3xl opacity-90" />
      </div>
    </div>
  )
}

declare global {
  interface CSSStyleDeclaration {
    [key: string]: string | number | undefined
  }
}

const shimmer = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`

const rotateGlow = `
@keyframes rotateGlow {
  0% { transform: rotate(0deg); opacity: 0.4; }
  50% { opacity: 0.8; }
  100% { transform: rotate(360deg); opacity: 0.4; }
}
`

const pulseGlow = `
@keyframes pulseGlow {
  0%, 100% { opacity: 0.35; }
  50% { opacity: 0.7; }
}
`

if (typeof document !== "undefined") {
  const styleId = "pixaura-divider-animations"
  if (!document.getElementById(styleId)) {
    const style = document.createElement("style")
    style.id = styleId
    style.innerHTML = `${shimmer}${rotateGlow}${pulseGlow}`
    document.head.appendChild(style)
  }
}
