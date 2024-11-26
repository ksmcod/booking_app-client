import { Link, useParams, useSearchParams } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import BookingForm from "./components/BookingForm";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { useGetUserQuery } from "@/app/api/usersApi";
import Loader from "@/components/Loader";
import {
  useCreatePaymentIntentQuery,
  useGetSingleHotelQuery,
} from "@/app/api/hotelsApi";
import { BookingInfoType } from "../SearchResults/SearchResultsPage";
import BookingSummary from "./components/BookingSummary";
import { useMemo } from "react";
import { stripePromise } from "@/lib/utils";

export default function BookingPage() {
  const slug = useParams().slug as string;
  const [searchParams] = useSearchParams();

  const bookingInfo: BookingInfoType = useMemo(() => {
    return {
      startDate:
        searchParams.get("startDate") || new Date().getTime().toString(),
      endDate: searchParams.get("endDate") || new Date().getTime().toString(),
      adults: searchParams.get("adults") || "1",
      children: searchParams.get("children") || "0",
    };
  }, [searchParams]);

  const bookingDuration = useMemo(() => {
    return differenceInCalendarDays(
      parseInt(bookingInfo.endDate),
      parseInt(bookingInfo.startDate)
    );
  }, [bookingInfo.startDate, bookingInfo.endDate]);

  const {
    data: currentUser,
    isLoading: loading1,
    isError: error1,
  } = useGetUserQuery();

  const {
    data: hotel,
    isLoading: loading2,
    isError: error2,
    isSuccess,
  } = useGetSingleHotelQuery(slug as string);

  const {
    data: paymentIntentData,
    error: error3,
    isLoading: loading3,
  } = useCreatePaymentIntentQuery({
    slug,
    numberOfNights: bookingDuration,
  });

  if (isSuccess && !hotel) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">Hotel not found</h1>
        <div className="flex gap-1">
          <span>The hotel you requested could not be found. Return to</span>
          <Link to={"/"} className="link hover:text-blue-600" replace>
            home
          </Link>
        </div>
      </div>
    );
  }

  if (error1 || error2 || error3) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">An error occured</h1>
        <div className="flex gap-1">
          <span>We enountered an error. Return to</span>
          <Link to={"/"} className="link hover:text-blue-600" replace>
            home page
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-4 pt-10">
      {loading2 ? (
        <div className="flex justify-center">
          <Loader className="size-16" />
        </div>
      ) : (
        hotel && (
          <BookingSummary
            hotel={hotel}
            startDate={bookingInfo.startDate}
            endDate={bookingInfo.endDate}
            adults={bookingInfo.adults}
            children={bookingInfo.children}
            bookingDuration={bookingDuration}
          />
        )
      )}

      {/* Booking Form */}
      {loading1 || loading3 ? (
        <div className="flex justify-center">
          <Loader className="size-16" />
        </div>
      ) : (
        currentUser &&
        paymentIntentData && (
          <Elements
            stripe={stripePromise}
            options={{ clientSecret: paymentIntentData.clientSecret }}
          >
            <BookingForm
              currentUser={currentUser}
              paymentIntentData={paymentIntentData}
            />
          </Elements>
        )
      )}
    </div>
  );
}
