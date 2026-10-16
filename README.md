# Lilou Fronteau — portfolio UGC

Site vitrine de **Lilou Fronteau**, créatrice UGC basée à Hyères (83) : présentation, carrousel de 13 Reels, services, process, offres et contact.

- Production : https://lilou-ugc.vercel.app (domaine cible : `ugcbylilou.com`, **pas encore acheté**)
- Langues : français (par défaut, `/`) et anglais (`/en`)

## Stack

- [Next.js 16](https://nextjs.org) (App Router, Turbopack) + React 19, TypeScript
- Tailwind CSS 4
- [next-intl](https://next-intl.dev) pour le FR/EN (`localePrefix: "as-needed"`)
- [Motion](https://motion.dev) pour les animations, [Lenis](https://lenis.darkroom.engineering) pour le smooth scroll
- [@vercel/analytics](https://vercel.com/docs/analytics) (actif seulement si Web Analytics est activé sur le projet Vercel)

## Structure

| Chemin | Rôle |
| --- | --- |
| `src/app/[locale]/` | layout (metadata, SEO, analytics) et page d'accueil |
| `src/app/robots.ts`, `src/app/sitemap.ts` | `robots.txt` et `sitemap.xml` |
| `src/app/icon.tsx`, `apple-icon.tsx` | favicons générés (monogramme LF) |
| `src/components/` | sections : Hero, About, Projects, Services, Process, Offers, Contact… |
| `src/messages/fr.json`, `en.json` | **tous les textes** (copy, prix, contact) |
| `src/data/images.ts` | photos, posters et vidéos de chaque projet |
| `src/lib/site.ts` | URL du site (`SITE_URL`) utilisée pour canonical / OG / sitemap |
| `public/videos/` | Reels en **H.264 + AAC** (lisibles partout) |
| `public/og-image.jpg` | image de partage 1200×630 |

## Développement

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # build de production
npm run start   # sert le build
```

### Ajouter / remplacer un Reel

Encoder en H.264 (pas en HEVC seul, illisible sur Firefox / beaucoup de PC) :

```bash
ffmpeg -i input.mov -c:v libx264 -preset slow -crf 26 -maxrate 2500k -bufsize 5000k \
  -profile:v high -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart public/videos/nom.mp4
```

Puis ajouter le poster dans `public/posters/` et l'entrée dans `src/data/images.ts`.

## Déploiement

Projet Vercel `lilou-ugc` : chaque push sur `main` déploie en production, chaque PR obtient une preview.

## TODO

- [ ] Acheter `ugcbylilou.com`, l'ajouter au projet Vercel. Tant que ce n'est pas fait, les URLs absolues (canonical, `og:image`, sitemap) pointent vers un domaine inexistant.
- [ ] Activer Web Analytics dans le dashboard Vercel.
- [ ] Vérifier l'aperçu de partage (Instagram / WhatsApp / iMessage) une fois le domaine en ligne.
