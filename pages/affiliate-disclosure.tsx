import Head from "next/head";
import { Layout } from "../components/Layout";

export default function AffiliateDisclosurePage() {
  return (
    <Layout>
      <Head>
        <title>Affiliate Disclosure | Tripolio</title>
        <meta
          name="description"
          content="Understand how Tripolio uses affiliate links while keeping recommendations independent."
        />
      </Head>
      <section className="section-narrow py-12 space-y-6 text-sm leading-relaxed text-slate-700">
        <h1 className="text-3xl font-bold text-slate-900">Affiliate Disclosure</h1>
        <p>
          Tripolio is funded in part through affiliate partnerships. When you click on a booking link for partners such as Booking.com, Expedia, Airbnb, and other vetted travel platforms, we may earn a commission. This commission never changes the price you pay.
        </p>
        <p>
          Editorial integrity is core to everything we publish. Stays and experiences are selected because they meet our standards for design, hospitality, and positive traveler impact. Partner status does not guarantee inclusion, and no partner can pay for a favorable review.
        </p>
        <p>
          We clearly label monetized buttons or links with calls to action such as “Book now” so you can make informed choices. If you have questions about a specific relationship, please email <a className="text-primary hover:text-accent" href="mailto:itsmama22@gmail.com">itsmama22@gmail.com</a>.
        </p>
        <div className="mt-10 space-y-4">
          <h2 className="text-lg font-semibold text-slate-900">Affiliate FAQs</h2>
          <div className="space-y-3 rounded-3xl bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Do affiliate links change the rate?</h3>
            <p>
              No. Pricing and availability remain in control of our partners. Tripolio earns a commission only after a successful booking through the labeled CTA.
            </p>
          </div>
          <div className="space-y-3 rounded-3xl bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">How do you choose partners?</h3>
            <p>
              We collaborate with booking engines and boutique agencies that align with Tripolio’s design, sustainability, and service standards. Partners are reviewed quarterly.
            </p>
          </div>
          <div className="space-y-3 rounded-3xl bg-slate-50 p-5">
            <h3 className="text-sm font-semibold text-slate-900">Can I request a preferred partner?</h3>
            <p>
              Yes. Email our partnerships team with the stay link and program details. We’ll evaluate commission structures and traveler value before adding it to Tripolio.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}
