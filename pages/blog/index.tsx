import Head from "next/head";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { getPosts } from "../../lib/posts";
import type { BlogPost } from "../../types";

interface BlogPageProps {
  posts: BlogPost[];
}

export default function BlogPage({ posts }: BlogPageProps) {
  return (
    <Layout>
      <Head>
        <title>Tripolio Journal | Travel Stories & Guides</title>
        <meta
          name="description"
          content="Read Tripolio's latest guides, destination inspiration, and affiliate travel tips to plan your next mindful escape."
        />
      </Head>
      <section className="section-wide py-12">
        <h1 className="text-3xl font-bold text-slate-900">Tripolio Journal</h1>
        <p className="mt-3 text-sm text-slate-600">
          Story-driven itineraries, design-led stays, and community travel tips for your next getaway.
        </p>
        <div className="mt-10 grid gap-8 md:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="flex flex-col gap-4 rounded-3xl bg-white p-6 shadow-card">
              <div
                className="h-40 rounded-2xl bg-cover bg-center"
                style={{ backgroundImage: `url(${post.coverImage})` }}
              />
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wide text-slate-400">
                  {new Date(post.publishedAt).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
                <h2 className="text-lg font-semibold text-slate-900">{post.title}</h2>
                <p className="text-sm text-slate-600">{post.excerpt}</p>
              </div>
              <Link href={`/blog/${post.slug}`} className="mt-auto text-sm font-semibold text-primary hover:text-accent">
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
