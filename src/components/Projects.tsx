"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

interface ProjectItem {
  id: string;
  brand: string;
  niche_key: string;
  category: string;
  format: string;
  angle: string;
  result: string;
}

const palettes = [
  "linear-gradient(160deg,#f5d6b0 0%,#e9a17a 55%,#a96649 100%)",
  "linear-gradient(170deg,#f3c8b1 0%,#d97c5f 50%,#6e3a2c 100%)",
  "linear-gradient(180deg,#fbe3c4 0%,#f0b285 50%,#9b5a3a 100%)",
  "linear-gradient(165deg,#efd4b0 0%,#c08763 55%,#5a3325 100%)",
  "linear-gradient(170deg,#f8dcc8 0%,#e69d7e 50%,#7a3f30 100%)",
  "linear-gradient(160deg,#f5e0b9 0%,#dba36e 55%,#7a4a30 100%)",
];

export function Projects() {
  const t = useTranslations("projects");
  const reduce = useReducedMotion();
  const projects = useTranslations().raw("projects_data") as ProjectItem[];
  const aboutNiches = useTranslations().raw("about.niches") as Array<{
    key: string;
    label: string;
  }>;

  const filters = useMemo(
    () => [{ key: "all", label: t("filter_all") }, ...aboutNiches],
    [aboutNiches, t],
  );

  const [active, setActive] = useState<string>("all");

  const filtered =
    active === "all"
      ? projects
      : projects.filter((p) => p.niche_key === active);

  const labels = t.raw("labels") as {
    format: string;
    angle: string;
    result: string;
  };

  return (
    <section
      id="work"
      className="relative overflow-hidden bg-bone py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-coral">
            <Icon name="spark" className="h-3.5 w-3.5 text-sun" />
            {t("kicker")}
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,5.5vw,4.5rem)] font-medium leading-[1.05] tracking-[-0.01em] text-espresso">
            {t("title")}
          </h2>
          <p className="max-w-2xl text-base leading-relaxed text-mocha">
            {t("sub")}
          </p>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => {
            const on = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={cn(
                  "rounded-full border px-4 py-2 text-xs font-medium transition-all",
                  on
                    ? "border-coral bg-coral text-paper shadow-soft"
                    : "border-line bg-paper text-espresso/70 hover:border-espresso/30 hover:text-espresso",
                )}
                aria-pressed={on}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.article
                key={p.id}
                layout
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                exit={reduce ? undefined : { opacity: 0, y: -16 }}
                transition={{
                  duration: 0.6,
                  delay: (i % 4) * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="hover-rise group flex flex-col gap-5 rounded-[var(--radius-card-lg)] border border-line bg-paper p-3 shadow-soft hover:shadow-soft-lg"
              >
                {/* Image area */}
                <div
                  className="relative aspect-[5/4] w-full overflow-hidden rounded-[var(--radius-card)]"
                  style={{
                    background: palettes[i % palettes.length],
                  }}
                >
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(circle at 30% 25%, rgba(255,250,235,0.55), transparent 55%)",
                    }}
                  />
                  {/* Brand mark */}
                  <div className="absolute inset-0 flex items-end justify-between p-5 text-paper">
                    <span className="font-serif text-3xl italic leading-none">
                      {p.brand}
                    </span>
                    <span className="rounded-full border border-paper/30 bg-paper/15 px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.22em] backdrop-blur">
                      {p.category}
                    </span>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex flex-col gap-3 px-3 pb-4 sm:px-4">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-xl font-medium text-espresso">
                      {p.brand}
                    </h3>
                    <span className="rounded-full border border-line bg-shell px-2.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.22em] text-espresso/70">
                      {p.category}
                    </span>
                  </div>
                  <dl className="grid grid-cols-1 gap-1.5 text-sm">
                    <MetaRow label={labels.format} value={p.format} />
                    <MetaRow label={labels.angle} value={p.angle} />
                    <MetaRow
                      label={labels.result}
                      value={p.result}
                      highlight
                    />
                  </dl>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        <div className="mt-4 flex items-center justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-coral-deep"
          >
            {t("more")}
            <Icon name="arrow" className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
}

interface MetaRowProps {
  label: string;
  value: string;
  highlight?: boolean;
}

function MetaRow({ label, value, highlight }: MetaRowProps) {
  return (
    <div className="grid grid-cols-[80px_1fr] items-baseline gap-3">
      <dt className="text-[0.7rem] font-medium uppercase tracking-[0.22em] text-warm-stone">
        {label}
      </dt>
      <dd
        className={cn(
          "text-sm leading-snug",
          highlight ? "font-medium text-coral" : "text-espresso/80",
        )}
      >
        {value}
        {highlight ? <span className="ml-1.5 text-sun">●</span> : null}
      </dd>
    </div>
  );
}
