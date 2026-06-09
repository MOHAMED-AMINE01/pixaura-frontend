import type { ReactNode } from "react"
import "@/styles/backoffice.css"

export default function LoginLayout({ children }: { children: ReactNode }) {
  return <div className="backoffice-route backoffice-route--light">{children}</div>
}
