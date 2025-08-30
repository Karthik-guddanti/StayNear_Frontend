import React from 'react';
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import type { Hostel } from '@/types'; // Use the Hostel type from your database model

interface MapProps {
  hostels: Hostel[];
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const Map: React.FC<MapProps> = ({ hostels }) => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  // Find the first hostel WITH a valid location to center the map on
  const firstValidHostel = hostels.find(
    (h) => h.location && h.location.coordinates?.length === 2
  );

  const center = firstValidHostel
    ? {
        lat: firstValidHostel.location.coordinates[1], // Lat is the SECOND element
        lng: firstValidHostel.location.coordinates[0], // Lng is the FIRST element
      }
    : { lat: 17.3850, lng: 78.4867 }; // Default to Hyderabad if no valid hostels

  if (!isLoaded) {
    return <div>Loading Map...</div>;
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={11}
    >
      {hostels
        // 👇 1. Filter out any hostels that have missing or invalid location data
        .filter(hostel => 
          hostel.location && 
          hostel.location.coordinates && 
          hostel.location.coordinates.length === 2
        )
        .map((hostel: Hostel) => (
          <Marker
            // 👇 2. Add the unique key prop using the database _id
            key={hostel._id}
            position={{
              // 👇 3. Correctly access lat/lng from the 'coordinates' array
              lat: hostel.location.coordinates[1],
              lng: hostel.location.coordinates[0],
            }}
            title={hostel.name}
          />
        ))}
    </GoogleMap>
  );
};

export default Map;