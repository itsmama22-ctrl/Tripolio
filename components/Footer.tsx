import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200/60 bg-white">
      <div className="section flex flex-col gap-8 py-10 md:flex-row md:justify-between">
        <div className="max-w-sm space-y-3">
          <h3 className="text-lg font-semibold text-slate-900">Tripolio</h3>
          <p className="text-sm text-slate-600">
            Tripolio curates the world’s best stays with transparent affiliate partnerships. We may earn a commission when you book through our partners.
          </p>
          <p className="text-xs text-slate-500">© {new Date().getFullYear()} Tripolio. All rights reserved.</p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm text-slate-600 md:grid-cols-3">
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800">Explore</h4>
            <ul className="space-y-2">
              <li><Link href="/map">Map</Link></li>
              <li><Link href="/list">Stays</Link></li>
              <li><Link href="/blog">Blog</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/about">About</Link></li>
              <li><Link href="/download">Download</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-800">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/affiliate-disclosure">Affiliate Disclosure</Link></li>
              <li><Link href="/privacy">Privacy</Link></li>
              <li><Link href="/terms">Terms</Link></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
