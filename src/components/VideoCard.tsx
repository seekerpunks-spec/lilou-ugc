"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { ProjectMedia } from "@/data/images";
import { claimAudio, registerAudio, releaseAudio } from "@/lib/audio-coordinator";
import { cn } from "@/lib/cn";

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
 * - Plays muted/loop on hover (desktop) or in viewport (touch)
 * - 🔊/🔇 toggle in corner; only one card can be unmuted at a time
 */
export function VideoCard({ media, aspect = "square" }: VideoCardProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const id = useId();
  const [isTouch, setIsTouch] = useState(false);
  const [muted, setMuted] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  /* Coordinator: forced mute when another card claims audio focus */
  useEffect(() => {
    return registerAudio(id, (isActive) => {
      if (!isActive) setMuted(true);
    });
  }, [id]);

  /* Touch devices: play when intersecting */
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

  /* Cleanup audio claim on unmount */
  useEffect(() => () => releaseAudio(id), [id]);

  const onEnter = () => {
    if (reduce || isTouch) return;
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => undefined);
  };
  const onLeave = () => {
    if (reduce || isTouch) return;
    const el = ref.current;
    if (!el) return;
    if (muted) el.pause();
    // If unmuted, keep playing (user is listening intentionally)
  };

  const toggleMute = () => {
    const el = ref.current;
    if (!el) return;
    if (muted) {
      claimAudio(id);
      setMuted(false);
      el.muted = false;
      el.volume = 1;
      el.play().catch(() => undefined);
    } else {
      releaseAudio(id);
      setMuted(true);
      el.muted = true;
    }
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden",
        aspect === "vertical" ? "aspect-[9/16]" : "aspect-square",
      )}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      <video
        ref={ref}
        src={media.video}
        poster={media.poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className="h-full w-full object-cover"
      />

      {/* Reel pill */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 inline-flex h-6 items-center gap-1 rounded-full bg-paper/90 px-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-espresso shadow-soft"
      >
        <svg width="9" height="10" viewBox="0 0 9 10" className="fill-coral">
          <path d="M0 0v10l9-5z" />
        </svg>
        Reel
      </span>

      {/* Sound toggle */}
      <button
        type="button"
        onClick={toggleMute}
        aria-label={muted ? "Activer le son" : "Couper le son"}
        aria-pressed={!muted}
        className={cn(
          "absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all",
          muted
            ? "bg-paper/85 text-espresso hover:bg-paper"
            : "bg-coral text-paper shadow-soft",
        )}
      >
        {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
      </button>
    </div>
  );
}

function SpeakerOffIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 10v4h4l5 4V6l-5 4H3z" />
      <path d="M16 8l5 8M21 8l-5 8" />
    </svg>
  );
}

function SpeakerOnIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 10v4h4l5 4V6l-5 4H3z" />
      <path d="M16 8a5 5 0 010 8" />
      <path d="M19 5a9 9 0 010 14" />
    </svg>
  );
}
