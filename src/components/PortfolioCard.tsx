"use client";

import { useLocale } from "next-intl";
import { motion } from "motion/react";
import type { PortfolioItem } from "@/data/portfolio";
import { cn } from "@/lib/cn";

interface PortfolioCardProps {
  item: PortfolioItem;
  index: number;
  variant?: "tall" | "square" | "wide";
}

const gradients = [
  "from-[#ff6b5b] via-[#ff2e7e] to-[#1a1410]",
  "from-[#f5b941] via-[#ff6b5b] to-[#ff2e7e]",
  "from-[#4a7c84] via-[#ff77a8] to-[#1a1410]",
  "from-[#ff77a8] via-[#ff2e7e] to-[#3b332b]",
  "from-[#ffc879] via-[#ff6b5b] to-[#1a1410]",
  "from-[#1a1410] via-[#ff2e7e] to-[#ff6b5b]",
];

export function PortfolioCard({
  item,
  index,
  variant = "tall",
}: PortfolioCardProps) {
  const locale = useLocale();
  const caption = item.caption?.[locale === "en" ? "en" : "fr"] ?? "";
  const gradient = gradients[index % gradients.length];

  const aspect =
    variant === "square"
      ? "aspect-square"
      : variant === "wide"
        ? "aspect-[4/3]"
        : "aspect-[9/14]";

  return (
    <motion.figure
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{
        duration: 0.8,
        delay: (index % 3) * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="group hover-rise relative flex flex-col gap-3"
    >
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-[var(--radius-card)] shadow-[0_24px_60px_-30px_rgba(26,20,16,0.45)]",
          aspect,
        )}
      >
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover:scale-105",
            gradient,
          )}
        />
        {/* Faux UI overlay so it reads as a vertical video */}
        <div className="absolute inset-0 flex flex-col justify-between p-5 text-cream">
          <div className="flex items-center justify-between text-[0.65rem] font-medium uppercase tracking-[0.28em]">
            <span className="rounded-full border border-cream/30 bg-cream/10 px-2 py-1 backdrop-blur">
              {item.type === "video" ? "Reel" : "Photo"}
            </span>
            <span aria-hidden>0:{15 + index}</span>
          </div>
          <div className="flex items-end justify-between">
            <span className="font-editorial text-3xl italic leading-none">
              {item.brand}
            </span>
            <span className="font-hand text-2xl text-cream/90">✦</span>
          </div>
        </div>

        {/* Hover play indicator */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <span className="flex h-16 w-16 items-center justify-center rounded-full border border-cream/60 bg-cream/15 backdrop-blur">
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

      <figcaption className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between gap-3">
          <span className="font-display text-sm font-medium text-ink">
            {item.brand}
          </span>
          <span className="font-display text-[0.65rem] uppercase tracking-[0.22em] text-ink/55">
            {item.category}
          </span>
        </div>
        {caption ? (
          <p className="text-sm leading-relaxed text-ink/65">{caption}</p>
        ) : null}
      </figcaption>
    </motion.figure>
  );
}
