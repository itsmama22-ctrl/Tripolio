import Head from "next/head";
import dynamic from "next/dynamic";
import { Layout } from "../components/Layout";
import { getStays } from "../lib/stays";
import type { Stay } from "../types";

const DynamicMap = dynamic(() => import("../components/MapView").then((mod) => mod.MapView), {
  ssr: false,
});

interface MapPageProps {
  stays: Stay[];
}

export default function MapPage({ stays }: MapPageProps) {
  return (
    <Layout>
      <Head>
        <title>Tripolio Map | Interactive Stay Explorer</title>
        <meta
          name="description"
          content="Explore Tripolio stays on an interactive map powered by OpenStreetMap and Leaflet. Filter global hotels, Airbnbs, retreats, and nearby attractions in one glance."
        />
      </Head>
      <section className="section py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Interactive Map</h1>
          <p className="text-sm text-slate-600">
            Zoom, filter, and tap to discover curated stays across every continent. Pins refresh weekly with new partner drops, community nominations, and Tripolio editor picks.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-slate-600">
            <li>• Toggle clusters to inspect neighborhoods, then save favourites to your Tripolio collection.</li>
            <li>• Click a stay to jump straight to the detail page or booking CTA—affiliate perks included.</li>
            <li>• Layer nearby attractions powered by OpenTripMap to round out day-by-day itineraries.</li>
          </ul>
        </div>
        <div className="mt-8 overflow-hidden rounded-3xl border border-white shadow-card">
          <DynamicMap stays={stays} height="640px" />
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const stays = getStays();
  return {
    props: {
      stays,
    },
  };
}
