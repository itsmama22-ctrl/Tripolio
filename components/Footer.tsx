import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-slate-100 bg-white">
      <div className="section flex flex-col gap-4 py-8 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">
        <p>© Tripolio 2025 | <Link href="/affiliate-disclosure" className="hover:text-primary">Travel Partners</Link> | <Link href="/privacy" className="hover:text-primary">Privacy</Link> | <Link href="/contact" className="hover:text-primary">Contact</Link></p>
        <p className="text-xs text-slate-400">Tripolio participates in affiliate programs and may earn commissions from qualifying bookings.</p>
      </div>
    </footer>
  );
}
