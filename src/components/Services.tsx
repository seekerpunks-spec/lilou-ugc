"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";

interface ServiceItem {
  id: string;
  icon: "camera" | "play" | "mic" | "box" | "image" | "pin";
  title: string;
  body: string;
}

export function Services() {
  const t = useTranslations("services");
  const reduce = useReducedMotion();
  const items = useTranslations().raw("services_data") as ServiceItem[];

  return (
    <section
      id="services"
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 sm:px-8">
        <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex max-w-2xl flex-col gap-4">
            <span className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-coral">
              <Icon name="spark" className="h-3.5 w-3.5 text-sun" />
              {t("kicker")}
            </span>
            <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.01em] text-espresso">
              {t("title")}
            </h2>
            <p className="text-base leading-relaxed text-mocha">{t("sub")}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <motion.article
              key={s.id}
              initial={reduce ? false : { opacity: 0, y: 22 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-12%" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="hover-rise group flex flex-col items-center gap-4 rounded-[var(--radius-card-lg)] border border-line bg-paper px-7 py-9 text-center shadow-soft hover:shadow-soft-lg"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-shell text-coral transition-colors duration-500 group-hover:bg-coral group-hover:text-paper">
                <Icon name={s.icon} className="h-7 w-7" />
              </span>
              <h3 className="font-serif text-xl font-medium text-espresso">
                {s.title}
              </h3>
              <p className="max-w-[28ch] text-sm leading-relaxed text-mocha">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
