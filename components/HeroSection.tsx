import Link from "next/link";
import { HiOutlineSparkles, HiOutlineArrowNarrowRight, HiOutlineStar, HiOutlineMap } from "react-icons/hi";
import SearchBar from "./SearchBar";

interface HeroSectionProps {
  onSearchSubmit?: (query: { term: string; location: string; filter: string }) => void;
}

export default function HeroSection({ onSearchSubmit }: HeroSectionProps) {
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
            <Link href="/download" className="button-primary inline-flex items-center gap-2">
              Download the iOS App
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
              Rated 4.9/5 by mindful travelers
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
              <span>Curated this week</span>
            </div>
            <div className="mt-6 rounded-3xl bg-gradient-to-br from-primary via-[#5C9FFF] to-accent p-6 text-white shadow-inner">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">City playlist</p>
                  <h3 className="mt-1 text-2xl font-semibold">Weekend in Lisbon</h3>
                </div>
                <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white/90">4 stays</span>
              </div>
              <p className="mt-4 text-sm text-white/80">
                Rooftop pools, ocean views, and tucked-away coffee corners—handpicked for design lovers and slow travelers.
              </p>
              <div className="mt-6 grid gap-4 text-xs sm:grid-cols-3">
                {["Bairro Alto", "Chiado", "LX Factory"].map((label) => (
                  <span
                    key={label}
                    className="rounded-full bg-white/15 px-3 py-2 text-center font-semibold text-white/90"
                  >
                    {label}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 text-xs text-white/80">
                <span>From $245/night</span>
                <span>Avg. rating 4.8</span>
                <span>New drops every Friday</span>
              </div>
            </div>

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
