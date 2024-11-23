import { Link, useParams, useSearchParams } from "react-router-dom";
import BookingForm from "./components/BookingForm";
import differenceInCalendarDays from "date-fns/differenceInCalendarDays";
import { useGetUserQuery } from "@/app/api/usersApi";
import { UserType } from "@/types";
import Loader from "@/components/Loader";
import { useGetSingleHotelQuery } from "@/app/api/hotelsApi";
import { BookingInfoType } from "../SearchResults/SearchResultsPage";
import BookingSummary from "./components/BookingSummary";

export default function BookingPage() {
  const { slug } = useParams();
  const [searchParams] = useSearchParams();

  const {
    data: currentUser,
    isLoading: loading1,
    isError: error1,
  } = useGetUserQuery();

  const {
    data: hotel,
    isLoading: loading2,
    isError: error2,
  } = useGetSingleHotelQuery(slug as string);

  const bookingInfo: BookingInfoType = {
    startDate: searchParams.get("startDate") || new Date().getTime().toString(),
    endDate: searchParams.get("endDate") || new Date().getTime().toString(),
    adults: searchParams.get("adults") || "1",
    children: searchParams.get("children") || "0",
  };

  if (error1 || error2) {
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
            bookingDuration={differenceInCalendarDays(
              parseInt(bookingInfo.endDate),
              parseInt(bookingInfo.startDate)
            )}
          />
        )
      )}

      {/* Booking Form */}
      {loading1 ? (
        <div className="flex justify-center">
          <Loader className="size-16" />
        </div>
      ) : (
        <BookingForm currentUser={currentUser as UserType} />
      )}
    </div>
  );
}
