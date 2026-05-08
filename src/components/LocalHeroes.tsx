"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { localHeroes } from "@/data/portfolio";
import { PortfolioCard } from "./PortfolioCard";

export function LocalHeroes() {
  const t = useTranslations("local");
  const reduce = useReducedMotion();

  return (
    <section
      id="work"
      className="grain relative overflow-hidden bg-sand-2 py-28 sm:py-36"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        {/* Sticky title column */}
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32 flex flex-col gap-6">
            <motion.span
              initial={reduce ? false : { opacity: 0, y: 12 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.5 }}
              className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.36em] text-neon"
            >
              <span aria-hidden className="inline-block h-px w-10 bg-neon" />
              {t("kicker")}
            </motion.span>

            <motion.h2
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="font-editorial text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] text-ink"
            >
              {t("title_a")}{" "}
              <em className="font-editorial italic text-neon">
                {t("title_emph")}
              </em>
              {t("title_b")}
            </motion.h2>

            <motion.p
              initial={reduce ? false : { opacity: 0, y: 16 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="max-w-md text-lg leading-relaxed text-ink/70"
            >
              {t("lede")}
            </motion.p>

            <span className="mt-2 font-hand text-2xl text-clay">
              {localHeroes.length} commerces · 1 île ·{" "}
              <span className="text-neon">∞</span> souvenirs
            </span>
          </div>
        </div>

        {/* Cards column */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-16 sm:grid-cols-2 lg:col-span-7 lg:gap-y-20">
          {localHeroes.map((item, i) => (
            <div
              key={item.id}
              className={i % 2 === 1 ? "sm:translate-y-12" : undefined}
            >
              <PortfolioCard item={item} index={i} variant="phone" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
