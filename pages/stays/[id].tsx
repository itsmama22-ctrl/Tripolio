import Head from "next/head";
import Image from "next/image";
import dynamic from "next/dynamic";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { NearbyAttractions } from "../../components/NearbyAttractions";
import { getStays, getStayById } from "../../lib/stays";
import type { Stay } from "../../types";

const DynamicMap = dynamic(() => import("../../components/MapView").then((mod) => mod.MapView), {
  ssr: false,
});

const DEFAULT_AFFILIATE_URL = "https://klook.tpm.lv/upXwWEwX";

interface StayDetailProps {
  stay: Stay;
}

export default function StayDetailPage({ stay }: StayDetailProps) {
  if (!stay) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>{stay.name} | Tripolio Stay</title>
        <meta name="description" content={stay.shortDescription} />
      </Head>
      <article className="section-wide py-12">
        <Link href="/list" className="text-sm font-semibold text-primary hover:text-accent">
          ← Back to stays
        </Link>
        <header className="mt-6 space-y-4">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            {stay.location.city}, {stay.location.country}
          </span>
          <h1 className="text-4xl font-bold text-slate-900">{stay.name}</h1>
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-600">
            <span className="rounded-full bg-beige/80 px-4 py-1 font-semibold text-slate-700">{stay.price}</span>
            <span className="rounded-full bg-white px-4 py-1 shadow-card">Rating {stay.rating}</span>
          </div>
        </header>
        <section className="mt-8 grid gap-4 md:grid-cols-2">
          {stay.photos.map((photo) => (
            <div key={photo} className="relative aspect-[4/3] overflow-hidden rounded-3xl">
              <Image src={photo} alt={stay.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
            </div>
          ))}
        </section>
        <section className="mt-10 grid gap-10 md:grid-cols-[2fr,1fr]">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">Why we love it</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{stay.description}</p>
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Amenities</h3>
              <ul className="mt-3 grid grid-cols-1 gap-2 text-sm text-slate-600 md:grid-cols-2">
                {stay.amenities.map((amenity) => (
                  <li key={amenity} className="rounded-full bg-beige/80 px-4 py-2">
                    {amenity}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
            <div>
              <h3 className="text-lg font-semibold text-slate-900">Book with partners</h3>
              <p className="text-sm text-slate-600">Tripolio partners with leading booking platforms. Commission helps keep the app free.</p>
            </div>
            <a
              href={stay.affiliateUrl || DEFAULT_AFFILIATE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="button-primary w-full"
            >
              Book now via partner
            </a>
            <p className="text-xs text-slate-500">
              Affiliate disclosure: Tripolio may earn a commission when you book via this link. Pricing is maintained by our partners.
            </p>
            <NearbyAttractions
              latitude={stay.location.latitude}
              longitude={stay.location.longitude}
            />
          </aside>
        </section>
        <section className="mt-12 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-semibold text-slate-900">In the neighborhood</h2>
            <p className="text-sm text-slate-600">Explore the area before you book. Tap pins to preview each stay.</p>
          </div>
          <div className="overflow-hidden rounded-3xl">
            <DynamicMap stays={[stay]} height="320px" showCTA={false} />
          </div>
        </section>
      </article>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const stays = getStays();

  return {
    paths: stays.map((stay) => ({ params: { id: stay.id } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<StayDetailProps> = async ({ params }) => {
  const id = params?.id as string;
  const stay = getStayById(id);

  if (!stay) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      stay,
    },
  };
};
