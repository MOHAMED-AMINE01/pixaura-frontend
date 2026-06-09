import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Humind - Pixaura_IT",
}

export default function HumindLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
    </>
  )
}

