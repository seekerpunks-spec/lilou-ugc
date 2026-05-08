"use client";

import { useTranslations } from "next-intl";
import { trustBrands } from "@/data/portfolio";

export function TrustBar() {
  const t = useTranslations("trustbar");
  const row = [...trustBrands, ...trustBrands];

  return (
    <section
      aria-label={t("title")}
      className="relative border-y border-ink/10 bg-ink py-6 text-cream"
    >
      <p className="absolute left-1/2 -top-3 -translate-x-1/2 rounded-full bg-neon px-4 py-1 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-cream shadow-[0_0_24px_rgba(255,46,126,0.45)]">
        {t("title")}
      </p>
      <div className="overflow-hidden">
        <div className="marquee-track">
          {row.map((b, i) => (
            <span
              key={`${b}-${i}`}
              className="flex items-center gap-12 font-editorial text-3xl italic tracking-tight text-cream/80"
            >
              {b}
              <span className="text-neon" aria-hidden>
                ✦
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
