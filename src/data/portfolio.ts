export interface PortfolioItem {
  id: string;
  brand: string;
  category: string;
  type: "video" | "photo";
  thumbnail?: string;
  videoUrl?: string;
  caption?: { fr: string; en: string };
}

export const localHeroes: PortfolioItem[] = [
  {
    id: "le-recif",
    brand: "Le Récif",
    category: "Restaurant · Hyères",
    type: "video",
    caption: {
      fr: "Capture de l'ambiance estivale du restaurant en bord de plage",
      en: "Summer beach-restaurant atmosphere capture",
    },
  },
  {
    id: "boulangerie-cornu",
    brand: "Boulangerie Cornu",
    category: "Artisan · Carqueiranne",
    type: "video",
    caption: {
      fr: "Dégustation famille — pains et viennoiseries en prise de vue authentique",
      en: "Family tasting — bread and pastries in authentic shot",
    },
  },
  {
    id: "belle-rive",
    brand: "Belle Rive",
    category: "Mode · Hyères",
    type: "video",
    caption: {
      fr: "Lookbook été en lumière naturelle méditerranéenne",
      en: "Summer lookbook in natural Mediterranean light",
    },
  },
  {
    id: "cinema-pathe",
    brand: "Cinéma Pathé",
    category: "Loisir · Toulon",
    type: "video",
    caption: {
      fr: "Soirée cinéma avec ma maman — duo authentique et engageant",
      en: "Movie night with my mum — authentic engaging duo",
    },
  },
  {
    id: "atelier-couture",
    brand: "L'Atelier Couture",
    category: "Artisan · Carqueiranne",
    type: "video",
    caption: {
      fr: "Mise en valeur d'un commerce de proximité historique",
      en: "Spotlight on a long-standing local craft business",
    },
  },
  {
    id: "melodie-hair",
    brand: "Mélodie Hair Expert",
    category: "Coiffure · Hyères",
    type: "video",
    caption: {
      fr: "Transformation roux — avant/après en plan serré",
      en: "Red-hair transformation — close-up before/after",
    },
  },
  {
    id: "kurl-coiffure",
    brand: "Kurl Coiffure",
    category: "Coiffure · Var",
    type: "video",
    caption: {
      fr: "Routine coloration en immersion salon",
      en: "Hair-color routine in salon immersion",
    },
  },
  {
    id: "magic-world",
    brand: "Magic World",
    category: "Loisir · PACA",
    type: "video",
    caption: {
      fr: "Capture sensorielle d'un parc d'attractions de nuit",
      en: "Sensory capture of a night-time amusement park",
    },
  },
];

export const brandCollabs: PortfolioItem[] = [
  {
    id: "esn",
    brand: "ESN Nutrition",
    category: "Sports Nutrition · DE",
    type: "video",
    caption: {
      fr: "Routine sportive — démo produit DAILY en lumière studio maison",
      en: "Sports routine — DAILY product demo in home-studio light",
    },
  },
  {
    id: "dark-lash",
    brand: "Dark Lash",
    category: "Beauté · DTC",
    type: "video",
    caption: {
      fr: "Témoignage scroll-stop pour campagne paid social",
      en: "Scroll-stopping testimonial for paid social campaign",
    },
  },
  {
    id: "moment-bijoux",
    brand: "Moment Bijoux",
    category: "Joaillerie",
    type: "video",
    caption: {
      fr: "Bijou permanent — storytelling expérience cliente",
      en: "Permanent jewelry — client experience storytelling",
    },
  },
  {
    id: "scorpione",
    brand: "Scorpione Jewelry",
    category: "Joaillerie · DTC",
    type: "photo",
    caption: {
      fr: "Série éditoriale lumière naturelle — pièces statement",
      en: "Editorial series in natural light — statement pieces",
    },
  },
  {
    id: "azurial",
    brand: "Azurial Clothing",
    category: "Mode · DTC",
    type: "photo",
    caption: {
      fr: "Lookbook capsule été",
      en: "Summer capsule lookbook",
    },
  },
  {
    id: "almanarre",
    brand: "Almanarre WW",
    category: "Lifestyle",
    type: "photo",
    caption: {
      fr: "Série hivernale — ambiance plage Almanarre",
      en: "Winter series — Almanarre beach mood",
    },
  },
];

export const trustBrands: string[] = [
  "Le Récif",
  "ESN Nutrition",
  "Boulangerie Cornu",
  "Belle Rive",
  "Cinéma Pathé",
  "Mélodie Hair Expert",
  "Kurl Coiffure",
  "Dark Lash",
  "Moment Bijoux",
  "Scorpione Jewelry",
  "Azurial Clothing",
  "Almanarre WW",
  "L'Atelier Couture",
  "Magic World",
];
