import { FormEvent, useState } from "react";

export function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <section id="newsletter" className="section-narrow mt-20">
      <div className="rounded-3xl bg-primary px-8 py-12 text-white shadow-card">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="space-y-3">
            <h2 className="text-2xl font-semibold">Stay in the Tripolio loop</h2>
            <p className="text-sm text-white/80">
              Get curated stay drops, mindful travel tips, and app updates. We send no more than twice a month.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex w-full max-w-md flex-col gap-3 md:flex-row">
            <input
              type="email"
              required
              placeholder="you@example.com"
              className="w-full rounded-full border border-white/40 bg-white/90 px-5 py-3 text-sm text-slate-800 outline-none focus:bg-white"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <button type="submit" className="button-accent w-full md:w-auto">
              {submitted ? "Subscribed" : "Join"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
