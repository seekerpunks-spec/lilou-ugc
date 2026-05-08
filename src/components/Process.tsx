"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

interface Step {
  n: string;
  t: string;
  d: string;
}

export function Process() {
  const t = useTranslations("process");
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="process"
      className="grain relative overflow-hidden bg-cream py-28 sm:py-36"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex max-w-2xl flex-col gap-6">
            <span className="font-display text-xs uppercase tracking-[0.36em] text-neon">
              ✦ {t("kicker")}
            </span>
            <h2 className="font-editorial text-[clamp(2.4rem,6vw,5rem)] leading-[0.98] tracking-[-0.015em] text-ink">
              {t("title")}
            </h2>
          </div>
          <div className="font-hand text-3xl text-clay sm:text-4xl">
            brief → cut → ship
          </div>
        </div>

        <ol className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-ink/10 bg-ink/10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex h-full flex-col gap-6 bg-cream p-8 transition-colors duration-500 hover:bg-sand-2"
            >
              <span className="font-editorial text-6xl italic text-neon transition-transform duration-500 group-hover:-translate-y-1">
                {s.n}
              </span>
              <h3 className="font-display text-xl font-medium text-ink">
                {s.t}
              </h3>
              <p className="text-base leading-relaxed text-ink/65">{s.d}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
