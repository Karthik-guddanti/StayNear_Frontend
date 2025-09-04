// client/src/types/index.ts

export interface Hostel {
  _id: string;
  name: string;
  address: string;
  phone: string;
  website?: string; // ✅ NEW: Add optional website property
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  gender: 'male' | 'female' | 'colive';
  amenities: string[];
  rating: number;
  reviews: number;
  photoUrl?: string | null;
  roomTypes?: string[];
}

export interface HostelCardData {
  id: string;
  name: string;
  photo: string;
  rating: number | string;
  reviews: number;
  distance: string;
  amenities: string[];
  // ❌ REMOVED: Price is no longer part of the card data
}