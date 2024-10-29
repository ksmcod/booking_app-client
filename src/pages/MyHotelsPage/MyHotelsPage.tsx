import ButtonLink from "@/components/ui/buttonLink";
import { useGetUserHotelsQuery } from "@/app/api/myHotelsApi";
import HotelItem from "./HotelItem";

export default function MyHotelsPage() {
  const { data } = useGetUserHotelsQuery();
  console.log("Fetched Hotels: ", data);
  return (
    <div className="p-3">
      <div className="flex justify-between items-center p-2">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <ButtonLink target="/add-hotel">Add Hotel</ButtonLink>
      </div>

      <div className="flex flex-col gap-4 my-4">
        <HotelItem />
        <HotelItem />
        <HotelItem />
      </div>
    </div>
  );
}
