import { useGetSingleHotelQuery } from "@/app/api/hotelsApi";
import Loader from "@/components/Loader";
import { ApiErrorType } from "@/types";
import { MapPin, Star, Users } from "lucide-react";
import { Link, useParams } from "react-router-dom";
import FacilitiesBox from "./components/FacilitiesBox";
import GuestInfoForm from "@/forms/GuestInfoForm/GuestInfoForm";

export default function ViewHotelPage() {
  const slug = useParams().slug as string;

  const {
    isLoading,
    data: hotel,
    error,
    isError,
  } = useGetSingleHotelQuery(slug);

  //  Show when request is in flight
  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader className="size-16" />
      </div>
    );
  }

  //   If hotel was not found
  if (isError && (error as ApiErrorType).status === 404) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">Hotel not found</h1>
        <div className="flex gap-1">
          <span>The hotel you requested could not be found. Return to</span>
          <Link to={"/"} className="link hover:text-blue-600" replace>
            home page
          </Link>
        </div>
      </div>
    );
  }

  // If a server error occurs
  if (isError && (error as ApiErrorType).status === 500) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">Server error</h1>
        <div className="flex gap-1">
          <span>
            We encountered a server error. Please try again later. Return to
          </span>
          <Link to={"/my-hotels"} className="link hover:text-blue-600" replace>
            your hotels
          </Link>
        </div>
      </div>
    );
  }

  // If network error occurs
  if (isError) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">An error occured</h1>
        <div className="flex gap-1">
          <span>
            We encountered an unknown error. Please try again later. Return to
          </span>
          <Link to={"/my-hotels"} className="link hover:text-blue-600" replace>
            your hotels
          </Link>
        </div>
      </div>
    );
  }

  if (!hotel) {
    return <></>;
  }

  return (
    <div className="space-y-8 py-6">
      {/* Hotel name and stars */}

      <div className="space-y-1">
        <div className="flex items-center gap-5">
          <h1 className="text-4xl font-bold">{hotel.name}</h1>
          <span className="flex items-center">
            {Array.from({ length: hotel.starRating }).map((_, index) => (
              <Star key={index} className="fill-yellow-400 text-yellow-400" />
            ))}
          </span>
        </div>
        <div className="flex items-center gap-1">
          <MapPin size={18} />
          <span className="text-slate-500">{hotel.city}</span> |
          <span className="text-slate-700 font-bold">{hotel.country}</span>
        </div>

        <div className="flex items-center gap-2">
          <Users size={20} />
          <div className="flex gap-1">
            <span className="font-bold">{hotel.adultCount}</span>{" "}
            <span>adults</span>
          </div>
          <span>-</span>
          <div className="flex gap-1">
            <span className="font-bold">{hotel.childrenCount}</span>
            <span>{hotel.childrenCount == 1 ? "child" : "children"}</span>
          </div>
        </div>
      </div>

      {/* Hotel images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {hotel.imageUrls.map((url, index) => (
          <div key={index} className="h-[300px] border rounded-md">
            <img
              src={url}
              alt={`${hotel.name} - image ${index}`}
              className="rounded-md w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>

      {/* Hotel facilities */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {hotel.facilities.map((facility, index) => (
          <FacilitiesBox key={index} facility={facility} />
        ))}
      </div>

      {/* Hotel description */}
      <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
        <div className="whitespace-pre-line">{hotel.description}</div>
        <div className="h-fit">
          <GuestInfoForm hotel={hotel} pricePerNight={hotel.price} />
        </div>
      </div>
    </div>
  );
}
