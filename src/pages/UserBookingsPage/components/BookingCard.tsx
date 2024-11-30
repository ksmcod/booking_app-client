import { useGetSingleHotelQuery } from "@/app/api/hotelsApi";
import Loader from "@/components/Loader";
import ButtonLink from "@/components/ui/buttonLink";
import { ApiErrorType, BookingType } from "@/types";
import handleApiError from "@/utils/handleApiError";
import { differenceInBusinessDays } from "date-fns";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

interface BookingCardProps {
  booking: BookingType;
  hotelSlug: string;
}

export default function BookingCard({ booking, hotelSlug }: BookingCardProps) {
  const { data: hotel, isLoading, error } = useGetSingleHotelQuery(hotelSlug);

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Loader className="size-10" />
      </div>
    );
  }

  if (error) {
    handleApiError(error as ApiErrorType);
  }

  if (!hotel) return <></>;

  const stayDuration = differenceInBusinessDays(
    new Date(booking.checkoutDate),
    new Date(booking.checkinDate)
  );

  return (
    <div className="border border-slate-300 rounded-md p-3 space-y-4 px-6 py-4">
      <div className="">
        <span className="text-2xl">{hotel.name}</span>
        <div className="flex items-center gap-1">
          <MapPin size={18} />
          <span className="text-gray-500">{hotel.city}</span> |
          <span className="text-gray-700 font-bold">{hotel.country}</span>
        </div>
      </div>

      <hr />

      <div className="flex justify-between items-center gap-6 flex-wrap">
        {/* Check-in */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 flex items-center gap-1">
            <CalendarArrowUp /> Check-in
          </span>
          <span className="">
            {new Date(booking.checkinDate).toDateString()}
          </span>
        </div>

        {/* Check-out */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 flex items-center gap-1">
            <CalendarArrowDown /> Check-out
          </span>
          <span className="">
            {new Date(booking.checkoutDate).toDateString()}
          </span>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 flex items-center gap-1">
          <CalendarDays /> Duration of stay
        </span>
        <div className="flex gap-1">
          {stayDuration}
          <span>nights</span>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 flex items-center gap-1">
          <Users /> Guests
        </span>
        <div className="flex gap-1">
          <span>{booking.adultCount} adult(s)</span>
          <span>&</span>
          <span>
            {booking.childrenCount == 1
              ? `${booking.childrenCount} child`
              : `${booking.childrenCount} children`}
          </span>
        </div>
        <ButtonLink target={`/hotel/${hotelSlug}`} className="text-lg">
          View hotel
        </ButtonLink>
      </div>
    </div>
  );
}
