/**
 * Upload tous les assets de public/Banque d_images vers Cloudinary.
 *
 * Optimisations:
 * - Images: pré-compressées via Sharp (resize max 2200px + JPEG mozjpeg q=82)
 *   avant l'upload, ce qui permet de rester sous la limite 10 MB du free tier
 *   et d'envoyer des fichiers beaucoup plus rapides à uploader.
 * - Vidéos: uploadées via `upload_large` (chunked) pour gérer les fichiers
 *   volumineux (>40 MB), avec compression auto côté Cloudinary.
 *
 * Variables d'environnement requises:
 *   CLOUDINARY_CLOUD_NAME
 *   CLOUDINARY_API_KEY
 *   CLOUDINARY_API_SECRET
 *
 * Usage: node scripts/upload-to-cloudinary.js
 */

const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

// Charge les credentials depuis .env.local (Next.js le fait automatiquement,
// mais ce script Node standalone non).
try {
  require('dotenv').config({ path: path.join(__dirname, '../.env.local') })
} catch {
  /* dotenv non requis si les vars sont déjà dans l'env */
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ASSETS_FOLDER = path.join(__dirname, '../public/Banque d_images')
const CLOUDINARY_FOLDER = 'pixaura'
const TMP_FOLDER = path.join(__dirname, '../.cache/cloudinary-tmp')

// Compression cible pour les images: 2200px max côté long, JPEG q=82 (mozjpeg)
const IMAGE_MAX_DIMENSION = 2200
const IMAGE_QUALITY = 82

const PUBLIC_ID_MAP = {
  'rally1.mp4': 'rally1',
  'Immobilier.mp4': 'immobilier',
  'halowen.mp4': 'halowen',
  'pod1.mp4': 'pod1',
  'rally2.mp4': 'rally2',
  'stageMMa.mp4': 'stage-mma',
  'noir.mp4': 'noir',
  'Backv2.mp4': 'backv2',
  'back3.mp4': 'back3',
  'Copie de BACKGROUND WEB DESKTOP.mp4': 'background-web-desktop',
  'i3.mp4': 'i3',

  'Copie de M7_03225.jpg': 'm7-03225',
  'StageUfc.jpg': 'stage-ufc',
  'Copie de M7_01248.jpg': 'm7-01248',
  'ippppp1.png': 'background-placeholder',
  'backnoiree.png': 'back-noiree',
  'PIXaura-soft white.png': 'pixaura-logo',
  'humind-white.png': 'humind-logo',
  'Copie de IMG_7149.jpg': 'img-7149',
  'art1.jpg': 'art1',
  'art2.jpg': 'art2',
  'art3.jpg': 'art3',
  'art5.jpg': 'art5',
  'art6.jpg': 'art6',
  'Copie de M7_00487.jpg': 'm7-00487',
  'Copie de M7_02930.jpg': 'm7-02930',
  'Copie de M7_09197.jpg': 'm7-09197',
  'Copie de DSC04614.jpg': 'dsc04614',
  'Copie de DSC04678.jpg': 'dsc04678',
  'Copie de DSC04758.jpg': 'dsc04758',
  'Copie de DSC04796.jpg': 'dsc04796',
  'Copie de DSC07052 - Copie.jpg': 'dsc07052',
  'Copie de LDP_5161.jpg': 'ldp-5161',
  'Copie de LDP_5182.jpg': 'ldp-5182',
  'Copie de M7_00197.jpg': 'm7-00197',
  'Copie de M7_00259.jpg': 'm7-00259',
  'Copie de M7_03008.jpg': 'm7-03008',
  'Copie de M7_03194.jpg': 'm7-03194',
  'Copie de M7_03372.jpg': 'm7-03372',
  'Copie de M7_03385.jpg': 'm7-03385',
  'Copie de M7_09214.jpg': 'm7-09214',
  'Copie de M7_09236.jpg': 'm7-09236',
}

function formatBytes(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  if (bytes >= 1024) return `${(bytes / 1024).toFixed(0)} KB`
  return `${bytes} B`
}

async function compressImage(filePath) {
  if (!fs.existsSync(TMP_FOLDER)) {
    fs.mkdirSync(TMP_FOLDER, { recursive: true })
  }

  const ext = path.extname(filePath).toLowerCase()
  const baseName = path.basename(filePath, ext)
  const outPath = path.join(TMP_FOLDER, `${baseName}.jpg`)

  // PNG avec transparence: on garde PNG pour préserver l'alpha, sinon on convertit en JPEG
  const meta = await sharp(filePath).metadata()
  const hasAlpha = meta.hasAlpha === true && ext === '.png'

  const pipeline = sharp(filePath, { failOn: 'none' }).resize({
    width: IMAGE_MAX_DIMENSION,
    height: IMAGE_MAX_DIMENSION,
    fit: 'inside',
    withoutEnlargement: true,
  })

  if (hasAlpha) {
    const pngPath = path.join(TMP_FOLDER, `${baseName}.png`)
    await pipeline.png({ quality: 90, compressionLevel: 9 }).toFile(pngPath)
    return pngPath
  }

  await pipeline.jpeg({ quality: IMAGE_QUALITY, mozjpeg: true }).toFile(outPath)
  return outPath
}

async function uploadFile(filePath, publicId) {
  const fileExtension = path.extname(filePath).toLowerCase()
  const isVideo = ['.mp4', '.webm', '.mov'].includes(fileExtension)
  const isImage = ['.jpg', '.jpeg', '.png', '.webp', '.gif'].includes(fileExtension)

  if (!isVideo && !isImage) {
    console.log(`Skipping ${path.basename(filePath)} (not an image or video)`)
    return null
  }

  try {
    const options = {
      folder: CLOUDINARY_FOLDER,
      public_id: publicId,
      overwrite: true,
      invalidate: true,
      resource_type: isVideo ? 'video' : 'image',
    }

    if (isImage) {
      options.quality = 'auto'
      options.fetch_format = 'auto'

      const originalSize = fs.statSync(filePath).size
      console.log(`Compressing ${path.basename(filePath)} (${formatBytes(originalSize)})...`)
      const compressedPath = await compressImage(filePath)
      const compressedSize = fs.statSync(compressedPath).size
      console.log(`  -> compressed to ${formatBytes(compressedSize)} (-${Math.round((1 - compressedSize / originalSize) * 100)}%)`)

      console.log(`Uploading ${publicId}...`)
      const result = await cloudinary.uploader.upload(compressedPath, options)
      fs.unlink(compressedPath, () => {})
      console.log(`OK ${result.secure_url}`)
      return result
    }

    // Video: utiliser upload_large pour gérer les gros fichiers (>20MB).
    // eager_async + une transformation eager minimale permet à Cloudinary
    // de traiter les très gros fichiers (>40 MB) en arrière-plan au lieu
    // de rejeter avec "too large to process synchronously".
    options.quality = 'auto'
    options.chunk_size = 6 * 1024 * 1024 // 6 MB chunks
    options.eager_async = true
    options.eager = [{ quality: 'auto', format: 'mp4' }]

    const sizeMb = fs.statSync(filePath).size / (1024 * 1024)
    console.log(`Uploading video ${path.basename(filePath)} (${sizeMb.toFixed(1)} MB) as ${publicId}...`)

    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_large(filePath, options, (err, res) => {
        if (err) reject(err)
        else resolve(res)
      })
    })

    console.log(`OK ${result.secure_url}`)
    return result
  } catch (error) {
    if (error.http_code === 409) {
      console.log(`Already exists: ${publicId}`)
    } else {
      console.error(`ERROR uploading ${path.basename(filePath)}:`, error.message || error)
    }
    return null
  }
}

async function uploadAllAssets() {
  const cfg = cloudinary.config()
  if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
    console.error('ERROR: Cloudinary credentials not set!')
    console.log('Define them in .env.local or in the shell environment:')
    console.log('  CLOUDINARY_CLOUD_NAME or NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME')
    console.log('  CLOUDINARY_API_KEY')
    console.log('  CLOUDINARY_API_SECRET')
    process.exit(1)
  }
  console.log(`Cloud: ${cfg.cloud_name}`)

  console.log('Starting Cloudinary upload...')
  console.log(`Source folder: ${ASSETS_FOLDER}`)
  console.log(`Cloudinary folder: ${CLOUDINARY_FOLDER}`)

  if (!fs.existsSync(ASSETS_FOLDER)) {
    console.error(`ERROR: Folder ${ASSETS_FOLDER} does not exist!`)
    process.exit(1)
  }

  const files = fs.readdirSync(ASSETS_FOLDER)
  const results = {
    uploaded: [],
    skipped: [],
    errors: [],
  }

  for (const file of files) {
    const filePath = path.join(ASSETS_FOLDER, file)
    const stats = fs.statSync(filePath)
    if (!stats.isFile()) continue

    const publicId = PUBLIC_ID_MAP[file] || file.replace(/\.[^/.]+$/, '').replace(/\s+/g, '-').toLowerCase()

    const result = await uploadFile(filePath, publicId)

    if (result) {
      results.uploaded.push({ file, publicId, url: result.secure_url })
    } else if (PUBLIC_ID_MAP[file]) {
      results.skipped.push({ file, publicId })
    } else {
      results.errors.push({ file })
    }

    await new Promise((resolve) => setTimeout(resolve, 300))
  }

  console.log('\nSummary:')
  console.log(`Uploaded: ${results.uploaded.length}`)
  console.log(`Skipped:  ${results.skipped.length}`)
  console.log(`Errors:   ${results.errors.length}`)

  // Merge into existing mapping (preserve prior entries)
  const mappingPath = path.join(__dirname, '../cloudinary-mapping.json')
  let mapping = {}
  if (fs.existsSync(mappingPath)) {
    try {
      mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf-8'))
    } catch {
      mapping = {}
    }
  }

  results.uploaded.forEach(({ file, publicId }) => {
    mapping[`/Banque d_images/${file}`] = publicId
  })

  fs.writeFileSync(mappingPath, JSON.stringify(mapping, Object.keys(mapping).sort(), 2))
  console.log('Mapping saved to cloudinary-mapping.json')

  // Cleanup tmp folder
  if (fs.existsSync(TMP_FOLDER)) {
    fs.readdirSync(TMP_FOLDER).forEach((f) => fs.unlinkSync(path.join(TMP_FOLDER, f)))
  }

  console.log('Done.')
}

uploadAllAssets().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
