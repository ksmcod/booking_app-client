import ButtonLink from "@/components/ui/buttonLink";
import { Banknote, Building, MapPinned, Star, Users } from "lucide-react";
// import { FaBuilding, FaMapLocationDot, FaMoneyBillWave } from "react-icons/fa6";

export default function HotelItem() {
  return (
    <div className="flex flex-col justify-between border border-slate-300 rounded p-4 gap-3">
      <h2 className="text-xl font-bold">Hotel Name</h2>
      <div className="whitespace-pre-line">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nam dolor non
        veritatis praesentium culpa atque dignissimos quo tempora dicta
        accusantium natus, molestias consectetur repellendus labore fugit velit
        nihil maiores veniam quidem fugiat voluptate numquam quae dolores.
        Tenetur quis, possimus, quos sunt eaque asperiores, nostrum molestias
        accusantium soluta dignissimos aliquam accusamus.
      </div>

      {/* Grid Section */}
      <div className="flex flex-col sm:flex-row flex-wrap gap-2 text-sm text-nowrap">
        {/* Location */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaMapLocationDot /> */}
          <MapPinned size={20} /> |
          <div className="flex gap-1">
            Douala,<span className="font-bold">Cameroon</span>
          </div>
        </div>

        {/* Type */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaBuilding /> */}
          <Building size={20} />|<div className="font-bold">Type</div>
        </div>

        {/* Price */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          {/* <FaMoneyBillWave /> */}
          <Banknote size={25} /> |
          <div className="flex gap-1">
            <span className="font-bold">$0.00</span>
            per night
          </div>
        </div>

        {/* Guests */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          <Users size={20} /> |
          <div className="flex gap-1">
            <span className="font-bold">0</span> adults,
            <span className="font-bold">0</span> children
          </div>
        </div>

        {/* Star Rating */}
        <div className="border border-slate-300 rounded-sm p-2 flex items-center gap-2 flex-1">
          <Star size={20} /> |
          <div className="">
            <span className="font-bold">0</span> Star Hotel
          </div>
        </div>
      </div>

      <ButtonLink target="/">View Details</ButtonLink>
    </div>
  );
}
