"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";
import { cn } from "@/lib/cn";

interface Tier {
  id: string;
  name: string;
  tagline: string;
  items: string[];
  price: string;
}

export function Offers() {
  const t = useTranslations("offers");
  const reduce = useReducedMotion();
  const tiers = t.raw("tiers") as Tier[];

  return (
    <section
      id="offers"
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-12 px-5 sm:px-8">
        <div className="flex flex-col items-center gap-5 text-center">
          <span className="flex items-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.32em] text-coral">
            <Icon name="spark" className="h-3.5 w-3.5 text-sun" />
            {t("kicker")}
          </span>
          <h2 className="font-serif text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.05] tracking-[-0.01em] text-espresso">
            {t("title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:items-stretch">
          {tiers.map((tier, i) => {
            const featured = i === 1;
            return (
              <motion.article
                key={tier.id}
                initial={reduce ? false : { opacity: 0, y: 22 }}
                whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-12%" }}
                transition={{
                  duration: 0.7,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className={cn(
                  "relative flex flex-col gap-6 rounded-[var(--radius-card-lg)] p-8 shadow-soft transition-all duration-500 hover:shadow-soft-lg sm:p-10",
                  featured
                    ? "border-2 border-coral bg-coral text-paper lg:-mt-3 lg:scale-[1.02]"
                    : "border border-line bg-paper text-espresso",
                )}
              >
                {featured && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/60 bg-coral-deep px-3.5 py-1 text-[0.6rem] font-medium uppercase tracking-[0.28em] text-paper shadow-soft">
                    ✦ {t("popular")}
                  </span>
                )}

                <div className="flex flex-col gap-2 text-center">
                  <h3
                    className={cn(
                      "font-serif text-2xl font-medium",
                      featured ? "text-paper" : "text-espresso",
                    )}
                  >
                    {tier.name}
                  </h3>
                  <p
                    className={cn(
                      "text-sm",
                      featured ? "text-paper/85" : "text-mocha",
                    )}
                  >
                    {tier.tagline}
                  </p>
                </div>

                <ul className="flex flex-col gap-2.5 text-sm">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2.5 leading-snug"
                    >
                      <span
                        className={cn(
                          "mt-1 inline-flex h-1.5 w-1.5 shrink-0 rounded-full",
                          featured ? "bg-paper" : "bg-coral",
                        )}
                      />
                      <span
                        className={
                          featured ? "text-paper/95" : "text-espresso/85"
                        }
                      >
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-auto flex flex-col items-center gap-4 pt-4">
                  <span
                    className={cn(
                      "font-serif text-2xl",
                      featured ? "text-paper" : "text-coral",
                    )}
                  >
                    {tier.price}
                  </span>
                  <a
                    href="#contact"
                    className={cn(
                      "inline-flex w-full items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-medium transition-all hover:-translate-y-0.5",
                      featured
                        ? "bg-paper text-coral hover:bg-cream"
                        : "border border-line bg-shell text-espresso hover:border-espresso/40",
                    )}
                  >
                    {tier.name === "Starter"
                      ? "Choisir"
                      : tier.name === "Growth"
                        ? "Réserver"
                        : "En parler"}
                    <Icon name="arrow" className="h-3.5 w-3.5" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <p className="text-center text-xs text-warm-stone">{t("footnote")}</p>
      </div>
    </section>
  );
}
