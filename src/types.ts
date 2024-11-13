export interface UserType {
  name: string;
  email: string;
  image?: string;
}

export interface HotelType {
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
  slug: string;
}

export interface ApiErrorType {
  status?: number;
  data?: {
    message: string;
  };
  name?: string;
  message?: string;
}

export interface HotelSearchResponse {
  hotels: HotelType[];
  pagination: {
    pageNumber: number;
    itemsPerPage: number;
    pages: number;
  };
}

export interface SearchValuesType {
  country: {
    value: string;
    label: string;
    isoCode: string;
  };
  city: {
    value: string;
    label: string;
  };
  adultCount: number;
  childrenCount: number;
  startDate: Date;
  endDate: Date;
}
