"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { ProjectMedia } from "@/data/images";

interface VideoCardProps {
  media: ProjectMedia;
  /**
   * Aspect ratio: "square" (default 1:1) or "vertical" (9:16 reels).
   */
  aspect?: "square" | "vertical";
}

/**
 * Mobile-friendly video card:
 * - Static poster by default
 * - Plays muted/loop on hover (desktop)
 * - Plays muted/loop when in viewport on touch devices
 */
export function VideoCard({ media, aspect = "square" }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [isTouch, setIsTouch] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  // Touch devices: play when intersecting
  useEffect(() => {
    if (!isTouch || reduce) return;
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isTouch, reduce]);

  const onEnter = () => {
    if (reduce || isTouch) return;
    const el = ref.current;
    if (!el) return;
    el.currentTime = 0;
    el.play().catch(() => undefined);
  };
  const onLeave = () => {
    if (reduce || isTouch) return;
    const el = ref.current;
    if (!el) return;
    el.pause();
  };

  return (
    <div
      className={`relative w-full overflow-hidden ${
        aspect === "vertical" ? "aspect-[9/16]" : "aspect-square"
      }`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <video
        ref={ref}
        src={media.video}
        poster={media.poster}
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className="h-full w-full object-cover"
      />
      <span
        aria-hidden
        className="pointer-events-none absolute right-3 top-3 inline-flex h-6 items-center gap-1 rounded-full bg-paper/90 px-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-espresso shadow-soft"
      >
        <svg
          width="9"
          height="10"
          viewBox="0 0 9 10"
          aria-hidden
          className="fill-coral"
        >
          <path d="M0 0v10l9-5z" />
        </svg>
        Reel
      </span>
    </div>
  );
}
