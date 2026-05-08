"use client";

import { useTranslations } from "next-intl";
import { LangSwitcher } from "./LangSwitcher";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="border-t border-ink/10 bg-sand py-10">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-8 px-5 sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <div className="flex flex-col gap-2">
          <span className="font-editorial text-3xl italic text-ink">
            Lilou Fronteau<span className="text-neon">.</span>
          </span>
          <span className="font-hand text-xl text-clay">{t("tagline")}</span>
        </div>

        <div className="flex flex-col items-start gap-4 sm:items-end">
          <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-ink/55">
            <span>{t("lang")}</span>
            <LangSwitcher />
          </div>
          <span className="font-display text-xs text-ink/45">
            {t("copyright")}
          </span>
        </div>
      </div>
    </footer>
  );
}
