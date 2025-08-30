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
  photoUrl?: string | null; // 👈 Add this new property for the photo
  createdAt?: string;
  updatedAt?: string;
}

// ... (HostelCardData remains the same)