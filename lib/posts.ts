import postsData from "../data/blog.json";
import type { BlogPost } from "../types";

export function getPosts(): BlogPost[] {
  return postsData as BlogPost[];
}

export function getPostBySlug(slug: string): BlogPost | undefined {
  return getPosts().find((post) => post.slug === slug);
}
