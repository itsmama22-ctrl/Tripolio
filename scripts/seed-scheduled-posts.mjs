/* eslint-disable no-console */
import { randomUUID } from "crypto";
import { createClient } from "@supabase/supabase-js";
import { addDays, format } from "date-fns";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const DRY_RUN = process.env.DRY_RUN === "true";

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  if (!DRY_RUN) {
    console.error("Missing Supabase credentials. Set NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY.");
    process.exit(1);
  }
}

const supabase = !DRY_RUN && SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false },
    })
  : null;

const cityCatalog = [
  {
    name: "Paris",
    country: "France",
    slugBase: "paris-france",
    imageKeyword: "paris skyline",
    neighborhoodFocus: ["Le Marais", "Saint-Germain-des-Prés", "Canal Saint-Martin"],
    signatureExperiences: ["Sunrise cruise on the Seine", "Chef-led market tour in Bastille", "Modern art crawl at Fondation Louis Vuitton"],
    klookLink: "https://klook.tpm.lv/E7mvBpuw",
    hotelIdeas: [
      { name: "Hôtel Dame des Arts", vibe: "rooftop views & creative suites" },
      { name: "Maison Bréguet", vibe: "stylish Marais refuge" },
      { name: "Hotel des Grands Boulevards", vibe: "ornate cocktail-fuelled evenings" },
    ],
  },
  {
    name: "Tokyo",
    country: "Japan",
    slugBase: "tokyo-japan",
    imageKeyword: "tokyo city",
    neighborhoodFocus: ["Shibuya", "Asakusa", "Daikanyama"],
    signatureExperiences: ["Tsukiji outer market tasting tour", "Night photo walk in Shinjuku", "Studio Ghibli day trip with skip-the-line access"],
    klookLink: "https://klook.tpm.lv/jVvDqH2u",
    hotelIdeas: [
      { name: "Trunk Hotel Shibuya", vibe: "boutique social club energy" },
      { name: "Hoshinoya Tokyo", vibe: "ryokan-style calm in the city" },
      { name: "sequence MIYASHITA PARK", vibe: "creative rooftop playground" },
    ],
  },
  {
    name: "New York",
    country: "USA",
    slugBase: "new-york-usa",
    imageKeyword: "new york skyline",
    neighborhoodFocus: ["Williamsburg", "SoHo", "Long Island City"],
    signatureExperiences: ["Sunrise run on the High Line", "Harlem jazz & supper crawl", "Hudson Yards Edge night access"],
    klookLink: "https://klook.tpm.lv/SHtqk4Ad",
    hotelIdeas: [
      { name: "Ace Hotel Brooklyn", vibe: "design-forward creative hub" },
      { name: "The Ludlow Hotel", vibe: "Lower East Side loft feels" },
      { name: "1 Hotel Brooklyn Bridge", vibe: "eco-luxe skyline views" },
    ],
  },
  {
    name: "Marrakesh",
    country: "Morocco",
    slugBase: "marrakesh-morocco",
    imageKeyword: "marrakesh souk",
    neighborhoodFocus: ["Medina", "Gueliz", "Palmeraie"],
    signatureExperiences: ["Atlas Mountains day trek", "Spice souk tasting class", "Sunset rooftop storytelling"],
    klookLink: "https://klook.tpm.lv/DPWpNJ4a",
    hotelIdeas: [
      { name: "El Fenn", vibe: "color-drenched riad glamour" },
      { name: "Riad BE Marrakech", vibe: "instagrammable hideaway" },
      { name: "Dar Darma", vibe: "opulent suites with plunge pools" },
    ],
  },
  {
    name: "Dubai",
    country: "UAE",
    slugBase: "dubai-uae",
    imageKeyword: "dubai desert skyline",
    neighborhoodFocus: ["Downtown Dubai", "Alserkal Avenue", "Jumeirah Beach"],
    signatureExperiences: ["Sunrise desert safari", "Evening dhow cruise with dining", "Helicopter tour over Palm Jumeirah"],
    klookLink: "https://klook.tpm.lv/KD3ANcN8",
    hotelIdeas: [
      { name: "25hours Hotel One Central", vibe: "design playground with desert views" },
      { name: "Bulgari Resort Dubai", vibe: "yacht-club sophistication" },
      { name: "Rove Downtown", vibe: "affordable creative hub" },
    ],
  },
  {
    name: "Bali",
    country: "Indonesia",
    slugBase: "bali-indonesia",
    imageKeyword: "bali jungle retreat",
    neighborhoodFocus: ["Ubud", "Canggu", "Uluwatu"],
    signatureExperiences: ["Dawn yoga at jungle shala", "Surf coaching in Canggu", "Balinese cooking class with local family"],
    klookLink: "https://klook.tpm.lv/dmie9vAB",
    hotelIdeas: [
      { name: "Bisma Eight", vibe: "modern suites overlooking jungle" },
      { name: "The Slow Canggu", vibe: "gallery-style beach stay" },
      { name: "Gravity Boutique Hotel", vibe: "cliffside boheme in Uluwatu" },
    ],
  },
  {
    name: "London",
    country: "UK",
    slugBase: "london-uk",
    imageKeyword: "london skyline",
    neighborhoodFocus: ["Shoreditch", "Soho", "Southbank"],
    signatureExperiences: ["East London street art safari", "Chef-led Borough Market lunch", "Thames sunset speedboat ride"],
    klookLink: "https://klook.tpm.lv/Rm6IcUh7",
    hotelIdeas: [
      { name: "The Hoxton Southwark", vibe: "industrial chic near Tate Modern" },
      { name: "The Standard, London", vibe: "retro-futuristic King's Cross icon" },
      { name: "Artist Residence London", vibe: "eclectic townhouse stay" },
    ],
  },
  {
    name: "Rome",
    country: "Italy",
    slugBase: "rome-italy",
    imageKeyword: "rome historic streets",
    neighborhoodFocus: ["Monti", "Trastevere", "Prati"],
    signatureExperiences: ["After-hours Vatican tour", "Gelato masterclass near Piazza Navona", "Vespa sidecar ride at sunset"],
    klookLink: "https://klook.tpm.lv/ZLwbfXUX",
    hotelIdeas: [
      { name: "Chapter Roma", vibe: "design-led boutique near Campo de' Fiori" },
      { name: "Hotel de' Ricci", vibe: "intimate suites with wine cellar" },
      { name: "NH Collection Roma Fori Imperiali", vibe: "rooftop breakfasts with Forum views" },
    ],
  },
  {
    name: "Cape Town",
    country: "South Africa",
    slugBase: "cape-town-south-africa",
    imageKeyword: "cape town table mountain",
    neighborhoodFocus: ["V&A Waterfront", "Gardens", "Sea Point"],
    signatureExperiences: ["Table Mountain sunrise hike", "Winelands day trip with tastings", "Bo-Kaap culture walk"],
    klookLink: "https://klook.tpm.lv/E7mvBpuw",
    hotelIdeas: [
      { name: "The Silo Hotel", vibe: "art-filled harbour icon" },
      { name: "Kloof Street Hotel", vibe: "city retreat with rooftop pool" },
      { name: "Ellerman House", vibe: "clifftop heritage glamour" },
    ],
  },
  {
    name: "Vancouver",
    country: "Canada",
    slugBase: "vancouver-canada",
    imageKeyword: "vancouver waterfront",
    neighborhoodFocus: ["Gastown", "Mount Pleasant", "Kitsilano"],
    signatureExperiences: ["Seaplane flight over Howe Sound", "Granville Island tasting trail", "Capilano suspension bridge and rainforest walk"],
    klookLink: "https://klook.tpm.lv/jVvDqH2u",
    hotelIdeas: [
      { name: "The Douglas, Autograph Collection", vibe: "design-forward Yaletown stay" },
      { name: "OPUS Vancouver", vibe: "color-pop suites in Yaletown" },
      { name: "Fairmont Pacific Rim", vibe: "luxury harbourside skyline views" },
    ],
  },
];

const themes = [
  {
    key: "foodie-weekend",
    title: (city) => `${city.name} Foodie Weekend Guide: 72 Hours of Tastings & Tours`,
    keyword: "foodie weekend",
    slugSuffix: "foodie-weekend-guide",
    excerpt: (city) =>
      `Spend three flavour-packed days in ${city.name} tasting markets, chef-led workshops, and signature dishes with help from Tripolio’s affiliate partners.`,
    meta: (city) =>
      `Plan a ${city.name} foodie weekend with chef-led tours, market tastings, and curated dining picks scheduled through Tripolio every four days.`,
    imageTag: "food",
    tone: "Culinary deep dives, chef tables, and flavour-forward city wandering.",
  },
  {
    key: "family-adventure",
    title: (city) => `${city.name} Family Adventure Blueprint: Culture, Thrills & Easy Wins`,
    keyword: "family adventure",
    slugSuffix: "family-adventure-blueprint",
    excerpt: (city) =>
      `Design a play-filled family getaway in ${city.name} with culture-forward tours, kid-ready dining, and downtime built in for every age.`,
    meta: (city) =>
      `Build a kid-approved ${city.name} itinerary with adventure tours, cultural workshops, and downtime tips from Tripolio’s scheduled posts.`,
    imageTag: "family travel",
    tone: "Energetic, reassuring, logistics-savvy for multi-gen groups.",
  },
  {
    key: "creative-city-break",
    title: (city) => `${city.name} Creative City Break: Art, Design & Indie Hangouts`,
    keyword: "creative city break",
    slugSuffix: "creative-city-break",
    excerpt: (city) =>
      `Tap into ${city.name}’s creative scene with gallery crawls, indie neighbourhoods, and design-led stays curated for curious travelers.`,
    meta: (city) =>
      `Craft a design-forward ${city.name} city break featuring galleries, neighbourhood wanderings, and affiliate-ready creative experiences.`,
    imageTag: "art design",
    tone: "Design-savvy, indie-leaning, perfect for creative professionals.",
  },
  {
    key: "wellness-escape",
    title: (city) => `${city.name} Wellness Escape: Mindful Rituals & Nature-Paired Days`,
    keyword: "wellness escape",
    slugSuffix: "wellness-escape-guide",
    excerpt: (city) =>
      `Balance spas, mindful movement, and nourishing dining across ${city.name} with this restorative itinerary and affiliate-ready bookings.`,
    meta: (city) =>
      `Follow a restorative ${city.name} wellness escape itinerary with mindful movement, spa rituals, and nourishing stops via Tripolio partners.`,
    imageTag: "wellness spa",
    tone: "Calming, rejuvenating, mixing indoor and outdoor rituals.",
  },
  {
    key: "nightlife-culture",
    title: (city) => `${city.name} Nightlife & Culture Circuit: After-Dark Essentials`,
    keyword: "nightlife and culture",
    slugSuffix: "nightlife-culture-circuit",
    excerpt: (city) =>
      `Dance through ${city.name} after dark with curated culture slots, mixology tours, rooftop viewpoints, and late-night bites.`,
    meta: (city) =>
      `Chase culture and nightlife in ${city.name} with rooftop bars, late tours, and mixology classes scheduled via Tripolio’s automated blog.`,
    imageTag: "nightlife",
    tone: "High-energy, urban, spotlighting late-night highlights.",
  },
];

const bookingPlaceholderUrl = "https://your-affiliate-booking-link.example.com";

function sentenceCase(input) {
  return input.charAt(0).toUpperCase() + input.slice(1);
}

function createExcerpt(text) {
  const words = text.split(" ");
  if (words.length > 30) {
    return words.slice(0, 30).join(" ") + ".";
  }
  if (words.length < 20) {
    return `${text} Discover more with Tripolio.`;
  }
  return text;
}

function clampMetaDescription(text) {
  if (text.length <= 155) return text;
  return `${text.slice(0, 152)}...`;
}

function wordCountFromHtml(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim().split(" ").length;
}

function generateImage(keyword, tag, variant = 0) {
  const query = encodeURIComponent(`${keyword},${tag},travel`);
  return `https://source.unsplash.com/1600x900/?${query}&sig=${variant}`;
}

function buildContent(city, theme, extras) {
  const intro = `<p>Set the tone for your ${theme.keyword} in ${city.name}, ${city.country}, where Tripolio’s editorial scouts bundle book-now experiences, contextual storytelling, and partner perks into one streamlined guide. Each section aligns with SEO-rich headings so your affiliate strategy gets the double win of human engagement and search visibility.</p>`;

  const vibeParagraph = `<p>${theme.tone} Use this editorial calendar entry to plug directly into Tripolio’s Supabase scheduler, keeping fresh content live every four days without lifting a finger.</p>`;

  const neighbourhoods = `<h2>Neighbourhoods to anchor your stay</h2>
<p>${city.name} rewards slow wandering. Base yourself between ${city.neighborhoodFocus
    .slice(0, 2)
    .join(" and ")} while bookmarking day trips further afield for built-in variety.</p>
<ul>
${city.neighborhoodFocus
    .map((hood) => `<li><strong>${hood}:</strong> ${sentenceCase(theme.tone.split(".")[0])} pairs well with ${hood}'s vibe—expect boutique cafés, creative studios, and easy transit.</li>`)
    .join("\n")}
</ul>`;

  const experiences = `<h2>Top things to do</h2>
<p>These experiences sit at the heart of this ${theme.keyword} and convert brilliantly with affiliate CTAs:</p>
<ul>
${city.signatureExperiences
    .map((experience) => `<li>${experience} — reserve a spot via <a href="${city.klookLink}" rel="nofollow noopener sponsored">Tripolio + Klook</a> to lock in commissions.</li>`)
    .join("\n")}
</ul>`;

  const figureOne = `<figure>
  <img src="${generateImage(city.imageKeyword, theme.imageTag)}" alt="${city.name} ${theme.keyword}" width="1600" height="900" loading="lazy" />
  <figcaption>${city.name} scenery to inspire your ${theme.keyword} storytelling.</figcaption>
</figure>`;

  const dayPlanner = `<h2>Day-by-day structure</h2>
<h3>Day 1: Arrival & orientation</h3>
<p>Check into a design-led hotel, drop pins into your Tripolio map, and book an evening experience via our Klook link so you start earning immediately.</p>
<h3>Day 2: Signature experiences</h3>
<p>Stack the day with headline tours, theme-driven tastings, and a golden-hour photo session. Layer short-form video prompts to fuel social engagement.</p>
<h3>Day 3: Slow morning & hidden gems</h3>
<p>Pair a lazy brunch with neighbourhood wanderings before closing out with a sunset rooftop or spa ritual suited to this itinerary’s theme.</p>`;

  const hotels = `<h2>Where to stay</h2>
<p>Swap in Booking.com or Expedia affiliate deep links once you finalise partnerships. These properties resonate with Tripolio’s audience:</p>
<ul>
${city.hotelIdeas
    .map((hotel) => `<li><strong>${hotel.name}</strong> — ${hotel.vibe}. Add your preferred accommodation affiliate link to monetise instantly.</li>`)
    .join("\n")}
</ul>`;

  const figureTwo = `<figure>
  <img src="${generateImage(city.imageKeyword, theme.imageTag, 1)}" alt="${city.name} itinerary highlight" width="1600" height="900" loading="lazy" />
  <figcaption>Capture the energy of ${city.name} to elevate your affiliate storytelling.</figcaption>
</figure>`;

  const tips = `<h2>Practical tips</h2>
<ul>
  <li>Schedule this post to publish on ${format(extras.dateScheduled, "MMMM d, yyyy")} so it joins Tripolio’s four-day cadence.</li>
  <li>Embed social proof: add testimonials or quick quotes to increase dwell time and conversion.</li>
  <li>Refresh pricing blocks quarterly—use Supabase admin to tweak copy without redeploying.</li>
  <li>Link to complementary guides in your library for stronger internal linking and SEO lift.</li>
</ul>
<p>Close every post with a reminder about Tripolio’s affiliate disclosure and invite readers to join the newsletter for real-time deal drops.</p>`;

  const outro = `<p>With this ${theme.keyword} locked in, you’re ready to drive commissions through authentic storytelling. Duplicate the structure for your next destination, adjust the Supabase schedule, and let Tripolio’s automation handle the rest.</p>`;

  let content = [
    intro,
    vibeParagraph,
    neighbourhoods,
    figureOne,
    experiences,
    dayPlanner,
    figureTwo,
    hotels,
    tips,
    outro,
  ].join("\n\n");

  let count = wordCountFromHtml(content);
  while (count < 900) {
    content += `\n\n<p>Bonus insight: weave in local phrases, note seasonal nuances, and surface affiliate placements organically. ${city.name} has endless micro-moments—from ${city.signatureExperiences[0].toLowerCase()} to ${city.signatureExperiences[1].toLowerCase()}—that help readers imagine themselves on the ground.</p>`;
    count = wordCountFromHtml(content);
  }
  if (count > 1200) {
    const words = content.split(" ");
    content = words.slice(0, 1200).join(" ");
  }

  return {
    content,
    excerpt: createExcerpt(theme.excerpt(city)),
    metaDescription: clampMetaDescription(theme.meta(city)),
  };
}

function buildPosts() {
  const posts = [];
  const startDate = new Date("2025-11-10T00:00:00Z");

  cityCatalog.forEach((city, cityIndex) => {
    themes.forEach((theme, themeIndex) => {
      const scheduleIndex = cityIndex * themes.length + themeIndex;
      const scheduledDate = addDays(startDate, scheduleIndex * 4);
      const { content, excerpt, metaDescription } = buildContent(city, theme, { dateScheduled: scheduledDate });

      const post = {
        id: randomUUID(),
        title: theme.title(city),
        slug: `${city.slugBase}-${theme.slugSuffix}`,
        excerpt,
        content,
        seo_title: theme.title(city),
        seo_description: metaDescription,
        image_url: generateImage(city.imageKeyword, theme.imageTag, 2),
        dateScheduled: format(scheduledDate, "yyyy-MM-dd"),
        published: false,
        affiliate_cta: [
          {
            headline: `Reserve ${city.name} experiences`,
            body: `Lock in ${theme.keyword} essentials via Tripolio + Klook to keep commissions flowing.`,
            ctaLabel: "Browse Klook experiences",
            url: city.klookLink,
          },
          {
            headline: `Monetise ${city.name} stays`,
            body: "Swap in your Booking.com or Expedia affiliate codes to monetise these hotel picks instantly.",
            ctaLabel: "Add hotel affiliate link",
            url: bookingPlaceholderUrl,
          },
        ],
        author: "Tripolio Editorial",
        image_alt: `${city.name} ${theme.keyword} itinerary`,
      };

      posts.push(post);
    });
  });

  return posts;
}

async function seed() {
  const posts = buildPosts();
  if (DRY_RUN) {
    console.log(JSON.stringify(posts[0], null, 2));
    return;
  }

  if (!supabase) {
    console.error("Supabase client not initialised.");
    process.exit(1);
  }

  console.log(`Seeding ${posts.length} scheduled posts...`);
  const { error } = await supabase.from("scheduled_posts").upsert(posts, { onConflict: "slug" });
  if (error) {
    console.error("Failed to seed posts:", error);
    process.exit(1);
  }

  console.log("Seed complete. All posts inserted/updated.");
}

seed();

