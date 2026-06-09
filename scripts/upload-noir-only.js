/**
 * Upload uniquement noir.mp4 vers Cloudinary avec eager_async
 * (le fichier est trop gros pour un upload synchrone).
 *
 * Usage: node scripts/upload-noir-only.js
 */

const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') })
} catch {}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const filePath = path.join(__dirname, '../public/Banque d_images/noir.mp4')
const publicId = 'noir'

async function main() {
  const cfg = cloudinary.config()
  if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
    console.error('ERROR: Cloudinary credentials missing in .env.local')
    process.exit(1)
  }

  if (!fs.existsSync(filePath)) {
    console.error(`File not found: ${filePath}`)
    process.exit(1)
  }

  const sizeMb = fs.statSync(filePath).size / (1024 * 1024)
  console.log(`Uploading ${path.basename(filePath)} (${sizeMb.toFixed(1)} MB) to Cloudinary (async)...`)

  const result = await new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      filePath,
      {
        folder: 'pixaura',
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        resource_type: 'video',
        chunk_size: 6 * 1024 * 1024,
        eager_async: true,
        eager: [{ quality: 'auto', format: 'mp4' }],
      },
      (err, res) => (err ? reject(err) : resolve(res))
    )
  })

  console.log(`OK: ${result.secure_url}`)

  // Update mapping
  const mappingPath = path.join(__dirname, '../cloudinary-mapping.json')
  let mapping = {}
  if (fs.existsSync(mappingPath)) {
    mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))
  }
  mapping['/Banque d_images/noir.mp4'] = publicId
  const sortedKeys = Object.keys(mapping).sort()
  const sorted = {}
  sortedKeys.forEach((k) => (sorted[k] = mapping[k]))
  fs.writeFileSync(mappingPath, JSON.stringify(sorted, null, 2))
  console.log('Mapping updated.')
}

main().catch((err) => {
  console.error('Fatal:', err.message || err)
  process.exit(1)
})
