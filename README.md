# Tripolio Web

Tripolio is a travel affiliate discovery experience inspired by the Tripolio iOS app. This Next.js scaffold showcases a minimalist, map-first interface for browsing curated stays and driving affiliate conversions.

## Features

- **Affiliate-first UI** – every stay card and detail view includes a clearly marked affiliate CTA.
- **Interactive map** – Leaflet + OpenStreetMap with clustering and custom pins.
- **Mock data ready** – JSON-based stay catalog and blog posts for local development.
- **Tailwind design system** – minimalist blue/beige palette, rounded surfaces, mobile-first layout.
- **SEO foundations** – per-page meta tags, clean URLs, blog placeholders, legal pages, and disclosure copy.
- **OpenTripMap integration** – Stay detail pages surface nearby attractions powered by the OpenTripMap API.

## Structure

```
components/      Shared UI elements (header, footer, map, cards)
data/            Mock stays and blog post JSON
lib/             Data helper utilities
pages/           Next.js pages (home, map, list, stays, blog, legal)
pages/api/       Serverless routes (OpenTripMap proxy)
public/assets/   Logo, map pin, and app mockup placeholders
styles/          Global Tailwind layer
```

## Getting Started

```bash
npm install
npm run dev
```

The app boots on `http://localhost:3000` by default.

### Environment variables

Create a `.env.local` file in the project root with your API key:

```
OPENTRIPMAP_API_KEY=your_opentripmap_api_key_here
```

> The serverless proxy at `/api/opentripmap` keeps your key off the client and powers the nearby attraction widget on stay pages.

When deploying on Vercel, add the same variable in project settings (Settings → Environment Variables) before running the first production build:

| Name | Value |
| --- | --- |
| `OPENTRIPMAP_API_KEY` | `5ae2e3f221c38a28845f05b68166a5f9b6efa6dcc6c2554bc1345d97` |

### Map dependencies

Leaflet requires browser-only rendering. The map components are dynamically loaded (`ssr: false`) to keep Next.js server builds safe.

## Customization Checklist

- Replace `data/stays.json` with real partner data or connect to an API.
- Swap the placeholder affiliate URLs with actual partner deep links.
- Update legal copy in `pages/affiliate-disclosure.tsx`, `privacy.tsx`, and `terms.tsx`.
- Connect the newsletter form to Mailchimp, ConvertKit, or another service.
- Provide production-ready assets in `public/assets/` (logo, app screenshots, favicons).
- Tune OpenTripMap radius, kinds, or UI as you refine attraction coverage.

## Deployment

This project targets static export + Serverless runtime compatible with Vercel or Netlify.

```bash
npm run build
npm start
```

For Netlify, add a `_redirects` file if you plan to expand dynamic routes beyond the included static paths.

## Tech Stack

- Next.js 14 (pages router)
- React 18 + TypeScript
- Tailwind CSS 3
- Leaflet & react-leaflet
- MarkerCluster (via Leaflet)

## License

All third-party images currently use Unsplash URLs for prototyping. Replace with licensed assets before production.
