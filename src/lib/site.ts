import { routing } from "@/i18n/routing";

/**
 * Production origin used for canonical URLs, hreflang, sitemap and OG tags.
 * TODO: the domain ugcbylilou.com still has to be purchased and attached to
 * the Vercel project.
 */
export const SITE_URL = "https://ugcbylilou.com";

/** Path of the home page for a locale (`localePrefix: "as-needed"`). */
export function localePath(locale: string) {
  return locale === routing.defaultLocale ? "/" : `/${locale}`;
}
