"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

interface LangSwitcherProps {
  className?: string;
}

export function LangSwitcher({ className }: LangSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "inline-flex items-center gap-1 rounded-full border border-ink/10 bg-cream/60 p-1 text-xs font-medium uppercase tracking-[0.18em] backdrop-blur",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <button
            key={l}
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            className={cn(
              "rounded-full px-3 py-1 transition-colors duration-300",
              active
                ? "bg-ink text-cream"
                : "text-ink/60 hover:text-ink",
            )}
            aria-pressed={active}
          >
            {l}
          </button>
        );
      })}
    </div>
  );
}
