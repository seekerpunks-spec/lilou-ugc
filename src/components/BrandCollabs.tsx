"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { brandCollabs } from "@/data/portfolio";
import { PortfolioCard } from "./PortfolioCard";

export function BrandCollabs() {
  const t = useTranslations("brands");
  const reduce = useReducedMotion();

  return (
    <section
      id="brand-collabs"
      className="grain relative overflow-hidden bg-ink py-28 text-cream sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[60vh] w-[60vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,46,126,0.4),transparent_60%)] blur-3xl"
      />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <div className="flex flex-col items-start gap-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-2xl flex-col gap-6">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.36em] text-neon-soft"
            >
              <span aria-hidden className="inline-block h-px w-10 bg-neon-soft" />
              {t("kicker")}
            </motion.span>
            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-editorial text-[clamp(2.6rem,8vw,7rem)] leading-[0.92] tracking-[-0.02em] text-cream"
            >
              {t("title_a")}{" "}
              <em className="font-editorial italic text-neon-soft">
                {t("title_emph")}
              </em>
              {t("title_b")}
            </motion.h2>
            <p className="max-w-xl text-lg leading-relaxed text-cream/70">
              {t("lede")}
            </p>
          </div>
          <span className="hidden font-display text-xs uppercase tracking-[0.32em] text-cream/55 sm:block">
            ← swipe →
          </span>
        </div>
      </div>

      {/* Horizontal scroll rail */}
      <div className="relative mt-12">
        <div
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-8 sm:px-8 lg:pl-[max(2rem,calc((100vw-1280px)/2+2rem))]"
          style={{ scrollbarWidth: "thin" }}
        >
          {brandCollabs.map((item, i) => (
            <div
              key={item.id}
              className="snap-start shrink-0 w-[260px] sm:w-[300px]"
            >
              <PortfolioCard
                item={item}
                index={i}
                variant={item.type === "photo" ? "square" : "phone"}
              />
            </div>
          ))}
          <div className="shrink-0 w-px" aria-hidden />
        </div>
      </div>
    </section>
  );
}
