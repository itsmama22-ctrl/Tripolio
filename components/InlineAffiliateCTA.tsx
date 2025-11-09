import Link from "next/link";
import type { AffiliateCTA } from "../types";

interface InlineAffiliateCTAProps {
  cta: AffiliateCTA;
  variant?: "primary" | "secondary";
}

export function InlineAffiliateCTA({ cta, variant = "primary" }: InlineAffiliateCTAProps) {
  const borderClasses = variant === "primary" ? "border-primary/20 bg-primary/5" : "border-accent/20 bg-white";
  const headlineClasses = variant === "primary" ? "text-primary" : "text-ink";

  return (
    <aside className={`my-10 rounded-3xl border ${borderClasses} p-6 shadow-soft`}>
      <p className={`text-xs uppercase tracking-wide ${headlineClasses}`}>Affiliate pick</p>
      <h3 className="mt-2 text-xl font-semibold text-ink">{cta.headline}</h3>
      <p className="mt-3 text-sm text-slate-600">{cta.body}</p>
      <Link
        href={cta.url}
        target="_blank"
        rel="nofollow noopener sponsored"
        className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-card"
      >
        {cta.ctaLabel}
      </Link>
    </aside>
  );
}

