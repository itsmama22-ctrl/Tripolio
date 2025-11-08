import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import postsData from "../data/blog.json";
import type { BlogPost } from "../types";

const postsDirectory = path.join(process.cwd(), "posts");

function normalizePost(post: BlogPost): BlogPost {
  return {
    ...post,
    category: post.category ?? "Articles",
  };
}

export function getPosts(): BlogPost[] {
  const posts = postsData as BlogPost[];
  return posts
    .map(normalizePost)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export async function getPostBySlug(slug: string): Promise<BlogPost | undefined> {
  const post = getPosts().find((item) => item.slug === slug);
  if (!post) {
    return undefined;
  }

  const markdownPath = path.join(postsDirectory, `${slug}.md`);
  if (!fs.existsSync(markdownPath)) {
    return post;
  }

  const fileContents = fs.readFileSync(markdownPath, "utf8");
  const { data, content } = matter(fileContents);

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return normalizePost({
    ...post,
    ...(data as Partial<BlogPost>),
    content: contentHtml,
  });
}
