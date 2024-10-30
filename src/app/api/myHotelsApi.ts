import { HotelType } from "@/types";
import { api } from "./api";

const HOTEL_URL = "/my-hotels";

const myHotelsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addMyHotel: builder.mutation<void, FormData>({
      query: (body) => ({
        url: `${HOTEL_URL}`,
        method: "POST",
        body,
      }),
    }),

    getMyHotels: builder.query<HotelType[], void>({
      query: () => ({
        url: `${HOTEL_URL}`,
        method: "GET",
      }),
    }),

    getMyHotelBySlug: builder.query<HotelType, string>({
      query: (slug) => ({
        url: `${HOTEL_URL}/${slug}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useAddMyHotelMutation,
  useGetMyHotelsQuery,
  useGetMyHotelBySlugQuery,
} = myHotelsApi;
