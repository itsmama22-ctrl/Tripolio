import { useEffect, useState } from "react";
import Link from "next/link";
import { HiOutlineMap, HiOutlineArrowNarrowRight } from "react-icons/hi";
import type { NearbyPlace } from "../types";

interface NearbyAttractionsProps {
  latitude: number;
  longitude: number;
}

type FetchState = "idle" | "loading" | "success" | "error";

export function NearbyAttractions({ latitude, longitude }: NearbyAttractionsProps) {
  const [places, setPlaces] = useState<NearbyPlace[]>([]);
  const [state, setState] = useState<FetchState>("idle");

  useEffect(() => {
    const controller = new AbortController();

    async function loadPlaces() {
      setState("loading");
      try {
        const params = new URLSearchParams({ lat: String(latitude), lon: String(longitude) });
        const response = await fetch(`/api/opentripmap?${params.toString()}`, {
          signal: controller.signal,
        });
        if (!response.ok) {
          throw new Error("Failed to fetch attractions");
        }
        const data = (await response.json()) as { places: NearbyPlace[] };
        setPlaces(data.places);
        setState("success");
      } catch (error) {
        if ((error as Error).name === "AbortError") {
          return;
        }
        console.error(error);
        setState("error");
      }
    }

    loadPlaces();

    return () => controller.abort();
  }, [latitude, longitude]);

  if (state === "loading" && places.length === 0) {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <div className="flex items-center gap-3 text-slate-600">
          <div className="h-10 w-10 animate-pulse rounded-full bg-primary/10" />
          <div className="flex-1">
            <div className="h-3 w-1/2 animate-pulse rounded-full bg-slate-200" />
            <div className="mt-2 h-3 w-1/3 animate-pulse rounded-full bg-slate-200" />
          </div>
        </div>
      </div>
    );
  }

  if (state === "error") {
    return (
      <div className="rounded-3xl bg-white p-6 shadow-card">
        <p className="text-sm text-slate-600">
          We couldn’t load nearby attractions right now. Please try again later.
        </p>
      </div>
    );
  }

  if (places.length === 0) {
    return null;
  }

  return (
    <div className="rounded-3xl bg-white p-6 shadow-card">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-slate-900">Nearby attractions</h3>
        <span className="text-xs uppercase tracking-wide text-primary/70">
          Powered by OpenTripMap
        </span>
      </div>
      <ul className="mt-6 space-y-4">
        {places.slice(0, 6).map((place) => (
          <li key={place.id} className="flex flex-col gap-2 rounded-2xl bg-slate-100 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="flex items-center gap-2 font-medium text-slate-900">
                <HiOutlineMap className="h-5 w-5 text-primary" aria-hidden="true" />
                {place.name}
              </p>
              <p className="text-xs text-slate-500">
                {place.distance} m away · {place.kinds.join(" · ")}
              </p>
            </div>
            <Link
              href={`https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-xs font-semibold text-primary hover:text-accent"
            >
              View map
              <HiOutlineArrowNarrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
