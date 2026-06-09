const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
require("dotenv").config({ path: ".env.local" });

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const videosDir = path.join(__dirname, "public/Banque d_images");
const videos = fs.readdirSync(videosDir).filter(f => /\.(mp4|mov)$/i.test(f));

async function uploadVideos() {
  console.log(`📤 Uploading ${videos.length} videos to Cloudinary...`);
  
  for (const video of videos) {
    const filePath = path.join(videosDir, video);
    try {
      console.log(`⏳ Uploading: ${video}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "video",
        folder: "pixaura",
      });
      console.log(`✅ ${video} → ${result.secure_url}`);
    } catch (err) {
      console.error(`❌ Failed to upload ${video}:`, err.message);
    }
  }
  
  console.log("✅ Upload complete!");
}

uploadVideos();
