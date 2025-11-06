import Head from "next/head";
import Image from "next/image";
import { Layout } from "../components/Layout";

export default function AboutPage() {
  return (
    <Layout>
      <Head>
        <title>About Tripolio | Travel Discovery Reimagined</title>
        <meta
          name="description"
          content="Discover Tripolio's mission, editorial standards, and how we curate design-led stays for mindful travelers."
        />
      </Head>
      <section className="section-wide py-12 space-y-10">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-slate-900">Intentional stays for intentional travelers</h1>
          <p className="text-sm text-slate-600">
            Tripolio was created to help modern travelers cut through the noise and land in spaces that feel like a perfect fit. We champion boutique stays, thoughtful hospitality, and experiences that balance design, sustainability, and local impact.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-slate-900">How we work</h2>
            <ul className="space-y-3 text-sm text-slate-600">
              <li className="rounded-3xl bg-white p-4 shadow-card">
                <span className="font-semibold text-slate-900">Curated, not scraped.</span> Every stay in Tripolio is hand-reviewed by our editorial team using first-hand feedback, reputable sources, and community recommendations.
              </li>
              <li className="rounded-3xl bg-white p-4 shadow-card">
                <span className="font-semibold text-slate-900">Design &amp; responsibility.</span> We spotlight properties that blend aesthetics with responsible practices—locally inspired design, fair operations, and meaningful guest experiences.
              </li>
              <li className="rounded-3xl bg-white p-4 shadow-card">
                <span className="font-semibold text-slate-900">Affiliate-supported.</span> Tripolio earns a commission when you book through a partner link, helping us keep the discovery experience free while remaining unbiased.
              </li>
            </ul>
          </div>
          <div className="relative h-80 overflow-hidden rounded-3xl">
            <Image
              src="https://images.unsplash.com/photo-1528909514045-2fa4ac7a08ba"
              alt="Tripolio team exploring boutique stays"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <section className="grid gap-8 md:grid-cols-3">
          {[
            {
              title: "Global lens",
              body: "Stays featured across 30+ countries with new drops every week."
            },
            {
              title: "Real traveler insights",
              body: "We pair editorial research with community feedback to keep listings honest."
            },
            {
              title: "Always listening",
              body: "Questions or tips? Email us at itsmama22@gmail.com—we reply within two business days."
            }
          ].map(({ title, body }) => (
            <div key={title} className="rounded-3xl bg-primary/10 p-6 text-primary">
              <p className="text-lg font-semibold">{title}</p>
              <p className="mt-2 text-sm text-primary/80">{body}</p>
            </div>
          ))}
        </section>
      </section>
    </Layout>
  );
}
