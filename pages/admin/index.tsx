import { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import { Layout } from "../../components/Layout";
import type { BlogPost } from "../../types";

type AdminPost = BlogPost;

export default function AdminDashboard() {
  const [secret, setSecret] = useState("");
  const [inputSecret, setInputSecret] = useState("");
  const [posts, setPosts] = useState<AdminPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingSlug, setEditingSlug] = useState<string | null>(null);
  const [draft, setDraft] = useState<Partial<AdminPost> | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    const storedSecret = sessionStorage.getItem("tripolio-admin-secret");
    if (storedSecret) {
      setSecret(storedSecret);
    }
  }, []);

  useEffect(() => {
    if (!secret) return;
    fetchPosts(secret);
  }, [secret]);

  const scheduledCount = useMemo(() => posts.filter((post) => !post.published).length, [posts]);

  async function fetchPosts(currentSecret: string) {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/posts", {
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": currentSecret,
        },
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch posts (${response.status})`);
      }
      const data = await response.json();
      setPosts(data.posts ?? []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  function handleUnlock(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!inputSecret) {
      setError("Secret required");
      return;
    }
    sessionStorage.setItem("tripolio-admin-secret", inputSecret);
    setSecret(inputSecret);
    setInputSecret("");
    setMessage(null);
  }

  function handleEdit(post: AdminPost) {
    setEditingSlug(post.slug);
    setDraft({ ...post });
  }

  function handleDraftChange(field: keyof AdminPost, value: string | boolean) {
    setDraft((prev) => (prev ? { ...prev, [field]: value } : prev));
  }

  async function submitPost(update: Partial<AdminPost> | null) {
    if (!update || !update.slug || !secret) return;
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await fetch("/api/admin/posts", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "x-admin-secret": secret,
        },
        body: JSON.stringify({ post: update }),
      });
      if (!response.ok) {
        throw new Error(`Failed to update post (${response.status})`);
      }
      const data = await response.json();
      setPosts((prev) => prev.map((item) => (item.slug === data.post.slug ? data.post : item)));
      setEditingSlug(null);
      setDraft(null);
      setMessage("Post updated successfully");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout>
      <Head>
        <title>Tripolio Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <section className="section mt-12 space-y-8">
        <header className="space-y-4">
          <h1 className="text-3xl font-bold text-ink">Scheduler Control Room</h1>
          <p className="text-sm text-slate-600">
            Provide the admin secret to unlock schedule controls. Review upcoming posts, tweak content, and publish/unpublish instantly.
          </p>
        </header>

        {!secret && (
          <form onSubmit={handleUnlock} className="max-w-md space-y-4 rounded-3xl bg-white p-6 shadow-soft">
            <label className="block text-sm font-semibold text-slate-600" htmlFor="secret">
              Admin secret
            </label>
            <input
              id="secret"
              type="password"
              value={inputSecret}
              onChange={(event) => setInputSecret(event.target.value)}
              className="w-full rounded-2xl border border-slate-200 px-4 py-3 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-primary/90"
            >
              Unlock dashboard
            </button>
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>
        )}

        {secret && (
          <div className="space-y-6">
            <div className="rounded-3xl bg-slate-50 p-6 shadow-soft">
              <p className="text-sm text-slate-500">Scheduled posts remaining</p>
              <p className="text-2xl font-semibold text-ink">{scheduledCount}</p>
              <div className="mt-4 flex flex-wrap gap-3 text-xs text-slate-500">
                <button
                  type="button"
                  onClick={() => fetchPosts(secret)}
                  className="rounded-full bg-white px-4 py-2 font-semibold text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-primary/10"
                  disabled={loading}
                >
                  Refresh list
                </button>
                <span>Posts auto-publish every 4 days starting 10 Nov 2025</span>
              </div>
            </div>

            {message && <div className="rounded-2xl bg-emerald-50 px-4 py-3 text-sm text-emerald-700">{message}</div>}
            {error && <div className="rounded-2xl bg-red-50 px-4 py-3 text-sm text-red-600">{error}</div>}

            <div className="space-y-6">
              {loading && <div className="text-sm text-slate-500">Loading posts…</div>}
              {!loading && posts.length === 0 && <div className="rounded-3xl border border-dashed border-slate-200 p-10 text-center text-slate-500">No posts found. Run the seeding script to populate scheduled posts.</div>}

              {posts.map((post) => {
                const isEditing = editingSlug === post.slug;
                return (
                  <article key={post.slug} className="rounded-3xl bg-white p-6 shadow-soft">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-ink">{post.title}</h2>
                        <p className="text-sm text-slate-500">
                          Scheduled for {new Date(post.dateScheduled).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })} · {post.published ? "Published" : "Scheduled"}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            if (isEditing) {
                              setEditingSlug(null);
                              setDraft(null);
                            } else {
                              handleEdit(post);
                            }
                          }}
                          className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-primary shadow-soft transition hover:-translate-y-0.5 hover:bg-primary/10"
                        >
                          {isEditing ? "Cancel" : "Edit"}
                        </button>
                        <button
                          type="button"
                          onClick={() => submitPost({ ...post, published: !post.published })}
                          className={`rounded-full px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 ${
                            post.published ? "bg-slate-500 hover:bg-slate-600" : "bg-primary hover:bg-primary/90"
                          }`}
                          disabled={loading}
                        >
                          {post.published ? "Unpublish" : "Publish now"}
                        </button>
                      </div>
                    </div>

                    {isEditing && draft && (
                      <div className="mt-6 space-y-4">
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">SEO Title</label>
                          <input
                            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                            value={draft.seoTitle ?? ""}
                            onChange={(event) => handleDraftChange("seoTitle", event.target.value)}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Meta Description</label>
                          <textarea
                            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                            value={draft.seoDescription ?? ""}
                            onChange={(event) => handleDraftChange("seoDescription", event.target.value)}
                            rows={2}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Excerpt</label>
                          <textarea
                            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                            value={draft.excerpt ?? ""}
                            onChange={(event) => handleDraftChange("excerpt", event.target.value)}
                            rows={3}
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold uppercase tracking-wide text-slate-500">Content (HTML)</label>
                          <textarea
                            className="mt-1 w-full rounded-2xl border border-slate-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
                            value={draft.content ?? ""}
                            onChange={(event) => handleDraftChange("content", event.target.value)}
                            rows={10}
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => submitPost(draft)}
                          className="rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white shadow-soft transition hover:-translate-y-0.5 hover:bg-primary/90"
                          disabled={loading}
                        >
                          Save changes
                        </button>
                      </div>
                    )}
                  </article>
                );
              })}
            </div>
          </div>
        )}
      </section>
    </Layout>
  );
}

