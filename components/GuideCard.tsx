import Link from "next/link";
import type { BlogPost } from "../types";

interface GuideCardProps {
  post: BlogPost;
}

export function GuideCard({ post }: GuideCardProps) {
  return (
    <article className="flex min-h-[280px] flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-transform hover:-translate-y-1">
      <div
        className="h-32 w-full bg-cover bg-center"
        style={{ backgroundImage: `url(${post.coverImage})` }}
      />
      <div className="flex flex-1 flex-col justify-between gap-4 p-6">
        <div className="space-y-3">
          <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            {post.category ?? "Guides"}
          </span>
          <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
          <p className="text-sm text-slate-600 line-clamp-3">{post.excerpt}</p>
        </div>
        <div className="flex items-center justify-between text-xs text-slate-500">
          <span>
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </span>
          <Link href={`/blog/${post.slug}`} className="text-sm font-semibold text-primary hover:text-accent">
            Read guide
          </Link>
        </div>
      </div>
    </article>
  );
}
