"use client";

import { useTranslations } from "next-intl";
import { LangSwitcher } from "./LangSwitcher";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative bg-espresso py-10 text-cream">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col">
          <span className="font-script text-3xl text-cream">Lilou Fronteau</span>
          <span className="text-[0.65rem] uppercase tracking-[0.32em] text-cream/65">
            {t("tagline")}
          </span>
        </div>

        <div className="flex flex-col items-start gap-3 sm:items-end">
          <div className="flex items-center gap-3 text-[0.65rem] uppercase tracking-[0.28em] text-cream/65">
            <span>{t("lang")}</span>
            <LangSwitcher className="border-cream/20 bg-cream/10 text-cream" />
          </div>
          <span className="text-[0.7rem] text-cream/55">{t("rights")}</span>
        </div>
      </div>
    </footer>
  );
}
