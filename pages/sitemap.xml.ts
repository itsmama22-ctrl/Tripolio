import type { GetServerSideProps } from "next";
import { fetchPublishedPosts } from "../lib/blog";
import { absoluteUrl } from "../lib/seo";

function generateSitemapXml(paths: { loc: string; lastmod?: string }[]) {
  const urls = paths
    .map((path) => {
      const lastModTag = path.lastmod ? `<lastmod>${path.lastmod}</lastmod>` : "";
      return `<url><loc>${path.loc}</loc>${lastModTag}</url>`;
    })
    .join("");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

const Sitemap = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const staticPaths = [
    { loc: absoluteUrl("/") },
    { loc: absoluteUrl("/destinations") },
    { loc: absoluteUrl("/blog") },
    { loc: absoluteUrl("/about") },
    { loc: absoluteUrl("/contact") },
    { loc: absoluteUrl("/affiliate-disclosure") },
    { loc: absoluteUrl("/privacy") },
  ];

  let postPaths: { loc: string; lastmod?: string }[] = [];
  try {
    const { posts } = await fetchPublishedPosts(1, 500);
    postPaths = posts.map((post) => ({
      loc: absoluteUrl(`/blog/${post.slug}`),
      lastmod: new Date(post.publishedAt).toISOString(),
    }));
  } catch (error) {
    console.error("[Sitemap] Falling back to static paths", error);
    postPaths = [];
  }

  const xml = generateSitemapXml([...staticPaths, ...postPaths]);
  res.setHeader("Content-Type", "application/xml");
  res.write(xml);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;

