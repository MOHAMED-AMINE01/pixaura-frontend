import { type NextRequest, NextResponse } from "next/server"
import { Resend } from "resend"

// Initialize Resend lazily to avoid build-time errors when env vars are not available
function getResend() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured")
  }
  return new Resend(apiKey)
}

// Map budget values to French labels
const budgetLabels: Record<string, string> = {
  "under-5k": "Moins de 5k€",
  "5k-15k": "5k€ - 15k€",
  "15k-50k": "15k€ - 50k€",
  "over-50k": "Plus de 50k€",
}

// Map sector values to French labels
const sectorLabels: Record<string, string> = {
  "immobilier": "Immobilier",
  "automobile": "Automobile",
  "sport": "Sport",
  "beaute": "Beauté",
  "restauration": "Restauration",
  "tech": "Tech",
  "other": "Autre",
}

// Map budget values to English labels
const budgetLabelsEn: Record<string, string> = {
  "under-5k": "Under 5k€",
  "5k-15k": "5k€ - 15k€",
  "15k-50k": "15k€ - 50k€",
  "over-50k": "Over 50k€",
}

// Map sector values to English labels
const sectorLabelsEn: Record<string, string> = {
  "immobilier": "Real Estate",
  "automobile": "Automotive",
  "sport": "Sport",
  "beaute": "Beauty",
  "restauration": "Restaurant",
  "tech": "Tech",
  "other": "Other",
}

// Escape HTML to prevent XSS
function escapeHtml(text: string): string {
  if (!text) return ''
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  }
  return text.replace(/[&<>"']/g, (m) => map[m])
}

function formatEmailHTML(formData: any, lang: 'fr' | 'en' = 'fr') {
  const budgetLabel = lang === 'fr' 
    ? budgetLabels[formData.budget] || formData.budget
    : budgetLabelsEn[formData.budget] || formData.budget
  
  const sectorLabel = lang === 'fr'
    ? sectorLabels[formData.secteur] || formData.secteur
    : sectorLabelsEn[formData.secteur] || formData.secteur

  if (lang === 'fr') {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Montserrat', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              color: #0073FF;
              border-bottom: 2px solid #0073FF;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f9f9f9;
              border-radius: 5px;
              border-left: 4px solid #0073FF;
            }
            .field-label {
              font-weight: bold;
              color: #0073FF;
              margin-bottom: 5px;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .field-value {
              color: #333;
              font-size: 16px;
            }
            .besoin {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Nouvelle demande de contact - PIXaura</h1>
            
            <div class="field">
              <div class="field-label">Besoin / Description du projet</div>
              <div class="field-value besoin">${escapeHtml(formData.besoin || 'Non renseigné')}</div>
            </div>

            <div class="field">
              <div class="field-label">Nom</div>
              <div class="field-value">${escapeHtml(formData.nom || 'Non renseigné')}</div>
            </div>

            <div class="field">
              <div class="field-label">Prénom</div>
              <div class="field-value">${escapeHtml(formData.prenom || 'Non renseigné')}</div>
            </div>

            <div class="field">
              <div class="field-label">Téléphone</div>
              <div class="field-value">${escapeHtml(formData.telephone || 'Non renseigné')}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${escapeHtml(formData.email || 'Non renseigné')}</div>
            </div>

            <div class="field">
              <div class="field-label">Budget estimé</div>
              <div class="field-value">${escapeHtml(budgetLabel || 'Non renseigné')}</div>
            </div>

            <div class="field">
              <div class="field-label">Secteur d'activité</div>
              <div class="field-value">${escapeHtml(sectorLabel || 'Non renseigné')}</div>
            </div>
          </div>
        </body>
      </html>
    `
  } else {
    return `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body {
              font-family: 'Montserrat', Arial, sans-serif;
              line-height: 1.6;
              color: #333;
              max-width: 600px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f5f5f5;
            }
            .container {
              background-color: #ffffff;
              border-radius: 8px;
              padding: 30px;
              box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            }
            h1 {
              color: #0073FF;
              border-bottom: 2px solid #0073FF;
              padding-bottom: 10px;
              margin-bottom: 20px;
            }
            .field {
              margin-bottom: 20px;
              padding: 15px;
              background-color: #f9f9f9;
              border-radius: 5px;
              border-left: 4px solid #0073FF;
            }
            .field-label {
              font-weight: bold;
              color: #0073FF;
              margin-bottom: 5px;
              font-size: 12px;
              text-transform: uppercase;
              letter-spacing: 0.5px;
            }
            .field-value {
              color: #333;
              font-size: 16px;
            }
            .besoin {
              white-space: pre-wrap;
              word-wrap: break-word;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>New Contact Request - PIXaura</h1>
            
            <div class="field">
              <div class="field-label">Need / Project Description</div>
              <div class="field-value besoin">${escapeHtml(formData.besoin || 'Not provided')}</div>
            </div>

            <div class="field">
              <div class="field-label">Last Name</div>
              <div class="field-value">${escapeHtml(formData.nom || 'Not provided')}</div>
            </div>

            <div class="field">
              <div class="field-label">First Name</div>
              <div class="field-value">${escapeHtml(formData.prenom || 'Not provided')}</div>
            </div>

            <div class="field">
              <div class="field-label">Phone</div>
              <div class="field-value">${escapeHtml(formData.telephone || 'Not provided')}</div>
            </div>

            <div class="field">
              <div class="field-label">Email</div>
              <div class="field-value">${escapeHtml(formData.email || 'Not provided')}</div>
            </div>

            <div class="field">
              <div class="field-label">Estimated Budget</div>
              <div class="field-value">${escapeHtml(budgetLabel || 'Not provided')}</div>
            </div>

            <div class="field">
              <div class="field-label">Business Sector</div>
              <div class="field-value">${escapeHtml(sectorLabel || 'Not provided')}</div>
            </div>
          </div>
        </body>
      </html>
    `
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.nom || !body.prenom || !body.email || !body.telephone || !body.besoin) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured")
      return NextResponse.json({ error: "Email service not configured" }, { status: 500 })
    }

    // Initialize Resend with API key
    const resend = getResend()

    // Determine language (you can add logic to detect language from the request if needed)
    // For now, we'll send both French and English versions
    const lang = 'fr' // Default to French, you can make this dynamic based on user preference

    // Send email using Resend
    // Note: For production, verify your domain (pixaura.eu) with Resend to use a custom from address
    // For now, using onboarding@resend.dev which works for testing
    const fromEmail = process.env.RESEND_FROM_EMAIL || 'PIXaura <onboarding@resend.dev>'
    const toEmail = process.env.CONTACT_EMAIL || 'contact@pixaura.eu'
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      subject: `Nouvelle demande de contact - ${body.prenom} ${body.nom}`,
      html: formatEmailHTML(body, lang),
    })

    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("Email sent successfully:", data)

    return NextResponse.json({ success: true, message: "Form submitted successfully" }, { status: 200 })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to process form" }, { status: 500 })
  }
}

