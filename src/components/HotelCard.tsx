import { HotelType } from "@/types";
import { Star } from "lucide-react";
import ButtonLink from "./ui/buttonLink";

interface HotelCardProps {
  hotel: HotelType;
}

export default function HotelCard({ hotel }: HotelCardProps) {
  return (
    <div className="grid grid-cols-1 border border-slate-300 rounded-lg p-4 gap-4">
      <div className="w-full h-[300px]">
        <img
          src={hotel.imageUrls[0]}
          alt="Hotel image"
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="grid grid-rows-[1fr_2fr_1fr]">
        {/* First Row */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="flex">
              {Array.from({ length: hotel.starRating }).map((value, index) => (
                <Star
                  key={index}
                  className="text-yellow-400 fill-yellow-400 size-5"
                />
              ))}
            </span>
            <span className="text-sm">{hotel.type}</span>
          </div>
          <p className="text-xl font-bold">{hotel.name}</p>
        </div>

        {/* Second Row */}
        <div>
          <p className="line-clamp-4">{hotel.description}</p>
        </div>

        {/* Third Row */}
        <div className="flex justify-between items-center px-2 whitespace-nowrap">
          <div className="flex gap-1 items-center flex-wrap m-1">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span
                key={facility}
                className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap"
              >
                {facility}
              </span>
            ))}
            {hotel.facilities.length > 3 && (
              <span className="text-sm">
                + {hotel.facilities.length - 3} more
              </span>
            )}
          </div>

          <div className="flex gap-1">
            <span className="font-bold">${hotel.price}</span>
            <span>a night</span>
          </div>
        </div>

        {/* Link to hotel */}
        <ButtonLink target={`/hotel/${hotel.slug}`}>Book now</ButtonLink>
      </div>
    </div>
  );
}
