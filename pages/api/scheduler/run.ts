import type { NextApiRequest, NextApiResponse } from "next";
import { publishDuePosts } from "../../../lib/blog";
import { LogScope, logError, logInfo } from "../../../lib/logger";

const schedulerSecret = process.env.SCHEDULER_SECRET;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  if (!schedulerSecret) {
    return res.status(500).json({ error: "Scheduler secret not configured" });
  }

  const providedSecret = req.headers["x-scheduler-secret"] ?? req.body?.secret ?? req.query.secret;
  if (providedSecret !== schedulerSecret) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const result = await publishDuePosts();

    if (result.count > 0) {
      for (const post of result.updated) {
        try {
          await res.revalidate(`/blog/${post.slug}`);
        } catch (revalidateError) {
          logError(LogScope.Scheduler, `Failed to revalidate /blog/${post.slug}`, revalidateError);
        }
      }
      try {
        await res.revalidate("/blog");
      } catch (error) {
        logError(LogScope.Scheduler, "Failed to revalidate blog index", error);
      }
      try {
        await res.revalidate("/sitemap.xml");
      } catch (error) {
        logError(LogScope.Scheduler, "Failed to revalidate sitemap", error);
      }
    }

    logInfo(LogScope.Scheduler, "Scheduler run complete", {
      processed: result.count,
      slugs: result.updated.map((post) => post.slug),
    });

    return res.status(200).json({
      processed: result.count,
      slugs: result.updated.map((post) => post.slug),
      message: result.count > 0 ? "Published scheduled posts." : "No posts eligible for publishing.",
    });
  } catch (error) {
    logError(LogScope.Scheduler, "Scheduler run failed", error);
    return res.status(500).json({
      error: "Scheduler run failed",
      details: error instanceof Error ? error.message : "Unknown error",
    });
  }
}

