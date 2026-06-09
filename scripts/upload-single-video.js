/**
 * Script to upload a single video to Cloudinary with async processing
 * Usage: node scripts/upload-single-video.js noir.mp4
 */

const cloudinary = require('cloudinary').v2
const fs = require('fs')
const path = require('path')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const ASSETS_FOLDER = path.join(__dirname, '../public/Banque d_images')
const CLOUDINARY_FOLDER = 'pixaura'

async function uploadVideo(filename) {
  const filePath = path.join(ASSETS_FOLDER, filename)
  
  if (!fs.existsSync(filePath)) {
    console.error(`❌ Error: File ${filename} does not exist!`)
    process.exit(1)
  }

  const publicId = filename.replace(/\.[^/.]+$/, '').replace(/\s+/g, '-').toLowerCase()
  
  try {
    console.log(`📤 Uploading ${filename} as ${publicId}...`)
    
    const result = await cloudinary.uploader.upload(filePath, {
      folder: CLOUDINARY_FOLDER,
      public_id: publicId,
      resource_type: 'video',
      overwrite: true,
      eager_async: true, // Process asynchronously for large videos
      eager: [
        { quality: 'auto', format: 'mp4' },
        { quality: 'auto', format: 'webm' }
      ]
    })
    
    console.log(`✅ Uploaded: ${result.secure_url}`)
    console.log(`📊 Status: ${result.status}`)
    if (result.eager) {
      console.log(`🔄 Processing: ${result.eager.length} transformations queued`)
    }
    return result
  } catch (error) {
    console.error(`❌ Error uploading ${filename}:`, error.message)
    if (error.http_code === 409) {
      console.log(`⚠️  File already exists. Use overwrite: true to replace.`)
    }
    return null
  }
}

async function deleteVideo(publicId) {
  try {
    console.log(`🗑️  Deleting ${publicId}...`)
    const result = await cloudinary.uploader.destroy(`${CLOUDINARY_FOLDER}/${publicId}`, {
      resource_type: 'video'
    })
    
    if (result.result === 'ok') {
      console.log(`✅ Deleted: ${publicId}`)
    } else if (result.result === 'not found') {
      console.log(`⚠️  Not found: ${publicId}`)
    } else {
      console.log(`❌ Error: ${result.result}`)
    }
    return result
  } catch (error) {
    console.error(`❌ Error deleting ${publicId}:`, error.message)
    return null
  }
}

async function main() {
  if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
    console.error('❌ Error: Cloudinary credentials not set!')
    process.exit(1)
  }

  const args = process.argv.slice(2)
  
  if (args.length === 0) {
    console.log('Usage: node scripts/upload-single-video.js <action> <filename>')
    console.log('Actions:')
    console.log('  upload <filename>  - Upload a video')
    console.log('  delete <filename>  - Delete a video')
    console.log('Example: node scripts/upload-single-video.js upload noir.mp4')
    process.exit(1)
  }

  const action = args[0]
  const filename = args[1]

  if (action === 'upload') {
    if (!filename) {
      console.error('❌ Error: Please provide a filename')
      process.exit(1)
    }
    await uploadVideo(filename)
  } else if (action === 'delete') {
    if (!filename) {
      console.error('❌ Error: Please provide a filename')
      process.exit(1)
    }
    const publicId = filename.replace(/\.[^/.]+$/, '').replace(/\s+/g, '-').toLowerCase()
    await deleteVideo(publicId)
  } else {
    console.error('❌ Error: Unknown action. Use "upload" or "delete"')
    process.exit(1)
  }
}

main().catch(console.error)

