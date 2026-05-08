"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

interface SectionTitleProps {
  kicker: string;
  titleStart: string;
  titleEmph: string;
  titleEnd?: string;
  lede?: string;
  align?: "start" | "center";
  tone?: "light" | "dark";
}

export function SectionTitle({
  kicker,
  titleStart,
  titleEmph,
  titleEnd,
  lede,
  align = "start",
  tone = "light",
}: SectionTitleProps) {
  const onLight = tone === "light";

  return (
    <div
      className={cn(
        "flex flex-col gap-6",
        align === "center"
          ? "mx-auto max-w-3xl items-center text-center"
          : "max-w-4xl",
      )}
    >
      <motion.span
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.5 }}
        className={cn(
          "font-display text-xs uppercase tracking-[0.36em]",
          onLight ? "text-neon" : "text-neon-soft",
        )}
      >
        ✦ {kicker}
      </motion.span>
      <motion.h2
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-15%" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "font-editorial text-[clamp(2.6rem,8vw,7rem)] leading-[0.96] tracking-[-0.015em]",
          onLight ? "text-ink" : "text-cream",
        )}
      >
        {titleStart}{" "}
        <em
          className={cn(
            "font-editorial italic",
            onLight ? "text-neon" : "text-neon-soft",
          )}
        >
          {titleEmph}
        </em>
        {titleEnd ?? ""}
      </motion.h2>
      {lede ? (
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className={cn(
            "max-w-2xl text-lg leading-relaxed",
            onLight ? "text-ink/70" : "text-cream/70",
          )}
        >
          {lede}
        </motion.p>
      ) : null}
    </div>
  );
}
