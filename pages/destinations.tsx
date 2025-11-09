import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "../components/Layout";
import { absoluteUrl } from "../lib/seo";

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
    image: "https://images.unsplash.com/photo-1548783307-f63adc2d0439?auto=format&fit=crop&w=1200&q=80",
    link: "https://klook.tpm.lv/DPWpNJ4a",
  },
  {
    name: "Dubai, UAE",
    image: "https://images.unsplash.com/photo-1526481280695-3c469928b67b?auto=format&fit=crop&w=1200&q=80",
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

export default function DestinationsPage() {
  return (
    <Layout>
      <Head>
        <title>Top Destinations | Tripolio Travel Experiences</title>
        <meta
          name="description"
          content="Browse Tripolio’s curated list of top destinations and book unique experiences, tours, and stays through trusted affiliate partners."
        />
        <link rel="canonical" href={absoluteUrl("/destinations")} />
      </Head>

      <section className="section mt-12 space-y-8">
        <header className="space-y-4 text-center">
          <h1 className="text-4xl font-bold text-ink">Top Destinations</h1>
          <p className="mx-auto max-w-2xl text-base text-slate-600">
            Explore globally loved cities and hidden gems. Each destination card links directly to curated Klook experiences with secure affiliate tracking.
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {destinations.map((destination) => (
            <a
              key={destination.name}
              href={destination.link}
              target="_blank"
              rel="nofollow noopener sponsored"
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div className="relative h-56 w-full">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(min-width: 1280px) 30vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 90vw"
                />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <h2 className="text-xl font-semibold text-ink">{destination.name}</h2>
                <p className="text-sm text-slate-600">
                  Tap through for culture-rich tours, culinary walks, and skip-the-line experiences in partnership with Klook.
                </p>
                <span className="mt-auto inline-flex items-center gap-1 text-sm font-semibold text-primary">
                  Book experiences
                  <span aria-hidden>→</span>
                </span>
              </div>
            </a>
          ))}
        </div>

        <div className="rounded-3xl bg-slate-50 p-8 text-center shadow-soft">
          <h2 className="text-2xl font-semibold text-ink">Need a bespoke itinerary?</h2>
          <p className="mt-4 text-sm text-slate-600">
            Our editorial team builds custom affiliate-friendly city playbooks for travel creators and boutique agencies.
          </p>
          <Link href="/contact" className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white shadow-soft hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-card">
            Request a partnership deck
          </Link>
        </div>
      </section>
    </Layout>
  );
}

