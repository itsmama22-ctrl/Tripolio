import Link from "next/link";
import { HiOutlineSparkles, HiOutlineArrowNarrowRight, HiOutlineStar, HiOutlineMap } from "react-icons/hi";
import SearchBar from "./SearchBar";
import type { Stay } from "../types";

interface HeroSectionProps {
  onSearchSubmit?: (query: { term: string; location: string; filter: string }) => void;
  spotlight?: Stay;
  spotlightCount?: number;
}

export default function HeroSection({ onSearchSubmit, spotlight, spotlightCount }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-white to-beige py-20 sm:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />
      </div>

      <div className="section grid gap-16 md:grid-cols-[1.15fr,0.85fr] md:items-center">
        <div className="relative max-w-2xl space-y-10">
          <span className="inline-flex items-center gap-2 rounded-full bg-white/80 px-4 py-1 text-sm font-medium text-primary shadow-card">
            <HiOutlineSparkles className="h-4 w-4" />
            Plan smarter stays
          </span>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.05]">
              Discover curated stays crafted for your <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">travel vibe</span>
            </h1>
            <p className="text-base text-slate-600 sm:text-lg">
              Tripolio connects you to boutique hotels, inspired Airbnbs, and hidden gems in seconds. Compare vibes, amenities, and partner pricing—then book confidently with transparent affiliate support.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/list"
              className="button-primary inline-flex items-center gap-2"
            >
              Browse stays
              <HiOutlineArrowNarrowRight className="h-5 w-5" />
            </Link>
            <Link
              href="/map"
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-white/70 px-5 py-3 text-sm font-semibold text-primary shadow-card hover:border-primary/40 hover:text-accent"
            >
              <HiOutlineMap className="h-5 w-5" />
              Open map explorer
            </Link>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-sm text-slate-600">
            <div className="flex -space-x-3">
              {["TL", "MR", "AX"].map((initials) => (
                <span
                  key={initials}
                  className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-primary to-primary/70 text-sm font-semibold text-white shadow-lg"
                >
                  {initials}
                </span>
              ))}
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-xs font-semibold text-slate-600 shadow-lg">
                +9k
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-700">
              <HiOutlineStar className="h-5 w-5 text-accent" />
              Trusted by mindful travelers worldwide
            </div>
            <div className="rounded-full bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-primary shadow-card">
              Weekly drops · Verified editors
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-col gap-6">
          <div className="relative overflow-hidden rounded-[32px] bg-white/90 p-6 shadow-[0_25px_60px_-25px_rgba(47,128,237,0.35)] ring-1 ring-white/60 backdrop-blur">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wide text-slate-400">
              <span>Tripolio spotlight</span>
              <span>Updated weekly</span>
            </div>
            <article className="mt-6 overflow-hidden rounded-3xl shadow-inner">
              <div className="relative">
                <div
                  className="h-48 bg-cover bg-center"
                  style={{ backgroundImage: `url(${spotlight?.photos?.[0] ?? "/assets/stay-placeholder.svg"})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col gap-3 px-6 pb-6 text-white">
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
                    {spotlight ? `${spotlight.location.city}, ${spotlight.location.country}` : "City playlist"}
                  </span>
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold">{spotlight?.name ?? "Weekend inspiration"}</h3>
                    <p className="text-sm text-white/80">
                      {spotlight?.shortDescription ?? "Handpicked experiences for design lovers and slow travelers."}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-white/80">
                    <span>{spotlight?.price ?? "Compare partner pricing"}</span>
                    {spotlight?.rating ? <span>Avg. rating {spotlight.rating.toFixed(1)}</span> : null}
                    {typeof spotlightCount === "number" && spotlightCount > 1 ? (
                      <span>{spotlightCount} spotlight stays</span>
                    ) : (
                      <span>Verified editors</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="grid gap-2 bg-gradient-to-br from-primary via-[#5C9FFF] to-accent px-6 py-5 text-xs font-semibold text-white sm:grid-cols-3">
                {(spotlight?.amenities?.slice(0, 3) ?? ["Flexible rates", "Local hosts", "Partner perks"]).map((label) => (
                  <span key={label} className="rounded-full bg-white/15 px-3 py-2 text-center">
                    {label}
                  </span>
                ))}
              </div>
              {spotlight?.id && (
                <Link
                  href={`/stays/${spotlight.id}`}
                  className="flex items-center justify-between rounded-b-3xl bg-white/95 px-6 py-4 text-sm font-semibold text-primary hover:text-accent"
                >
                  View stay details
                  <HiOutlineArrowNarrowRight className="h-4 w-4" />
                </Link>
              )}
            </article>

            <div className="mt-6 rounded-3xl bg-white px-5 py-6 shadow-card">
              <div className="mb-4 flex items-center justify-between text-sm font-semibold text-slate-800">
                <span>Find your next stay</span>
                <span className="text-xs font-medium text-primary/80">Search by vibe, destination, or go near me</span>
              </div>
              <SearchBar onSubmit={onSearchSubmit} variant="stacked" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
