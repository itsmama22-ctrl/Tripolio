# Tripolio – Travel Affiliate Platform

Tripolio is a modern travel affiliate website built with Next.js 14 and Tailwind CSS. The site combines destination discovery, scheduled SEO blog content, and Supabase automation to keep 50 long-form travel guides publishing every four days starting **10 November 2025**.

## Highlights

- **Affiliate-ready UI** – mobile-first layout, hero CTA, destination grids, inline disclosure, and clearly labeled partner links.
- **Supabase automation** – scheduled posts stored in `scheduled_posts`, daily cron endpoint flips content live and triggers ISR revalidation + sitemap refresh.
- **50 long-form guides** – templated 900–1,200 word articles (HTML) seeded via script with top/bottom affiliate CTAs and Unsplash imagery.
- **SEO tooling** – canonical tags, OpenGraph + Twitter cards, Article JSON-LD, paginated blog index, dynamic sitemap, robots.txt.
- **Admin dashboard** – secret-protected control room to review scheduled posts, edit metadata/content, and force publish/unpublish actions.
- **Deployment ready** – Vercel config guidance, GitHub Action scheduler sample, and instructions for configuring Supabase + environment variables.

## Project Structure

```
components/         Reusable UI (header, footer, CTA blocks, share buttons)
lib/                Supabase + SEO utilities, logging, blog helpers
pages/              Next.js pages (home, destinations, blog, admin, legal)
pages/api/          API routes (scheduler, admin, OpenTripMap proxy)
public/             Static assets (affiliate imagery placeholders, logos)
scripts/            Supabase seeding + automation helpers
styles/             Global Tailwind layer
```

## Getting Started

```bash
npm install
npm run dev
# visit http://localhost:3000
```

## Environment Variables

Create `.env.local` (or configure in Vercel):

```
NEXT_PUBLIC_SITE_URL=https://your-domain.com
NEXT_PUBLIC_SUPABASE_URL=https://your-supabase-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key
SCHEDULER_SECRET=set-a-strong-secret
ADMIN_SECRET=set-a-different-strong-secret
OPENTRIPMAP_API_KEY=optional-if-you-keep-map-endpoints
```

> `SCHEDULER_SECRET` secures the publish endpoint and the GitHub Action / Vercel cron hooks. `ADMIN_SECRET` unlocks the dashboard at `/admin`.

## Supabase Setup

1. Create a **free Supabase project** and PostgreSQL database.
2. Run the SQL from [supabase/schema.sql](#supabase-table-sql) (also printed at the end of this README) to create the `scheduled_posts` table.
3. Copy the project URL and anon keys into your environment variables.
4. Generate a **Service Role** key and set `SUPABASE_SERVICE_ROLE_KEY` locally + in Vercel (Server-side only).

### Seed 50 Scheduled Posts

The generator populates 50 SEO-optimised posts with 4-day cadence starting 10 Nov 2025.

```bash
# with env vars set (must include SUPABASE_SERVICE_ROLE_KEY)
node scripts/seed-scheduled-posts.mjs

# preview without touching Supabase
DRY_RUN=true node scripts/seed-scheduled-posts.mjs
```

The script builds deterministic HTML content, excerpts, meta descriptions, and affiliate CTA metadata for each post. Run again to re-upsert (uses slug conflict resolution).

## Scheduler Automation

- **API endpoint**: `POST /api/scheduler/run`
  - Requires header `x-scheduler-secret: ${SCHEDULER_SECRET}`
  - Publishes any `scheduled_posts` where `published=false` and `dateScheduled <= today`
  - Triggers ISR revalidation for affected posts, blog index, and sitemap
  - Logs success/failures to server console

### GitHub Action (daily trigger)

See [`./.github/workflows/daily-scheduler.yml`](./.github/workflows/daily-scheduler.yml) once generated (instructions below). Example snippet is included in the “Automation snippets” section at the end of this README.

### Vercel Cron (optional)

Add a cron job in `vercel.json` or via the dashboard:

```json
{
  "crons": [
    {
      "path": "/api/scheduler/run",
      "schedule": "0 6 * * *",
      "headers": {
        "x-scheduler-secret": "@scheduler-secret"
      }
    }
  ]
}
```

Store `scheduler-secret` as an encrypted Vercel environment variable.

## Admin Dashboard

- URL: `/admin`
- Unlock with `ADMIN_SECRET` (stored client-side in `sessionStorage`).
- Features:
  - View full schedule (published + upcoming) sorted by `dateScheduled`
  - Quick publish/unpublish toggles (updates Supabase immediately)
  - Metadata/content editor for SEO title, meta description, excerpt, and HTML body
  - Refresh button to re-fetch Supabase data

## Development Commands

| Command            | Description                                      |
| ------------------ | ------------------------------------------------ |
| `npm run dev`      | Start Next.js dev server                         |
| `npm run build`    | Production build                                 |
| `npm run start`    | Run production build locally                     |
| `npm run lint`     | Run ESLint (first run will prompt to configure)  |
| `node scripts/seed-scheduled-posts.mjs` | Seed Supabase scheduled posts |

> `npm run lint` will prompt for Next.js ESLint config if it hasn’t been initialised yet. Cancel to skip or follow the prompt to generate a config.

## Deployment

1. Push to GitHub (recommended).
2. Connect repository to Vercel.
3. Set environment variables in Vercel (Production & Preview).
4. (Optional) Add Vercel Cron job or use the provided GitHub Action for the scheduler.
5. Publish – the site uses ISR for the blog, admin API routes, and Supabase data fetching.

## Legal & Compliance

- `pages/affiliate-disclosure.tsx` – full disclosure page.
- Footer includes inline disclosure text.
- `pages/privacy.tsx` – editable privacy baseline.
- `pages/contact.tsx` – contact template ready for Formspree/CRM integration.

## Supabase Table SQL

```sql
create table if not exists public.scheduled_posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  excerpt text not null,
  content text not null,
  image_url text not null,
  image_alt text default ''::text,
  seo_title text not null,
  seo_description text not null,
  author text default 'Tripolio Editorial',
  dateScheduled date not null,
  published boolean not null default false,
  published_at date,
  affiliate_cta jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

create index if not exists scheduled_posts_dates_idx on public.scheduled_posts (dateScheduled);
create index if not exists scheduled_posts_published_idx on public.scheduled_posts (published);
```

## Automation Snippets

### Scheduler Endpoint (cURL)

```bash
curl -X POST https://your-domain.com/api/scheduler/run \
  -H "x-scheduler-secret: $SCHEDULER_SECRET"
```

### GitHub Action (daily @ 06:00 UTC)

```yaml
name: Tripolio Scheduler

on:
  schedule:
    - cron: "0 6 * * *"

jobs:
  publish-scheduled-posts:
    runs-on: ubuntu-latest
    steps:
      - name: Trigger Tripolio scheduler
        run: |
          curl -X POST "${{ secrets.TRIPOLIO_SITE_URL }}/api/scheduler/run" \
            -H "x-scheduler-secret: ${{ secrets.TRIPOLIO_SCHEDULER_SECRET }}"
```

Configure the following GitHub secrets:

- `TRIPOLIO_SITE_URL` – your deployed origin (`https://tripolio.vercel.app`)
- `TRIPOLIO_SCHEDULER_SECRET` – matches `SCHEDULER_SECRET`

## Notes & Next Steps

- Replace `source.unsplash.com` image URLs with licensed assets when ready.
- Connect newsletter/contact forms to real services.
- Swap placeholder booking URLs with live affiliate deep links.
- Consider adding analytics (Plausible, Google Analytics) for conversion tracking.
- Keep Supabase row-level security disabled for this table unless you add policies.
