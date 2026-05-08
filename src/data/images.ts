/**
 * Image references — sourced directly from Lilou's existing Canva
 * portfolio (downloaded into /public/photos/). Swap freely; the keys
 * are stable and consumed by Hero, About, Contact and Projects.
 */

const p = (file: string) => `/photos/${file}`;

export const images = {
  hero: {
    src: p("bcff55e1f95a31ce6b787c9a346559fa.jpg"),
    alt: "Lilou Fronteau on the beach at golden hour in a flowing dress",
  },
  about: {
    src: p("621fc4e9d82e794e2c8a8c026622a68e.jpg"),
    alt: "Lilou with a white rose, close-up portrait",
  },
  contact: {
    src: p("a26092646381aef07934a571b2f36d9e.jpg"),
    alt: "Lilou by the Mediterranean sea at golden hour",
  },
  projects: {
    "moment-bijoux": {
      src: p("cfa840531c7d8e9f073c670fd1e769d7.jpg"),
      alt: "Pearl jewelry close-up",
    },
    "melodie-hair": {
      src: p("5684d12c93f5e5f472e8bd441c06cbdd.jpg"),
      alt: "Editorial portrait — natural beauty",
    },
    "le-recif": {
      src: p("51a4449b5f3f11b85c4a7cf64ac53b54.jpg"),
      alt: "Mediterranean shade — parasol portrait",
    },
    esn: {
      src: p("7cc57223b79829afac4c1167e5b45357.jpg"),
      alt: "Wellness lifestyle in white",
    },
    azurial: {
      src: p("aa4d8b8b56de91698505de6874ca87de.jpg"),
      alt: "Azurial Clothing — daisy tee duo",
    },
    "azuria-skincare": {
      src: p("283e4d94e4504674bb465d89141872cd.jpg"),
      alt: "Beauty editorial — close-up with white rose",
    },
  },
} as const;

export type ProjectImageKey = keyof typeof images.projects;
