import { HotelType } from "@/types";
import { api } from "./api";

const HOTEL_URL = "/my-hotels";

const myHotelsApi = api.injectEndpoints({
  endpoints: (builder) => ({
    addHotel: builder.mutation<void, FormData>({
      query: (body) => ({
        url: `${HOTEL_URL}`,
        method: "POST",
        body,
      }),
    }),
    getUserHotels: builder.query<HotelType[], void>({
      query: () => ({
        url: `${HOTEL_URL}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useAddHotelMutation, useGetUserHotelsQuery } = myHotelsApi;
