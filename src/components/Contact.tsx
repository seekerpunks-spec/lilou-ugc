"use client";

import { useTranslations } from "next-intl";
import { motion } from "motion/react";

export function Contact() {
  const t = useTranslations("contact");
  const email = t("email");
  const ig = t("ig");

  return (
    <section
      id="contact"
      className="grain relative isolate overflow-hidden bg-sand py-28 sm:py-36"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-1/3 left-1/2 h-[120vh] w-[120vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(255,46,126,0.35),transparent_60%)] blur-3xl" />
      </div>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-5 sm:px-8">
        <div className="flex flex-col items-center gap-6 text-center">
          <span className="font-display text-xs uppercase tracking-[0.36em] text-neon">
            ✦ {t("kicker")}
          </span>
          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-editorial text-[clamp(2.8rem,9vw,8rem)] leading-[0.94] tracking-[-0.02em] text-ink"
          >
            {t("title_a")}{" "}
            <em className="glow-neon font-editorial italic">
              {t("title_emph")}
            </em>{" "}
            {t("title_b")}
          </motion.h2>
          <p className="max-w-xl text-lg leading-relaxed text-ink/70">
            {t("lede")}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-5">
          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            href={`mailto:${email}`}
            className="group relative flex flex-col justify-between gap-10 rounded-[var(--radius-card)] bg-ink p-8 text-cream transition-all duration-500 hover:bg-neon lg:col-span-3 lg:p-10"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-cream/70">
              <span>{t("email_label")}</span>
              <span aria-hidden>→</span>
            </div>
            <span className="font-editorial text-[clamp(2rem,5vw,4rem)] italic leading-[0.95] text-cream">
              {email}
            </span>
            <span className="font-display text-sm text-cream/70">
              {t("cta")}
            </span>
          </motion.a>

          <motion.a
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-15%" }}
            transition={{
              duration: 0.7,
              delay: 0.1,
              ease: [0.22, 1, 0.36, 1],
            }}
            href={`https://instagram.com/${ig.replace("@", "")}`}
            target="_blank"
            rel="noreferrer noopener"
            className="group flex flex-col justify-between gap-10 rounded-[var(--radius-card)] border border-ink/15 bg-cream p-8 text-ink transition-all duration-500 hover:border-neon hover:bg-cream lg:col-span-2 lg:p-10"
          >
            <div className="flex items-center justify-between text-xs uppercase tracking-[0.3em] text-ink/60">
              <span>{t("ig_label")}</span>
              <span aria-hidden className="transition-transform group-hover:translate-x-1">
                →
              </span>
            </div>
            <span className="font-editorial text-3xl italic text-ink">
              {ig}
            </span>
            <span className="font-hand text-2xl text-clay">on parle ici ✦</span>
          </motion.a>
        </div>

        <p className="text-center font-display text-sm uppercase tracking-[0.28em] text-ink/55">
          {t("based")}
        </p>
      </div>
    </section>
  );
}
