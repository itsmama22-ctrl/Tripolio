import type { NextApiRequest, NextApiResponse } from "next";
import { fetchScheduledPosts, upsertScheduledPost } from "../../../lib/blog";
import { LogScope, logError, logInfo } from "../../../lib/logger";

const adminSecret = process.env.ADMIN_SECRET;

function isAuthorized(req: NextApiRequest) {
  if (!adminSecret) return false;
  const headerSecret = req.headers["x-admin-secret"];
  const querySecret = req.query.secret;
  const bodySecret = req.body?.secret;
  return headerSecret === adminSecret || querySecret === adminSecret || bodySecret === adminSecret;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!adminSecret) {
    return res.status(500).json({ error: "Admin secret not configured" });
  }

  if (!isAuthorized(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  if (req.method === "GET") {
    try {
      const posts = await fetchScheduledPosts();
      return res.status(200).json({ posts });
    } catch (error) {
      logError(LogScope.Admin, "Failed to fetch scheduled posts", error);
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  }

  if (req.method === "PUT") {
    try {
      const payload = req.body?.post;
      if (!payload?.slug) {
        return res.status(400).json({ error: "Invalid payload" });
      }

      const updated = await upsertScheduledPost(payload);
      logInfo(LogScope.Admin, "Post updated via admin API", { slug: payload.slug });
      return res.status(200).json({ post: updated });
    } catch (error) {
      logError(LogScope.Admin, "Failed to update post", error);
      return res.status(500).json({ error: "Failed to update post" });
    }
  }

  res.setHeader("Allow", "GET, PUT");
  return res.status(405).json({ error: "Method Not Allowed" });
}

