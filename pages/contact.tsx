import Head from "next/head";
import { Layout } from "../components/Layout";

export default function ContactPage() {
  return (
    <Layout>
      <Head>
        <title>Contact Tripolio | Partnerships, Press & Support</title>
        <meta
          name="description"
          content="Reach the Tripolio team for support, partnerships, or press inquiries."
        />
      </Head>
      <section className="section-narrow py-12 space-y-8">
        <header className="space-y-3">
          <h1 className="text-3xl font-bold text-slate-900">Let’s collaborate</h1>
          <p className="text-sm text-slate-600">
            We love hearing from fellow travelers, creators, and partners. Use the form below or reach out directly and we’ll get back to you within two business days.
          </p>
          <div className="rounded-3xl bg-white p-6 shadow-card">
            <p className="text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Email:</span>{" "}
              <a className="text-primary hover:text-accent" href="mailto:itsmama22@gmail.com">
                itsmama22@gmail.com
              </a>
            </p>
            <p className="mt-2 text-sm text-slate-600">
              <span className="font-semibold text-slate-900">Hours:</span> Monday–Friday, 09:00–17:00 (GMT).
            </p>
            <p className="mt-2 text-xs text-slate-500">
              We monitor this inbox for support questions, partnership proposals, affiliate inquiries, and press requests.
            </p>
          </div>
        </header>

        <form className="grid gap-6 rounded-3xl bg-white p-8 shadow-card">
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="name">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-primary focus:outline-none"
              placeholder="Your full name"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="email">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-primary focus:outline-none"
              placeholder="you@example.com"
            />
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="topic">
              Topic
            </label>
            <select
              id="topic"
              name="topic"
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-primary focus:outline-none"
            >
              <option value="partnerships">Partnerships</option>
              <option value="press">Press</option>
              <option value="support">Support</option>
              <option value="feedback">Feedback</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div className="grid gap-2">
            <label className="text-sm font-medium text-slate-700" htmlFor="message">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-800 focus:border-primary focus:outline-none"
              placeholder="Tell us how we can help"
            />
          </div>
          <button type="submit" className="button-primary">
            Send message
          </button>
          <p className="text-xs text-slate-500">
            This form is ready for integration with services like Formspree, Netlify Forms, or your preferred CRM. Until connected, please email us directly at itsmama22@gmail.com.
          </p>
        </form>
      </section>
    </Layout>
  );
}
