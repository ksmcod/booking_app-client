export interface User {
  name: string;
  email: string;
  image?: string;
}

export interface Hotel {
  id: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childrenCount: number;
  facilities: string[];
  price: number;
  starRating: number;
  imageUrls: string[];
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}
