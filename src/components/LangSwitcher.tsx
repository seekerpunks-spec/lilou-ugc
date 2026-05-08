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
        "inline-flex items-center gap-0.5 rounded-full border border-line bg-paper/80 p-1 text-[0.65rem] font-medium uppercase tracking-[0.2em] backdrop-blur",
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
              "rounded-full px-2.5 py-1 transition-colors duration-300",
              active
                ? "bg-espresso text-paper"
                : "text-espresso/55 hover:text-espresso",
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
