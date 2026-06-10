/**
 * Réupload des vidéos de public/Banque d_images vers Cloudinary avec des
 * publicIds PROPRES (noms), pour un mapping cohérent et vérifiable.
 * upload_large + eager_async pour gérer les gros fichiers.
 *
 * Usage: node scripts/upload-videos-only.js
 */
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");

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

const NAME_MAP = {
  "Backv2.mp4": "backv2",
  "Copie de BACKGROUND WEB DESKTOP.mp4": "background-web-desktop",
  "Immobilier.mp4": "immobilier",
  "halowen.mp4": "halowen",
  "noir.mp4": "noir",
  "pod1.mp4": "pod1",
  "rally1.mp4": "rally1",
  "rally2.mp4": "rally2",
  "stageMMa.mp4": "stage-mma",
};

function uploadLarge(filePath, publicId) {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_large(
      filePath,
      {
        folder: CLOUDINARY_FOLDER,
        public_id: publicId,
        overwrite: true,
        invalidate: true,
        resource_type: "video",
        quality: "auto",
        chunk_size: 6 * 1024 * 1024,
        eager_async: true,
        eager: [{ quality: "auto", format: "mp4" }],
      },
      (err, res) => (err ? reject(err) : resolve(res))
    );
  });
}

async function run() {
  const cfg = cloudinary.config();
  if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
    console.error("ERROR: identifiants Cloudinary manquants (.env.local)");
    process.exit(1);
  }
  console.log(`Cloud: ${cfg.cloud_name}\n`);

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
  for (const [file, publicId] of Object.entries(NAME_MAP)) {
    const filePath = path.join(ASSETS_FOLDER, file);
    if (!fs.existsSync(filePath)) {
      console.log(`MANQUANT (ignoré): ${file}`);
      continue;
    }
    const sizeMb = (fs.statSync(filePath).size / 1048576).toFixed(1);
    process.stdout.write(`${file} (${sizeMb} MB) → `);
    try {
      await uploadLarge(filePath, publicId);
      mapping[`/Banque d_images/${file}`] = publicId;
      console.log(`OK pixaura/${publicId}`);
      ok += 1;
    } catch (e) {
      console.log(`ERREUR: ${e.message || e}`);
      err += 1;
    }
  }

  // Nettoyer les entrées vidéo orphelines (back3, i3) absentes en local
  for (const k of ["/Banque d_images/back3.mp4", "/Banque d_images/i3.mp4"]) {
    if (mapping[k]) delete mapping[k];
  }

  fs.writeFileSync(mappingPath, JSON.stringify(mapping, Object.keys(mapping).sort(), 2));
  console.log(`\nTerminé. Uploadées: ${ok}, Erreurs: ${err}`);
  console.log("Mapping mis à jour : cloudinary-mapping.json");
}

run().catch((e) => {
  console.error("Fatal:", e);
  process.exit(1);
});
