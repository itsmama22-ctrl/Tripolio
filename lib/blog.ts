import { differenceInDays, formatISO } from "date-fns";
import fallbackPosts from "../data/blog.json";
import type { AffiliateCTA, BlogPost } from "../types";
import { getSupabaseClient, isSupabaseConfigured } from "./supabaseClient";

const TABLE = "scheduled_posts";
const DEFAULT_AUTHOR = "Tripolio Editorial";

export interface PaginatedPosts {
  posts: BlogPost[];
  total: number;
  page: number;
  pageSize: number;
}

function wordsToMinutes(content: string) {
  if (!content) return 0;
  const words = content.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function mapRowToPost(row: any): BlogPost {
  const content = row.content ?? "";
  const publishedAt = row.published_at ?? row.dateScheduled ?? formatISO(new Date());
  return {
    id: row.id,
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    content,
    seoTitle: row.seo_title ?? row.title,
    seoDescription: row.seo_description ?? row.excerpt,
    imageUrl: row.image_url,
    imageAlt: row.image_alt ?? `${row.title} skyline`,
    author: row.author ?? DEFAULT_AUTHOR,
    dateScheduled: row.dateScheduled,
    published: row.published,
    publishedAt,
    readingTime: wordsToMinutes(content),
    affiliateCta: Array.isArray(row.affiliate_cta)
      ? row.affiliate_cta
      : row.affiliate_cta && typeof row.affiliate_cta === "object"
        ? [row.affiliate_cta]
        : [],
    createdAt: row.created_at ?? publishedAt,
  };
}

function mapFallbackPost(post: any): BlogPost {
  return {
    id: post.slug,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    content: post.content ?? "",
    seoTitle: post.seoTitle ?? post.title,
    seoDescription: post.seoDescription ?? post.excerpt ?? "",
    imageUrl: post.coverImage ?? post.imageUrl ?? "",
    imageAlt: post.imageAlt ?? `${post.title} skyline`,
    author: post.author ?? DEFAULT_AUTHOR,
    dateScheduled: post.publishedAt ?? formatISO(new Date()),
    published: true,
    publishedAt: post.publishedAt ?? formatISO(new Date()),
    readingTime: wordsToMinutes(post.content ?? ""),
    affiliateCta: post.affiliateCta ?? [],
    createdAt: post.publishedAt ?? formatISO(new Date()),
  };
}

export async function fetchPublishedPosts(page = 1, pageSize = 9): Promise<PaginatedPosts> {
  if (!isSupabaseConfigured()) {
    const posts = (fallbackPosts as any[]).map(mapFallbackPost);
    return {
      posts: posts.slice((page - 1) * pageSize, page * pageSize),
      total: posts.length,
      page,
      pageSize,
    };
  }

  const client = getSupabaseClient("service") ?? getSupabaseClient("anon");
  if (!client) {
    const posts = (fallbackPosts as any[]).map(mapFallbackPost);
    return {
      posts: posts.slice((page - 1) * pageSize, page * pageSize),
      total: posts.length,
      page,
      pageSize,
    };
  }

  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;
  const { data, error, count } = await client
    .from(TABLE)
    .select("*", { count: "exact" })
    .eq("published", true)
    .order("dateScheduled", { ascending: false })
    .range(from, to);

  if (error) {
    console.error("[Supabase] fetchPublishedPosts error", error);
    const posts = (fallbackPosts as any[]).map(mapFallbackPost);
    return {
      posts: posts.slice((page - 1) * pageSize, page * pageSize),
      total: posts.length,
      page,
      pageSize,
    };
  }

  const posts = (data ?? []).map(mapRowToPost);
  return {
    posts,
    total: count ?? posts.length,
    page,
    pageSize,
  };
}

export async function fetchPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!slug) return null;

  if (!isSupabaseConfigured()) {
    const post = (fallbackPosts as any[]).find((item) => item.slug === slug);
    return post ? mapFallbackPost(post) : null;
  }

  const client = getSupabaseClient("service") ?? getSupabaseClient("anon");
  if (!client) {
    const post = (fallbackPosts as any[]).find((item) => item.slug === slug);
    return post ? mapFallbackPost(post) : null;
  }

  const { data, error } = await client.from(TABLE).select("*").eq("slug", slug).maybeSingle();
  if (error) {
    console.error("[Supabase] fetchPostBySlug error", error);
    const post = (fallbackPosts as any[]).find((item) => item.slug === slug);
    return post ? mapFallbackPost(post) : null;
  }
  if (!data) return null;
  return mapRowToPost(data);
}

export async function fetchScheduledPosts(): Promise<BlogPost[]> {
  if (!isSupabaseConfigured()) {
    return (fallbackPosts as any[]).map(mapFallbackPost);
  }

  const client = getSupabaseClient("service");
  if (!client) {
    return (fallbackPosts as any[]).map(mapFallbackPost);
  }

  const { data, error } = await client
    .from(TABLE)
    .select("*")
    .order("dateScheduled", { ascending: true });

  if (error) {
    console.error("[Supabase] fetchScheduledPosts error", error);
    return (fallbackPosts as any[]).map(mapFallbackPost);
  }

  return (data ?? []).map(mapRowToPost);
}

export async function upsertScheduledPost(payload: Partial<BlogPost>) {
  const client = getSupabaseClient("service");
  if (!client) {
    throw new Error("Supabase service client not configured");
  }

  const fields = {
    id: payload.id,
    title: payload.title,
    slug: payload.slug,
    excerpt: payload.excerpt,
    content: payload.content,
    seo_title: payload.seoTitle ?? payload.title,
    seo_description: payload.seoDescription ?? payload.excerpt,
    image_url: payload.imageUrl,
    image_alt: payload.imageAlt,
    dateScheduled: payload.dateScheduled,
    published: payload.published,
    affiliate_cta: payload.affiliateCta,
    author: payload.author ?? DEFAULT_AUTHOR,
  };

  const { data, error } = await client.from(TABLE).upsert(fields).select().maybeSingle();
  if (error) {
    console.error("[Supabase] upsertScheduledPost error", error);
    throw error;
  }

  return data ? mapRowToPost(data) : null;
}

export async function publishDuePosts(referenceDate = new Date()) {
  const client = getSupabaseClient("service");
  if (!client) {
    throw new Error("Supabase service client not configured");
  }

  const today = formatISO(referenceDate, { representation: "date" });
  const { data, error } = await client
    .from(TABLE)
    .select("*")
    .eq("published", false)
    .lte("dateScheduled", today);

  if (error) {
    throw error;
  }

  if (!data || data.length === 0) {
    return { updated: [], count: 0 };
  }

  const ids = data.map((row) => row.id);
  const { data: updated, error: updateError } = await client
    .from(TABLE)
    .update({ published: true, published_at: today })
    .in("id", ids)
    .select();

  if (updateError) {
    throw updateError;
  }

  return {
    updated: (updated ?? []).map(mapRowToPost),
    count: updated?.length ?? 0,
  };
}

export function getDaysUntilPublish(post: BlogPost) {
  if (!post) return null;
  const days = differenceInDays(new Date(post.dateScheduled), new Date());
  return days;
}

