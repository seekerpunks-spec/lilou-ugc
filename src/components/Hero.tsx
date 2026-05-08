"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";
import { images } from "@/data/images";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const chips = t.raw("chips") as string[];
  const chipIcons = ["heart", "camera", "play"] as const;

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
      {/* Soft sun glow behind photo */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -right-20 top-10 h-[80vh] w-[80vh] rounded-full bg-[radial-gradient(circle_at_center,rgba(247,201,72,0.35),rgba(239,111,108,0.12)_45%,transparent_65%)] blur-3xl" />
      </div>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-10 px-5 sm:px-8 lg:grid-cols-12">
        {/* Left: text */}
        <div className="flex flex-col gap-7 lg:col-span-6">
          <motion.span
            {...fade(0.05)}
            aria-hidden
            className="text-3xl text-sun"
          >
            <Icon name="spark" className="h-7 w-7" />
          </motion.span>

          <motion.h1
            {...fade(0.1)}
            className="font-serif text-[clamp(2.6rem,6vw,4.6rem)] font-medium leading-[1.05] tracking-[-0.015em] text-espresso"
          >
            {t("title_a")}{" "}
            <em className="italic text-coral">{t("title_emph")}</em>
          </motion.h1>

          <motion.p
            {...fade(0.2)}
            className="max-w-md text-[0.95rem] leading-relaxed text-mocha sm:text-base"
          >
            {t("sub")}
          </motion.p>

          <motion.div
            {...fade(0.27)}
            className="flex items-center gap-2 text-sm text-espresso/80"
          >
            <span className="font-medium">Créatrice UGC</span>
            <span aria-hidden className="text-coral">
              <Icon name="pin" className="h-4 w-4" />
            </span>
            <span>Hyères, France</span>
          </motion.div>

          <motion.ul
            {...fade(0.3)}
            className="flex flex-wrap items-center gap-2.5"
          >
            {chips.map((c, i) => (
              <li
                key={c}
                className="inline-flex items-center gap-2 rounded-full border border-line bg-paper px-3.5 py-2 text-xs font-medium text-espresso shadow-soft"
              >
                <span aria-hidden className="text-coral">
                  <Icon
                    name={chipIcons[i] ?? "spark"}
                    className="h-3.5 w-3.5"
                  />
                </span>
                {c}
              </li>
            ))}
          </motion.ul>

          <motion.div
            {...fade(0.4)}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href="#work"
              className="inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-coral-deep"
            >
              {t("cta_primary")}
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2.5 rounded-full border border-line bg-paper px-7 py-3.5 text-sm font-medium text-espresso shadow-soft transition-all hover:-translate-y-0.5 hover:border-espresso/40"
            >
              {t("cta_secondary")}
            </a>
          </motion.div>
        </div>

        {/* Right: portrait that bleeds into background */}
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.97 }}
          animate={reduce ? undefined : { opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative lg:col-span-6"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[560px]">
            <Image
              src={images.hero.src}
              alt={images.hero.alt}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 560px"
              className="rounded-[var(--radius-card-lg)] object-cover"
            />
            {/* Cream bleed overlay (left edge fades into background) */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 rounded-[var(--radius-card-lg)]"
              style={{
                background:
                  "linear-gradient(90deg, rgba(255,244,230,0.55) 0%, rgba(255,244,230,0) 35%), linear-gradient(180deg, transparent 70%, rgba(255,244,230,0.4) 100%)",
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
