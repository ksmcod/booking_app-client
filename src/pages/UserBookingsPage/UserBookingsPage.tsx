import { useGetAllBookingsQuery } from "@/app/api/hotelsApi";
import Loader from "@/components/Loader";
import { Link } from "react-router-dom";
import BookingCard from "./components/BookingCard";

export default function UserBookingsPage() {
  const { data: bookings, isLoading, isError } = useGetAllBookingsQuery();

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader className="size-14" />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">An error occured</h1>
        <div className="flex gap-1">
          <span>We encountered an error. Return to</span>
          <Link to={"/"} className="link hover:text-blue-600" replace>
            home
          </Link>
        </div>
      </div>
    );
  }

  console.log("Bookings: ", bookings);

  if (!bookings || !bookings.length)
    return (
      <div className="flex-1 flex flex-col justify-center gap-2">
        <h1 className="text-3xl font-bold text-center">No bookings found</h1>

        <div className="text-center">
          You haven't booked any hotel yet. Please book a hotel and return here
          to view all your bookings
        </div>
      </div>
    );

  return (
    <div className="grid gap-3 p-2">
      <h1 className="text-3xl font-bold">My Bookings</h1>

      <div className="grid grid-cols-1  md:grid-cols-2 gap-4">
        {bookings.map((booking) => (
          <BookingCard
            key={booking.id}
            hotelSlug={booking.hotelSlug}
            booking={booking}
          />
        ))}
      </div>
    </div>
  );
}
