import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { getPosts, getPostBySlug } from "../../lib/posts";
import type { BlogPost } from "../../types";

interface BlogPostPageProps {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogPostPage({ post, related }: BlogPostPageProps) {
  if (!post) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>{post.title} | Tripolio Journal</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article className="section-compact py-12 space-y-12">
        <Link href="/blog" className="text-sm font-semibold text-primary hover:text-accent">
          ← Back to the Journal
        </Link>
        <header className="space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-4xl font-bold text-slate-900 md:text-5xl">{post.title}</h1>
          <p className="text-sm text-slate-600 md:text-base">{post.excerpt}</p>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-primary"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>
        <section
          className="prose prose-slate max-w-none prose-blockquote:border-primary/30 prose-headings:font-semibold prose-a:text-primary prose-a:no-underline hover:prose-a:text-accent"
          dangerouslySetInnerHTML={{ __html: post.content ?? `<p>${post.excerpt}</p>` }}
        />
      </article>
      {related.length > 0 && (
        <section className="section-wide pb-20">
          <div className="rounded-3xl bg-white p-8 shadow-card">
            <h2 className="text-2xl font-semibold text-slate-900">Keep exploring</h2>
            <p className="mt-2 text-sm text-slate-600">Handpicked stories to pair with this read.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug} className="flex flex-col gap-3 rounded-2xl bg-beige/40 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-500">{item.category}</p>
                  <h3 className="text-lg font-semibold text-slate-900">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.excerpt}</p>
                  <Link href={`/blog/${item.slug}`} className="mt-auto text-sm font-semibold text-primary hover:text-accent">
                    Read next
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getPosts();
  return {
    paths: posts.map((post) => ({ params: { slug: post.slug } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  const related = getPosts()
    .filter((item) => item.slug !== slug && item.category === post.category)
    .concat(getPosts().filter((item) => item.slug !== slug && item.category !== post.category))
    .filter((item, index, self) => self.findIndex((candidate) => candidate.slug === item.slug) === index)
    .slice(0, 3);

  return {
    props: {
      post,
      related,
    },
  };
};
