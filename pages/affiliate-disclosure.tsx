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
      </section>
    </Layout>
  );
}
