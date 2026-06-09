"use client"

import { useState } from "react"
import Link from "next/link"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ArrowRight, Check, ChevronRight, Calendar } from "lucide-react"

type FormData = {
  besoin: string
  nom: string
  prenom: string
  telephone: string
  email: string
  budget: string
  delai: string
  secteur: string
  privacy: boolean
}

export default function ContactPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    besoin: "",
    nom: "",
    prenom: "",
    telephone: "",
    email: "",
    budget: "",
    delai: "",
    secteur: "",
    privacy: false,
  })

  const totalSteps = 4

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          besoin: "",
          nom: "",
          prenom: "",
          telephone: "",
          email: "",
          budget: "",
          delai: "",
          secteur: "",
          privacy: false,
        })
      }
    } catch (error) {
      console.error("Form submission error:", error)
    }
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.besoin.trim().length > 0
      case 2:
        return formData.nom.trim().length > 0 && 
               formData.prenom.trim().length > 0 && 
               formData.telephone.trim().length > 0 && 
               formData.email.trim().length > 0 &&
               /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
      case 3:
        return formData.budget !== ""
      case 4:
        return formData.secteur !== "" && formData.privacy
      default:
        return false
    }
  }

  return (
    <main className="bg-black min-h-screen">
      <Navbar />
      
      <section className="relative pt-40 pb-20 md:pb-28 px-6 bg-black overflow-hidden">
        {/* Background Effects - Premium */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/5 to-transparent opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/3 via-transparent to-purple-500/3 opacity-30" />
        
        {/* Animated Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight" style={{ 
              fontFamily: 'Montserrat, sans-serif',
              letterSpacing: '-0.02em',
            }}>
              Envoyez-nous vos coordonnées
            </h1>
          </div>

          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              {[...Array(totalSteps)].map((_, i) => (
                <div key={i} className="flex items-center flex-1">
                  <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300"
                       style={{
                         borderColor: currentStep > i + 1 ? '#22d3ee' : currentStep === i + 1 ? '#22d3ee' : '#374151',
                         backgroundColor: currentStep > i + 1 ? '#22d3ee' : currentStep === i + 1 ? '#22d3ee' : 'transparent',
                       }}>
                    {currentStep > i + 1 ? (
                      <Check className="w-5 h-5 text-black" />
                    ) : (
                      <span className="text-sm font-semibold" style={{ color: currentStep === i + 1 ? '#000' : '#9ca3af' }}>
                        {i + 1}
                      </span>
                    )}
                  </div>
                  {i < totalSteps - 1 && (
                    <div className="flex-1 h-0.5 mx-2 transition-all duration-300"
                         style={{
                           backgroundColor: currentStep > i + 1 ? '#22d3ee' : '#374151',
                         }} />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          {submitted ? (
            <div className="max-w-2xl mx-auto text-center py-16 px-8 bg-gradient-to-br from-cyan-400/10 via-purple-500/10 to-cyan-400/10 border border-cyan-400/30 rounded-2xl">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-cyan-400 to-purple-500 flex items-center justify-center">
                <Check className="w-10 h-10 text-black" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Merci !
              </h2>
              <p className="text-lg text-gray-300 mb-8" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                Notre équipe vous recontactera sous 48 h.
              </p>
              <Link 
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Retour à l'accueil
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
              <div className="bg-black/50 backdrop-blur-sm border border-white/10 rounded-2xl p-8 md:p-12 shadow-2xl">
                {/* Step 1: Besoin */}
                {currentStep === 1 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Votre besoin
                    </h2>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Décrivez votre projet en détail *
                      </label>
                      <textarea
                        name="besoin"
                        value={formData.besoin}
                        onChange={handleChange}
                        required
                        rows={8}
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500 resize-none"
                        placeholder="Décrivez votre projet en détail..."
                      />
                    </div>
                  </div>
                )}

                {/* Step 2: Informations personnelles */}
                {currentStep === 2 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Vos coordonnées
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Nom *
                        </label>
                        <input
                          type="text"
                          name="nom"
                          value={formData.nom}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500"
                          placeholder="Votre nom"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Prénom *
                        </label>
                        <input
                          type="text"
                          name="prenom"
                          value={formData.prenom}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500"
                          placeholder="Votre prénom"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Téléphone *
                        </label>
                        <input
                          type="tel"
                          name="telephone"
                          value={formData.telephone}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500"
                          placeholder="06 12 34 56 78"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                          Email *
                        </label>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white placeholder-gray-500"
                          placeholder="votre@email.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 3: Budget */}
                {currentStep === 3 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Budget estimé
                    </h2>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Budget estimé *
                      </label>
                      <select
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white"
                        style={{ color: '#ffffff' }}
                      >
                        <option value="" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Sélectionnez une gamme</option>
                        <option value="under-5k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Moins de 5k€</option>
                        <option value="5k-15k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>5k€ - 15k€</option>
                        <option value="15k-50k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>15k€ - 50k€</option>
                        <option value="over-50k" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Plus de 50k€</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 4: Secteur */}
                {currentStep === 4 && (
                  <div className="space-y-6 animate-fadeIn">
                    <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      Secteur d'activité
                    </h2>
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        Secteur d'activité *
                      </label>
                      <select
                        name="secteur"
                        value={formData.secteur}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 transition-all text-white"
                        style={{ color: '#ffffff' }}
                      >
                        <option value="" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Sélectionnez un secteur</option>
                        <option value="immobilier" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Immobilier</option>
                        <option value="automobile" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Automobile</option>
                        <option value="sport" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Sport</option>
                        <option value="beaute" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Beauté</option>
                        <option value="restauration" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Restauration</option>
                        <option value="tech" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Tech</option>
                        <option value="other" style={{ backgroundColor: '#1a1a1a', color: '#ffffff' }}>Autre</option>
                      </select>
                    </div>
                    <div className="flex items-center gap-3 pt-4">
                      <input
                        type="checkbox"
                        name="privacy"
                        checked={formData.privacy}
                        onChange={handleChange}
                        required
                        className="w-5 h-5 rounded border-white/20 bg-white/5 text-cyan-400 focus:ring-2 focus:ring-cyan-400/20 flex-shrink-0"
                      />
                      <label className="text-sm text-gray-300" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                        En envoyant ce formulaire, vous acceptez notre{" "}
                        <Link href="/politique-de-confidentialite" className="text-cyan-400 hover:text-cyan-300 underline transition-colors">
                          politique de confidentialité
                        </Link>
                        . *
                      </label>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 md:gap-0 mt-10 pt-6 border-t border-white/10">
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      className="w-full md:w-auto px-6 py-3 border border-white/20 text-white rounded-lg hover:border-cyan-400 hover:bg-cyan-400/10 transition-all duration-300 text-center"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Précédent
                    </button>
                  )}
                  <div className="hidden md:block flex-1" />
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!isStepValid()}
                      className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Suivant
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={!isStepValid()}
                      className="w-full md:w-auto px-6 py-3 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                      style={{ fontFamily: 'Montserrat, sans-serif' }}
                    >
                      Envoyer ma demande
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </form>
          )}
        </div>
      </section>


      {/* Calendar Section */}
      <section id="rendez-vous" className="relative py-20 px-6 bg-black overflow-hidden border-t border-white/10">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-500/3 to-transparent opacity-30" />
        
        <div className="relative z-10 max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <Calendar className="w-16 h-16 text-cyan-400 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Prendre rendez-vous
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              Réservez un appel avec un expert Pixaura pour discuter de votre projet.
            </p>
            
            {/* Button without container */}
            <div className="text-center">
              <a 
                href="mailto:contact@pixaura.eu?subject=Demande de rendez-vous"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-cyan-400 to-purple-500 text-white font-semibold rounded-lg hover:scale-105 transition-all duration-300"
                style={{ fontFamily: 'Montserrat, sans-serif' }}
              >
                Contacter pour un rendez-vous
                <ArrowRight className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}
