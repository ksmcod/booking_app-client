import { HotelSearchResponseType, SearchValuesType } from "@/types";
import { api } from "./api";

const HOTELS_URL = "hotels";

const hotelsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchHotel: builder.query<HotelSearchResponseType, SearchValuesType>({
      query: (params) => {
        const queryString = new URLSearchParams({
          country: params.country,
          city: params.city,
          adultCount: params.adultCount.toString(),
          childrenCount: params.childrenCount.toString(),
          startDate: params.startDate,
          endDate: params.endDate,
          page: params.page,
          selectedStars: params.searchFilters.selectedStars.toString(),
        });

        return `${HOTELS_URL}/search?${queryString}`;
      },
    }),
  }),
});

export const { useSearchHotelQuery, useLazySearchHotelQuery } = hotelsApi;
