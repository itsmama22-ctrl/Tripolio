import Head from "next/head";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import HeroSection from "../components/HeroSection";
import { Layout } from "../components/Layout";
import { StayCard } from "../components/StayCard";
import { GuideCard } from "../components/GuideCard";
import SearchBar from "../components/SearchBar";
import { NewsletterSignup } from "../components/NewsletterSignup";
import { filterStays } from "../lib/stays";
import { getPosts } from "../lib/posts";
import type { Stay, BlogPost } from "../types";

const DynamicMap = dynamic(() => import("../components/MapView").then((mod) => mod.MapView), {
  ssr: false,
});

interface HomeProps {
  featured: Stay[];
  guides: BlogPost[];
}

export default function HomePage({ featured, guides }: HomeProps) {
  const router = useRouter();
  const heroGuide = guides[0];
  const otherGuides = guides.slice(1, 4);

  const handleSearch = (query: { term: string; location: string; filter: string }) => {
    const params = new URLSearchParams();
    if (query.term) params.append("term", query.term);
    if (query.location) params.append("location", query.location);
    if (query.filter) params.append("filter", query.filter);
    router.push(`/list?${params.toString()}`);
  };

  return (
    <Layout>
      <Head>
        <title>Tripolio | Curated Stays & Travel Affiliate Hub</title>
        <meta
          name="description"
          content="Discover curated hotels, Airbnbs, and retreats across the globe with Tripolio. Compare stays, follow editorial guides, and book via trusted affiliate partners."
        />
      </Head>
      <HeroSection onSearchSubmit={handleSearch} />
      {heroGuide && (
        <section className="section mt-16 grid gap-6 md:grid-cols-[1.4fr,0.9fr]">
          <article className="relative overflow-hidden rounded-[32px] bg-slate-900 text-white shadow-card">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${heroGuide.coverImage})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-900/10" />
            <div className="relative flex h-full flex-col justify-end gap-6 p-10">
              <div className="space-y-4">
                <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/20 px-4 py-2 text-xs font-semibold uppercase tracking-wide text-white/90">
                  Editors' picks
                </span>
                <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">{heroGuide.title}</h2>
                <p className="max-w-xl text-sm text-white/80 md:text-base">{heroGuide.excerpt}</p>
              </div>
              <div className="flex flex-wrap items-center gap-4 text-xs text-white/70">
                <span>
                  {new Date(heroGuide.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>{heroGuide.category}</span>
                <Link href={`/blog/${heroGuide.slug}`} className="inline-flex items-center gap-2 text-sm font-semibold text-white hover:text-accent">
                  Read the guide
                </Link>
              </div>
            </div>
          </article>
          <div className="grid gap-4 md:grid-rows-3">
            {otherGuides.map((post) => (
              <GuideCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}
      <section className="section mt-16">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-2xl font-semibold text-slate-900">Curated for this week</h2>
          <Link href="/list" className="text-sm font-semibold text-primary hover:text-accent">
            Browse all stays
          </Link>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {featured.map((stay) => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>
      </section>
      <section className="section mt-20">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900">Explore on the Tripolio Map</h2>
            <p className="text-sm text-slate-600">Pins update weekly with new partner drops and community favorites.</p>
          </div>
          <Link href="/map" className="button-primary">
            Open full map
          </Link>
        </div>
        <div className="mt-6 overflow-hidden rounded-3xl">
          <DynamicMap stays={featured} height="420px" />
        </div>
      </section>
      <section className="section mt-20 grid gap-8 md:grid-cols-3">
        {[
          {
            title: "Join the drops",
            body: "Subscribe for Friday emails featuring new stays, price alerts, and beta invites.",
            cta: "Join newsletter",
            href: "#newsletter",
          },
          {
            title: "Share your map",
            body: "Save curated itineraries in Tripolio and send them to co-travelers for instant alignment.",
            cta: "Open map",
            href: "/map",
          },
          {
            title: "Pitch a stay",
            body: "Know a design-led gem? Email itsmama22@gmail.com and help shape the next Tripolio drop.",
            cta: "Email editorial",
            href: "mailto:itsmama22@gmail.com",
          },
        ].map((item) => (
          <article key={item.title} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card">
            <h3 className="text-xl font-semibold text-slate-900">{item.title}</h3>
            <p className="text-sm text-slate-600">{item.body}</p>
            {item.href.startsWith("mailto:") ? (
              <a href={item.href} className="mt-auto text-sm font-semibold text-primary hover:text-accent">
                {item.cta}
              </a>
            ) : (
              <Link href={item.href} className="mt-auto text-sm font-semibold text-primary hover:text-accent">
                {item.cta}
              </Link>
            )}
          </article>
        ))}
      </section>
      <section className="section mt-20">
        <div className="rounded-3xl bg-white p-8 shadow-card">
          <h2 className="text-xl font-semibold text-slate-900">Search the full Tripolio collection</h2>
          <p className="text-sm text-slate-600">Filter by stay type, location, and vibe to find your perfect match.</p>
          <div className="mt-6">
            <SearchBar onSubmit={handleSearch} />
          </div>
        </div>
      </section>
      <NewsletterSignup />
    </Layout>
  );
}

export async function getStaticProps() {
  const featured = filterStays({}).slice(0, 6);
  const guides = getPosts().slice(0, 4);

  return {
    props: {
      featured,
      guides,
    },
  };
}
