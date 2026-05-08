"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section
      id="top"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-sand pb-16 pt-32 sm:pb-24"
    >
      {/* Sun gradient backdrop */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-1/3 right-[-15%] h-[120vh] w-[120vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(255,107,91,0.55),rgba(255,46,126,0.25)_38%,transparent_62%)] blur-2xl" />
        <div className="absolute bottom-[-30%] left-[-10%] h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(245,185,65,0.55),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(0,0,0,0)_0%,rgba(244,237,224,0.6)_55%,rgba(244,237,224,1)_85%)]" />
      </div>

      {/* Vertical kicker on the right */}
      <span
        className="absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 text-[0.7rem] font-medium uppercase tracking-[0.5em] text-ink/50 lg:block"
        aria-hidden
      >
        Hyères × French Riviera × MMXXVI
      </span>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-10 px-5 sm:px-8">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-xs uppercase tracking-[0.36em] text-ink/60"
        >
          {t("kicker")}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="font-editorial text-[clamp(3rem,11vw,11rem)] leading-[0.92] tracking-[-0.02em] text-ink"
        >
          {t("headline_a")}{" "}
          <em className="glow-neon font-editorial italic">
            {t("headline_emph")}
          </em>{" "}
          <span className="block text-ink/85">{t("headline_b")}</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <p className="max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
            {t("sub")}
          </p>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-neon"
            >
              {t("cta_primary")}
              <span className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-3 rounded-full border border-ink/20 bg-transparent px-6 py-3 text-sm font-medium text-ink transition hover:border-ink hover:bg-ink hover:text-cream"
            >
              {t("cta_secondary")}
            </a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="mx-auto mt-16 flex w-full max-w-7xl items-center justify-between px-5 sm:px-8">
        <span className="font-display text-xs uppercase tracking-[0.36em] text-ink/40">
          ↓ {t("scroll")}
        </span>
        <span className="font-hand text-2xl text-neon">©2026</span>
      </div>
    </section>
  );
}
