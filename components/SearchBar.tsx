import { FormEvent, useEffect, useMemo, useState } from "react";
import { HiOutlineSearch, HiOutlineLocationMarker } from "react-icons/hi";
import clsx from "clsx";

interface SearchBarProps {
  onSubmit?: (query: { term: string; location: string; filter: string }) => void;
  variant?: "inline" | "stacked";
  initialTerm?: string;
  initialLocation?: string;
  initialFilter?: string;
}

const filters = [
  { label: "All stays", value: "all" },
  { label: "Airbnb", value: "airbnb" },
  { label: "Near Me", value: "near-me" },
];

export default function SearchBar({
  onSubmit,
  variant = "inline",
  initialTerm = "",
  initialLocation = "",
  initialFilter = filters[0].value,
}: SearchBarProps) {
  const [term, setTerm] = useState(initialTerm);
  const [location, setLocation] = useState(initialLocation);
  const [filter, setFilter] = useState(initialFilter ?? filters[0].value);

  useEffect(() => {
    setTerm(initialTerm);
  }, [initialTerm]);

  useEffect(() => {
    setLocation(initialLocation);
  }, [initialLocation]);

  useEffect(() => {
    if (initialFilter) {
      setFilter(initialFilter);
    } else {
      setFilter(filters[0].value);
    }
  }, [initialFilter]);

  const layoutClass = useMemo(
    () =>
      clsx(
        "w-full rounded-3xl bg-white p-4 shadow-card",
        variant === "inline"
          ? "md:grid md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)_auto] md:items-center md:gap-4"
          : "space-y-4"
      ),
    [variant]
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.({ term, location, filter });
  };

  return (
    <form onSubmit={handleSubmit} className={layoutClass} role="search">
      <div className="flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">
        <HiOutlineSearch className="h-5 w-5 text-primary" aria-hidden="true" />
        <input
          className="w-full bg-transparent text-sm text-slate-800 outline-none"
          type="text"
          placeholder="Search by vibe, keyword, or stay"
          value={term}
          onChange={(event) => setTerm(event.target.value)}
          aria-label="Search keyword"
        />
      </div>
      <div className="mt-3 flex flex-1 items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3 md:mt-0">
        <HiOutlineLocationMarker className="h-5 w-5 text-primary" aria-hidden="true" />
        <input
          className="w-full bg-transparent text-sm text-slate-800 outline-none"
          type="text"
          placeholder="Where to?"
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          aria-label="Location"
        />
      </div>
      <div className="mt-3 md:col-span-3 md:mt-4">
        <div
          className="flex gap-2 overflow-x-auto rounded-full bg-slate-100/60 p-1"
          role="radiogroup"
          aria-label="Filters"
        >
          {filters.map((item) => (
            <button
              key={item.value}
              type="button"
              onClick={() => setFilter(item.value)}
              aria-pressed={filter === item.value}
              className={clsx(
                "whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium transition",
                filter === item.value
                  ? "bg-primary text-white shadow-card"
                  : "bg-white text-slate-600 hover:text-primary"
              )}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
      <div className="mt-3 md:mt-0 md:h-full md:self-stretch">
        <button type="submit" className="button-primary w-full md:h-full">
          Search stays
        </button>
      </div>
    </form>
  );
}
