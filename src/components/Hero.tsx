"use client";

import { useRef } from "react";
import { useTranslations } from "next-intl";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { MagneticButton } from "./MagneticButton";

export function Hero() {
  const t = useTranslations("hero");
  const reduce = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const phoneY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const word = {
    initial: { y: "110%", rotate: 6 },
    animate: { y: 0, rotate: 0 },
  };

  return (
    <section
      ref={ref}
      id="top"
      className="grain relative isolate flex min-h-[100svh] flex-col justify-end overflow-hidden bg-sand pb-12 pt-32 sm:pb-20"
    >
      {/* Painterly backdrop (single warm wash, not blob soup) */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(120%_80%_at_85%_15%,rgba(255,107,91,0.55)_0%,rgba(255,46,126,0.32)_28%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(80%_60%_at_-10%_110%,rgba(245,185,65,0.45)_0%,transparent_55%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(244,237,224,0)_55%,rgba(244,237,224,1)_100%)]" />
      </div>

      {/* Vertical kicker */}
      <span
        className="pointer-events-none absolute right-6 top-1/2 hidden -translate-y-1/2 rotate-90 origin-center text-[0.7rem] font-medium uppercase tracking-[0.5em] text-ink/45 lg:block"
        aria-hidden
      >
        Hyères × French Riviera × MMXXVI
      </span>

      <motion.div style={{ opacity }} className="relative z-10">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:items-end">
          {/* Left: type */}
          <div className="flex flex-col gap-8 lg:col-span-8">
            <motion.p
              initial={reduce ? false : { opacity: 0, y: 12 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.36em] text-ink/60"
            >
              <span className="inline-block h-px w-10 bg-ink/40" />
              {t("kicker")}
            </motion.p>

            <h1 className="font-editorial text-[clamp(3rem,12vw,12rem)] leading-[0.88] tracking-[-0.025em] text-ink">
              <Line>
                <RevealWord motion={word} delay={0.05}>
                  {t("headline_a")}
                </RevealWord>{" "}
                <RevealWord motion={word} delay={0.18} className="italic">
                  <em className="glow-neon font-editorial italic not-italic">
                    {t("headline_emph")}
                  </em>
                </RevealWord>
              </Line>
              <Line>
                <RevealWord
                  motion={word}
                  delay={0.32}
                  className="text-ink/85"
                >
                  {t("headline_b")}
                </RevealWord>
              </Line>
            </h1>

            <motion.div
              style={{ y: y1 }}
              initial={reduce ? false : { opacity: 0, y: 18 }}
              animate={reduce ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-start gap-8 sm:flex-row sm:items-end sm:justify-between"
            >
              <p className="max-w-md text-base leading-relaxed text-ink/75 sm:text-lg">
                {t("sub")}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <MagneticButton
                  href="#work"
                  className="bg-ink px-7 py-3.5 text-sm font-medium text-cream transition-colors hover:bg-neon"
                >
                  <span>{t("cta_primary")}</span>
                  <ArrowGlyph />
                </MagneticButton>
                <MagneticButton
                  href="#contact"
                  className="border border-ink/25 px-7 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-cream"
                >
                  {t("cta_secondary")}
                </MagneticButton>
              </div>
            </motion.div>
          </div>

          {/* Right: editorial mock phone */}
          <motion.div
            style={{ y: phoneY }}
            initial={reduce ? false : { opacity: 0, scale: 0.94 }}
            animate={reduce ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hidden lg:col-span-4 lg:block"
          >
            <FloatingPhone />
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        style={{ y: y2, opacity }}
        className="mx-auto mt-16 flex w-full max-w-7xl items-center justify-between px-5 sm:px-8"
      >
        <span className="font-display text-xs uppercase tracking-[0.36em] text-ink/40">
          ↓ {t("scroll")}
        </span>
        <span className="font-hand text-2xl text-neon">©2026</span>
      </motion.div>
    </section>
  );
}

function Line({ children }: { children: React.ReactNode }) {
  return <span className="block overflow-hidden">{children}</span>;
}

interface RevealWordProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  motion: {
    initial: Record<string, string | number>;
    animate: Record<string, string | number>;
  };
}

function RevealWord({ children, delay = 0, className, motion: m }: RevealWordProps) {
  return (
    <motion.span
      initial={m.initial}
      animate={m.animate}
      transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
      className={`inline-block ${className ?? ""}`}
    >
      {children}
    </motion.span>
  );
}

function ArrowGlyph() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden
      className="transition-transform duration-500 group-hover:translate-x-1"
    >
      <path
        d="M1 7H13M13 7L7 1M13 7L7 13"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function FloatingPhone() {
  return (
    <div
      data-cursor="play"
      className="relative mx-auto aspect-[9/19] w-full max-w-[290px] -rotate-[4deg]"
    >
      <div
        aria-hidden
        className="absolute -inset-10 rounded-[80px] bg-[radial-gradient(circle_at_50%_30%,rgba(255,46,126,0.55),transparent_60%)] blur-3xl"
      />
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative h-full w-full rounded-[40px] border border-ink/15 bg-ink p-[10px] shadow-[0_40px_80px_-30px_rgba(26,20,16,0.55)]"
      >
        <span
          aria-hidden
          className="absolute left-1/2 top-[14px] z-10 h-5 w-24 -translate-x-1/2 rounded-full bg-black"
        />
        <div className="relative h-full w-full overflow-hidden rounded-[30px] bg-[linear-gradient(170deg,#ff8da1_0%,#ff2e7e_45%,#1a1410_100%)]">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, rgba(255,255,255,0.35), transparent 50%)",
            }}
            aria-hidden
          />
          <div className="absolute inset-x-0 top-0 z-10 flex items-center justify-between px-6 pt-3 text-[10px] font-medium text-cream/85">
            <span>9:41</span>
            <span aria-hidden>●●●▮</span>
          </div>
          <div className="absolute inset-0 flex flex-col justify-end p-5 pb-8 text-cream">
            <span className="font-editorial text-[28px] italic leading-[0.95] text-cream">
              Showreel<span className="text-sun">.</span>
            </span>
            <p className="font-display text-[10px] uppercase tracking-[0.22em] text-cream/75">
              30 secondes · scroll-stop
            </p>
            <div className="mt-3 flex items-center justify-between">
              <span className="rounded-full border border-cream/30 bg-cream/10 px-2 py-1 text-[9px] font-medium uppercase tracking-[0.24em] backdrop-blur">
                Reel
              </span>
              <span className="font-hand text-2xl text-cream/90">✦</span>
            </div>
          </div>
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
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
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 font-hand text-2xl text-clay">
        play me ↑
      </span>
    </div>
  );
}
