"use client";

import { useTranslations } from "next-intl";
import { LangSwitcher } from "./LangSwitcher";
import { Icon } from "./Icon";

export function Footer() {
  const t = useTranslations("footer");

  return (
    <footer className="relative bg-espresso py-7 text-cream">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <div className="flex flex-col leading-[0.85]">
          <span className="font-logo text-[2.6rem] tracking-tight text-cream">
            Lilou Fronteau
          </span>
          <span className="text-[0.6rem] uppercase tracking-[0.42em] text-cream/65">
            Créatrice UGC
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span aria-hidden className="text-sun">
            <Icon name="spark" className="h-5 w-5" />
          </span>
          <LangSwitcher className="border-cream/20 bg-cream/10 text-cream" />
        </div>
      </div>
      <p className="mx-auto mt-3 max-w-7xl px-5 text-[0.65rem] text-cream/45 sm:px-8">
        {t("rights")}
      </p>
    </footer>
  );
}
