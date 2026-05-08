"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

  /* Carousel scroll logic */
  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const update = () => {
      setCanPrev(el.scrollLeft > 8);
      setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 8);
    };
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [filtered.length]);

  // Reset scroll on filter change
  useEffect(() => {
    trackRef.current?.scrollTo({ left: 0, behavior: "smooth" });
  }, [active]);

  const scrollBy = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    // Scroll by ~one card width (first child width + gap)
    const card = el.querySelector("[data-card]") as HTMLElement | null;
    const step = (card?.offsetWidth ?? 280) + 24;
    el.scrollBy({ left: step * dir, behavior: "smooth" });
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

        {/* Carousel header — count + arrows (desktop) */}
        <div className="flex items-end justify-between gap-4">
          <span className="font-serif text-sm italic text-mocha">
            <span className="text-coral">{filtered.length}</span>{" "}
            {filtered.length > 1 ? "projets" : "projet"}
          </span>
          <div className="hidden items-center gap-2 sm:flex">
            <CarouselArrow
              direction="prev"
              onClick={() => scrollBy(-1)}
              disabled={!canPrev}
            />
            <CarouselArrow
              direction="next"
              onClick={() => scrollBy(1)}
              disabled={!canNext}
            />
          </div>
        </div>
      </div>

      {/* Track — full bleed on mobile, padded on desktop via inline style */}
      <div className="relative mt-6">
        <div
          ref={trackRef}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-4"
          style={{
            paddingLeft: "max(20px, calc((100vw - 1152px) / 2 + 32px))",
            paddingRight: "max(20px, calc((100vw - 1152px) / 2 + 32px))",
            scrollbarWidth: "none",
          }}
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => {
              const media = projectMedia[p.id];
              return (
                <motion.article
                  key={p.id}
                  data-card
                  layout
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  animate={reduce ? undefined : { opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: (i % 4) * 0.04,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="group flex w-[78vw] sm:w-[340px] lg:w-[300px] shrink-0 snap-start flex-col gap-0 overflow-hidden rounded-[var(--radius-card)] border border-line bg-paper shadow-soft transition-shadow duration-500 hover:shadow-soft-lg"
                >
                  <VideoCard media={media} aspect="portrait" />

                  <div className="flex flex-col gap-3 px-5 py-5 sm:px-6 sm:py-5">
                    <div className="flex items-center justify-between gap-3">
                      <h3 className="font-serif text-[1.1rem] font-medium leading-tight text-espresso">
                        {p.brand}
                      </h3>
                      <span className="rounded-full border border-line bg-shell px-2.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.18em] text-espresso/75">
                        {p.category}
                      </span>
                    </div>
                    <dl className="flex flex-col gap-1.5 text-[0.82rem]">
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

        {/* Edge fades for visual carousel cue */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 left-0 hidden w-16 bg-gradient-to-r from-bone to-transparent sm:block"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-y-0 right-0 hidden w-16 bg-gradient-to-l from-bone to-transparent sm:block"
        />
      </div>

      {/* Mobile swipe hint */}
      <div className="mx-auto mt-2 flex w-full max-w-6xl items-center justify-center gap-2 px-5 sm:hidden">
        <span className="text-[0.7rem] uppercase tracking-[0.28em] text-mocha/55">
          ← swipe →
        </span>
      </div>

      {/* CTA */}
      <div className="mx-auto mt-10 flex w-full max-w-6xl items-center justify-center px-5">
        <a
          href="#contact"
          className="inline-flex items-center gap-2.5 rounded-full bg-coral px-7 py-3.5 text-sm font-medium text-paper shadow-soft transition-all hover:-translate-y-0.5 hover:bg-coral-deep"
        >
          {t("more")}
          <Icon name="arrow" className="h-3.5 w-3.5" />
        </a>
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
}

function CarouselArrow({ direction, onClick, disabled }: CarouselArrowProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Précédent" : "Suivant"}
      className={cn(
        "inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-paper text-espresso shadow-soft transition-all",
        disabled
          ? "cursor-not-allowed opacity-40"
          : "hover:-translate-y-0.5 hover:border-espresso/40",
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
