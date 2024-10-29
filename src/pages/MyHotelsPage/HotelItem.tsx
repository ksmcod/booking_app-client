import ButtonLink from "@/components/ui/buttonLink";
import { Banknote, Building, MapPinned, Star, Users } from "lucide-react";
// import { FaBuilding, FaMapLocationDot, FaMoneyBillWave } from "react-icons/fa6";

interface HotelItemProps {
  name: string;
  description: string;
  city: string;
  country: string;
  type: string;
  price: number;
  adultCount: number;
  childrenCount: number;
  starRating: number;
}

export default function HotelItem({
  name,
  description,
  city,
  country,
  type,
  price,
  adultCount,
  childrenCount,
  starRating,
}: HotelItemProps) {
  return (
    <div className="flex flex-col justify-between border border-slate-300 rounded p-4 gap-3">
      <h2 className="text-xl font-bold">{name}</h2>
      <div className="whitespace-pre-line">{description}</div>

      {/* Grid Section */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 text-sm text-nowrap">
        {/* Location */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaMapLocationDot /> */}
          <MapPinned size={20} /> |
          <div className="flex gap-1">
            <span className="capitalize">{city}</span>,
            <span className="font-bold capitalize">{country}</span>
          </div>
        </div>

        {/* Type */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaBuilding /> */}
          <Building size={20} />|
          <div className="font-bold capitalize">{type}</div>
        </div>

        {/* Price */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaMoneyBillWave /> */}
          <Banknote size={25} /> |
          <div className="flex gap-1">
            <span className="font-bold">${price}</span>
            per night
          </div>
        </div>

        {/* Guests */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          <Users size={20} /> |
          <div className="flex gap-1">
            <span className="font-bold">{adultCount}</span> adults,
            <span className="font-bold">{childrenCount}</span> children
          </div>
        </div>

        {/* Star Rating */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          <Star size={20} /> |
          <div>
            <span className="font-bold">{starRating}</span> Star Hotel
          </div>
        </div>
      </div>

      <ButtonLink target="/">View Details</ButtonLink>
    </div>
  );
}
