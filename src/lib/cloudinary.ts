/**
 * Cloudinary Configuration and Utilities
 * 
 * This file provides utilities to generate optimized Cloudinary URLs
 * for images and videos with automatic optimization.
 */

// Cloudinary configuration
export const CLOUDINARY_CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || ''
export const CLOUDINARY_FOLDER = 'pixaura' // Folder name in Cloudinary

/**
 * Generate optimized Cloudinary URL for images
 * @param publicId - The public ID of the image in Cloudinary (without folder prefix)
 * @param options - Transformation options
 */
export function getCloudinaryImageUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'webp' | 'jpg' | 'png'
    crop?: 'fill' | 'fit' | 'scale' | 'thumb'
    gravity?: 'auto' | 'face' | 'center'
  } = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary cloud name not configured. Using fallback.')
    return `/Banque d_images/${publicId}`
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    crop = 'fill',
    gravity = 'auto',
  } = options

  // Build transformation string
  const transformations: string[] = []

  const hasDimensions = Boolean(width || height)

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (crop && hasDimensions) transformations.push(`c_${crop}`)
  if (gravity && crop === 'fill' && hasDimensions) transformations.push(`g_${gravity}`)
  if (quality) transformations.push(`q_${quality}`)
  if (format) transformations.push(`f_${format}`)

  transformations.push('fl_progressive')
  transformations.push('fl_immutable_cache')

  const transformationString = transformations.join(',')
  const folderPath = `${CLOUDINARY_FOLDER}/${publicId}`

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/upload/${transformationString}/${folderPath}`
}

/**
 * Generate optimized Cloudinary URL for videos
 * @param publicId - The public ID of the video in Cloudinary (without folder prefix)
 * @param options - Transformation options
 */
export function getCloudinaryVideoUrl(
  publicId: string,
  options: {
    width?: number
    height?: number
    quality?: number | 'auto'
    format?: 'auto' | 'mp4' | 'webm'
    bitRate?: number | 'auto'
    streaming?: boolean
  } = {}
): string {
  if (!CLOUDINARY_CLOUD_NAME) {
    console.warn('Cloudinary cloud name not configured. Using fallback.')
    return `/Banque d_images/${publicId}`
  }

  const {
    width,
    height,
    quality = 'auto',
    format = 'auto',
    bitRate = 'auto',
    streaming = false,
  } = options

  // Build transformation string
  const transformations: string[] = []

  if (width) transformations.push(`w_${width}`)
  if (height) transformations.push(`h_${height}`)
  if (quality) transformations.push(`q_${quality}`)
  if (bitRate && bitRate !== 'auto') transformations.push(`br_${bitRate}`)
  if (format) transformations.push(`f_${format}`)

  // Add video optimization flags
  transformations.push('fl_immutable_cache') // Cache optimization
  if (streaming) {
    transformations.push('sp_auto') // Streaming profile
  }

  const transformationString = transformations.join(',')
  const folderPath = `${CLOUDINARY_FOLDER}/${publicId}`
  const resourceType = streaming ? 'video' : 'video/upload'

  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/${resourceType}/${transformationString}/${folderPath}`
}

/**
 * Get optimized image URL for Next.js Image component
 * Automatically selects best format and size based on device
 */
export function getOptimizedImageUrl(publicId: string, width?: number, height?: number): string {
  return getCloudinaryImageUrl(publicId, {
    width,
    height,
    quality: 'auto',
    format: 'auto',
    crop: width && height ? 'fill' : 'fit',
    gravity: 'auto',
  })
}

/**
 * Get optimized video URL with automatic quality
 * Best for background videos and carousels
 */
export function getOptimizedVideoUrl(publicId: string, width?: number, height?: number): string {
  return getCloudinaryVideoUrl(publicId, {
    width,
    height,
    quality: 'auto',
    format: 'auto',
    bitRate: 'auto',
    streaming: false,
  })
}

/**
 * Get streaming video URL (HLS/DASH) for better performance
 * Use this for large videos that need adaptive bitrate
 */
export function getStreamingVideoUrl(publicId: string): string {
  return getCloudinaryVideoUrl(publicId, {
    quality: 'auto',
    format: 'auto',
    streaming: true,
  })
}

/**
 * Helper to extract public ID from local path
 * Example: "/Banque d_images/video.mp4" -> "video"
 */
export function extractPublicId(localPath: string): string {
  // Remove leading slash and folder name
  const parts = localPath.split('/')
  const filename = parts[parts.length - 1]
  // Remove extension
  return filename.replace(/\.[^/.]+$/, '')
}

import cloudinaryMapping from '../../cloudinary-mapping.json'

// Aliases internes utilisés dans le code mais qui ne correspondent pas
// à un vrai fichier dans public/Banque d_images/.
const ASSET_ALIASES: Record<string, string> = {
  '/Banque d_images/background-web-desktop.mp4': 'background-web-desktop',
}

/**
 * Map of local paths to Cloudinary public IDs.
 * Source de vérité = cloudinary-mapping.json (généré par scripts/upload-to-cloudinary.js),
 * complété par quelques alias internes.
 */
export const ASSET_MAP: Record<string, string> = {
  ...(cloudinaryMapping as Record<string, string>),
  ...ASSET_ALIASES,
}

/**
 * Liste des chemins servis EXCLUSIVEMENT en local (depuis public/Banque d_images/),
 * sans jamais passer par Cloudinary.
 * Les fichiers correspondants ont été pré-compressés par scripts/compress-7-images.js
 * pour rester légers et chargeables instantanément depuis Vercel.
 * Aucun autre asset n'est affecté.
 */
const LOCAL_ONLY_PATHS: ReadonlySet<string> = new Set([
  '/Banque d_images/humind-white.png',
  '/Banque d_images/PIXaura-soft white.png',
  '/Banque d_images/art1.jpg',
  '/Banque d_images/Copie de M7_09197.jpg',
  '/Banque d_images/Copie de M7_01248.jpg',
  '/Banque d_images/Copie de M7_03372.jpg',
  '/Banque d_images/backnoiree.png',
  '/Banque d_images/Copie de DSC04796.jpg',
  '/Banque d_images/art2.jpg',
  '/Banque d_images/Copie de M7_00487.jpg',
])

/**
 * Get Cloudinary URL from local path
 * Automatically converts local paths to Cloudinary URLs if mapped
 */
export function getAssetUrl(localPath: string, type: 'image' | 'video' = 'image'): string {
  // Bypass Cloudinary : ces 7 chemins sont servis directement depuis public/
  if (LOCAL_ONLY_PATHS.has(localPath)) {
    return localPath
  }

  const publicId = ASSET_MAP[localPath]

  // Pas de Cloudinary configuré OU pas d'entrée dans le mapping
  // -> on sert directement le fichier local pour éviter une URL Cloudinary cassée.
  if (!CLOUDINARY_CLOUD_NAME || !publicId) {
    return localPath
  }

  if (type === 'video') {
    return getOptimizedVideoUrl(publicId)
  } else {
    return getOptimizedImageUrl(publicId)
  }
}

