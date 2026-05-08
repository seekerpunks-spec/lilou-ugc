"use client";

import { useEffect, useId, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import type { ProjectMedia } from "@/data/images";
import {
  claimAudio,
  isAudioUnlocked,
  registerAudio,
  releaseAudio,
} from "@/lib/audio-coordinator";
import { cn } from "@/lib/cn";

interface VideoCardProps {
  media: ProjectMedia;
  /**
   * Card aspect:
   *  - "reel"      → 9/16 native (best for vertical Reels, no crop)
   *  - "portrait"  → 3/4, slight letterbox filled with blurred poster
   *  - "square"    → 1/1, larger letterbox filled with blurred poster
   */
  aspect?: "reel" | "portrait" | "square";
  /**
   * Stays at its poster: no autoplay, no hover, no audio button.
   */
  paused?: boolean;
  /**
   * When true, attempts to autoplay with sound as soon as the card
   * enters the viewport. Falls back to muted autoplay if the browser
   * blocks unmuted autoplay (no prior user gesture).
   */
  audible?: boolean;
}

export function VideoCard({
  media,
  aspect = "portrait",
  paused = false,
  audible = false,
}: VideoCardProps) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const id = useId();
  const [isTouch, setIsTouch] = useState(false);
  const [muted, setMuted] = useState(true);
  const [userMuted, setUserMuted] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    setIsTouch(!window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  /* Audio coordinator: forced mute when another card claims focus */
  useEffect(() => {
    return registerAudio(id, (isActive) => {
      if (!isActive) {
        setMuted(true);
        const el = ref.current;
        if (el) el.muted = true;
      }
    });
  }, [id]);

  /* When paused flips on, freeze on the poster */
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (paused) {
      el.pause();
      el.currentTime = 0;
      el.muted = true;
      setMuted(true);
      setUserMuted(false);
    }
  }, [paused]);

  /* Audible mode: try unmuted autoplay when in viewport */
  useEffect(() => {
    if (paused || !audible) return;
    const el = ref.current;
    if (!el) return;

    const tryPlayUnmuted = async () => {
      try {
        el.muted = false;
        el.volume = 0.6;
        await el.play();
        setMuted(false);
        claimAudio(id);
      } catch {
        // Browser blocked unmuted autoplay → fall back to muted
        el.muted = true;
        setMuted(true);
        try {
          await el.play();
        } catch {
          /* already paused or blocked */
        }
      }
    };

    const tryPlayMuted = async () => {
      el.muted = true;
      setMuted(true);
      try {
        await el.play();
      } catch {
        /* ignore */
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (userMuted) {
            tryPlayMuted();
          } else if (isAudioUnlocked()) {
            tryPlayUnmuted();
          } else {
            tryPlayUnmuted(); // attempt; falls back to muted on rejection
          }
        } else {
          el.pause();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      el.pause();
      el.muted = true;
      setMuted(true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [audible, paused, id]);

  /* Cleanup audio claim on unmount */
  useEffect(() => () => releaseAudio(id), [id]);

  const onEnter = () => {
    if (reduce || isTouch || paused || audible) return;
    const el = ref.current;
    if (!el) return;
    if (el.paused) el.play().catch(() => undefined);
  };
  const onLeave = () => {
    if (reduce || isTouch || paused || audible) return;
    const el = ref.current;
    if (!el) return;
    if (muted) el.pause();
  };

  const toggleMute = () => {
    const el = ref.current;
    if (!el) return;
    if (muted) {
      claimAudio(id);
      setMuted(false);
      setUserMuted(false);
      el.muted = false;
      el.volume = 0.6;
      el.play().catch(() => undefined);
    } else {
      releaseAudio(id);
      setMuted(true);
      setUserMuted(true);
      el.muted = true;
    }
  };

  const aspectClass =
    aspect === "reel"
      ? "aspect-[9/16]"
      : aspect === "square"
        ? "aspect-square"
        : "aspect-[3/4]";

  return (
    <div
      className={cn("relative w-full overflow-hidden bg-shell", aspectClass)}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {aspect !== "reel" && (
        <div
          aria-hidden
          className="absolute inset-0 scale-110"
          style={{
            backgroundImage: `url(${media.poster})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            filter: "blur(28px) saturate(1.1)",
            opacity: 0.55,
          }}
        />
      )}
      {aspect !== "reel" && (
        <div aria-hidden className="absolute inset-0 bg-cream/30" />
      )}

      <video
        ref={ref}
        src={media.video}
        poster={media.poster}
        muted={muted}
        loop
        playsInline
        preload="metadata"
        aria-label={media.alt}
        className="relative h-full w-full object-contain"
      />

      <span
        aria-hidden
        className="pointer-events-none absolute left-3 top-3 z-10 inline-flex h-6 items-center gap-1 rounded-full bg-paper/90 px-2.5 text-[0.62rem] font-semibold uppercase tracking-[0.18em] text-espresso shadow-soft"
      >
        <svg width="9" height="10" viewBox="0 0 9 10" className="fill-coral">
          <path d="M0 0v10l9-5z" />
        </svg>
        Reel
      </span>

      {!paused && (
        <button
          type="button"
          onClick={toggleMute}
          aria-label={muted ? "Activer le son" : "Couper le son"}
          aria-pressed={!muted}
          className={cn(
            "absolute right-3 top-3 z-10 inline-flex h-9 w-9 items-center justify-center rounded-full backdrop-blur transition-all",
            muted
              ? "bg-paper/85 text-espresso hover:bg-paper"
              : "bg-coral text-paper shadow-soft",
          )}
        >
          {muted ? <SpeakerOffIcon /> : <SpeakerOnIcon />}
        </button>
      )}
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
