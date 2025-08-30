import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Hostel } from '@/types';
import type { FilterState } from '@/components/FilterControls/FilterControls';

interface NearbyHostelsResult {
  hostels: Hostel[];
  loading: boolean;
  error: string | null;
}

const useNearbyHostels = (filters: FilterState): NearbyHostelsResult => {
  const [hostels, setHostels] = useState<Hostel[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const latParam = searchParams.get('lat');
    const lngParam = searchParams.get('lng');

    const fetchHostelsData = async (latitude: number, longitude: number) => {
      setLoading(true);
      setError(null);
      try {
        const params = new URLSearchParams({
          lat: latitude.toString(),
          lng: longitude.toString(),
          maxPrice: filters.price.toString(),
          gender: filters.gender,
          sortBy: filters.sortBy,
        });
        
        // Add amenities to the search params if any are selected
        filters.amenities.forEach(amenity => params.append('amenities', amenity));

        const backendUrl = `http://localhost:5000/api/hostels/search?${params.toString()}`;
        
        const response = await fetch(backendUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch from backend');
        }
        const data: Hostel[] = await response.json();
        
        setHostels(data);

      } catch (err) {
        setError("Failed to fetch hostel data.");
      } finally {
        setLoading(false);
      }
    };

    if (latParam && lngParam) {
      fetchHostelsData(parseFloat(latParam), parseFloat(lngParam));
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => fetchHostelsData(position.coords.latitude, position.coords.longitude),
        () => {
          setError("Location access denied. Please use the search bar.");
          setLoading(false);
        }
      );
    }
  }, [searchParams, filters]);

  return { hostels, loading, error };
};

export default useNearbyHostels;