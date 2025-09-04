export interface Hostel {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: {
    type: 'Point';
    coordinates: [number, number];
  };
  gender: 'male' | 'female' | 'colive';
  price: number;
  amenities: string[];
  rating: number;
  reviews: number;
  photoUrl?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface HostelCardData {
  id: string;
  name: string;
  photo: string;
  rating: number | string;
  reviews: number;
  distance: string;
  price: number;
  amenities: string[];
}