"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";

interface Niche {
  key: "beauty" | "wellness" | "food" | "fashion" | "travel" | "lifestyle";
  label: string;
}

export function About() {
  const t = useTranslations("about");
  const reduce = useReducedMotion();
  const niches = t.raw("niches") as Niche[];

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Card with content */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-10 rounded-[var(--radius-card-lg)] border border-line bg-bone p-8 shadow-soft sm:p-12 lg:grid-cols-12 lg:gap-12 lg:p-14"
        >
          {/* Left: copy */}
          <div className="flex flex-col gap-6 lg:col-span-6">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-coral">
              {t("kicker")}
            </span>
            <h2 className="font-serif text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.08] tracking-[-0.01em] text-espresso">
              {t("title")}
            </h2>
            <p className="max-w-md text-base leading-relaxed text-mocha sm:text-[1.05rem]">
              {t("p1")}
            </p>
            <p className="font-script text-3xl leading-tight text-coral">
              {t("handnote")}
            </p>
          </div>

          {/* Right: portrait */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-card)] shadow-soft">
              <div className="absolute inset-0 bg-[linear-gradient(170deg,#fbe3c4_0%,#e9b88c_45%,#a3674c_100%)]" />
              <div
                aria-hidden
                className="absolute inset-0"
                style={{
                  background:
                    "radial-gradient(circle at 35% 20%, rgba(255,250,235,0.55), transparent 55%)",
                }}
              />
              <span className="absolute bottom-5 left-6 font-script text-2xl text-espresso">
                me & a white rose
              </span>
            </div>
          </div>
        </motion.div>

        {/* Niches strip */}
        <div className="mt-16 flex flex-col items-center gap-8">
          <span className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-espresso/60">
            {t("niches_title")}
          </span>
          <ul className="grid w-full max-w-3xl grid-cols-3 gap-y-8 sm:grid-cols-6">
            {niches.map((n, i) => (
              <motion.li
                key={n.key}
                initial={reduce ? false : { opacity: 0, y: 14 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex flex-col items-center gap-3 text-espresso"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-paper text-coral shadow-soft">
                  <Icon name={n.key} className="h-6 w-6" />
                </span>
                <span className="text-xs font-medium text-espresso/75">
                  {n.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Footer strip */}
        <div className="mt-12 flex items-center justify-between gap-6 rounded-[var(--radius-card)] border border-line bg-olive/85 px-6 py-5 text-paper sm:px-8">
          <p className="text-sm leading-relaxed sm:text-base">
            {t("footer_strip")}
          </p>
          <span aria-hidden className="hidden text-2xl sm:inline">
            🌴
          </span>
        </div>
      </div>
    </section>
  );
}
