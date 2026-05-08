"use client";

import { useTranslations } from "next-intl";
import { localHeroes } from "@/data/portfolio";
import { PortfolioCard } from "./PortfolioCard";
import { SectionTitle } from "./SectionTitle";

export function LocalHeroes() {
  const t = useTranslations("local");

  return (
    <section
      id="work"
      className="grain relative overflow-hidden bg-sand-2 py-28 sm:py-36"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <SectionTitle
          kicker={t("kicker")}
          titleStart={t("title_a")}
          titleEmph={t("title_emph")}
          titleEnd={t("title_b")}
          lede={t("lede")}
        />

        <div className="grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {localHeroes.map((item, i) => (
            <PortfolioCard
              key={item.id}
              item={item}
              index={i}
              variant={i % 4 === 0 ? "wide" : "tall"}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
