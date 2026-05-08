"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export function Materials() {
  const t = useTranslations("materials");
  const capture = t.raw("capture") as { t: string; items: string[] };
  const quality = t.raw("quality") as { t: string; items: string[] };

  return (
    <section
      id="materials"
      className="grain relative overflow-hidden bg-clay/95 py-28 text-cream sm:py-36"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <div className="flex items-end justify-between">
          <div className="flex flex-col gap-6">
            <span className="font-display text-xs uppercase tracking-[0.36em] text-cream/70">
              ✦ {t("kicker")}
            </span>
            <h2 className="font-editorial text-[clamp(2.4rem,6vw,5.5rem)] leading-[0.98] tracking-[-0.015em] text-cream">
              {t("title")}
            </h2>
          </div>
          <span className="hidden font-hand text-4xl text-cream/80 sm:block">
            ★
          </span>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          <GearList title={capture.t} items={capture.items} />
          <GearList title={quality.t} items={quality.items} />
        </div>
      </div>
    </section>
  );
}

interface GearListProps {
  title: string;
  items: string[];
}

function GearList({ title, items }: GearListProps) {
  return (
    <div className="flex flex-col gap-6">
      <h3 className="flex items-center gap-3 font-display text-sm uppercase tracking-[0.3em] text-cream/80">
        <span className="text-sun">★</span>
        {title}
      </h3>
      <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-cream/15 bg-cream/15 sm:grid-cols-2">
        {items.map((it, i) => (
          <motion.li
            key={it}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
            className="bg-clay px-6 py-5 font-editorial text-2xl italic text-cream"
          >
            {it}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
