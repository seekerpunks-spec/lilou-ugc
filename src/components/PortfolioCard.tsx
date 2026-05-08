"use client";

import { useLocale } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/cn";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  variant?: "phone" | "square" | "wide";
}

/**
 * Layered painterly gradients (CSS only) — each card gets a unique
 * combination so the grid doesn't feel like a Tailwind palette page.
 */
const palettes = [
  {
    base: "linear-gradient(160deg, #f4a261 0%, #e76f51 35%, #2a1f1c 100%)",
    glow: "radial-gradient(circle at 30% 20%, rgba(255,200,121,0.7), transparent 55%)",
    accent: "#FFD27A",
  },
  {
    base: "linear-gradient(170deg, #ff8da1 0%, #ff2e7e 45%, #1a1410 100%)",
    glow: "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.35), transparent 50%)",
    accent: "#FFB7C9",
  },
  {
    base: "linear-gradient(155deg, #b8d8d8 0%, #4a7c84 50%, #1a3a40 100%)",
    glow: "radial-gradient(circle at 25% 80%, rgba(255,107,91,0.6), transparent 55%)",
    accent: "#E0F0EC",
  },
  {
    base: "linear-gradient(180deg, #fde8a0 0%, #f5b941 40%, #c75d3a 100%)",
    glow: "radial-gradient(circle at 50% 30%, rgba(255,255,255,0.5), transparent 60%)",
    accent: "#FFE9A8",
  },
  {
    base: "linear-gradient(165deg, #2c1d3a 0%, #6e2855 45%, #c63270 100%)",
    glow: "radial-gradient(circle at 80% 20%, rgba(255,46,126,0.5), transparent 55%)",
    accent: "#FF77A8",
  },
  {
    base: "linear-gradient(150deg, #d4a574 0%, #8b6f47 50%, #2a1f1c 100%)",
    glow: "radial-gradient(circle at 20% 30%, rgba(255,235,200,0.4), transparent 55%)",
    accent: "#F0D9B5",
  },
];

export function PortfolioCard({
  item,
  index,
  variant = "phone",
}: PortfolioCardProps) {
  const locale = useLocale();
  const reduce = useReducedMotion();
  const caption = item.caption?.[locale === "en" ? "en" : "fr"] ?? "";
  const palette = palettes[index % palettes.length];

  if (variant === "square") {
    return (
      <PolaroidCard
        item={item}
        index={index}
        palette={palette}
        caption={caption}
      />
    );
  }

  if (variant === "wide") {
    return (
      <WideCard
        item={item}
        index={index}
        palette={palette}
        caption={caption}
        reduce={!!reduce}
      />
    );
  }

  return (
    <PhoneCard
      item={item}
      index={index}
      palette={palette}
      caption={caption}
      reduce={!!reduce}
    />
  );
}

interface CardChildProps {
  item: PortfolioItem;
  index: number;
  palette: (typeof palettes)[number];
  caption: string;
  reduce?: boolean;
}

/* ---------------- Phone-frame card (default) ---------------- */
function PhoneCard({ item, index, palette, caption, reduce }: CardChildProps) {
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col gap-4"
    >
      <div className="relative mx-auto aspect-[9/19] w-full max-w-[300px]">
        {/* Soft drop shadow halo */}
        <div
          className="pointer-events-none absolute -inset-6 rounded-[60px] opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-70"
          style={{ background: palette.glow }}
          aria-hidden
        />

        {/* Phone frame */}
        <motion.div
          whileHover={reduce ? undefined : { y: -6, rotate: -1 }}
          transition={{ type: "spring", stiffness: 220, damping: 22 }}
          className="relative h-full w-full rounded-[40px] border border-ink/10 bg-ink p-[10px] shadow-[0_24px_60px_-30px_rgba(26,20,16,0.6),inset_0_1px_0_rgba(255,255,255,0.1)]"
        >
          {/* Notch */}
          <span
            aria-hidden
            className="absolute left-1/2 top-[14px] z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black"
          />

          {/* Screen */}
          <div
            className="relative h-full w-full overflow-hidden rounded-[30px]"
            style={{ background: palette.base }}
          >
            {/* Status bar */}
            <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-3 text-[10px] font-medium tracking-wide text-cream/85">
              <span>9:41</span>
              <span className="flex items-center gap-1">
                <span aria-hidden>●●●</span>
                <span aria-hidden>▮</span>
              </span>
            </div>

            {/* Inner glow */}
            <div
              className="absolute inset-0"
              style={{ background: palette.glow }}
              aria-hidden
            />

            {/* TikTok-style overlay */}
            <div className="absolute inset-0 flex flex-col justify-end p-5 pb-8 text-cream">
              <div className="space-y-2">
                <span
                  className="block font-editorial text-[28px] italic leading-[0.95]"
                  style={{ color: palette.accent }}
                >
                  {item.brand}
                </span>
                <p className="font-display text-[10px] uppercase tracking-[0.22em] text-cream/75">
                  {item.category}
                </p>
              </div>

              <div className="mt-4 flex items-center justify-between">
                <span className="rounded-full border border-cream/30 bg-cream/10 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.24em] backdrop-blur">
                  {item.type === "video" ? "Reel" : "Photo"}
                </span>
                <span className="font-hand text-2xl text-cream/90">✦</span>
              </div>
            </div>

            {/* Right rail icons (tiktok-style) */}
            <div className="absolute right-3 bottom-24 flex flex-col items-center gap-3 text-cream/85">
              {["♥", "💬", "↪"].map((g) => (
                <span
                  key={g}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-cream/10 text-sm backdrop-blur"
                  aria-hidden
                >
                  {g}
                </span>
              ))}
            </div>

            {/* Play indicator on hover */}
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
              <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/60 bg-cream/15 backdrop-blur-md">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  aria-hidden
                >
                  <path d="M5 3v16l14-8L5 3z" fill="currentColor" />
                </svg>
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {caption ? (
        <figcaption className="mx-auto flex max-w-[300px] flex-col gap-1 px-1 text-center">
          <span className="font-display text-sm font-medium text-current/85">
            {item.brand}
          </span>
          <p className="text-sm leading-relaxed text-current/55">{caption}</p>
        </figcaption>
      ) : null}
    </motion.figure>
  );
}

/* ---------------- Polaroid card (for photo variants) ---------------- */
function PolaroidCard({ item, index, palette, caption }: CardChildProps) {
  const rotation = index % 2 === 0 ? "-rotate-2" : "rotate-2";
  return (
    <motion.figure
      initial={{ opacity: 0, y: 28, rotate: 0 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={cn("group relative", rotation)}
    >
      <div className="polaroid">
        <div
          className="relative aspect-square w-full overflow-hidden rounded-sm"
          style={{ background: palette.base }}
        >
          <div
            className="absolute inset-0"
            style={{ background: palette.glow }}
            aria-hidden
          />
          <div className="absolute inset-0 flex items-end justify-between p-4 text-cream">
            <span className="font-editorial text-2xl italic leading-tight">
              {item.brand}
            </span>
            <span className="font-hand text-xl text-cream/90">✦</span>
          </div>
        </div>
        <p className="mt-3 px-1 font-hand text-lg text-ink/75">
          {item.category}
        </p>
      </div>
      {caption ? (
        <p className="mx-auto mt-3 max-w-[260px] text-center text-xs leading-relaxed text-current/55">
          {caption}
        </p>
      ) : null}
    </motion.figure>
  );
}

/* ---------------- Wide editorial card ---------------- */
function WideCard({
  item,
  index,
  palette,
  caption,
  reduce,
}: CardChildProps) {
  return (
    <motion.figure
      initial={reduce ? false : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: 0.9,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group relative flex flex-col gap-4 sm:col-span-2"
    >
      <div
        className="relative aspect-[16/10] w-full overflow-hidden rounded-[var(--radius-card)] shadow-[0_24px_60px_-30px_rgba(26,20,16,0.45)]"
        style={{ background: palette.base }}
      >
        <div
          className="absolute inset-0"
          style={{ background: palette.glow }}
          aria-hidden
        />
        <div className="absolute inset-0 flex items-end justify-between p-8 text-cream">
          <div className="max-w-md space-y-2">
            <span className="font-editorial text-5xl italic leading-[0.92]">
              {item.brand}
            </span>
            <p className="font-display text-[11px] uppercase tracking-[0.28em] text-cream/80">
              {item.category}
            </p>
          </div>
          <span
            className="rounded-full border border-cream/30 bg-cream/10 px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.28em] backdrop-blur"
            style={{ color: palette.accent }}
          >
            Featured
          </span>
        </div>
      </div>
      {caption ? (
        <p className="max-w-2xl text-sm leading-relaxed text-current/60">
          {caption}
        </p>
      ) : null}
    </motion.figure>
  );
}
