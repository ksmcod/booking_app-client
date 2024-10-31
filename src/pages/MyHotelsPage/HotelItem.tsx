import ButtonLink from "@/components/ui/buttonLink";
import { HotelType } from "@/types";
import { Banknote, Building, MapPinned, Star, Users } from "lucide-react";
// import { FaBuilding, FaMapLocationDot, FaMoneyBillWave } from "react-icons/fa6";

interface HotelItemProps {
  hotel: HotelType;
}

export default function HotelItem({ hotel }: HotelItemProps) {
  return (
    <div className="flex flex-col justify-between border border-slate-300 rounded p-4 gap-3">
      <h2 className="text-xl font-bold">{hotel.name}</h2>
      <div className="whitespace-pre-line">{hotel.description}</div>

      {/* Grid Section */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 text-sm text-nowrap">
        {/* Location */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaMapLocationDot /> */}
          <MapPinned size={20} /> |
          <div className="flex gap-1">
            <span className="capitalize">{hotel.city}</span> -
            <span className="font-bold capitalize">{hotel.country}</span>
          </div>
        </div>

        {/* Type */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaBuilding /> */}
          <Building size={20} />|
          <div className="font-bold capitalize">{hotel.type}</div>
        </div>

        {/* Price */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaMoneyBillWave /> */}
          <Banknote size={25} /> |
          <div className="flex gap-1">
            <span className="font-bold">${hotel.price}</span>
            per night
          </div>
        </div>

        {/* Guests */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          <Users size={20} /> |
          <div className="flex gap-1">
            <span className="font-bold">{hotel.adultCount}</span> adults,
            <span className="font-bold">{hotel.childrenCount}</span> children
          </div>
        </div>

        {/* Star Rating */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          <Star size={20} /> |
          <div>
            <span className="font-bold">{hotel.starRating}</span> Star Hotel
          </div>
        </div>
      </div>

      <ButtonLink target={`/edit-hotel/${hotel.slug}`}>View Details</ButtonLink>
    </div>
  );
}
