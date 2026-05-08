import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Bio } from "@/components/Bio";
import { LocalHeroes } from "@/components/LocalHeroes";
import { BrandCollabs } from "@/components/BrandCollabs";
import { Process } from "@/components/Process";
import { Services } from "@/components/Services";
import { Materials } from "@/components/Materials";
import { Contact } from "@/components/Contact";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <TrustBar />
      <Bio />
      <LocalHeroes />
      <BrandCollabs />
      <Process />
      <Services />
      <Materials />
      <Contact />
    </>
  );
}
