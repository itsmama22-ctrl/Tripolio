import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { HiOutlineStar, HiOutlineArrowNarrowRight } from "react-icons/hi";
import type { Stay } from "../types";

interface StayCardProps {
  stay: Stay;
  variant?: "grid" | "list";
}

export function StayCard({ stay, variant = "grid" }: StayCardProps) {
  const [activePhoto, setActivePhoto] = useState(0);

  const photos = useMemo(() => {
    if (!stay.photos || stay.photos.length === 0) {
      return ["/assets/stay-placeholder.svg"];
    }
    return stay.photos.slice(0, 4);
  }, [stay.photos]);

  const isList = variant === "list";

  return (
    <article
      className={
        isList
          ? "flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-transform hover:-translate-y-1 md:flex-row"
          : "flex flex-col overflow-hidden rounded-3xl bg-white shadow-card transition-transform hover:-translate-y-1"
      }
    >
      <div className={isList ? "md:w-1/2" : "w-full"}>
        <div className="relative aspect-[4/3] w-full">
          <Image
            src={photos[activePhoto]}
            alt={stay.name}
            fill
            className="object-cover"
            sizes={isList ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 100vw, 33vw"}
            priority={false}
          />
          {photos.length > 1 && (
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-2 rounded-full bg-white/80 px-3 py-1 text-xs text-slate-700">
              {photos.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActivePhoto(index)}
                  aria-label={`View photo ${index + 1}`}
                  aria-pressed={activePhoto === index}
                  className={`h-2 w-2 rounded-full ${activePhoto === index ? "bg-primary" : "bg-slate-400"}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4 p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-xl font-semibold text-slate-900">{stay.name}</h3>
            <p className="text-sm text-slate-600">Starting from {stay.price}</p>
          </div>
          <div className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            <HiOutlineStar className="h-4 w-4" aria-hidden="true" />
            <span>{stay.rating}</span>
          </div>
        </div>
        <p className="text-sm text-slate-600">{stay.shortDescription}</p>
        <div className="flex flex-wrap gap-2 text-xs text-slate-500">
          {stay.amenities.slice(0, 6).map((amenity) => (
            <span key={amenity} className="rounded-full bg-beige/80 px-3 py-1 text-slate-700">
              {amenity}
            </span>
          ))}
        </div>
        <div className="mt-auto flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <Link href={`/stays/${stay.id}`} className="text-sm font-semibold text-primary hover:text-accent">
            View details
          </Link>
          <a
            href={stay.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="button-primary w-full md:w-auto"
          >
            Book now
            <HiOutlineArrowNarrowRight className="ml-2 h-5 w-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </article>
  );
}
