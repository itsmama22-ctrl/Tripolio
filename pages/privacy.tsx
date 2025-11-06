import Head from "next/head";
import { Layout } from "../components/Layout";

export default function PrivacyPage() {
  return (
    <Layout>
      <Head>
        <title>Privacy Policy | Tripolio</title>
        <meta
          name="description"
          content="Read how Tripolio collects, uses, and protects your personal information across our website and app."
        />
      </Head>
      <section className="section-narrow py-12 space-y-8 text-sm leading-relaxed text-slate-700">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          <p className="text-slate-600">
            This policy explains how Tripolio ("we", "our", "us") handles personal information when you use our website, mobile app, and related services. By continuing to use Tripolio, you agree to the practices described below.
          </p>
        </header>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Information we collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Contact details that you provide—such as your name and email address—when you subscribe, submit a form, or reach out for support.</li>
            <li>Usage data like pages viewed, device/browser information, and referral sources to help us improve product performance.</li>
            <li>Affiliate interaction data (e.g., outbound clicks) that allows us and our partners to understand bookings driven through Tripolio.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">How we use your information</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>To deliver the Tripolio experience, including personalized stay recommendations and saved preferences.</li>
            <li>To send product updates or newsletters when you opt in—each email includes an unsubscribe link.</li>
            <li>To detect, prevent, or address technical issues, fraud, or misuse of our platform.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Cookies &amp; third-party technologies</h2>
          <p>
            We use cookies and similar technologies to remember your preferences and measure performance. Affiliate partners and analytics providers may set additional cookies when you interact with booking links. You can control cookies through your browser settings; disabling them may impact certain features.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Data sharing</h2>
          <p>
            We do not sell personal information. We may share limited data with service providers who support our operations (such as email or analytics tools) under confidentiality agreements. When you click an affiliate link, information necessary to complete the booking is handled directly by that partner under their own privacy policy.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Your choices</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Opt out of marketing emails at any time using the unsubscribe link or by emailing <a className="text-primary hover:text-accent" href="mailto:itsmama22@gmail.com">itsmama22@gmail.com</a>.</li>
            <li>Request access to, correction of, or deletion of your personal information by contacting us.</li>
            <li>Adjust cookie settings in your browser to limit certain tracking.</li>
          </ul>
        </section>

        <section className="space-y-3">
          <h2 className="text-lg font-semibold text-slate-900">Contact us</h2>
          <p>
            Questions about this policy or your data rights can be sent to <a className="text-primary hover:text-accent" href="mailto:itsmama22@gmail.com">itsmama22@gmail.com</a>. We aim to respond within two business days.
          </p>
        </section>

        <p className="text-xs text-slate-500">
          This page is provided for transparency and does not constitute legal advice. If you operate Tripolio in jurisdictions with specific privacy regulations, consult legal counsel to ensure compliance.
        </p>
      </section>
    </Layout>
  );
}
