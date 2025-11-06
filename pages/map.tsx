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
          content="Explore Tripolio stays on an interactive map powered by OpenStreetMap and Leaflet. Discover hotels, Airbnbs, and retreats."
        />
      </Head>
      <section className="section py-12">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Interactive Map</h1>
          <p className="text-sm text-slate-600">
            Zoom and tap to discover curated stays around the world. Each pin is updated weekly with fresh partner drops.
          </p>
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
