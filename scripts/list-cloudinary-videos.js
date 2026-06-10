const cloudinary = require("cloudinary").v2;
const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env.local") });
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
cloudinary.api
  .resources({ resource_type: "video", type: "upload", prefix: "pixaura/", max_results: 100 })
  .then((r) => {
    r.resources.forEach((x) => console.log(x.public_id));
    console.log("TOTAL:", r.resources.length);
  })
  .catch((e) => console.error("ERR:", e.message || e));
