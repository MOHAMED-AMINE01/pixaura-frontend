# Pixaura — Site vitrine + Backoffice (front unifié)

Un seul projet Next.js : pages marketing (`/`, `/contact`, …) et espace connecté (`/login`, `/membre/*`, `/admin/*`).

## Développement local

1. Démarrer l’**API** du repo `Backoffice/backend` sur le port **4000** (`npm run dev` ou équivalent).
2. Dans ce repo : `npm install` puis `npm run dev` (port **3000** par défaut).
3. Vitrine : http://localhost:3000 — Connexion : http://localhost:3000/login

Variables : copier `.env.example` vers `.env.local`. Minimum :

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

## CORS / `FRONTEND_URL` (backend)

Sur l’API backend, `FRONTEND_URL` doit autoriser les origines du front fusionné, par exemple :

- `http://localhost:3000`
- `https://pixaura-ten.vercel.app` (ou votre domaine de production)

Sinon les appels depuis `/login` et les espaces membre/admin échoueront en CORS.

## Déploiement

- **Vercel** : définir `NEXT_PUBLIC_API_URL` vers l’API de production (ex. `https://votre-api.vercel.app/api`).
- L’icône profil du header vitrine pointe vers `/login` (même domaine).

## Structure

- `src/app/(marketing)/` — pages vitrine
- `src/app/login`, `membre`, `admin` — backoffice (layouts Y2K, sans header marketing)
- `src/lib/api.ts`, `auth.ts` — client API externe
