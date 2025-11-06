import Head from "next/head";
import { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { Layout } from "../../components/Layout";
import { getPosts, getPostBySlug } from "../../lib/posts";
import type { BlogPost } from "../../types";

interface BlogPostPageProps {
  post: BlogPost;
}

export default function BlogPostPage({ post }: BlogPostPageProps) {
  if (!post) {
    return null;
  }

  return (
    <Layout>
      <Head>
        <title>{post.title} | Tripolio Journal</title>
        <meta name="description" content={post.excerpt} />
      </Head>
      <article className="section-compact py-12">
        <Link href="/blog" className="text-sm font-semibold text-primary hover:text-accent">
          ← All posts
        </Link>
        <header className="mt-6 space-y-3">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {new Date(post.publishedAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
          <h1 className="text-4xl font-bold text-slate-900">{post.title}</h1>
          <p className="text-sm text-slate-600">{post.excerpt}</p>
        </header>
        <section className="mt-10 space-y-6 text-sm leading-relaxed text-slate-700">
          <p>
            This is a placeholder article. Replace with long-form content optimized for SEO, including structured headings (h2/h3), internal links, and affiliate disclaimers where required. Use Tripolio's tone—warm, design-conscious, and mindful about travel impact.
          </p>
          <p>
            Suggested outline:
          </p>
          <ul className="list-disc space-y-2 pl-5">
            <li>Highlight stay recommendations with affiliate CTAs.</li>
            <li>Include SEO keywords for destination + travel intent.</li>
            <li>Embed map snapshots or Tripolio app screenshots for context.</li>
          </ul>
        </section>
      </article>
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
  const post = getPostBySlug(slug);

  if (!post) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      post,
    },
  };
};
