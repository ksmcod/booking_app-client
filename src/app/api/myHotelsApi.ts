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
      invalidatesTags: ["allHotels"],
    }),

    getMyHotels: builder.query<HotelType[], void>({
      query: () => ({
        url: `${HOTEL_URL}`,
        method: "GET",
      }),
      providesTags: ["allHotels"],
    }),

    getMyHotelBySlug: builder.query<HotelType, string>({
      query: (slug) => ({
        url: `${HOTEL_URL}/${slug}`,
        method: "GET",
      }),
      providesTags: ["oneHotel"],
    }),
    updateMyHotel: builder.mutation<void, { slug: string; body: FormData }>({
      query: ({ slug, body }: { slug: string; body: FormData }) => ({
        url: `${HOTEL_URL}/${slug}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["oneHotel", "allHotels"],
    }),
    deleteMyHotel: builder.mutation<void, string>({
      query: (slug) => ({
        url: `${HOTEL_URL}/${slug}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddMyHotelMutation,
  useGetMyHotelsQuery,
  useGetMyHotelBySlugQuery,
  useUpdateMyHotelMutation,
  useDeleteMyHotelMutation,
} = myHotelsApi;
