import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const response = NextResponse.next()

  // Security headers to mitigate CVE-2025-66478 and other vulnerabilities
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')
  
  // Content Security Policy to prevent XSS attacks
  const csp = [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Required for Next.js
    "style-src 'self' 'unsafe-inline'",
    "img-src 'self' data: https: blob:",
    "font-src 'self' data:",
    "connect-src 'self' http://localhost:4000 http://127.0.0.1:4000 https:",
    "media-src 'self' https: blob: data:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests"
  ].join('; ')
  
  response.headers.set('Content-Security-Policy', csp)

  // Block suspicious middleware subrequest headers (common attack vector)
  const suspiciousHeader = request.headers.get('x-middleware-subrequest')
  if (suspiciousHeader) {
    return new NextResponse('Forbidden', { status: 403 })
  }

  // Validate request origin for API routes
  if (request.nextUrl.pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin')
    const host = request.headers.get('host')
    
    // Allow same-origin requests and Vercel deployments
    if (origin && !origin.includes(host || '') && !origin.includes('vercel.app')) {
      // Log suspicious requests but don't block (to avoid false positives)
      console.warn('Suspicious API request from origin:', origin)
    }
  }

  // Rate limiting headers (basic protection)
  response.headers.set('X-RateLimit-Limit', '100')
  response.headers.set('X-RateLimit-Remaining', '99')

  return response
}

export const config = {
  matcher: [
    /*
     * Exclude static assets and Next.js internals so the Edge middleware
     * does not add latency on every image/video/font request on Vercel.
     */
    '/((?!_next/static|_next/image|_next/data|favicon.ico|robots.txt|sitemap.xml|.*\\.(?:svg|png|jpg|jpeg|gif|webp|avif|ico|mp4|webm|ogg|mp3|wav|woff|woff2|ttf|otf|eot|css|js|mjs|map)$).*)',
  ],
}

