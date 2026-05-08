"use client";

import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";

interface Quote {
  body: string;
  author: string;
  role: string;
  accent: string;
}

const quotes: Record<string, Quote[]> = {
  fr: [
    {
      body: "Lilou a transformé un brief vague en une vidéo qu'on a passée en paid social pendant 6 semaines. ROAS au-dessus du benchmark.",
      author: "Maxime · Marketing",
      role: "DTC Beauté",
      accent: "from-coral to-neon",
    },
    {
      body: "Réactive, pro, livre toujours en avance. On a refait 3 vidéos avec elle ce trimestre et on signe pour un retainer.",
      author: "Élodie · Fondatrice",
      role: "Marque locale Var",
      accent: "from-sun to-coral",
    },
    {
      body: "Tournage en immersion dans le salon, livraison en 4 jours, retours clients dingues. La meilleure UGC qu'on ait eue.",
      author: "Sophie · Salon partenaire",
      role: "Beauté · Hyères",
      accent: "from-neon to-sea",
    },
  ],
  en: [
    {
      body: "Lilou turned a vague brief into a video we ran in paid social for six weeks. ROAS above benchmark.",
      author: "Maxime · Marketing",
      role: "Beauty DTC",
      accent: "from-coral to-neon",
    },
    {
      body: "Sharp, pro, always early. Three videos this quarter and we're locking in a retainer.",
      author: "Élodie · Founder",
      role: "Local Var brand",
      accent: "from-sun to-coral",
    },
    {
      body: "Filmed in our salon, delivered in 4 days, client feedback was wild. The best UGC we've had.",
      author: "Sophie · Salon partner",
      role: "Beauty · Hyères",
      accent: "from-neon to-sea",
    },
  ],
};

interface TestimonialsProps {
  locale: "fr" | "en";
}

export function Testimonials({ locale }: TestimonialsProps) {
  const t = useTranslations("testimonials");
  const reduce = useReducedMotion();
  const list = quotes[locale];

  return (
    <section className="grain relative overflow-hidden bg-cream py-28 sm:py-36">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-16 px-5 sm:px-8">
        <div className="flex max-w-3xl flex-col gap-6">
          <span className="flex items-center gap-3 font-display text-xs uppercase tracking-[0.36em] text-neon">
            <span aria-hidden className="inline-block h-px w-10 bg-neon" />
            {t("kicker")}
          </span>
          <h2 className="font-editorial text-[clamp(2.6rem,7vw,6rem)] leading-[0.92] tracking-[-0.02em] text-ink">
            {t("title_a")}{" "}
            <em className="font-editorial italic text-neon">
              {t("title_emph")}
            </em>
            {t("title_b")}
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {list.map((q, i) => (
            <motion.figure
              key={q.author}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-15%" }}
              transition={{
                duration: 0.8,
                delay: i * 0.08,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative flex flex-col gap-8 rounded-[var(--radius-card)] border border-ink/10 bg-sand p-8 transition-all duration-500 hover:-translate-y-1 hover:border-neon/40 ${
                i % 3 === 1 ? "lg:translate-y-8" : ""
              }`}
            >
              <span
                aria-hidden
                className={`pointer-events-none absolute -top-6 left-6 font-editorial text-[6rem] italic leading-none text-neon/80`}
              >
                "
              </span>
              <blockquote className="relative font-editorial text-2xl italic leading-snug text-ink/85">
                {q.body}
              </blockquote>
              <figcaption className="flex items-end justify-between gap-3 border-t border-ink/10 pt-5">
                <div>
                  <span className="block font-display text-sm font-medium text-ink">
                    {q.author}
                  </span>
                  <span className="font-display text-[10px] uppercase tracking-[0.24em] text-ink/55">
                    {q.role}
                  </span>
                </div>
                <span
                  aria-hidden
                  className={`h-8 w-8 rounded-full bg-gradient-to-br ${q.accent} shadow-[0_8px_20px_-6px_rgba(255,46,126,0.5)]`}
                />
              </figcaption>
            </motion.figure>
          ))}
        </div>

        <p className="font-hand text-2xl text-clay">
          {t("note")} <span className="text-neon">✦</span>
        </p>
      </div>
    </section>
  );
}
