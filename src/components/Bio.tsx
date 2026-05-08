"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export function Bio() {
  const t = useTranslations("bio");

  return (
    <section
      id="about"
      className="grain relative overflow-hidden bg-cream py-28 sm:py-36"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-16 px-5 sm:px-8 lg:grid-cols-12">
        {/* Photo collage */}
        <div className="relative lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, y: 32, rotate: -3 }}
            whileInView={{ opacity: 1, y: 0, rotate: -3 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="polaroid relative ml-auto aspect-[3/4] w-[78%] rotate-[-3deg]"
          >
            <div className="h-full w-full overflow-hidden rounded-sm bg-[linear-gradient(135deg,#f5b941_0%,#ff6b5b_55%,#ff2e7e_100%)]">
              <div className="flex h-full w-full items-end p-6">
                <span className="font-hand text-3xl text-cream/90">
                  Lilou, 23
                </span>
              </div>
            </div>
            <span className="absolute -bottom-3 right-4 font-hand text-xl text-ink/70">
              Hyères, été dernier
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28, rotate: 4 }}
            whileInView={{ opacity: 1, y: 0, rotate: 4 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.9,
              delay: 0.15,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="polaroid absolute -bottom-6 left-0 aspect-square w-[44%] rotate-[4deg]"
          >
            <div className="h-full w-full rounded-sm bg-[radial-gradient(circle_at_30%_20%,#ff77a8,#ff2e7e_60%,#1a1410_100%)]" />
          </motion.div>
        </div>

        {/* Copy */}
        <div className="flex flex-col gap-10 lg:col-span-7 lg:pl-10">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] tracking-[-0.01em] text-ink"
          >
            {t("tagline")}
            <span className="font-hand text-neon"> ✦</span>
          </motion.h2>

          <div className="space-y-6 text-lg leading-relaxed text-ink/80 sm:text-xl">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.7,
                delay: 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t("p1")}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {t("p2")}
            </motion.p>
          </div>

          <p className="font-hand text-2xl text-clay">{t("handnote")}</p>

          <div className="grid grid-cols-3 gap-4 border-t border-ink/10 pt-8">
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
      <span className="font-editorial text-3xl italic text-ink sm:text-4xl">
        {value}
      </span>
      <span className="font-display text-xs uppercase tracking-[0.24em] text-ink/55">
        {label}
      </span>
    </div>
  );
}
