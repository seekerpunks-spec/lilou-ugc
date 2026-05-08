"use client";

import { useTranslations } from "next-intl";
import { brandCollabs } from "@/data/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import { SectionTitle } from "./SectionTitle";

export function BrandCollabs() {
  const t = useTranslations("brands");

  return (
    <section
      id="brand-collabs"
      className="grain relative overflow-hidden bg-ink py-28 text-cream sm:py-36"
    >
      {/* Soft glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,46,126,0.4),transparent_60%)] blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <SectionTitle
          tone="dark"
          kicker={t("kicker")}
          titleStart={t("title_a")}
          titleEmph={t("title_emph")}
          titleEnd={t("title_b")}
          lede={t("lede")}
        />

        <div className="grid grid-cols-2 gap-x-6 gap-y-12 sm:grid-cols-3 lg:grid-cols-3">
          {brandCollabs.map((item, i) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={i}
              variant={item.type === "photo" ? "square" : "tall"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
