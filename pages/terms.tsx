import Head from "next/head";
import { Layout } from "../components/Layout";

export default function TermsPage() {
  return (
    <Layout>
      <Head>
        <title>Terms of Use | Tripolio</title>
        <meta
          name="description"
          content="Review the Terms of Use governing access to Tripolio's website and mobile experiences."
        />
      </Head>
      <section className="section-narrow py-12 space-y-8 text-sm leading-relaxed text-slate-700">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Terms of Use</h1>
          <p>
            These Terms of Use ("Terms") govern your access to and use of Tripolio’s website, app, content, and services. By accessing Tripolio, you agree to be bound by these Terms. If you do not agree, please discontinue use.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Use of the platform</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Tripolio is intended for personal, non-commercial use. You may not resell, scrape, or mirror our content without permission.</li>
            <li>You agree not to interfere with site operations, attempt unauthorized access, or use the platform for unlawful purposes.</li>
            <li>We may update, suspend, or discontinue parts of the service at any time without prior notice.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Intellectual property</h2>
          <p>
            All Tripolio content—including text, imagery, branding, and code—is owned by Tripolio or licensed to us. You may reference our content for personal trip planning, but reproduction or distribution without consent is prohibited.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Affiliate relationships</h2>
          <p>
            Tripolio features affiliate links to third-party booking platforms. Bookings are fulfilled directly by those partners under their own terms and policies. Tripolio is not responsible for partner availability, pricing, or service quality.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Limitation of liability</h2>
          <p>
            Tripolio provides content "as is" without warranties of any kind. We are not liable for any losses or damages arising from your reliance on Tripolio content or from bookings made with third parties. Your sole remedy for dissatisfaction with the platform is to stop using it.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Changes to these Terms</h2>
          <p>
            We may update these Terms periodically. When changes are material, we will post an updated date on this page. Continued use after changes constitutes acceptance of the revised Terms.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Contact</h2>
          <p>
            Questions about these Terms can be sent to <a className="text-primary hover:text-accent" href="mailto:itsmama22@gmail.com">itsmama22@gmail.com</a>.
          </p>
        </section>

        <p className="text-xs text-slate-500">
          These Terms are provided as a template for informational purposes. Work with legal counsel to tailor them to your business requirements and applicable regulations.
        </p>
      </section>
    </Layout>
  );
}
