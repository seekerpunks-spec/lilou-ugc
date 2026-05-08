"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, AnimatePresence } from "motion/react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";
import { projectMedia, type ProjectMediaKey } from "@/data/images";
import { VideoCard } from "./VideoCard";

interface ProjectItem {
  id: ProjectMediaKey;
  brand: string;
  niche_key: string;
  category: string;
  format: string;
  angle: string;
  result: string;
}

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
      className="relative overflow-hidden bg-bone py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-8">
        {/* Header */}
        <div className="flex flex-col items-center gap-4 text-center">
          <span aria-hidden className="text-sun">
            <Icon name="spark" className="h-6 w-6" />
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,3.8rem)] font-medium leading-[1.05] tracking-[-0.005em] text-espresso">
            {t("title")}
          </h2>
          <p className="max-w-xl text-[0.95rem] leading-relaxed text-mocha">
            {t("sub")}
          </p>
        </div>

        {/* Filter chips — smaller, tighter */}
        <div className="flex flex-wrap items-center justify-center gap-1.5">
          {filters.map((f) => {
            const on = active === f.key;
            return (
              <button
                key={f.key}
                type="button"
                onClick={() => setActive(f.key)}
                className={cn(
                  "rounded-full border px-3.5 py-1.5 text-[0.78rem] font-medium transition-all",
                  on
                    ? "border-coral bg-coral text-paper"
                    : "border-line bg-paper text-espresso/65 hover:border-espresso/30 hover:text-espresso",
                )}
                aria-pressed={on}
              >
                {f.label}
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const media = projectMedia[p.id];
              return (
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
                  className="hover-rise group flex flex-col gap-0 overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-soft hover:shadow-soft-lg"
                >
                  {/* Video preview — portrait keeps full Reel visible */}
                  <VideoCard media={media} aspect="portrait" />

                  {/* Meta */}
                  <div className="flex flex-col gap-3.5 px-5 py-5 sm:px-6 sm:py-6">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-serif text-[1.15rem] font-medium leading-tight text-espresso">
                        {p.brand}
                      </h3>
                      <span className="rounded-full border border-line bg-shell px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-espresso/75">
                        {p.category}
                      </span>
                    </div>
                    <dl className="flex flex-col gap-1.5 text-[0.85rem]">
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
              );
            })}
          </AnimatePresence>
        </div>

        {/* Footer CTA */}
        <div className="mt-2 flex items-center justify-center">
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
    <div className="grid grid-cols-[68px_1fr] items-baseline gap-3">
      <dt className="text-[0.62rem] font-semibold uppercase tracking-[0.16em] text-warm-stone">
        {label}
      </dt>
      <dd
        className={cn(
          "leading-snug",
          highlight
            ? "font-medium text-coral"
            : "text-espresso/80",
        )}
      >
        {value}
        {highlight ? (
          <span className="ml-1.5 text-[0.7em] text-sun" aria-hidden>
            ●
          </span>
        ) : null}
      </dd>
    </div>
  );
}
