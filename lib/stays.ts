import staysData from "../data/stays.json";
import type { Stay } from "../types";

type StayFilter = {
  term?: string;
  location?: string;
  filter?: string;
};

export function getStays(): Stay[] {
  return staysData as Stay[];
}

export function getStayById(id: string): Stay | undefined {
  return getStays().find((stay) => stay.id === id);
}

export function filterStays({ term = "", location = "", filter }: StayFilter): Stay[] {
  const normalizedTerm = term.toLowerCase();
  const normalizedLocation = location.toLowerCase();

  return getStays().filter((stay) => {
    const matchesTerm = normalizedTerm
      ? stay.name.toLowerCase().includes(normalizedTerm) ||
        stay.shortDescription.toLowerCase().includes(normalizedTerm) ||
        stay.description.toLowerCase().includes(normalizedTerm)
      : true;

    const matchesLocation = normalizedLocation
      ? stay.location.city.toLowerCase().includes(normalizedLocation) ||
        stay.location.country.toLowerCase().includes(normalizedLocation)
      : true;

    const matchesFilter = filter
      ? filter === "near-me"
        ? true
        : filter === "airbnb"
        ? stay.affiliateUrl.includes("airbnb")
        : stay.affiliateUrl.includes("booking") || stay.affiliateUrl.includes("expedia")
      : true;

    return matchesTerm && matchesLocation && matchesFilter;
  });
}
