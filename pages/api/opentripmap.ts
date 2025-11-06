import type { NextApiRequest, NextApiResponse } from "next";

const API_BASE = "https://api.opentripmap.com/0.1/en/places";

interface OpenTripMapFeature {
  xid: string;
  name: string;
  dist: number;
  kinds?: string;
  point: {
    lat: number;
    lon: number;
  };
}

interface NearbyPlace {
  id: string;
  name: string;
  distance: number;
  latitude: number;
  longitude: number;
  kinds: string[];
}

type ErrorResponse = { error: string };

type SuccessResponse = {
  places: NearbyPlace[];
};

const RADIUS_METERS = 2500;
const LIMIT = 12;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SuccessResponse | ErrorResponse>
) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: "Missing latitude or longitude" });
  }

  const apiKey = process.env.OPENTRIPMAP_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "OpenTripMap API key is not configured" });
  }

  const params = new URLSearchParams({
    radius: String(RADIUS_METERS),
    lon: String(lon),
    lat: String(lat),
    limit: String(LIMIT),
    kinds: "interesting_places,tourist_object,architecture,museums,monuments,foods",
    format: "json",
    apikey: apiKey,
  });

  try {
    const response = await fetch(`${API_BASE}/radius?${params.toString()}`);

    if (!response.ok) {
      return res.status(response.status).json({ error: `OpenTripMap request failed (${response.status})` });
    }

    const data = (await response.json()) as OpenTripMapFeature[];

    const places: NearbyPlace[] = data
      .filter((feature) => feature.name)
      .slice(0, LIMIT)
      .map((feature) => ({
        id: feature.xid,
        name: feature.name,
        distance: Math.round(feature.dist),
        latitude: feature.point.lat,
        longitude: feature.point.lon,
        kinds: feature.kinds ? feature.kinds.split(",").slice(0, 3) : [],
      }));

    return res.status(200).json({ places });
  } catch (error) {
    console.error("OpenTripMap API error", error);
    return res.status(500).json({ error: "Failed to fetch nearby places" });
  }
}
