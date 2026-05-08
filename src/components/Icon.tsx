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
  | "arrow";

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
  /* Services */
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
  /* Niches */
  beauty: (
    <g {...stroke}>
      <path d="M12 3.5c2.4 2.6 3.6 5 3.6 7a3.6 3.6 0 11-7.2 0c0-2 1.2-4.4 3.6-7z" />
      <path d="M7.5 17.5h9" />
      <path d="M9 20.5h6" />
    </g>
  ),
  wellness: (
    <g {...stroke}>
      <path d="M12 21c0-4 2-7 6-9-1 4-3 7-6 9z" />
      <path d="M12 21c0-4-2-7-6-9 1 4 3 7 6 9z" />
      <path d="M12 21V11" />
    </g>
  ),
  food: (
    <g {...stroke}>
      <path d="M5 4v7a3 3 0 003 3v6.5" />
      <path d="M8 4v7" />
      <path d="M11 4v7" />
      <path d="M16.5 4c-1.4 0-2.5 1.6-2.5 3.5 0 2 1.1 3.5 2.5 3.5h.5v9.5" />
    </g>
  ),
  fashion: (
    <g {...stroke}>
      <path d="M9 4l3 2 3-2" />
      <path d="M9 4L4 8l3 2v10h10V10l3-2-5-4" />
    </g>
  ),
  travel: (
    <g {...stroke}>
      <path d="M3 14l8-2 4 4 2-1-3-7 2-1 4 5 3-1-1 3-3 1-5 4-1-2-3 1-2 3-1-2 2-3-2-1z" />
    </g>
  ),
  lifestyle: (
    <g {...stroke}>
      <circle cx="12" cy="12" r="3.5" />
      <path d="M12 2.5v3M12 18.5v3M2.5 12h3M18.5 12h3M5.2 5.2l2.1 2.1M16.7 16.7l2.1 2.1M5.2 18.8l2.1-2.1M16.7 7.3l2.1-2.1" />
    </g>
  ),
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
};
