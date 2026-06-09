# Guide d'Intégration Cloudinary

Ce guide vous explique comment migrer tous vos assets (images et vidéos) vers Cloudinary pour réduire considérablement la consommation de bande passante sur Vercel.

## 🎯 Avantages de Cloudinary

- ✅ **Réduction de 70-90% de la consommation** : Les assets sont optimisés automatiquement
- ✅ **CDN global** : Livraison rapide depuis le serveur le plus proche
- ✅ **Ne compte pas dans le data transfer Vercel** : Les assets sont servis depuis Cloudinary
- ✅ **Optimisation automatique** : Format, qualité et taille adaptés automatiquement
- ✅ **Transformations à la volée** : Redimensionnement et compression en temps réel

## 📋 Étapes d'Installation

### 1. Créer un compte Cloudinary

1. Allez sur [cloudinary.com](https://cloudinary.com)
2. Créez un compte gratuit (25 GB de stockage, 25 GB de bande passante/mois)
3. Une fois connecté, allez dans le **Dashboard**
4. Notez vos credentials :
   - **Cloud Name** (ex: `dxyz123`)
   - **API Key** (ex: `123456789012345`)
   - **API Secret** (ex: `abcdefghijklmnopqrstuvwxyz`)

### 2. Installer les dépendances

```bash
cd pixaura
npm install cloudinary
```

### 3. Configurer les variables d'environnement

Créez un fichier `.env.local` à la racine du projet `pixaura/` :

```env
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=votre_cloud_name
CLOUDINARY_API_KEY=votre_api_key
CLOUDINARY_API_SECRET=votre_api_secret
```

⚠️ **Important** : 
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` doit commencer par `NEXT_PUBLIC_` car il est utilisé côté client
- Ne commitez JAMAIS le fichier `.env.local` (il est déjà dans `.gitignore`)

### 4. Uploader les assets vers Cloudinary

Exécutez le script d'upload :

```bash
# Sur Windows (PowerShell)
$env:CLOUDINARY_CLOUD_NAME="votre_cloud_name"
$env:CLOUDINARY_API_KEY="votre_api_key"
$env:CLOUDINARY_API_SECRET="votre_api_secret"
node scripts/upload-to-cloudinary.js

# Sur Mac/Linux
CLOUDINARY_CLOUD_NAME=votre_cloud_name \
CLOUDINARY_API_KEY=votre_api_key \
CLOUDINARY_API_SECRET=votre_api_secret \
node scripts/upload-to-cloudinary.js
```

Le script va :
- ✅ Uploader tous les fichiers de `public/Banque d_images/`
- ✅ Les organiser dans le dossier `pixaura` sur Cloudinary
- ✅ Créer un fichier `cloudinary-mapping.json` avec les correspondances

### 5. Vérifier l'upload

1. Allez sur votre dashboard Cloudinary
2. Vérifiez que tous les fichiers sont dans le dossier `pixaura`
3. Testez quelques URLs pour vérifier qu'elles fonctionnent

## 🔧 Utilisation dans le Code

### Exemple 1 : Image simple

**Avant :**
```tsx
<img src="/Banque d_images/StageUfc.jpg" alt="Stage UFC" />
```

**Après :**
```tsx
import { getAssetUrl } from '@/lib/cloudinary'

<img src={getAssetUrl("/Banque d_images/StageUfc.jpg", "image")} alt="Stage UFC" />
```

### Exemple 2 : Vidéo

**Avant :**
```tsx
<video src="/Banque d_images/rally1.mp4" />
```

**Après :**
```tsx
import { getAssetUrl } from '@/lib/cloudinary'

<video src={getAssetUrl("/Banque d_images/rally1.mp4", "video")} />
```

### Exemple 3 : Image avec Next.js Image

**Avant :**
```tsx
<Image src="/Banque d_images/Copie de M7_03225.jpg" width={800} height={600} />
```

**Après :**
```tsx
import { getOptimizedImageUrl } from '@/lib/cloudinary'

<Image 
  src={getOptimizedImageUrl("m7-03225", 800, 600)} 
  width={800} 
  height={600} 
/>
```

### Exemple 4 : Vidéo optimisée avec dimensions

```tsx
import { getCloudinaryVideoUrl } from '@/lib/cloudinary'

<video 
  src={getCloudinaryVideoUrl("rally1", {
    width: 1920,
    height: 1080,
    quality: "auto",
    format: "auto"
  })} 
/>
```

## 📝 Migration Progressive

Vous pouvez migrer progressivement :

1. **Phase 1** : Uploader tous les assets (fait avec le script)
2. **Phase 2** : Remplacer les chemins dans les composants critiques (hero, carousel)
3. **Phase 3** : Remplacer les autres composants
4. **Phase 4** : Supprimer les fichiers locaux (optionnel, gardez-les comme backup)

## 🎨 Options d'Optimisation Disponibles

### Pour les Images

```tsx
import { getCloudinaryImageUrl } from '@/lib/cloudinary'

// Image optimisée automatiquement
getCloudinaryImageUrl("image-name", {
  width: 1920,        // Largeur max
  height: 1080,       // Hauteur max
  quality: "auto",    // Qualité automatique
  format: "auto",     // Format optimal (WebP si supporté)
  crop: "fill",       // Remplissage intelligent
  gravity: "auto"     // Détection automatique du sujet
})
```

### Pour les Vidéos

```tsx
import { getCloudinaryVideoUrl } from '@/lib/cloudinary'

// Vidéo optimisée
getCloudinaryVideoUrl("video-name", {
  width: 1920,
  height: 1080,
  quality: "auto",    // Qualité adaptative
  format: "auto",     // MP4 ou WebM selon le navigateur
  bitRate: "auto"     // Bitrate optimal
})
```

## 🔍 Vérification

Pour vérifier que tout fonctionne :

1. **Vérifiez les URLs** : Les URLs Cloudinary doivent commencer par `https://res.cloudinary.com/`
2. **Testez en local** : `npm run dev` et vérifiez que les images/vidéos se chargent
3. **Vérifiez la console** : Pas d'erreurs 404
4. **Testez en production** : Déployez sur Vercel et vérifiez les métriques

## 📊 Réduction Attendue

- **Avant** : ~1 GB par visite (assets servis depuis Vercel)
- **Après** : ~50-100 MB par visite (assets optimisés depuis Cloudinary)
- **Réduction** : 90-95% de la consommation

## 🆘 Dépannage

### Les images ne se chargent pas

1. Vérifiez que `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` est bien défini
2. Vérifiez que les fichiers sont bien uploadés sur Cloudinary
3. Vérifiez les noms des public IDs dans `lib/cloudinary.ts`

### Erreur "Cloudinary cloud name not configured"

- Vérifiez que `.env.local` existe et contient `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`
- Redémarrez le serveur de développement après avoir modifié `.env.local`

### Les vidéos sont trop lentes

- Utilisez `getStreamingVideoUrl()` pour les grandes vidéos
- Réduisez la qualité avec `quality: 70` au lieu de `"auto"`

## 📚 Ressources

- [Documentation Cloudinary](https://cloudinary.com/documentation)
- [Transformations d'images](https://cloudinary.com/documentation/image_transformations)
- [Transformations vidéo](https://cloudinary.com/documentation/video_transformations)

