import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Layout } from "../components/Layout";

export default function DownloadPage() {
  return (
    <Layout>
      <Head>
        <title>Download Tripolio | iOS App</title>
        <meta
          name="description"
          content="Download the Tripolio iOS app to discover curated stays, save favorites, and book via affiliate partners on the go."
        />
      </Head>
      <section className="section grid gap-12 py-16 md:grid-cols-2 md:items-center">
        <div className="space-y-6">
          <span className="inline-flex rounded-full bg-primary/10 px-4 py-1 text-sm font-semibold text-primary">
            iOS exclusive
          </span>
          <h1 className="text-4xl font-bold text-slate-900">Tripolio, in your pocket</h1>
          <p className="text-sm text-slate-600">
            Swipe through curated collections, drop pins to your wishlist, and book with trusted partners from anywhere. Stay filters, offline guides, and airport-lounge recommendations—optimized for the traveler in motion.
          </p>
          <Link
            href="https://apps.apple.com/us/app"
            className="button-primary inline-flex items-center gap-2"
            target="_blank"
            rel="noopener noreferrer"
          >
            Download on the App Store
          </Link>
          <p className="text-xs text-slate-500">Android waitlist launching soon. Subscribe to the newsletter for updates.</p>
        </div>
        <div className="rounded-3xl bg-white p-6 shadow-card">
          <div className="relative aspect-[9/19] w-full overflow-hidden rounded-3xl bg-slate-100">
            <Image src="/assets/app-mock.svg" alt="Tripolio app mockup" fill className="object-cover" />
          </div>
          <p className="mt-4 text-center text-xs text-slate-500">
            Preview the Tripolio iOS experience. Drop in new stays weekly.
          </p>
        </div>
      </section>
    </Layout>
  );
}
