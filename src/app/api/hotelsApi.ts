import {
  BookHotelRequestBodyType,
  BookingType,
  HotelSearchResponseType,
  HotelType,
  PaymentIntentResponseType,
  SearchValuesType,
} from "@/types";
import qs from "query-string";
import { api } from "./api";

const HOTELS_URL = "hotels";

type CreatePaymentIntentArg = {
  slug: string;
  numberOfNights: number;
};

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

    getSingleHotel: builder.query<HotelType, string>({
      query: (slug) => ({
        url: `${HOTELS_URL}/${slug}`,
      }),
    }),
    createPaymentIntent: builder.query<
      PaymentIntentResponseType,
      CreatePaymentIntentArg
    >({
      query: (params) => ({
        url: `${HOTELS_URL}/payment/payment-intent/${params.slug}?numberOfNights=${params.numberOfNights}`,
      }),
      keepUnusedDataFor: 0,
    }),
    bookHotel: builder.mutation<void, BookHotelRequestBodyType>({
      query: (body) => ({
        url: `${HOTELS_URL}/book`,
        method: "POST",
        body: body,
      }),
    }),
    getAllBookings: builder.query<BookingType[], void>({
      query: () => ({
        url: `${HOTELS_URL}/bookings`,
        method: "GET",
      }),
      keepUnusedDataFor: 0,
    }),
    getHotels: builder.query<HotelType[], string>({
      query: (queryParam) => ({
        url: `${HOTELS_URL}?${qs.stringify({ orderBy: queryParam })}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazySearchHotelQuery,
  useGetSingleHotelQuery,
  useCreatePaymentIntentQuery,
  useBookHotelMutation,
  useGetAllBookingsQuery,
  useGetHotelsQuery,
} = hotelsApi;
