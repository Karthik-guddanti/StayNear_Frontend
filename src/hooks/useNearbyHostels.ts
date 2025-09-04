import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Hostel } from '@/types';
import { searchHostels } from '@/services/api';

const useNearbyHostels = () => { // ✅ Filters are no longer passed into this hook
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
        // ✅ The only parameters sent to the backend are lat and lng
        const params = new URLSearchParams({
          lat: latitude.toString(),
          lng: longitude.toString(),
        });

        const response = await searchHostels(params);
        setHostels(response.data);

      } catch (err: any) {
        setError(err.response?.data?.message || "Failed to fetch hostel data.");
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
  }, [searchParams]); // ✅ The hook now only re-runs when the location changes

  return { hostels, loading, error };
};

export default useNearbyHostels;