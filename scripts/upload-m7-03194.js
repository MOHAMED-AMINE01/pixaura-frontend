const cloudinary = require('cloudinary').v2;
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env.local') });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const inputPath = path.join(__dirname, '../public/Banque d_images/Copie de M7_03194.jpg');
const tempPath = path.join(__dirname, '../temp_m7_03194.jpg');

async function uploadImage() {
  try {
    console.log('Compressing Copie de M7_03194.jpg...');

    // Compress with Sharp
    await sharp(inputPath)
      .resize(2200, 2200, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({ quality: 82, progressive: true })
      .toFile(tempPath);

    const fileSize = fs.statSync(tempPath).size;
    console.log(`Compressed size: ${(fileSize / 1024 / 1024).toFixed(2)}MB`);

    console.log('Uploading to Cloudinary...');
    const result = await cloudinary.uploader.upload(tempPath, {
      folder: 'pixaura',
      public_id: 'copie-de-m7_03194',
      resource_type: 'image',
      overwrite: true,
    });

    console.log('Upload successful!');
    console.log('Public ID:', result.public_id);
    console.log('URL:', result.secure_url);

    // Clean up temp file
    fs.unlinkSync(tempPath);
    console.log('Temp file cleaned up');

  } catch (error) {
    console.error('Error:', error.message);
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
    process.exit(1);
  }
}

uploadImage();
