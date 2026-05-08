"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

interface Item {
  t: string;
  d: string;
}

export function Services() {
  const t = useTranslations("services");
  const items = t.raw("items") as Item[];

  return (
    <section
      id="services"
      className="grain relative overflow-hidden bg-sand py-28 sm:py-36"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <div className="flex flex-col gap-6">
          <span className="font-display text-xs uppercase tracking-[0.36em] text-neon">
            ✦ {t("kicker")}
          </span>
          <h2 className="font-editorial text-[clamp(2.6rem,7vw,6rem)] leading-[0.98] tracking-[-0.015em] text-ink">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-lg leading-relaxed text-ink/70">
            {t("lede")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((it, i) => (
            <motion.article
              key={it.t}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{
                duration: 0.7,
                delay: (i % 3) * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group relative flex flex-col gap-4 rounded-[var(--radius-card)] border border-ink/10 bg-cream p-7 transition-all duration-500 hover:-translate-y-1 hover:border-neon/40 hover:shadow-[0_24px_60px_-30px_rgba(255,46,126,0.45)]"
            >
              <span
                aria-hidden
                className="absolute right-6 top-6 font-editorial text-sm italic text-ink/30 transition-colors duration-500 group-hover:text-neon"
              >
                0{i + 1}
              </span>
              <h3 className="font-editorial text-3xl italic leading-tight text-ink">
                {it.t}
              </h3>
              <p className="text-base leading-relaxed text-ink/65">{it.d}</p>
              <span
                aria-hidden
                className="mt-2 inline-flex h-px w-12 bg-ink/15 transition-all duration-500 group-hover:w-24 group-hover:bg-neon"
              />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
