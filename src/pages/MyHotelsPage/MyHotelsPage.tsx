import ButtonLink from "@/components/ui/buttonLink";
import { useGetMyHotelsQuery } from "@/app/api/myHotelsApi";
import HotelItem from "./HotelItem";
import { ApiErrorType } from "@/types";
import handleApiError from "@/utils/handleApiError";
import { useEffect } from "react";

export default function MyHotelsPage() {
  const { data, isLoading, isError, error } = useGetMyHotelsQuery();

  useEffect(() => {
    if (isError) {
      handleApiError(error as ApiErrorType);
    }
  }, [isError, error]);

  return (
    <div className="p-3">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <ButtonLink target="/add-hotel">Add Hotel</ButtonLink>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center mt-24">
          <span className="loading loading-spinner w-16 text-blue-500"></span>
        </div>
      ) : (
        <div className="flex flex-col gap-4 mt-10">
          {data && !data.length && (
            <div className="">
              <h2 className="text-3xl text-center">No hotels found</h2>
            </div>
          )}

          {data &&
            data.map((hotel) => (
              <HotelItem
                key={hotel.id}
                name={hotel.name}
                description={hotel.description}
                country={hotel.country}
                city={hotel.city}
                type={hotel.type}
                adultCount={hotel.adultCount}
                childrenCount={hotel.childrenCount}
                price={hotel.price}
                starRating={hotel.starRating}
              />
            ))}
        </div>
      )}
    </div>
  );
}
