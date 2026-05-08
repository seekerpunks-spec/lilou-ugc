import type { SVGProps } from "react";

type IconKey =
  | "camera"
  | "play"
  | "mic"
  | "box"
  | "image"
  | "pin"
  | "beauty"
  | "wellness"
  | "food"
  | "fashion"
  | "travel"
  | "lifestyle"
  | "instagram"
  | "mail"
  | "spark"
  | "arrow"
  | "heart"
  | "palm";

interface IconProps extends SVGProps<SVGSVGElement> {
  name: IconKey;
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function Icon({ name, ...rest }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden {...rest}>
      {paths[name]}
    </svg>
  );
}

const paths: Record<IconKey, React.ReactNode> = {
  /* ---------- Services (line-art) ---------- */
  camera: (
    <g {...stroke}>
      <rect x="3" y="6.5" width="18" height="12.5" rx="2.5" />
      <path d="M8 6.5l1.6-2.5h4.8L16 6.5" />
      <circle cx="12" cy="13" r="3.4" />
      <circle cx="17.4" cy="9.6" r="0.6" fill="currentColor" stroke="none" />
    </g>
  ),
  play: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="9" />
      <path d="M10 8.5v7l6-3.5z" />
    </g>
  ),
  mic: (
    <g {...stroke}>
      <rect x="9.5" y="3" width="5" height="11" rx="2.5" />
      <path d="M5.5 11.5a6.5 6.5 0 0013 0" />
      <path d="M12 18v3M9 21h6" />
    </g>
  ),
  box: (
    <g {...stroke}>
      <path d="M3.5 7.5L12 3.5l8.5 4-8.5 4-8.5-4z" />
      <path d="M3.5 7.5v9L12 20.5m8.5-13v9L12 20.5M12 11.5v9" />
    </g>
  ),
  image: (
    <g {...stroke}>
      <rect x="3" y="4.5" width="18" height="15" rx="2.5" />
      <circle cx="8.5" cy="10" r="1.5" />
      <path d="M3.5 17l4.5-4 4 3.5 3.5-3 4.5 4" />
    </g>
  ),
  pin: (
    <g {...stroke}>
      <path d="M12 21s-7-6.4-7-11.5a7 7 0 0114 0C19 14.6 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.6" />
    </g>
  ),

  /* ---------- Niches (specific to mockup) ---------- */
  /* Beauté = small stylised flower */
  beauty: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="2" />
      <path d="M12 10c0-2.4-1-4.5-2.5-4.5S7 7.6 7 10s2 4 5 4 5-1.6 5-4-1-4.5-2.5-4.5S12 7.6 12 10z" />
      <path d="M12 14c0 2.4-1 4.5-2.5 4.5S7 16.4 7 14s2-4 5-4 5 1.6 5 4-1 4.5-2.5 4.5S12 16.4 12 14z" />
    </g>
  ),
  /* Bien-être = leaf */
  wellness: (
    <g {...stroke}>
      <path d="M5 19c2-9 7-13 14-13 0 8-4 13-13 14a8 8 0 01-1-1z" />
      <path d="M6 18c4-3 7-6 9-9" />
    </g>
  ),
  /* Food = fork */
  food: (
    <g {...stroke}>
      <path d="M8 3v6a2 2 0 002 2v10" />
      <path d="M10 3v6" />
      <path d="M12 3v6" />
      <path d="M14 3v6a2 2 0 01-2 2" />
    </g>
  ),
  /* Mode = hanger */
  fashion: (
    <g {...stroke}>
      <circle cx="12" cy="6" r="1.6" />
      <path d="M12 7.5v2c0 1 1 1.5 2 2l5.5 3.5a1.5 1.5 0 01.5 2v0a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17v0a1.5 1.5 0 01.5-2l5.5-3.5c1-.5 2-1 2-2z" />
    </g>
  ),
  /* Travel = paper plane */
  travel: (
    <g {...stroke}>
      <path d="M3.5 12L20.5 4l-3 16-5-7-5-1z" />
      <path d="M12.5 13l3-4" />
    </g>
  ),
  /* Lifestyle = sun */
  lifestyle: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M5.2 18.8l2.1-2.1M16.7 7.3l2.1-2.1" />
    </g>
  ),

  /* ---------- Misc ---------- */
  instagram: (
    <g {...stroke}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="4.5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17" cy="7" r="0.7" fill="currentColor" stroke="none" />
    </g>
  ),
  mail: (
    <g {...stroke}>
      <rect x="3" y="5.5" width="18" height="13" rx="2.5" />
      <path d="M3.5 7l8.5 6 8.5-6" />
    </g>
  ),
  spark: (
    <g {...stroke}>
      <path d="M12 3.5v17M3.5 12h17M6.5 6.5l11 11M17.5 6.5l-11 11" />
    </g>
  ),
  arrow: (
    <g {...stroke}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </g>
  ),
  heart: (
    <g {...stroke}>
      <path d="M12 19s-7-4.3-7-9.5a4 4 0 017-2.6 4 4 0 017 2.6c0 5.2-7 9.5-7 9.5z" />
    </g>
  ),
  /* Palm tree silhouette */
  palm: (
    <g {...stroke}>
      <path d="M12 21V10" />
      <path d="M12 10c-1-3-4-5-7-4.5C6 8 9 9.5 12 10z" />
      <path d="M12 10c1-3 4-5 7-4.5C18 8 15 9.5 12 10z" />
      <path d="M12 10c-3-1.5-5-4.5-4.5-7C10 4 11.5 7 12 10z" />
      <path d="M12 10c3-1.5 5-4.5 4.5-7C14 4 12.5 7 12 10z" />
    </g>
  ),
};
