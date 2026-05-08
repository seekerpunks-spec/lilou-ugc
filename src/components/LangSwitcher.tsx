"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

interface LangSwitcherProps {
  className?: string;
}

const FLAG_LABEL: Record<string, string> = {
  fr: "Français",
  en: "English",
};

export function LangSwitcher({ className }: LangSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-0.5 rounded-full border border-line bg-paper/80 p-1 backdrop-blur",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            className={cn(
              "flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300",
              active
                ? "ring-2 ring-coral ring-offset-1 ring-offset-paper"
                : "opacity-65 hover:opacity-100",
            )}
            aria-pressed={active}
            aria-label={FLAG_LABEL[l] ?? l}
            title={FLAG_LABEL[l] ?? l}
          >
            <Flag locale={l} />
          </button>
        );
      })}
    </div>
  );
}

interface FlagProps {
  locale: string;
}

function Flag({ locale }: FlagProps) {
  if (locale === "fr") return <FrenchFlag />;
  if (locale === "en") return <UnionJackFlag />;
  return null;
}

function FrenchFlag() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      aria-hidden
      className="overflow-hidden rounded-full"
    >
      <clipPath id="fr-clip">
        <circle cx="11" cy="11" r="11" />
      </clipPath>
      <g clipPath="url(#fr-clip)">
        <rect x="0" y="0" width="7.33" height="22" fill="#0055A4" />
        <rect x="7.33" y="0" width="7.34" height="22" fill="#FFFFFF" />
        <rect x="14.67" y="0" width="7.33" height="22" fill="#EF4135" />
      </g>
      <circle
        cx="11"
        cy="11"
        r="10.5"
        fill="none"
        stroke="rgba(43,29,24,0.12)"
      />
    </svg>
  );
}

function UnionJackFlag() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      aria-hidden
      className="overflow-hidden rounded-full"
    >
      <clipPath id="en-clip">
        <circle cx="11" cy="11" r="11" />
      </clipPath>
      <g clipPath="url(#en-clip)">
        <rect width="22" height="22" fill="#012169" />
        {/* White diagonals */}
        <path
          d="M0,0 L22,22 M22,0 L0,22"
          stroke="#FFFFFF"
          strokeWidth="3.5"
        />
        {/* Red diagonals (offset for the saltire effect) */}
        <path
          d="M0,0 L22,22"
          stroke="#C8102E"
          strokeWidth="1.6"
          transform="translate(0.6 -0.6)"
        />
        <path
          d="M22,0 L0,22"
          stroke="#C8102E"
          strokeWidth="1.6"
          transform="translate(-0.6 -0.6)"
        />
        {/* White cross */}
        <path
          d="M11,0 V22 M0,11 H22"
          stroke="#FFFFFF"
          strokeWidth="5.5"
        />
        {/* Red cross */}
        <path
          d="M11,0 V22 M0,11 H22"
          stroke="#C8102E"
          strokeWidth="3"
        />
      </g>
      <circle
        cx="11"
        cy="11"
        r="10.5"
        fill="none"
        stroke="rgba(43,29,24,0.12)"
      />
    </svg>
  );
}
