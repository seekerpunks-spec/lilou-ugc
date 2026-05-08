"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";
import { images } from "@/data/images";

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
      className="relative overflow-hidden bg-cream py-20 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        {/* Card with content */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 items-center gap-10 rounded-[var(--radius-card-lg)] border border-line bg-bone p-7 shadow-soft sm:p-10 lg:grid-cols-12 lg:gap-10 lg:p-12"
        >
          {/* Left: copy */}
          <div className="flex flex-col gap-5 lg:col-span-6">
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.08] tracking-[-0.005em] text-espresso">
              {t("title")}
            </h2>
            <p className="max-w-md text-[0.95rem] leading-relaxed text-mocha sm:text-base">
              {t("p1")}
            </p>
            <p className="font-script text-3xl leading-tight text-coral sm:text-4xl">
              {t("handnote")}
            </p>
          </div>

          {/* Right: portrait */}
          <div className="relative lg:col-span-6">
            <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-card)] shadow-soft">
              <Image
                src={images.about.src}
                alt={images.about.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 480px"
                className="object-cover"
              />
            </div>
          </div>
        </motion.div>

        {/* Niches strip */}
        <div className="mt-14 flex flex-col items-center gap-7">
          <span className="text-[0.7rem] font-medium tracking-wide text-espresso/65 sm:text-sm">
            {t("niches_title")}
          </span>
          <ul className="grid w-full max-w-3xl grid-cols-3 gap-y-7 sm:grid-cols-6">
            {niches.map((n, i) => (
              <motion.li
                key={n.key}
                initial={reduce ? false : { opacity: 0, y: 12 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-15%" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="flex flex-col items-center gap-2.5 text-espresso"
              >
                <span className="text-coral">
                  <Icon name={n.key} className="h-9 w-9" />
                </span>
                <span className="text-xs font-medium text-espresso/75">
                  {n.label}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Footer strip with palm tree */}
        <div className="mt-12 relative flex items-center justify-between gap-6 overflow-hidden rounded-[var(--radius-card)] bg-olive/85 px-6 py-5 text-paper sm:px-8">
          <p className="relative z-10 text-sm leading-relaxed sm:text-base">
            {t("footer_strip")}
          </p>
          <span aria-hidden className="relative z-10 text-paper/85">
            <Icon name="palm" className="h-9 w-9" />
          </span>
          {/* Subtle decorative palms */}
          <span
            aria-hidden
            className="pointer-events-none absolute -right-4 -bottom-3 text-paper/15"
          >
            <Icon name="palm" className="h-32 w-32" />
          </span>
        </div>
      </div>
    </section>
  );
}
