import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { fetchPublishedPosts } from "../../lib/blog";
import { absoluteUrl } from "../../lib/seo";
import type { BlogPost } from "../../types";

interface BlogPageProps {
  posts: BlogPost[];
  page: number;
  totalPages: number;
}

export default function BlogPage({ posts, page, totalPages }: BlogPageProps) {
  return (
    <Layout>
      <Head>
        <title>Tripolio Blog | SEO-Optimized Travel Guides &amp; Affiliate Playbooks</title>
        <meta
          name="description"
          content="Browse the latest Tripolio travel guides featuring top experiences, itineraries, and affiliate-ready CTAs. Fresh content publishes automatically every four days."
        />
        <link rel="canonical" href={absoluteUrl(`/blog${page > 1 ? `?page=${page}` : ""}`)} />
        <meta property="og:title" content="Tripolio Blog | Travel Guides & Affiliate Playbooks" />
        <meta
          property="og:description"
          content="Plan your next adventure with Tripolio’s SEO-friendly itineraries, destination breakdowns, and affiliate-ready call-to-actions."
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={absoluteUrl(`/blog${page > 1 ? `?page=${page}` : ""}`)} />
        <meta property="og:image" content={absoluteUrl("/assets/tripolio-logo.svg")} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:image" content={absoluteUrl("/assets/tripolio-logo.svg")} />
      </Head>

      <section className="section mt-12 space-y-12">
        <header className="space-y-4">
          <div className="inline-flex items-center rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Tripolio Editorial
          </div>
          <h1 className="text-4xl font-bold text-ink">Travel Guides &amp; Affiliate Strategies</h1>
          <p className="max-w-2xl text-base text-slate-600">
            Discover itineraries, top tours, and booking-ready CTAs researched by the Tripolio team. Our Supabase scheduler keeps fresh guides going live without manual publishing.
          </p>
        </header>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => {
            const formattedDate = new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });
            const placeholder = "/assets/stay-placeholder.svg";
            const imageSrc = post.imageUrl || placeholder;
            return (
              <article key={post.slug} className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-soft transition hover:-translate-y-1 hover:shadow-card">
              <div className="relative h-52 w-full">
                <img
                  src={imageSrc}
                  alt={post.imageAlt}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = placeholder;
                  }}
                />
              </div>
              <div className="flex flex-1 flex-col gap-4 p-6">
                <div className="flex items-center justify-between text-xs uppercase tracking-wide text-slate-400">
                  <span>{formattedDate}</span>
                  <span>{post.readingTime} min read</span>
                </div>
                <h2 className="text-xl font-semibold text-ink">{post.title}</h2>
                <p className="text-sm text-slate-600">{post.excerpt}</p>
                <Link href={`/blog/${post.slug}`} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                  Read guide →
                </Link>
              </div>
              </article>
            );
          })}
          {posts.length === 0 && (
            <div className="col-span-full rounded-3xl border border-dashed border-slate-200 p-12 text-center text-slate-500">
              No published posts yet. Configure Supabase or seed scheduled posts to populate the feed.
            </div>
          )}
        </div>

        {totalPages > 1 && (
          <nav className="flex items-center justify-center gap-3 text-sm">
            <Link
              href={page > 1 ? `/blog?page=${page - 1}` : "/blog"}
              className={`rounded-full px-4 py-2 font-semibold ${page === 1 ? "pointer-events-none bg-slate-100 text-slate-400" : "bg-white text-primary shadow-soft hover:bg-slate-50"}`}
            >
              Previous
            </Link>
            <span className="rounded-full bg-slate-50 px-4 py-2 text-slate-500">
              Page {page} of {totalPages}
            </span>
            <Link
              href={page < totalPages ? `/blog?page=${page + 1}` : `/blog?page=${page}`}
              className={`rounded-full px-4 py-2 font-semibold ${page === totalPages ? "pointer-events-none bg-slate-100 text-slate-400" : "bg-white text-primary shadow-soft hover:bg-slate-50"}`}
            >
              Next
            </Link>
          </nav>
        )}
      </section>
    </Layout>
  );
}

export const getServerSideProps: GetServerSideProps<BlogPageProps> = async ({ query }) => {
  const page = Number(query.page ?? 1);
  const currentPage = Number.isNaN(page) || page < 1 ? 1 : page;
  const pageSize = 9;
  const { posts, total } = await fetchPublishedPosts(currentPage, pageSize);
  const totalPages = Math.max(1, Math.ceil((total ?? 0) / pageSize));

  return {
    props: {
      posts,
      page: Math.min(currentPage, totalPages),
      totalPages,
    },
  };
};
