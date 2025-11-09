import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { HiMenu, HiX } from "react-icons/hi";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Destinations", href: "/destinations" },
  { name: "Blog", href: "/blog" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/80 backdrop-blur">
      <div className="section flex items-center justify-between py-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/assets/tripolio-logo.svg" alt="Tripolio" width={36} height={36} priority />
          <span className="text-lg font-semibold text-ink">Tripolio</span>
        </Link>
        <nav className="hidden gap-6 text-sm font-medium text-slate-600 md:flex">
          {navigation.map((item) => (
            <Link key={item.name} href={item.href} className="hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center justify-center rounded-full bg-slate-100 px-3 py-2 text-slate-700 md:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <HiX className="h-6 w-6" /> : <HiMenu className="h-6 w-6" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-slate-100 bg-white md:hidden">
          <nav className="section flex flex-col gap-1 py-4 text-base font-medium text-slate-700">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="py-2"
                onClick={() => setOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
