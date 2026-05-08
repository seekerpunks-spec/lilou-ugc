"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const chips = t.raw("chips") as string[];
  const chipIcons = ["spark", "camera", "play"] as const;

  const fade = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 18 },
    animate: reduce ? undefined : { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
  });

  return (
    <section
      id="top"
      className="relative isolate overflow-hidden bg-cream pb-20 pt-32 sm:pb-28 sm:pt-36"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-10">
        {/* Left: text */}
        <div className="flex flex-col gap-8 lg:col-span-6">
          <motion.div
            {...fade(0.05)}
            className="flex w-fit items-center gap-2.5 rounded-full border border-line bg-paper/70 px-4 py-2 text-xs font-medium text-espresso shadow-soft"
          >
            <span aria-hidden className="text-sun">
              <Icon name="spark" className="h-3.5 w-3.5" />
            </span>
            <span>{t("badge")}</span>
          </motion.div>

          <motion.h1
            {...fade(0.1)}
            className="font-serif text-[clamp(2.6rem,6.4vw,5rem)] font-medium leading-[1.05] tracking-[-0.015em] text-espresso"
          >
            {t("title_a")}{" "}
            <em className="italic text-coral">{t("title_emph")}</em>
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="max-w-xl text-base leading-relaxed text-mocha sm:text-lg"
          >
            {t("sub")}
          </motion.p>

          <motion.ul
            {...fade(0.3)}
            className="flex flex-wrap items-center gap-2"
          >
            {chips.map((c, i) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-xs font-medium text-espresso shadow-soft"
              >
                <span aria-hidden className="text-coral">
                  <Icon name={chipIcons[i] ?? "spark"} className="h-3.5 w-3.5" />
                </span>
                {c}
              </li>
            ))}
          </motion.ul>

          <motion.div {...fade(0.4)} className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 rounded-full bg-coral px-6 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-coral-deep"
            >
              {t("cta_primary")}
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-6 py-3.5 text-sm font-medium text-espresso shadow-soft transition-all hover:-translate-y-0.5 hover:border-espresso/40"
            >
              {t("cta_secondary")}
            </a>
          </motion.div>
        </div>

        {/* Right: portrait */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[520px] overflow-hidden rounded-[var(--radius-card-lg)] shadow-soft-lg">
            {/* Painterly portrait stand-in (replaceable with <Image>) */}
            <div className="absolute inset-0 bg-[linear-gradient(165deg,#f5d6b0_0%,#efb380_30%,#d97c5f_55%,#8c4a3a_85%,#3a2520_100%)]" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 60% 25%, rgba(255,239,200,0.55), transparent 55%), radial-gradient(circle at 25% 80%, rgba(255,180,140,0.4), transparent 55%)",
              }}
            />
            {/* Cream overlay for text legibility */}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-[linear-gradient(180deg,transparent,rgba(255,244,230,0.85))]" />
            {/* Caption */}
            <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-7 py-6 text-espresso">
              <span className="font-script text-2xl text-espresso">
                Hyères, golden hour
              </span>
              <span className="rounded-full border border-espresso/15 bg-paper/85 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-espresso/75 backdrop-blur">
                ©2026
              </span>
            </div>
          </div>

          {/* Sun sticker */}
          <span
            aria-hidden
            className="absolute -left-3 top-6 hidden h-14 w-14 items-center justify-center rounded-full bg-sun text-espresso shadow-soft sm:flex"
          >
            <Icon name="spark" className="h-6 w-6" />
          </span>
          <span
            aria-hidden
            className="absolute -bottom-4 right-6 font-script text-3xl text-coral"
          >
            ✦ play me ↑
          </span>
        </motion.div>
      </div>
    </section>
  );
}
