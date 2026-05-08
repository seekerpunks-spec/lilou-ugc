"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";

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
      className="relative overflow-hidden bg-bone py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <div className="flex flex-col gap-4">
          <span className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-coral">
            <Icon name="spark" className="h-3.5 w-3.5 text-sun" />
            {t("kicker")}
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.01em] text-espresso">
            {t("title")}
          </h2>
        </div>

        {/* Horizontal stepper */}
        <ol className="relative grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line (desktop) */}
          <span
            aria-hidden
            className="pointer-events-none absolute left-0 right-0 top-7 hidden h-px bg-line lg:block"
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
              className="relative flex flex-col gap-4"
            >
              {/* Numbered circle */}
              <span className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full border border-line bg-paper font-serif text-lg font-medium text-coral shadow-soft">
                {s.n}
              </span>
              <div className="flex flex-col gap-2">
                <h3 className="font-serif text-xl font-medium text-espresso">
                  {s.t}
                </h3>
                <p className="text-sm leading-relaxed text-mocha">{s.d}</p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
