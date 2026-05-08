"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { LangSwitcher } from "./LangSwitcher";
import { cn } from "@/lib/cn";

const links = [
  { href: "#work", key: "work" },
  { href: "#process", key: "process" },
  { href: "#services", key: "services" },
  { href: "#contact", key: "contact" },
] as const;

export function Nav() {
  const t = useTranslations("nav");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 flex items-center justify-between gap-6 px-5 py-4 transition-all duration-500 sm:px-8",
        scrolled
          ? "backdrop-blur-md bg-sand/70 border-b border-ink/5"
          : "bg-transparent",
      )}
    >
      <a
        href="#top"
        className="font-editorial text-2xl tracking-tight italic text-ink"
      >
        Lilou<span className="text-neon">.</span>
      </a>

      <nav className="hidden items-center gap-7 text-sm md:flex">
        {links.map((l) => (
          <a
            key={l.href}
            href={l.href}
            className="text-ink/70 transition-colors hover:text-ink"
          >
            {t(l.key)}
          </a>
        ))}
      </nav>

      <div className="flex items-center gap-3">
        <LangSwitcher />
        <a
          href="#contact"
          className="hidden items-center gap-2 rounded-full bg-ink px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-cream transition hover:bg-neon sm:inline-flex"
        >
          {t("bookCall")}
          <span aria-hidden>→</span>
        </a>
      </div>
    </header>
  );
}
