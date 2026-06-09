"use client"

import React, { Component, ErrorInfo, ReactNode } from "react"

interface Props {
  children: ReactNode
}

interface State {
  hasError: boolean
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(): State {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error but don't crash
    console.error("Error caught by boundary:", error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      // On mobile, try to recover silently
      if (typeof window !== 'undefined' && window.innerWidth < 1024) {
        // Reset error state after a moment
        setTimeout(() => {
          this.setState({ hasError: false })
        }, 1000)
        // Return children to attempt recovery
        return this.props.children
      }
      
      // On desktop, show error message
      return (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black p-4">
          <div className="text-center text-white">
            <h2 className="mb-4 text-xl font-semibold">Une erreur est survenue</h2>
            <p className="mb-6 text-sm text-white/70">
              La page a rencontré un problème. Veuillez recharger.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="rounded-full border border-white/25 bg-white/10 px-6 py-2 text-sm font-semibold uppercase tracking-[0.3em] text-white transition hover:bg-white/20"
            >
              Recharger
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

