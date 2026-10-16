import type { MetadataRoute } from "next";
import { routing } from "@/i18n/routing";
import { SITE_URL, localePath } from "@/lib/site";

const abs = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map((l) => [l, abs(localePath(l))]),
  );
  return routing.locales.map((locale) => ({
    url: abs(localePath(locale)),
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
