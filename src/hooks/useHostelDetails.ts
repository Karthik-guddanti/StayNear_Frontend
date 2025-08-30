import { useState, useEffect } from 'react';
import type { Place } from '@/types';

interface HostelDetailsResult {
  place: Place | null;
  loading: boolean;
  error: string | null;
}

const useHostelDetails = (placeId: string | undefined): HostelDetailsResult => {
  const [place, setPlace] = useState<Place | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!placeId) {
      setLoading(false);
      return;
    }

    const fetchDetails = async () => {
      try {
        const backendUrl = `http://localhost:5000/api/hostels/details/${placeId}`;
        const response = await fetch(backendUrl);
        const data = await response.json();

        if (response.ok && data.result) {
          const resultWithLocation = {
            ...data.result,
            location: {
              lat: data.result.geometry.location.lat,
              lng: data.result.geometry.location.lng,
            },
          };
          setPlace(resultWithLocation);
        } else {
          setError(data.message || 'Place details not found.');
        }
      } catch (err) {
        setError('Failed to fetch place details from the backend.');
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [placeId]);

  return { place, loading, error };
};

export default useHostelDetails;