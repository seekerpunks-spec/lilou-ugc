"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

export function Bio() {
  const t = useTranslations("bio");
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="grain relative overflow-hidden bg-cream py-32 sm:py-44"
    >
      {/* Page numbers (magazine ref) */}
      <span className="absolute left-6 top-8 font-display text-[0.65rem] uppercase tracking-[0.36em] text-ink/40 sm:left-10">
        N° 02 — Hi
      </span>
      <span className="absolute right-6 top-8 font-display text-[0.65rem] uppercase tracking-[0.36em] text-ink/40 sm:right-10">
        Côte d'Azur · 2026
      </span>

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12 lg:gap-12">
        {/* Editorial title spans full width */}
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 32 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="font-editorial text-[clamp(3.2rem,11vw,11rem)] leading-[0.9] tracking-[-0.025em] text-ink lg:col-span-12"
        >
          <span className="block">Hello, moi</span>
          <span className="block italic">
            c'est <span className="glow-neon">Lilou.</span>
            <span className="ml-3 inline-block align-middle font-hand text-4xl text-clay rotate-[-6deg]">
              ✦
            </span>
          </span>
        </motion.h2>

        {/* Left: photo mock + handwritten note */}
        <div className="relative lg:col-span-5 lg:col-start-1">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 28 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.9,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative ml-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[var(--radius-card)] shadow-[0_24px_60px_-30px_rgba(26,20,16,0.45)]"
          >
            <div className="absolute inset-0 bg-[linear-gradient(165deg,#f4a261_0%,#e76f51_40%,#c63270_75%,#1a1410_100%)]" />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 20%, rgba(255,255,255,0.45), transparent 55%)",
              }}
              aria-hidden
            />
            <div className="absolute inset-0 flex flex-col justify-between p-7 text-cream">
              <div className="flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.24em] text-cream/85">
                <span>Hyères, été 2025</span>
                <span aria-hidden>↗</span>
              </div>
              <div>
                <span className="block font-editorial text-5xl italic leading-[0.95] text-cream">
                  23 ans.
                </span>
                <p className="mt-3 max-w-[18ch] text-sm leading-snug text-cream/80">
                  Une vie en bord de Méditerranée, une caméra dans la poche.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Handwritten arrow + note */}
          <span className="absolute -right-2 -top-6 hidden font-hand text-3xl text-clay sm:block">
            ↘ that's me
          </span>
        </div>

        {/* Right: editorial copy */}
        <div className="flex flex-col gap-10 lg:col-span-6 lg:col-start-7">
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="font-editorial text-2xl italic leading-relaxed text-ink/85 sm:text-[1.7rem]"
          >
            <span className="font-editorial text-6xl italic text-neon align-[-0.1em] mr-1">
              "
            </span>
            {t("p1")}
          </motion.div>

          <motion.p
            initial={reduce ? false : { opacity: 0, y: 18 }}
            whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, delay: 0.25 }}
            className="text-lg leading-relaxed text-ink/70"
          >
            {t("p2")}
          </motion.p>

          <p className="font-hand text-3xl text-clay">{t("handnote")}</p>

          <div className="grid grid-cols-3 gap-4 border-t border-ink/15 pt-8">
            <Stat value={t("stat1_v")} label={t("stat1_l")} />
            <Stat value={t("stat2_v")} label={t("stat2_l")} />
            <Stat value={t("stat3_v")} label={t("stat3_l")} />
          </div>
        </div>
      </div>
    </section>
  );
}

interface StatProps {
  value: string;
  label: string;
}

function Stat({ value, label }: StatProps) {
  return (
    <div className="flex flex-col gap-1">
      <span className="font-editorial text-3xl italic leading-none text-ink sm:text-4xl">
        {value}
      </span>
      <span className="font-display text-[0.65rem] uppercase tracking-[0.28em] text-ink/55">
        {label}
      </span>
    </div>
  );
}
