import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <section className="grain flex min-h-[80svh] flex-col items-center justify-center gap-6 px-5 text-center">
      <span className="font-display text-xs uppercase tracking-[0.36em] text-neon">
        404
      </span>
      <h1 className="font-editorial text-[clamp(3rem,10vw,7rem)] italic leading-none text-ink">
        Page introuvable.
      </h1>
      <Link
        href="/"
        className="rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream transition hover:bg-neon"
      >
        ← Retour à l'accueil
      </Link>
    </section>
  );
}
