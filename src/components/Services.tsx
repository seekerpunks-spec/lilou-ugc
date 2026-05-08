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
      className="relative overflow-hidden bg-cream py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-8">
        <div className="flex flex-col gap-3">
          <span aria-hidden className="text-sun">
            <Icon name="spark" className="h-6 w-6" />
          </span>
          <h2 className="font-serif text-[clamp(2.2rem,4.4vw,3.4rem)] font-medium leading-[1.05] tracking-[-0.005em] text-espresso">
            {t("title")}
          </h2>
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-mocha">
            {t("sub")}
          </p>
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
              className="hover-rise group flex min-h-[220px] flex-col items-center gap-4 rounded-[var(--radius-card)] border border-line bg-paper px-7 py-10 text-center shadow-soft hover:shadow-soft-lg"
            >
              <span className="text-coral transition-transform duration-500 group-hover:-translate-y-0.5">
                <Icon name={s.icon} className="h-10 w-10" />
              </span>
              <h3 className="font-serif text-[1.15rem] font-medium leading-tight text-espresso">
                {s.title}
              </h3>
              <p className="max-w-[26ch] text-[0.85rem] leading-relaxed text-mocha">
                {s.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
