/**
 * Upload UNIQUEMENT les images de public/Banque d_images vers Cloudinary
 * (les vidéos sont déjà en ligne). Compresse via Sharp avant upload.
 * Met à jour cloudinary-mapping.json avec des publicIds "nus" (sans préfixe
 * pixaura/, que le code rajoute déjà via CLOUDINARY_FOLDER).
 *
 * Usage: node scripts/upload-images-only.js
 */
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

try {
  require("dotenv").config({ path: path.join(__dirname, "../.env.local") });
} catch {
  /* vars déjà dans l'env */
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const ASSETS_FOLDER = path.join(__dirname, "../public/Banque d_images");
const CLOUDINARY_FOLDER = "pixaura";
const TMP_FOLDER = path.join(__dirname, "../.cache/cloudinary-tmp");
const IMAGE_MAX_DIMENSION = 2200;
const IMAGE_QUALITY = 82;
const IMAGE_EXT = [".jpg", ".jpeg", ".png", ".webp", ".gif"];

function slugifyPublicId(file) {
  return file
    .replace(/\.[^/.]+$/, "")
    .replace(/\s+/g, "-")
    .replace(/[^a-zA-Z0-9_-]/g, "")
    .toLowerCase();
}

async function compressImage(filePath) {
  if (!fs.existsSync(TMP_FOLDER)) fs.mkdirSync(TMP_FOLDER, { recursive: true });
  const ext = path.extname(filePath).toLowerCase();
  const baseName = path.basename(filePath, ext);
  const meta = await sharp(filePath).metadata();
  const hasAlpha = meta.hasAlpha === true && ext === ".png";
  const pipeline = sharp(filePath, { failOn: "none" }).resize({
    width: IMAGE_MAX_DIMENSION,
    height: IMAGE_MAX_DIMENSION,
    fit: "inside",
    withoutEnlargement: true,
  });
  if (hasAlpha) {
    const pngPath = path.join(TMP_FOLDER, `${baseName}.png`);
    await pipeline.png({ quality: 90, compressionLevel: 9 }).toFile(pngPath);
    return pngPath;
  }
  const outPath = path.join(TMP_FOLDER, `${baseName}.jpg`);
  await pipeline.jpeg({ quality: IMAGE_QUALITY, mozjpeg: true }).toFile(outPath);
  return outPath;
}

function formatBytes(b) {
  if (b >= 1024 * 1024) return `${(b / 1048576).toFixed(1)} MB`;
  if (b >= 1024) return `${(b / 1024).toFixed(0)} KB`;
  return `${b} B`;
}

async function run() {
  const cfg = cloudinary.config();
  if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
    console.error("ERROR: identifiants Cloudinary manquants (.env.local)");
    process.exit(1);
  }
  console.log(`Cloud: ${cfg.cloud_name}`);

  const files = fs
    .readdirSync(ASSETS_FOLDER)
    .filter((f) => IMAGE_EXT.includes(path.extname(f).toLowerCase()));
  console.log(`${files.length} images à traiter\n`);

  const mappingPath = path.join(__dirname, "../cloudinary-mapping.json");
  let mapping = {};
  if (fs.existsSync(mappingPath)) {
    try {
      mapping = JSON.parse(fs.readFileSync(mappingPath, "utf-8"));
    } catch {
      mapping = {};
    }
  }

  let ok = 0;
  let err = 0;
  for (const file of files) {
    const filePath = path.join(ASSETS_FOLDER, file);
    const publicId = slugifyPublicId(file);
    try {
      const orig = fs.statSync(filePath).size;
      process.stdout.write(`${file} (${formatBytes(orig)}) → `);
      const compressed = await compressImage(filePath);
      const result = await cloudinary.uploader.upload(compressed, {
        folder: CLOUDINARY_FOLDER,
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        resource_type: "image",
        quality: "auto",
        fetch_format: "auto",
      });
      fs.unlink(compressed, () => {});
      mapping[`/Banque d_images/${file}`] = publicId; // publicId nu
      console.log(`OK pixaura/${publicId}`);
      ok += 1;
    } catch (e) {
      console.log(`ERREUR: ${e.message || e}`);
      err += 1;
    }
    await new Promise((r) => setTimeout(r, 200));
  }

  fs.writeFileSync(mappingPath, JSON.stringify(mapping, Object.keys(mapping).sort(), 2));
  console.log(`\nTerminé. Uploadées: ${ok}, Erreurs: ${err}`);
  console.log("Mapping mis à jour : cloudinary-mapping.json");

  if (fs.existsSync(TMP_FOLDER)) {
    fs.readdirSync(TMP_FOLDER).forEach((f) => fs.unlinkSync(path.join(TMP_FOLDER, f)));
  }
}

run().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
