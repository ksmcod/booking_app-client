import ButtonLink from "@/components/ui/buttonLink";
import { useGetUserHotelsQuery } from "@/app/api/myHotelsApi";
import HotelItem from "./HotelItem";
import Loader from "@/components/Loader";

export default function MyHotelsPage() {
  const { data, isLoading } = useGetUserHotelsQuery();
  console.log("Fetched Hotels: ", data);
  return (
    <div className="p-3">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <ButtonLink target="/add-hotel">Add Hotel</ButtonLink>
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader className="size" size={40} />
        </div>
      ) : (
        <div className="flex flex-col gap-4 my-4">
          <HotelItem />
        </div>
      )}
    </div>
  );
}
