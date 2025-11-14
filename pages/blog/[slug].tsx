import type { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { InlineAffiliateCTA } from "../../components/InlineAffiliateCTA";
import { Layout } from "../../components/Layout";
import { SocialShare } from "../../components/SocialShare";
import { fetchPostBySlug, fetchPublishedPosts } from "../../lib/blog";
import { absoluteUrl } from "../../lib/seo";
import type { BlogPost } from "../../types";

interface BlogPostPageProps {
  post: BlogPost;
  related: BlogPost[];
}

export default function BlogPostPage({ post, related }: BlogPostPageProps) {
  if (!post) {
    return null;
  }

  const canonicalUrl = absoluteUrl(`/blog/${post.slug}`);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Organization",
      name: post.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Tripolio",
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl("/assets/tripolio-logo.svg"),
      },
    },
    image: [absoluteUrl(post.imageUrl)],
    mainEntityOfPage: canonicalUrl,
  };

  return (
    <Layout>
      <Head>
        <title>{post.seoTitle || `${post.title} | Tripolio`}</title>
        <meta name="description" content={post.seoDescription || post.excerpt} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={post.seoTitle || post.title} />
        <meta property="og:description" content={post.seoDescription || post.excerpt} />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content={absoluteUrl(post.imageUrl)} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.seoTitle || post.title} />
        <meta name="twitter:description" content={post.seoDescription || post.excerpt} />
        <meta name="twitter:image" content={absoluteUrl(post.imageUrl)} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      </Head>

      <article className="section-narrow py-12 space-y-10">
        <Link href="/blog" className="text-sm font-semibold text-primary hover:text-accent">
          ← Back to Blog
        </Link>
        <header className="space-y-6">
          <p className="text-xs uppercase tracking-wide text-slate-400">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}{" "}
            · {post.readingTime} min read · {post.author}
          </p>
          <h1 className="text-4xl font-bold text-ink sm:text-5xl">{post.title}</h1>
          <p className="text-base text-slate-600">{post.excerpt}</p>
          <SocialShare title={post.title} url={canonicalUrl} />
          <div className="relative overflow-hidden rounded-[32px]">
            <Image
              src={post.imageUrl}
              alt={post.imageAlt}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              priority
              unoptimized={post.imageUrl?.includes("source.unsplash.com")}
            />
          </div>
        </header>

        {post.affiliateCta[0] && <InlineAffiliateCTA cta={post.affiliateCta[0]} variant="primary" />}

        <section
          className="prose prose-lg prose-slate max-w-none prose-blockquote:border-l-4 prose-blockquote:border-primary/40 prose-blockquote:pl-4 prose-headings:font-semibold prose-img:rounded-3xl prose-lg:leading-relaxed"
          dangerouslySetInnerHTML={{ __html: post.content || `<p>${post.excerpt}</p>` }}
        />

        {post.affiliateCta[1] && <InlineAffiliateCTA cta={post.affiliateCta[1]} variant="secondary" />}
      </article>

      {related.length > 0 && (
        <section className="section mt-16 pb-20">
          <div className="rounded-3xl bg-white p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-ink">Keep exploring</h2>
            <p className="mt-2 text-sm text-slate-600">Fresh Tripolio guides publish automatically with Supabase scheduling.</p>
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              {related.map((item) => (
                <article key={item.slug} className="flex flex-col overflow-hidden rounded-2xl bg-slate-50 p-5 shadow-soft transition hover:-translate-y-1 hover:shadow-card">
                  <h3 className="text-lg font-semibold text-ink">{item.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{item.excerpt}</p>
                  <Link href={`/blog/${item.slug}`} className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-primary">
                    Read guide →
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

export const getStaticPaths: GetStaticPaths = async () => ({
  paths: [],
  fallback: "blocking",
});

export const getStaticProps: GetStaticProps<BlogPostPageProps> = async ({ params, preview }) => {
  const slug = params?.slug as string;
  if (!slug) {
    return { notFound: true };
  }

  const post = await fetchPostBySlug(slug);

  if (!post || (!post.published && !preview)) {
    return { notFound: true, revalidate: 60 };
  }

  const { posts: relatedPosts } = await fetchPublishedPosts(1, 6);
  const related = relatedPosts.filter((item) => item.slug !== slug).slice(0, 3);

  return {
    props: {
      post,
      related,
    },
    revalidate: 60 * 60,
  };
};
