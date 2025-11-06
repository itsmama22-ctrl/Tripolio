import { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import Link from "next/link";
import type { Stay } from "../types";
import { ClusterGroup } from "./ClusterGroup";

interface MapViewProps {
  stays: Stay[];
  height?: string;
  showCTA?: boolean;
}

const pinIcon = new L.Icon({
  iconUrl: "/assets/map-pin.svg",
  iconSize: [36, 36],
  iconAnchor: [18, 36],
});

export function MapView({ stays, height = "500px", showCTA = true }: MapViewProps) {
  const center = useMemo(() => {
    if (!stays.length) {
      return { lat: 40.7128, lng: -74.006 };
    }
    const avgLat = stays.reduce((sum, stay) => sum + stay.location.latitude, 0) / stays.length;
    const avgLng = stays.reduce((sum, stay) => sum + stay.location.longitude, 0) / stays.length;
    return { lat: avgLat, lng: avgLng };
  }, [stays]);

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={5}
      style={{ height, width: "100%", borderRadius: "24px" }}
      scrollWheelZoom
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <ClusterGroup chunkedLoading>
        {stays.map((stay) => (
          <Marker
            key={stay.id}
            position={[stay.location.latitude, stay.location.longitude]}
            icon={pinIcon}
          >
            <Popup>
              <div className="space-y-2">
                <h3 className="text-sm font-semibold text-slate-900">{stay.name}</h3>
                <p className="text-xs text-slate-600">{stay.price}</p>
                {showCTA && (
                  <Link href={`/stays/${stay.id}`} className="text-sm font-medium text-primary">
                    View details
                  </Link>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </ClusterGroup>
    </MapContainer>
  );
}
