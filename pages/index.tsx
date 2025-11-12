import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { Layout } from "../components/Layout";
import type { BlogPost } from "../types";
import { fetchPublishedPosts } from "../lib/blog";
import { absoluteUrl } from "../lib/seo";
import BookingHero from "../components/BookingHero";

const destinations = [
  {
    name: "Paris, France",
    image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1200&q=80",
    link: "https://klook.tpm.lv/E7mvBpuw",
  },
  {
    name: "Tokyo, Japan",
    image: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?auto=format&fit=crop&w=1200&q=80",
    link: "https://klook.tpm.lv/jVvDqH2u",
  },
  {
    name: "New York, USA",
    image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1200&q=80",
    link: "https://klook.tpm.lv/SHtqk4Ad",
  },
  {
    name: "Marrakesh, Morocco",
    image: "/images/marrakesh.jpg",
    link: "https://klook.tpm.lv/DPWpNJ4a",
  },
  {
    name: "Dubai, UAE",
    image: "/images/dubai.jpg",
    link: "https://klook.tpm.lv/KD3ANcN8",
  },
  {
    name: "Bali, Indonesia",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80",
    link: "https://klook.tpm.lv/dmie9vAB",
  },
  {
    name: "London, UK",
    image: "https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba?auto=format&fit=crop&w=1200&q=80",
    link: "https://klook.tpm.lv/Rm6IcUh7",
  },
  {
    name: "Rome, Italy",
    image: "https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=1200&q=80",
    link: "https://klook.tpm.lv/ZLwbfXUX",
  },
];

interface HomeProps {
  featuredPosts: BlogPost[];
}

export default function HomePage({ featuredPosts }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Tripolio | Discover &amp; Book Unique Experiences Around the World</title>
        <meta
          name="description"
          content="Tripolio curates unforgettable city guides, boutique stays, and tours. Discover and book unique experiences through trusted affiliate partners around the world."
        />
        <link rel="canonical" href={absoluteUrl("/")} />
        <meta property="og:title" content="Tripolio | Discover & Book Unique Experiences Around the World" />
        <meta
          property="og:description"
          content="Travel affiliate hub featuring curated destinations, scheduled SEO guides, and partner-ready CTAs."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl("/")} />
        <meta property="og:image" content={absoluteUrl("/assets/tripolio-logo.svg")} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content="Tripolio | Discover & Book Unique Experiences Around the World" />
        <meta
          name="twitter:description"
          content="Browse destinations, read automated guides, and monetise bookings with Tripolio’s affiliate network."
        />
      </Head>
      <BookingHero />

      <section id="destinations" className="section mt-24 space-y-10">
        <header className="space-y-3 text-center">
          <h2 className="text-3xl font-semibold text-ink">Top Destinations</h2>
          <p className="text-slate-600">Click through to explore curated tours, unique experiences, and stay ideas powered by our affiliate partners.</p>
        </header>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <a
              key={destination.name}
              href={destination.link}
              target="_blank"
              rel="nofollow noopener sponsored"
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition duration-200 hover:-translate-y-1 hover:shadow-card"
            >
              <div className="relative h-56 w-full overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 45vw, 90vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <h3 className="text-lg font-semibold text-ink">{destination.name}</h3>
                <p className="text-sm text-slate-500">Discover signature food tours, museum passes, and once-in-a-lifetime experiences.</p>
                <span className="mt-auto inline-flex items-center text-sm font-semibold text-primary">Plan this trip →</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <section className="section mt-24 grid gap-10 lg:grid-cols-[1.1fr,0.9fr] lg:items-center">
        <div className="space-y-5">
          <h2 className="text-3xl font-semibold text-ink">Plan smarter with editorial travel playbooks</h2>
          <p className="text-slate-600">
            Each Tripolio feature blends local insights with booking-ready affiliate CTAs so you can turn inspiration into action in minutes. Our guides include top activities powered by Klook, plus hotel recommendations you can swap with Booking or Expedia partners.
          </p>
          <ul className="space-y-3 text-sm text-slate-600">
            <li>• Built-in SEO structure with H2/H3 sections and keyword-rich headings.</li>
            <li>• Structured data, rich social previews, and share-ready cards.</li>
            <li>• Automatic sitemap updates and on-demand ISR revalidation for fresh content.</li>
          </ul>
        </div>
        <div className="rounded-[36px] bg-slate-50 p-8 shadow-soft">
          <h3 className="text-xl font-semibold text-ink">Automated publishing cadence</h3>
          <p className="mt-4 text-sm text-slate-600">
            A Supabase-powered scheduler checks the content queue daily and flips posts live when their scheduled date arrives. Configure Vercel Cron or GitHub Actions to ping the secure endpoint and keep your travel blog fresh without manual work.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Start date</p>
              <p className="text-lg font-semibold text-ink">10 Nov 2025</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-xs uppercase tracking-wide text-slate-500">Cadence</p>
              <p className="text-lg font-semibold text-ink">Every 4 days</p>
            </div>
          </div>
        </div>
      </section>

      <section className="section mt-24 space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold text-ink">Latest stories</h2>
            <p className="text-sm text-slate-600">Freshly scheduled guides go live automatically — here’s what’s queued up next.</p>
          </div>
          <Link href="/blog" className="button-secondary">
            Browse the blog
          </Link>
        </header>
        <div className="grid gap-6 md:grid-cols-3">
          {featuredPosts.map((post) => (
            <article key={post.slug} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <div className="relative h-48 w-full">
                <Image
                  src={post.imageUrl}
                  alt={post.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 30vw, (min-width: 768px) 45vw, 90vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                  <span>{new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h3 className="text-lg font-semibold text-ink">{post.title}</h3>
                <p className="text-sm text-slate-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read guide →
                </Link>
              </div>
            </article>
          ))}
          {featuredPosts.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
              Scheduled posts will appear here after you configure Supabase or add placeholder content.
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const { posts } = await fetchPublishedPosts(1, 3);

  return {
    props: {
      featuredPosts: posts,
    },
    revalidate: 60 * 60,
  };
}
