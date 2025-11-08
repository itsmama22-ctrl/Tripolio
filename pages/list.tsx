import { useMemo } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { Layout } from "../components/Layout";
import { StayCard } from "../components/StayCard";
import SearchBar from "../components/SearchBar";
import { filterStays } from "../lib/stays";

export default function ListPage() {
  const router = useRouter();
  const { term = "", location = "", filter = "" } = router.query;

  const termValue = Array.isArray(term) ? term[0] : term;
  const locationValue = Array.isArray(location) ? location[0] : location;
  const filterValue = Array.isArray(filter) ? filter[0] : filter;

  const filtered = useMemo(() => {
    return filterStays({
      term: termValue,
      location: locationValue,
      filter: filterValue,
    });
  }, [termValue, locationValue, filterValue]);

  const handleSearch = (query: { term: string; location: string; filter: string }) => {
    const params = new URLSearchParams();
    if (query.term) params.append("term", query.term);
    if (query.location) params.append("location", query.location);
    if (query.filter) params.append("filter", query.filter);
    router.push(`/list?${params.toString()}`);
  };

  const initialFilter = filterValue || "hotels";

  return (
    <Layout>
      <Head>
        <title>Tripolio Stays | Curated Listings</title>
        <meta
          name="description"
          content="Browse Tripolio's curated selection of hotels, Airbnbs, and retreats. Filter by destination, amenities, and partner type."
        />
      </Head>
      <section className="section py-12">
        <div className="flex flex-col gap-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold text-slate-900">Browse stays</h1>
            <p className="text-sm text-slate-600">
              Filter Tripolio stays by location, vibe, or partner. Each listing includes affiliate booking options.
            </p>
          </div>
          <SearchBar
            onSubmit={handleSearch}
            initialTerm={termValue}
            initialLocation={locationValue}
            initialFilter={initialFilter}
          />
        </div>
        <div className="mt-10 grid gap-8">
          {filtered.length ? (
            filtered.map((stay) => <StayCard key={stay.id} stay={stay} variant="list" />)
          ) : (
            <div className="rounded-3xl bg-white p-12 text-center shadow-card">
              <h2 className="text-xl font-semibold text-slate-900">No stays match your filters yet</h2>
              <p className="mt-2 text-sm text-slate-600">
                Try adjusting your keywords or explore the full collection.
              </p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}
