# Exemples de Migration vers Cloudinary

Ce document montre comment migrer vos composants pour utiliser Cloudinary.

## Exemple 1 : Hero Section (Images)

### Avant
```tsx
const heroImages = [
  "/Banque d_images/Copie de M7_03225.jpg",
  "/Banque d_images/StageUfc.jpg",
  "/Banque d_images/Copie de M7_01248.jpg"
]
```

### Après
```tsx
import { getAssetUrl } from '@/lib/cloudinary'

const heroImages = [
  getAssetUrl("/Banque d_images/Copie de M7_03225.jpg", "image"),
  getAssetUrl("/Banque d_images/StageUfc.jpg", "image"),
  getAssetUrl("/Banque d_images/Copie de M7_01248.jpg", "image")
]
```

## Exemple 2 : Video Carousel

### Avant
```tsx
const slides = [
  {
    id: 1,
    video: "/Banque d_images/rally1.mp4",
  },
  {
    id: 2,
    video: "/Banque d_images/Immobilier.mp4",
  }
]
```

### Après
```tsx
import { getAssetUrl } from '@/lib/cloudinary'

const slides = [
  {
    id: 1,
    video: getAssetUrl("/Banque d_images/rally1.mp4", "video"),
  },
  {
    id: 2,
    video: getAssetUrl("/Banque d_images/Immobilier.mp4", "video"),
  }
]
```

## Exemple 3 : Background Video

### Avant
```tsx
<video>
  <source src="/Banque d_images/Copie de BACKGROUND WEB DESKTOP.mp4" type="video/mp4" />
</video>
```

### Après
```tsx
import { getAssetUrl } from '@/lib/cloudinary'

<video>
  <source src={getAssetUrl("/Banque d_images/Copie de BACKGROUND WEB DESKTOP.mp4", "video")} type="video/mp4" />
</video>
```

## Exemple 4 : Next.js Image Component

### Avant
```tsx
<Image
  src="/Banque d_images/StageUfc.jpg"
  alt="Stage UFC"
  width={800}
  height={600}
/>
```

### Après
```tsx
import { getOptimizedImageUrl } from '@/lib/cloudinary'

<Image
  src={getOptimizedImageUrl("stage-ufc", 800, 600)}
  alt="Stage UFC"
  width={800}
  height={600}
/>
```

## Exemple 5 : Vidéo avec optimisations spécifiques

### Avant
```tsx
<video src="/Banque d_images/noir.mp4" />
```

### Après (avec optimisations)
```tsx
import { getCloudinaryVideoUrl } from '@/lib/cloudinary'

<video 
  src={getCloudinaryVideoUrl("noir", {
    width: 1920,
    height: 1080,
    quality: "auto",
    format: "auto"
  })} 
/>
```

## Migration Automatique

Pour migrer rapidement, vous pouvez utiliser la fonction `getAssetUrl()` qui :
- ✅ Convertit automatiquement les chemins locaux en URLs Cloudinary
- ✅ Utilise le mapping défini dans `lib/cloudinary.ts`
- ✅ Retombe sur les chemins locaux si Cloudinary n'est pas configuré

## Ordre de Migration Recommandé

1. **Composants critiques** (hero, carousel) - Impact immédiat
2. **Page d'accueil** (page.tsx) - Réduction majeure
3. **Pages secondaires** (realisations, humind, agence)
4. **Composants UI** (modales, portfolio)

