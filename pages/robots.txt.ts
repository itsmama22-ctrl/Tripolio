import type { NextApiRequest, NextApiResponse } from "next";
import { absoluteUrl } from "../lib/seo";

export default function handler(_req: NextApiRequest, res: NextApiResponse) {
  const sitemapUrl = absoluteUrl("/sitemap.xml");
  const body = `User-agent: *
Allow: /

Sitemap: ${sitemapUrl}
`;

  res.setHeader("Content-Type", "text/plain");
  res.status(200).send(body);
}

