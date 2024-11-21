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

export interface HotelSearchResponseType {
  hotels: HotelType[];
  totalNumberOfMatches: number;
  pagination: {
    pageNumber: number;
    itemsPerPage: number;
    pages: number;
  };
}

export interface SearchValuesType {
  country: string;
  city: string;
  adultCount: string;
  childrenCount: string;
  startDate: string;
  endDate: string;
  page: string;
  searchFilters: SearchFiltersType;
}

export interface SearchFiltersType {
  selectedStars: string[];
  selectedHotelType: string[];
  selectedFacilities: string[];
  sortBy: "none" | "starRating" | "priceLowToHigh" | "priceHighToLow";
}
