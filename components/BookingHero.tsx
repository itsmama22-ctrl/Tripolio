import Image from "next/image";
import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { HiOutlineSwitchHorizontal, HiOutlineCalendar, HiOutlineUserGroup, HiOutlineLocationMarker } from "react-icons/hi";
import type { ReactNode } from "react";
import { addDays, format } from "date-fns";
import { getStays } from "../lib/stays";

interface BookingHeroProps {
  backgroundImageUrl?: string;
  onSearch?: (payload: BookingFormState) => void;
}

interface BookingFormState {
  origin: string;
  destination: string;
  departDate: string;
  returnDate: string;
  passengers: string;
  showHotels: boolean;
}

const passengersOptions = [
  { value: "1", label: "1 passenger" },
  { value: "2", label: "2 passengers" },
  { value: "3", label: "3 passengers" },
  { value: "4", label: "4 passengers" },
  { value: "5", label: "5+ passengers" },
];

export default function BookingHero({
  backgroundImageUrl = "https://images.unsplash.com/photo-1489515217757-5fd1be406fef?auto=format&fit=crop&w=2100&q=80",
  onSearch,
}: BookingHeroProps) {
  const router = useRouter();
  const today = useMemo(() => new Date(), []);
  const defaultDepart = useMemo(() => addDays(today, 7), [today]);
  const defaultReturn = useMemo(() => addDays(today, 14), [today]);

  const destinationSuggestions = useMemo(() => {
    const stays = getStays();
    const unique = new Map<string, string>();
    stays.forEach((stay) => {
      const label = `${stay.location.city}, ${stay.location.country}`;
      if (!unique.has(label)) {
        unique.set(label, label);
      }
    });
    return Array.from(unique.values()).slice(0, 10);
  }, []);

  const [formState, setFormState] = useState<BookingFormState>({
    origin: "New York",
    destination: "Bangkok",
    departDate: format(defaultDepart, "yyyy-MM-dd"),
    returnDate: format(defaultReturn, "yyyy-MM-dd"),
    passengers: passengersOptions[0].value,
    showHotels: true,
  });

  const handleChange = <Key extends keyof BookingFormState>(key: Key, value: BookingFormState[Key]) => {
    setFormState((previous) => {
      if (key === "departDate") {
        const departValue = value as string;
        if (departValue && new Date(departValue) > new Date(previous.returnDate)) {
          return {
            ...previous,
            departDate: departValue,
            returnDate: departValue,
          };
        }
      }
      if (key === "returnDate") {
        const returnValue = value as string;
        if (returnValue && new Date(returnValue) < new Date(previous.departDate)) {
          return { ...previous, returnDate: returnValue, departDate: returnValue };
        }
      }
      return { ...previous, [key]: value };
    });
  };

  const handleSwap = () => {
    setFormState((previous) => ({
      ...previous,
      origin: previous.destination,
      destination: previous.origin,
    }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: BookingFormState = { ...formState };
    if (onSearch) {
      onSearch(payload);
      return;
    }

    const trimmedDestination = payload.destination.trim();
    if (trimmedDestination && typeof window !== "undefined") {
      const keyword = trimmedDestination;
      const [cityPart] = trimmedDestination.split(",");
      const city = cityPart?.trim() || trimmedDestination;
      const searchParams = new URLSearchParams();
      searchParams.set("keyword", keyword);

      if (payload.departDate) {
        searchParams.set("startDate", payload.departDate);
      }
      if (payload.returnDate) {
        searchParams.set("endDate", payload.returnDate);
      }
      if (payload.passengers) {
        searchParams.set("adults", payload.passengers);
      }

      searchParams.set("city", city);
      searchParams.set("utm_source", "tripolio");

      const klookUrl = `https://www.klook.com/search/?${searchParams.toString()}`;
      window.location.href = klookUrl;
      return;
    }

    router.push("/list");
  };

  return (
    <section className="relative isolate flex min-h-[620px] items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src={backgroundImageUrl}
          alt="Tropical bay with limestone cliffs"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-slate-900/70" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-primary/40" />
      </div>

      <div className="section relative z-10 grid gap-12 py-20 lg:grid-cols-[1fr,0.9fr] lg:items-center">
        <div className="max-w-xl space-y-8 text-white">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/15 px-5 py-2 text-xs font-semibold uppercase tracking-wide backdrop-blur">
            <span className="inline-block h-2 w-2 rounded-full bg-accent" />
            Curated escapes
          </div>
          <div className="space-y-5">
            <h1 className="text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl">
              Find your next vacation stay with Tripolio
            </h1>
            <p className="text-base text-white/80 sm:text-lg">
              Compare boutique hotels, mindful tours, and curated experiences in one place. Tripolio blends editorial insight with live partner pricing so you never miss the perfect getaway.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Fast getaways</p>
              <p className="mt-2 text-sm text-white/80">
                Instant itineraries for 50+ cities, ready to personalise with your own affiliate links.
              </p>
            </div>
            <div className="rounded-3xl border border-white/20 bg-white/10 p-5 backdrop-blur">
              <p className="text-xs font-semibold uppercase tracking-wide text-white/60">Exclusive perks</p>
              <p className="mt-2 text-sm text-white/80">
                Swap in Booking, Expedia, or Klook codes and keep commissions flowing while Tripolio auto-publishes fresh guides.
              </p>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative flex w-full flex-col gap-6 rounded-[36px] bg-white p-8 shadow-[0_30px_70px_-35px_rgba(15,23,42,0.45)]"
        >
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Plan your escape</p>
              <p className="text-lg font-semibold text-slate-900">Search curated routes & stays</p>
            </div>
            <button
              type="button"
              onClick={handleSwap}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 text-slate-500 transition hover:border-primary/40 hover:text-primary"
              aria-label="Swap origin and destination"
            >
              <HiOutlineSwitchHorizontal className="h-5 w-5" />
            </button>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <BookingInput
              label="Origin"
              icon={<HiOutlineLocationMarker className="h-5 w-5 text-primary" aria-hidden="true" />}
              placeholder="City or airport"
              value={formState.origin}
              onChange={(value) => handleChange("origin", value)}
              suggestions={destinationSuggestions}
              datalistId="origin-options"
            />
            <BookingInput
              label="Destination"
              icon={<HiOutlineLocationMarker className="h-5 w-5 text-primary" aria-hidden="true" />}
              placeholder="Where to?"
              value={formState.destination}
              onChange={(value) => handleChange("destination", value)}
              suggestions={destinationSuggestions}
              datalistId="destination-options"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {destinationSuggestions.slice(0, 6).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => handleChange("destination", option)}
                className="rounded-full border border-slate-200 bg-slate-50 px-4 py-2 text-xs font-semibold text-slate-600 transition hover:border-primary/40 hover:bg-white hover:text-primary"
              >
                {option}
              </button>
            ))}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <BookingInput
              label="Depart date"
              icon={<HiOutlineCalendar className="h-5 w-5 text-primary" aria-hidden="true" />}
              type="date"
              min={format(today, "yyyy-MM-dd")}
              value={formState.departDate}
              onChange={(value) => handleChange("departDate", value)}
            />
            <BookingInput
              label="Return date"
              icon={<HiOutlineCalendar className="h-5 w-5 text-primary" aria-hidden="true" />}
              type="date"
              min={formState.departDate}
              value={formState.returnDate}
              onChange={(value) => handleChange("returnDate", value)}
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-[2fr,1fr] sm:items-end">
            <div>
              <label htmlFor="passengers" className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Passengers
              </label>
              <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700">
                <HiOutlineUserGroup className="h-5 w-5 text-primary" aria-hidden="true" />
                <select
                  id="passengers"
                  name="passengers"
                  className="w-full bg-transparent text-sm font-medium outline-none"
                  value={formState.passengers}
                  onChange={(event) => handleChange("passengers", event.target.value)}
                >
                  {passengersOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
              <input
                id="show-hotels"
                type="checkbox"
                checked={formState.showHotels}
                onChange={(event) => handleChange("showHotels", event.target.checked)}
                className="h-5 w-5 rounded border-slate-300 text-primary focus:ring-primary"
              />
              <label htmlFor="show-hotels" className="flex flex-col">
                <span className="text-sm font-medium text-slate-800">Show hotels</span>
                <span className="text-xs text-slate-500">Include accommodation options</span>
              </label>
            </div>
          </div>

          <button type="submit" className="button-primary flex w-full items-center justify-center gap-2 py-4 text-base">
            Search
          </button>

          <p className="text-xs text-slate-500">
            Transparent affiliate disclosure: some partner links may earn Tripolio a commission at no extra cost to you.
          </p>
        </form>
      </div>
    </section>
  );
}

interface BookingInputProps {
  label: string;
  icon: ReactNode;
  placeholder?: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  min?: string;
  suggestions?: string[];
  datalistId?: string;
}

function BookingInput({
  label,
  icon,
  placeholder,
  value,
  onChange,
  type = "text",
  min,
  suggestions,
  datalistId,
}: BookingInputProps) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">{label}</span>
      <div className="mt-2 flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
        <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-white text-slate-600 shadow-inner">
          {icon}
        </span>
        {type === "date" ? (
          <input
            type="date"
            min={min}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none"
          />
        ) : (
          <input
            type="text"
            placeholder={placeholder}
            value={value}
            onChange={(event) => onChange(event.target.value)}
            className="w-full bg-transparent text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
            list={suggestions && datalistId ? datalistId : undefined}
          />
        )}
      </div>
      {suggestions && datalistId ? (
        <datalist id={datalistId}>
          {suggestions.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>
      ) : null}
    </label>
  );
}

