"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion } from "motion/react";
import { Icon } from "./Icon";
import { images } from "@/data/images";

export function Contact() {
  const t = useTranslations("contact");
  const reduce = useReducedMotion();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-cream pt-12 pb-20 sm:pt-16 sm:pb-24"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-5 sm:px-8">
        {/* Coral CTA card */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-15%" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 overflow-hidden rounded-[var(--radius-card)] bg-coral text-paper shadow-soft-lg sm:grid-cols-12"
        >
          {/* Photo */}
          <div className="relative aspect-[4/3] sm:col-span-4 sm:aspect-auto">
            <Image
              src={images.contact.src}
              alt={images.contact.alt}
              fill
              sizes="(max-width: 640px) 100vw, 320px"
              className="object-cover"
            />
          </div>

          {/* Copy + CTA */}
          <div className="flex flex-col justify-center gap-5 px-7 py-9 sm:col-span-8 sm:px-9 sm:py-10">
            <h2 className="max-w-2xl font-serif text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-[1.15] tracking-[-0.005em] text-paper">
              {t("title_a")}{" "}
              <em className="italic">{t("title_emph")}</em>
            </h2>
            <a
              href={`mailto:${t("email")}`}
              className="inline-flex w-fit items-center gap-2.5 rounded-full bg-paper px-6 py-3 text-sm font-medium text-coral shadow-soft transition-all hover:-translate-y-0.5 hover:bg-cream"
            >
              {t("cta")}
              <Icon name="arrow" className="h-3.5 w-3.5" />
            </a>
          </div>
        </motion.div>

        {/* Info row */}
        <ul className="grid grid-cols-2 items-center gap-6 px-1 text-sm text-espresso/85 sm:grid-cols-4 sm:gap-4 sm:px-2">
          <li className="flex items-center gap-2.5">
            <Icon name="instagram" className="h-5 w-5 text-coral" />
            <a
              href={`https://instagram.com/${t("ig").replace("@", "")}`}
              target="_blank"
              rel="noreferrer noopener"
              className="underline-offset-4 hover:underline"
            >
              {t("ig")}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <Icon name="mail" className="h-5 w-5 text-coral" />
            <a
              href={`mailto:${t("email")}`}
              className="truncate underline-offset-4 hover:underline"
            >
              {t("email")}
            </a>
          </li>
          <li className="flex items-center gap-2.5">
            <Icon name="pin" className="h-5 w-5 text-coral" />
            <span>{t("loc")}</span>
          </li>
          <li className="flex items-center justify-end gap-2 pr-2">
            <span className="font-script text-2xl text-coral">
              à très vite ! ♡
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
