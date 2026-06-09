import type React from "react"
import type { Metadata } from "next"
import { Montserrat, Space_Grotesk } from "next/font/google"
import "./globals.css"
import { TranslationProvider } from "@/contexts/translation-context"
import { ErrorBoundaryWrapper } from "@/components/error-boundary-wrapper"

// Primary premium font for the whole site (outside intros/loading)
const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-sans" })
// Heading / display font used notably in immersive intros & big titles
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-heading" })

export const metadata: Metadata = {
  title: "Pixaura_IT - Branding & Creative Agency",
  description:
    "Unlock your brand's true aura through premium branding, cinematographic production, and strategic digital marketing.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="fr" className="bg-transparent" suppressHydrationWarning>
      <head>
        {/* Preconnect to Vercel CDN for faster asset loading */}
        <link rel="preconnect" href="https://pixaura-woad.vercel.app" />
        <link rel="dns-prefetch" href="https://pixaura-woad.vercel.app" />
        {/* Prevent white flash on Vercel - minimal script that runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                // FORCE LANGUAGE: Read and preserve language IMMEDIATELY before React loads
                // Always default to French on first entry of each session (web and mobile)
                if (typeof window !== 'undefined' && typeof localStorage !== 'undefined' && typeof sessionStorage !== 'undefined') {
                  // Check if this is the first entry of this session
                  const hasVisitedThisSession = sessionStorage.getItem('hasVisitedThisSession');
                  
                  if (!hasVisitedThisSession) {
                    // First entry of session: always default to French, even if localStorage has 'en'
                    localStorage.setItem('language', 'fr');
                    sessionStorage.setItem('hasVisitedThisSession', 'true');
                  } else {
                    // Not first entry: use stored language preference
                    const storedLang = localStorage.getItem('language');
                    if (storedLang && (storedLang === 'fr' || storedLang === 'en')) {
                      // Language is already set, ensure it's preserved
                      localStorage.setItem('language', storedLang);
                    } else {
                      // No language set, default to French
                      localStorage.setItem('language', 'fr');
                    }
                  }
                }
                
                // Set black background immediately to prevent white flash on Vercel SSR
                if (typeof document !== 'undefined') {
                  document.documentElement.style.backgroundColor = '#000000';
                  document.body && (document.body.style.backgroundColor = '#000000');
                }
                try {
                  const urlParams = new URLSearchParams(window.location.search);
                  if (urlParams.get('skipIntro') === 'true') {
                    document.documentElement.classList.add('skip-intro-active');
                  }
                } catch (e) {}
                
                // CRITICAL: Global error handler to prevent page reloads on mobile
                if (typeof window !== 'undefined') {
                  const isMobile = window.innerWidth < 1024;
                  
                  // Prevent page reload on JavaScript errors
                  window.addEventListener('error', function(e) {
                    if (isMobile) {
                      // Log error but prevent default reload behavior
                      console.error('Error caught:', e.error || e.message);
                      
                      // Prevent reload for non-critical errors
                      if (e.error) {
                        const errorMsg = e.error.message || String(e.error);
                        const isCritical = errorMsg.includes('ChunkLoadError') || 
                                          errorMsg.includes('Loading chunk') ||
                                          errorMsg.includes('Failed to fetch');
                        
                        if (!isCritical) {
                          e.preventDefault();
                          e.stopPropagation();
                          return false;
                        }
                      }
                    }
                  }, true);
                  
                  // Prevent crashes from unhandled promise rejections
                  window.addEventListener('unhandledrejection', function(e) {
                    if (isMobile) {
                      console.error('Unhandled rejection:', e.reason);
                      // Prevent default crash behavior for non-critical rejections
                      if (e.reason && typeof e.reason === 'object') {
                        const reasonMsg = e.reason.message || String(e.reason);
                        const isCritical = reasonMsg.includes('ChunkLoadError') || 
                                          reasonMsg.includes('Loading chunk');
                        
                        if (!isCritical) {
                          e.preventDefault();
                        }
                      } else {
                        e.preventDefault();
                      }
                    }
                  });
                  
                  // Protect against ResizeObserver errors (common on mobile)
                  const originalResizeObserver = window.ResizeObserver;
                  if (originalResizeObserver) {
                    window.ResizeObserver = function(callback) {
                      const safeCallback = function(entries, observer) {
                        try {
                          callback(entries, observer);
                        } catch (error) {
                          console.warn('ResizeObserver error caught:', error);
                        }
                      };
                      return new originalResizeObserver(safeCallback);
                    };
                    window.ResizeObserver.prototype = originalResizeObserver.prototype;
                  }
                  
                  // Protect against IntersectionObserver errors
                  const originalIntersectionObserver = window.IntersectionObserver;
                  if (originalIntersectionObserver) {
                    window.IntersectionObserver = function(callback, options) {
                      const safeCallback = function(entries, observer) {
                        try {
                          callback(entries, observer);
                        } catch (error) {
                          console.warn('IntersectionObserver error caught:', error);
                        }
                      };
                      return new originalIntersectionObserver(safeCallback, options);
                    };
                    window.IntersectionObserver.prototype = originalIntersectionObserver.prototype;
                  }
                }
              })();
            `,
          }}
        />
        <style
          dangerouslySetInnerHTML={{
            __html: `
              .skip-intro-active [data-intro-wrapper] {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
              }
            `,
          }}
        />
        {/* Only preload critical background image for mobile - NO VIDEO PRELOADS */}
        {process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ? (
          <link rel="preload" href={`https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/q_auto,f_auto,fl_immutable_cache/pixaura/back-noiree.jpg`} as="image" />
        ) : (
          <link rel="preload" href="/Banque d_images/backnoiree.png" as="image" />
        )}
      </head>
      <body
        className={`${montserrat.className} ${spaceGrotesk.variable} antialiased bg-transparent text-foreground`}
      >
        <ErrorBoundaryWrapper>
          <TranslationProvider>
            {children}
          </TranslationProvider>
        </ErrorBoundaryWrapper>
      </body>
    </html>
  )
}
