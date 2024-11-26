import { HotelType } from "@/types";
import {
  CalendarArrowDown,
  CalendarArrowUp,
  CalendarDays,
  MapPin,
  Users,
} from "lucide-react";

interface BookingSummaryProps {
  hotel: HotelType;
  startDate: string;
  endDate: string;
  adults: string;
  children: string;
  bookingDuration: number;
}

export default function BookingSummary({
  hotel,
  startDate,
  endDate,
  adults,
  children,
  bookingDuration,
}: BookingSummaryProps) {
  return (
    <div className="border border-slate-300 rounded-md p-3 space-y-4 px-6 py-4">
      <h3 className="text-xl font-bold">Your booking details</h3>

      <div className="">
        <span className="text-xl">{hotel.name}</span>
        <div className="flex items-center gap-1">
          <MapPin size={18} />
          <span className="text-gray-500">{hotel.city}</span> |
          <span className="text-gray-700 font-bold">{hotel.country}</span>
        </div>
      </div>

      <hr />

      <div className="flex justify-between items-center flex-wrap">
        {/* Check-in */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 flex items-center gap-1">
            <CalendarArrowUp /> Check-in
          </span>
          <span className="">
            {new Date(parseInt(startDate)).toDateString()}
          </span>
        </div>

        {/* Check-out */}
        <div className="flex flex-col gap-1">
          <span className="text-gray-500 flex items-center gap-1">
            <CalendarArrowDown /> Check-out
          </span>
          <span className="">{new Date(parseInt(endDate)).toDateString()}</span>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 flex items-center gap-1">
          <CalendarDays /> Duration of stay
        </span>
        <div className="flex gap-1">
          {bookingDuration}
          <span>nights</span>
        </div>
      </div>

      <hr />

      <div className="flex flex-col gap-1">
        <span className="text-gray-500 flex items-center gap-1">
          <Users /> Guests
        </span>
        <div className="flex gap-1">
          <span>{adults} adult(s)</span>
          <span>&</span>
          <span>
            {parseInt(children) == 1
              ? `${children} child`
              : `${children} children`}
          </span>
        </div>
      </div>
    </div>
  );
}
