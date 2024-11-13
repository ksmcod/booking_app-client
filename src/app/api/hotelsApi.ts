import { HotelType, SearchValuesType } from "@/types";
import { api } from "./api";

const HOTELS_URL = "hotels";

const hotelsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    searchHotel: builder.query<HotelType[], SearchValuesType>({
      query: (params) => {
        const queryString = new URLSearchParams({
          country: params.country.value,
          city: params.city.value,
          adultCount: params.adultCount.toString(),
          childrenCount: params.childrenCount.toString(),
          startDate: params.startDate.getTime().toString(),
          endDate: params.endDate.getTime().toString(),
        });
        return `${HOTELS_URL}/search?${queryString.toString()}`;
      },
    }),
  }),
});

export const { useSearchHotelQuery } = hotelsApi;
