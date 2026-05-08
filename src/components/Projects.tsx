"use client";

import { useEffect, useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  type PanInfo,
} from "motion/react";
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

const SWIPE_THRESHOLD = 60;

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

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((p) => p.niche_key === active),
    [active, projects],
  );

  /* index + direction (for slide animation) */
  const [[index, dir], setState] = useState<[number, 1 | -1]>([0, 1]);
  // Reset on filter change
  useEffect(() => {
    setState([0, 1]);
  }, [active]);

  const safeIndex = filtered.length === 0 ? 0 : index % filtered.length;
  const current = filtered[safeIndex];

  const goTo = (next: number, direction: 1 | -1) => {
    if (filtered.length === 0) return;
    const wrapped = (next + filtered.length) % filtered.length;
    setState([wrapped, direction]);
  };
  const prev = () => goTo(safeIndex - 1, -1);
  const next = () => goTo(safeIndex + 1, 1);

  /* keyboard nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
      }
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filtered.length, safeIndex]);

  const onDragEnd = (_: unknown, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;
    if (offset < -SWIPE_THRESHOLD || velocity < -500) next();
    else if (offset > SWIPE_THRESHOLD || velocity > 500) prev();
  };

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
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 px-5 sm:px-8">
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

        {/* Filter chips */}
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

        {/* Carousel stage */}
        {filtered.length === 0 ? (
          <div className="flex h-[520px] items-center justify-center text-mocha">
            <p>—</p>
          </div>
        ) : (
          <div className="relative">
            {/* Counter */}
            <div className="mb-5 flex items-center justify-between gap-4">
              <span className="font-serif text-sm italic text-mocha">
                <span className="text-coral">{safeIndex + 1}</span>
                <span className="px-1 text-mocha/55">/</span>
                {filtered.length}
              </span>
              <span className="font-script text-2xl text-coral">
                {current?.brand}
              </span>
            </div>

            {/* Stage with peek of neighbours */}
            <div className="relative flex items-center justify-center">
              <CarouselArrow
                direction="prev"
                onClick={prev}
                disabled={filtered.length < 2}
                className="absolute left-0 z-20 hidden -translate-x-2 sm:flex md:-translate-x-6"
              />

              <div className="relative w-full max-w-[440px] overflow-visible">
                <AnimatePresence mode="wait" custom={dir}>
                  <motion.article
                    key={current.id}
                    custom={dir}
                    drag={reduce ? false : "x"}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.18}
                    onDragEnd={onDragEnd}
                    initial={
                      reduce
                        ? { opacity: 0 }
                        : { x: dir * 80, opacity: 0, scale: 0.97 }
                    }
                    animate={{ x: 0, opacity: 1, scale: 1 }}
                    exit={
                      reduce
                        ? { opacity: 0 }
                        : { x: dir * -80, opacity: 0, scale: 0.97 }
                    }
                    transition={{
                      type: "spring",
                      stiffness: 260,
                      damping: 30,
                      mass: 0.7,
                    }}
                    className="relative flex cursor-grab flex-col gap-0 overflow-hidden rounded-[var(--radius-card-lg)] border border-line bg-paper shadow-soft-lg active:cursor-grabbing"
                  >
                    <VideoCard
                      media={projectMedia[current.id]}
                      aspect="portrait"
                    />

                    <div className="flex flex-col gap-3 px-6 py-6">
                      <div className="flex items-center justify-between gap-3">
                        <h3 className="font-serif text-xl font-medium leading-tight text-espresso">
                          {current.brand}
                        </h3>
                        <span className="rounded-full border border-line bg-shell px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-espresso/75">
                          {current.category}
                        </span>
                      </div>
                      <dl className="flex flex-col gap-1.5 text-[0.85rem]">
                        <MetaRow label={labels.format} value={current.format} />
                        <MetaRow label={labels.angle} value={current.angle} />
                        <MetaRow
                          label={labels.result}
                          value={current.result}
                          highlight
                        />
                      </dl>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              <CarouselArrow
                direction="next"
                onClick={next}
                disabled={filtered.length < 2}
                className="absolute right-0 z-20 hidden translate-x-2 sm:flex md:translate-x-6"
              />
            </div>

            {/* Dot indicators */}
            <div className="mt-7 flex items-center justify-center gap-1.5">
              {filtered.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => goTo(i, i > safeIndex ? 1 : -1)}
                  aria-label={`Aller au projet ${i + 1}`}
                  aria-current={i === safeIndex}
                  className={cn(
                    "h-1.5 rounded-full transition-all",
                    i === safeIndex
                      ? "w-6 bg-coral"
                      : "w-1.5 bg-espresso/20 hover:bg-espresso/40",
                  )}
                />
              ))}
            </div>

            {/* Mobile arrows */}
            <div className="mt-6 flex items-center justify-center gap-3 sm:hidden">
              <CarouselArrow
                direction="prev"
                onClick={prev}
                disabled={filtered.length < 2}
              />
              <CarouselArrow
                direction="next"
                onClick={next}
                disabled={filtered.length < 2}
              />
            </div>
          </div>
        )}

        {/* CTA */}
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
    <div className="grid grid-cols-[64px_1fr] items-baseline gap-3">
      <dt className="text-[0.6rem] font-semibold uppercase tracking-[0.16em] text-warm-stone">
        {label}
      </dt>
      <dd
        className={cn(
          "leading-snug",
          highlight ? "font-medium text-coral" : "text-espresso/80",
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

interface CarouselArrowProps {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
  className?: string;
}

function CarouselArrow({
  direction,
  onClick,
  disabled,
  className,
}: CarouselArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Précédent" : "Suivant"}
      className={cn(
        "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-paper text-espresso shadow-soft transition-all",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "hover:-translate-y-0.5 hover:border-espresso/40 hover:bg-cream",
        className,
      )}
    >
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
        className={direction === "prev" ? "rotate-180" : undefined}
      >
        <path d="M1 7h12M8 1l6 6-6 6" />
      </svg>
    </button>
  );
}
