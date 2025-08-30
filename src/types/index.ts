// This type EXACTLY matches the data coming from your MongoDB backend
export interface Hostel {
  _id: string;
  name: string;
  address: string;
  phone: string;
  location: {
    type: 'Point';
    coordinates: [number, number]; // [longitude, latitude]
  };
  gender: 'male' | 'female' | 'colive';
  price: number;
  amenities: string[];
  rating: number;
  reviews: number;
  photoUrl?: string | null; // 👈 Add this new property for the photo
  createdAt?: string;
  updatedAt?: string;
}

// This type defines the props needed specifically for the HostelCard component
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