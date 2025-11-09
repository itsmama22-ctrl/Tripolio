import type { GetServerSideProps } from "next";
import { absoluteUrl } from "../lib/seo";

const Robots = () => null;

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemapUrl = absoluteUrl("/sitemap.xml");
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  res.setHeader("Content-Type", "text/plain");
  res.write(body);
  res.end();

  return {
    props: {},
  };
};

export default Robots;

