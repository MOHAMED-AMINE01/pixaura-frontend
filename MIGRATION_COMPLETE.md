# Migration Cloudinary - Statut

## ✅ Fichiers Migrés

1. **app/page.tsx** - Images hero et vidéo de fond
2. **components/home-video-carousel.tsx** - Toutes les vidéos du carousel
3. **components/hero-section.tsx** - Images des projets hero
4. **components/portfolio-section.tsx** - Vidéos et posters des projets

## ⏳ Fichiers Restants à Migrer

Les fichiers suivants contiennent encore des références à `/Banque d_images/` et doivent être migrés :

1. **components/immersive-intro.tsx** - Vidéos d'intro (Backv2.mp4, back3.mp4)
2. **app/humind/page.tsx** - Vidéo noir.mp4 et images
3. **app/realisations/page.tsx** - Toutes les images et vidéos des projets
4. **app/agence/page.tsx** - Vidéo stageMMa.mp4
5. **components/navbar.tsx** - Préchargements de vidéos
6. **Autres composants** - Vérifiez avec grep

## 🔧 Comment Migrer un Fichier

1. Ajoutez l'import en haut du fichier :
```tsx
import { getAssetUrl } from "@/lib/cloudinary"
```

2. Remplacez les chemins :
```tsx
// Avant
src="/Banque d_images/image.jpg"
video="/Banque d_images/video.mp4"

// Après
src={getAssetUrl("/Banque d_images/image.jpg", "image")}
video={getAssetUrl("/Banque d_images/video.mp4", "video")}
```

3. Pour les balises JSX, utilisez directement :
```tsx
<img src={getAssetUrl("/Banque d_images/image.jpg", "image")} />
<video src={getAssetUrl("/Banque d_images/video.mp4", "video")} />
```

## 📊 Assets Uploadés

✅ **29 fichiers uploadés avec succès** sur Cloudinary
⚠️ **13 fichiers trop volumineux** (>10MB) - nécessitent un plan payant Cloudinary
❌ **1 fichier** (noir.mp4) nécessite un traitement asynchrone

Les fichiers trop volumineux peuvent rester en local ou être compressés avant upload.

## 🎯 Prochaines Étapes

1. Migrer les fichiers restants un par un
2. Tester l'application en local
3. Vérifier que toutes les images/vidéos se chargent depuis Cloudinary
4. Déployer sur Vercel et vérifier les métriques de data transfer

