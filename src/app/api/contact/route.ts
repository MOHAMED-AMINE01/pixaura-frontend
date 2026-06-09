import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.nom || !body.prenom || !body.email || !body.telephone || !body.besoin) {
      return NextResponse.json({ error: "Champs requis manquants" }, { status: 400 })
    }

    // Get backend API URL from env (inclut déjà /api)
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000/api"

    // Forward to backend API (uses nodemailer / SMTP)
    const response = await fetch(`${backendUrl}/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })

    const result = await response.json()

    if (!response.ok) {
      console.error("Backend error:", result)
      return NextResponse.json(
        { error: result.error || "Erreur lors de l'envoi du formulaire" },
        { status: response.status }
      )
    }

    return NextResponse.json(
      { success: true, message: "Formulaire soumis avec succès" },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      { error: "Erreur lors du traitement du formulaire" },
      { status: 500 }
    )
  }
}
