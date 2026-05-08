"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";

export function Contact() {
  const t = useTranslations("contact");
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-cream py-24 sm:py-32"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 gap-0 overflow-hidden rounded-[var(--radius-card-lg)] border border-line bg-coral text-paper shadow-soft-lg lg:grid-cols-12"
        >
          {/* Photo */}
          <div className="relative aspect-[4/3] lg:col-span-4 lg:aspect-auto">
            <div className="absolute inset-0 bg-[linear-gradient(165deg,#f5d6b0_0%,#ec9c75_45%,#a0593f_100%)]" />
            <div
              aria-hidden
              className="absolute inset-0"
              style={{
                background:
                  "radial-gradient(circle at 30% 25%, rgba(255,250,235,0.5), transparent 55%)",
              }}
            />
            <span className="absolute bottom-6 left-6 font-script text-2xl text-paper/95">
              ☼ on the beach
            </span>
          </div>

          {/* Copy + CTA */}
          <div className="flex flex-col justify-center gap-7 px-7 py-10 sm:px-10 lg:col-span-8 lg:py-14">
            <span className="text-[0.65rem] font-medium uppercase tracking-[0.32em] text-paper/70">
              ✦ {t("kicker")}
            </span>
            <h2 className="max-w-2xl font-serif text-[clamp(1.9rem,3.6vw,3rem)] font-medium leading-[1.1] tracking-[-0.005em] text-paper">
              {t("title_a")}{" "}
              <em className="italic">{t("title_emph")}</em>
            </h2>

            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${t("email")}`}
                className="inline-flex items-center gap-2.5 rounded-full bg-paper px-7 py-3.5 text-sm font-medium text-coral shadow-soft transition-all hover:-translate-y-0.5 hover:bg-cream"
              >
                {t("cta")}
                <Icon name="arrow" className="h-3.5 w-3.5" />
              </a>
            </div>

            <ul className="grid grid-cols-1 gap-4 border-t border-paper/20 pt-6 text-sm sm:grid-cols-3">
              <li className="flex items-center gap-3">
                <Icon name="instagram" className="h-5 w-5 text-paper/85" />
                <a
                  href={`https://instagram.com/${t("ig").replace("@", "")}`}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-paper/95 underline-offset-4 hover:underline"
                >
                  {t("ig")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="mail" className="h-5 w-5 text-paper/85" />
                <a
                  href={`mailto:${t("email")}`}
                  className="text-paper/95 underline-offset-4 hover:underline"
                >
                  {t("email")}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Icon name="pin" className="h-5 w-5 text-paper/85" />
                <span className="text-paper/95">{t("loc")}</span>
              </li>
            </ul>

            <span className="font-script text-2xl text-paper/95">
              à très vite ! ♡
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
