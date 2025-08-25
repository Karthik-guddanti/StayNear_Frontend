import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";

type Hostel = { name: string; location: { lat: number; lng: number } };

export default function Map({ hostels }: { hostels: Hostel[] }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  if (!isLoaded) return <div className="text-gray-600">Loading map…</div>;

  const center = hostels[0]?.location ?? { lat: 20.5937, lng: 78.9629 }; // India center

  return (
    <GoogleMap
      center={center}
      zoom={12}
      mapContainerStyle={{ width: "100%", height: "420px", borderRadius: 16 }}
    >
      {hostels.map((h, i) => (
        <Marker key={i} position={h.location} title={h.name} />
      ))}
    </GoogleMap>
  );
}
