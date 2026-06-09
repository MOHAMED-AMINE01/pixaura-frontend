/**
 * Compress les 7 images demandées par l'utilisateur, en place dans
 * public/Banque d_images/, pour qu'elles soient servies directement
 * par Vercel sans Cloudinary.
 *
 * Sauvegarde les originaux dans .cache/originals-backup/ avant compression.
 *
 * Usage: node scripts/compress-7-images.js
 */

const fs = require('fs')
const path = require('path')
const sharp = require('sharp')

const SRC_DIR = path.join(__dirname, '..', 'public', 'Banque d_images')
const BACKUP_DIR = path.join(__dirname, '..', '.cache', 'originals-backup')

const FILES = [
  'humind-white.png',
  'PIXaura-soft white.png',
  'art1.jpg',
  'Copie de M7_09197.jpg',
  'Copie de M7_01248.jpg',
  'Copie de M7_03372.jpg',
  'backnoiree.png',
  'Copie de DSC04796.jpg',
  'art2.jpg',
  'Copie de M7_00487.jpg',
]

const MAX_DIMENSION = 1920
const JPEG_QUALITY = 82

function fmt(bytes) {
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(2)} MB`
  return `${(bytes / 1024).toFixed(0)} KB`
}

async function compressOne(filename) {
  const srcPath = path.join(SRC_DIR, filename)
  if (!fs.existsSync(srcPath)) {
    console.log(`SKIP (missing): ${filename}`)
    return
  }

  const originalSize = fs.statSync(srcPath).size

  if (!fs.existsSync(BACKUP_DIR)) {
    fs.mkdirSync(BACKUP_DIR, { recursive: true })
  }
  const backupPath = path.join(BACKUP_DIR, filename)
  if (!fs.existsSync(backupPath)) {
    fs.copyFileSync(srcPath, backupPath)
  }

  const ext = path.extname(filename).toLowerCase()
  const tmpPath = srcPath + '.tmp'

  const pipeline = sharp(backupPath, { failOn: 'none' }).resize({
    width: MAX_DIMENSION,
    height: MAX_DIMENSION,
    fit: 'inside',
    withoutEnlargement: true,
  })

  if (ext === '.png') {
    const meta = await sharp(backupPath).metadata()
    if (meta.hasAlpha) {
      await pipeline
        .png({ compressionLevel: 9, palette: true, quality: 90 })
        .toFile(tmpPath)
    } else {
      await pipeline
        .png({ compressionLevel: 9, palette: true, quality: 80 })
        .toFile(tmpPath)
    }
  } else {
    await pipeline.jpeg({ quality: JPEG_QUALITY, mozjpeg: true }).toFile(tmpPath)
  }

  fs.renameSync(tmpPath, srcPath)

  const newSize = fs.statSync(srcPath).size
  const reduction = Math.round((1 - newSize / originalSize) * 100)
  console.log(
    `OK  ${filename.padEnd(28)}  ${fmt(originalSize).padStart(10)}  ->  ${fmt(newSize).padStart(10)}  (-${reduction}%)`
  )
}

async function main() {
  console.log(`Backup dir: ${BACKUP_DIR}`)
  console.log(`Source dir: ${SRC_DIR}`)
  console.log('')

  for (const f of FILES) {
    try {
      await compressOne(f)
    } catch (err) {
      console.error(`FAIL ${f}: ${err.message}`)
    }
  }

  console.log('\nDone.')
}

main()
