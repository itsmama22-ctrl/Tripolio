import { useMemo } from "react";

interface SocialShareProps {
  title: string;
  url: string;
}

export function SocialShare({ title, url }: SocialShareProps) {
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const links = useMemo(
    () => [
      {
        name: "Share on X",
        href: `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`,
      },
      {
        name: "Share on Facebook",
        href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      },
      {
        name: "Share on LinkedIn",
        href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      },
      {
        name: "Email story",
        href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      },
    ],
    [encodedTitle, encodedUrl]
  );

  return (
    <div className="flex flex-wrap items-center gap-3 text-sm">
      {links.map((link) => (
        <a
          key={link.name}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-full bg-slate-50 px-4 py-2 font-semibold text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-primary/10 hover:shadow-card"
        >
          {link.name}
        </a>
      ))}
    </div>
  );
}

