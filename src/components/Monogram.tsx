import { cn } from "@/lib/cn";

interface MonogramProps {
  size?: number;
  className?: string;
  /** Stack two letters as a wordmark stack vs side-by-side overlap */
  variant?: "overlap" | "stacked";
  tone?: "light" | "dark";
}

/**
 * "LF" monogram in Pinyon Script. The two letters overlap to share
 * negative space — same DNA as the homepage wordmark.
 */
export function Monogram({
  size = 56,
  className,
  variant = "overlap",
  tone = "light",
}: MonogramProps) {
  const fg = tone === "light" ? "text-espresso" : "text-cream";
  const accent = "text-coral";

  if (variant === "stacked") {
    return (
      <span
        className={cn(
          "relative inline-flex flex-col items-center font-logo leading-[0.7]",
          fg,
          className,
        )}
        style={{ fontSize: size }}
      >
        <span className="relative z-10">L</span>
        <span
          className={cn("relative -mt-[0.55em] -ml-[0.05em]", accent)}
          style={{ marginLeft: "0.1em" }}
        >
          F
        </span>
      </span>
    );
  }

  return (
    <span
      aria-hidden
      className={cn(
        "relative inline-flex items-center font-logo leading-[0.85]",
        fg,
        className,
      )}
      style={{ fontSize: size }}
    >
      <span className="relative z-10">L</span>
      <span
        className={cn("relative", accent)}
        style={{ marginLeft: `-${size * 0.32}px` }}
      >
        F
      </span>
    </span>
  );
}
