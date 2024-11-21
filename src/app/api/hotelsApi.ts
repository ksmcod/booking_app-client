import { HotelSearchResponseType, SearchValuesType } from "@/types";
import qs from "query-string";
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
          selectedStars: qs.stringify(params.searchFilters.selectedStars, {
            arrayFormat: "comma",
          }),
          selectedHotelTypes: qs.stringify(
            params.searchFilters.selectedHotelType,
            { arrayFormat: "comma" }
          ),
          selectedFacilities: qs.stringify(
            params.searchFilters.selectedFacilities,
            { arrayFormat: "comma" }
          ),
          sortBy: params.searchFilters.sortBy,
        });

        return `${HOTELS_URL}/search?${queryString}`;
      },
    }),
  }),
});

export const { useSearchHotelQuery, useLazySearchHotelQuery } = hotelsApi;
