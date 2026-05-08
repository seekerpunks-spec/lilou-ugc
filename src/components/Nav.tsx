"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LangSwitcher } from "./LangSwitcher";
import { Monogram } from "./Monogram";
import { cn } from "@/lib/cn";

const links = [
  { href: "#about", key: "about" },
  { href: "#work", key: "work" },
  { href: "#services", key: "services" },
  { href: "#contact", key: "contact" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-cream/85 backdrop-blur-md border-b border-line/50"
          : "bg-transparent",
      )}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-6 px-5 py-4 sm:px-8 sm:py-5">
        <a
          href="#top"
          className="flex items-center gap-3 text-espresso"
          aria-label="Lilou Fronteau"
        >
          <Monogram size={42} />
          <span className="hidden flex-col leading-[0.85] sm:flex">
            <span className="font-logo text-[1.9rem] tracking-tight text-espresso">
              Lilou
            </span>
            <span className="font-sans text-[0.55rem] uppercase tracking-[0.42em] text-espresso/70">
              Fronteau
            </span>
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-espresso/75 transition-colors hover:text-espresso"
            >
              {t(l.key)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <LangSwitcher />
          <a
            href="#contact"
            className="hidden items-center gap-2 rounded-full bg-coral px-5 py-2.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-coral-deep sm:inline-flex"
          >
            {t("cta")}
          </a>
        </div>
      </div>
    </header>
  );
}
