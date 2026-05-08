"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
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
      className="relative overflow-hidden bg-cream py-20 sm:py-28"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-8">
        <h2 className="font-serif text-[clamp(2rem,3.8vw,3rem)] font-medium leading-[1.05] tracking-[-0.005em] text-espresso">
          {t("title")}
        </h2>

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
                  "relative flex flex-col gap-6 rounded-[var(--radius-card)] p-7 text-center shadow-soft transition-all duration-500 hover:shadow-soft-lg sm:p-8",
                  featured
                    ? "border-2 border-coral bg-coral text-paper lg:-mt-3 lg:scale-[1.02]"
                    : "border border-line bg-paper text-espresso",
                )}
              >
                {featured && (
                  <span className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-paper/60 bg-coral-deep px-3.5 py-1 text-[0.6rem] font-semibold uppercase tracking-[0.22em] text-paper shadow-soft">
                    Le plus populaire
                  </span>
                )}

                <div className="flex flex-col gap-1.5">
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
                      "text-[0.82rem] leading-relaxed",
                      featured ? "text-paper/85" : "text-mocha",
                    )}
                  >
                    {tier.tagline}
                  </p>
                </div>

                <ul className="flex flex-col gap-2 text-[0.85rem]">
                  {tier.items.map((item) => (
                    <li
                      key={item}
                      className={cn(
                        "leading-snug",
                        featured ? "text-paper/95" : "text-espresso/80",
                      )}
                    >
                      {item}
                    </li>
                  ))}
                </ul>

                <span
                  className={cn(
                    "mt-auto pt-4 font-serif text-3xl font-medium",
                    featured ? "text-paper" : "text-coral",
                  )}
                >
                  {tier.price}
                </span>
              </motion.article>
            );
          })}
        </div>

        <p className="text-center text-[0.78rem] text-warm-stone">
          {t("footnote")}
        </p>
      </div>
    </section>
  );
}
