"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

interface Step {
  n: string;
  t: string;
  d: string;
}

export function Process() {
  const t = useTranslations("process");
  const reduce = useReducedMotion();
  const steps = t.raw("steps") as Step[];

  return (
    <section
      id="process"
      className="relative overflow-hidden bg-bone py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-5 sm:px-8">
        <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.005em] text-espresso">
          {t("title")}
        </h2>

        <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Dashed connecting line (desktop) */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-[8%] right-[8%] top-7 hidden border-t border-dashed border-line lg:block"
          />
          {steps.map((s, i) => (
            <motion.li
              key={s.n}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.6,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative flex flex-col items-center gap-3 text-center"
            >
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper text-sm font-medium tracking-wide text-coral shadow-soft">
                {s.n}
              </span>
              <h3 className="font-serif text-lg font-medium text-espresso">
                {s.t}
              </h3>
              <p className="max-w-[24ch] text-[0.82rem] leading-relaxed text-mocha">
                {s.d}
              </p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
