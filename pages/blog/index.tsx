import { useMemo, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { getPosts } from "../../lib/posts";
import type { BlogPost } from "../../types";

interface BlogPageProps {
  posts: BlogPost[];
}

const ALL_LABEL = "All";

export default function BlogPage({ posts }: BlogPageProps) {
  const categories = useMemo(() => {
    const unique = Array.from(
      new Set(posts.map((post) => post.category).filter(Boolean))
    ) as string[];
    return [ALL_LABEL, ...unique];
  }, [posts]);

  const [activeCategory, setActiveCategory] = useState<string>(ALL_LABEL);

  const filteredPosts = useMemo(() => {
    if (activeCategory === ALL_LABEL) {
      return posts;
    }
    return posts.filter((post) => post.category === activeCategory);
  }, [activeCategory, posts]);

  const heroPost = filteredPosts[0];
  const restPosts = filteredPosts.slice(1);

  return (
    <Layout>
      <Head>
        <title>Tripolio Journal | Travel Stories & Guides</title>
        <meta
          name="description"
          content="Dive into Tripolio's editorial hub featuring mindful boutique guides, planner playbooks, and curated city routes to power your next stay."
        />
      </Head>
      <section className="section-wide py-12 space-y-12">
        <header className="space-y-5">
          <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-primary">
            Editorial drops
          </div>
          <h1 className="text-3xl font-bold text-slate-900 md:text-4xl">
            Tripolio Journal
          </h1>
          <p className="text-sm text-slate-600 md:text-base">
            Field notes from our editors, community, and partner tastemakers. Discover new design-led stays, follow ready-to-travel city routes, and learn how to get the most from Tripolio’s app and map experience.
          </p>
          <div className="flex flex-wrap gap-3">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  activeCategory === category
                    ? "border-primary bg-primary text-white shadow-card"
                    : "border-transparent bg-white text-slate-600 shadow-card hover:border-primary/20 hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        {heroPost && (
          <article className="grid gap-6 overflow-hidden rounded-[32px] bg-gradient-to-br from-primary/10 via-white to-beige p-6 shadow-card md:grid-cols-[1.2fr,0.8fr] md:p-10">
            <div className="flex flex-col gap-6">
              <span className="inline-flex w-fit items-center gap-2 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary shadow-card">
                {heroPost.category ?? "Featured"}
              </span>
              <h2 className="text-3xl font-semibold text-slate-900 md:text-4xl">{heroPost.title}</h2>
              <p className="text-sm text-slate-600 md:text-base">{heroPost.excerpt}</p>
              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500">
                <span>
                  {new Date(heroPost.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
                <span>Editor drop</span>
                <Link href={`/blog/${heroPost.slug}`} className="inline-flex items-center gap-2 text-primary hover:text-accent">
                  Read full story
                </Link>
              </div>
            </div>
            <div
              className="min-h-[240px] rounded-[28px] bg-cover bg-center"
              style={{ backgroundImage: `url(${heroPost.coverImage})` }}
            />
          </article>
        )}

        <div className="grid gap-8 md:grid-cols-3">
          {restPosts.map((post) => (
            <article key={post.slug} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card">
              <div
                className="h-40 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
              <div className="space-y-2">
                <div className="flex items-center gap-3 text-xs uppercase tracking-wide text-slate-400">
                  <span>{post.category}</span>
                  <span>
                    {new Date(post.publishedAt).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-slate-900">{post.title}</h3>
                <p className="text-sm text-slate-600">{post.excerpt}</p>
              </div>
              <Link
                href={`/blog/${post.slug}`}
                className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-accent"
              >
                Read post
              </Link>
            </article>
          ))}
        </div>
      </section>
    </Layout>
  );
}

export async function getStaticProps() {
  const posts = getPosts();
  return {
    props: {
      posts,
    },
  };
}
