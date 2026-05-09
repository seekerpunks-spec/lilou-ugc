/**
 * Image and video references — sourced directly from Lilou's existing
 * Canva portfolio (downloaded into /public/photos/, /public/posters/,
 * /public/videos/). All assets are self-hosted; no external CDN.
 */

const photo = (file: string) => `/photos/${file}`;
const poster = (file: string) => `/posters/${file}`;
const video = (file: string) => `/videos/${file}`;

export const images = {
  hero: {
    src: photo("bcff55e1f95a31ce6b787c9a346559fa.jpg"),
    alt: "Lilou Fronteau on the beach at golden hour",
  },
  about: {
    src: photo("621fc4e9d82e794e2c8a8c026622a68e.jpg"),
    alt: "Lilou with a white rose, close-up portrait",
  },
  contact: {
    src: photo("a26092646381aef07934a571b2f36d9e.jpg"),
    alt: "Lilou by the Mediterranean sea at golden hour",
  },
} as const;

export interface ProjectMedia {
  poster: string;
  video: string;
  alt: string;
}

/**
 * Each project id maps to a poster (still frame) and the original
 * 720x1280 vertical Reels/TikTok video.
 */
export const projectMedia: Record<string, ProjectMedia> = {
  "moment-bijoux": {
    poster: poster("0d16ae55d4bc5e203e50a737c5b1f4bb.jpg"),
    video: video("8212381cc6064564458636576cd7c937.mp4"),
    alt: "Moment Bijoux — bijou permanent",
  },
  "melodie-hair": {
    poster: poster("d31d7a30c29693cdfae2919f88308631.jpg"),
    video: video("c59e486426718d6f8dc339d260d887f7.mp4"),
    alt: "Mélodie Hair Expert — transformation salon",
  },
  "le-recif": {
    poster: poster("0a4f07af9d5a59bcb2e231cf0d0d0672.jpg"),
    video: video("30bfd0c4f4924c5c6c0e97a0c720a6fb.mp4"),
    alt: "Le Récif — restaurant ambiance",
  },
  "beauty-studio": {
    poster: poster("dm-collab-1.jpg"),
    video: video("dm-collab-1.mp4"),
    alt: "Beauty Studio — séance maquillage",
  },
  "electro-symphony": {
    poster: poster("dm-collab-2.jpg"),
    video: video("dm-collab-2.mp4"),
    alt: "Electro Symphony — concert événement",
  },
  esn: {
    poster: poster("32432306587414aa3448e93508736a55.jpg"),
    video: video("7ed2f21c40e0f656809ed5925aa6d343.mp4"),
    alt: "ESN Nutrition — DAILY routine",
  },
  "belle-rive": {
    poster: poster("cc8ae55867ea152a3f075003c7fddbf4.jpg"),
    video: video("bf6ae281cc16926ddae95b830566fafb.mp4"),
    alt: "Belle Rive — try-on athleisure",
  },
  "boulangerie-cornu": {
    poster: poster("bda457c5726c6d9da8a965027a60870a.jpg"),
    video: video("6917d466faf49e8685aaa9cad3ae2af8.mp4"),
    alt: "Boulangerie Cornu — dégustation",
  },
  "kurl-coiffure": {
    poster: poster("48622ce414391c75457aa9f06cc02005.jpg"),
    video: video("e78cb79c96af0e0ade5ae4e91dd28dde.mp4"),
    alt: "Kurl Coiffure — coloration salon",
  },
  "dark-lash": {
    poster: poster("2d4f9603e1aac690c3a05665848b5c98.jpg"),
    video: video("f2bd83f49e410284358fda863f630ba6.mp4"),
    alt: "Dark Lash — close-up natural look",
  },
  "bowl-cake": {
    poster: poster("e0ce6d139665d866f11025701f14ad23.jpg"),
    video: video("b001c88b828209e2be6a0e5125cd2a5e.mp4"),
    alt: "Recette Bowl Cake — express whey",
  },
  "magic-world": {
    poster: poster("3c3718ef7173423e8bf4c144d0b437dc.jpg"),
    video: video("ade7c6fb11826a29d24fb8fb3de27502.mp4"),
    alt: "Magic World — parc d'attractions",
  },
  "atelier-couture": {
    poster: poster("0ea6361de2836b58715bfe3f3a97d345.jpg"),
    video: video("165214cf87996725a60d1e049729dfd4.mp4"),
    alt: "L'Atelier Couture — boutique locale",
  },
};

export type ProjectMediaKey = keyof typeof projectMedia;
