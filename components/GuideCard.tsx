import Image from "next/image";
import Link from "next/link";
import type { BlogPost } from "../types";

interface GuideCardProps {
  post: BlogPost;
}

export function GuideCard({ post }: GuideCardProps) {
  return (
    <article className="flex min-h-[320px] flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
      <div className="relative h-40 w-full">
        <Image src={post.imageUrl} alt={post.imageAlt} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 90vw" />
      </div>
      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {new Date(post.publishedAt).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })} · {post.readingTime} min read
          </p>
          <h3 className="text-lg font-semibold text-ink">{post.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
        </div>
        <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
          Read guide →
        </Link>
      </div>
    </article>
  );
}
