import { useGetHotelsQuery } from "@/app/api/hotelsApi";
import HotelCard from "@/components/HotelCard";
import Loader from "@/components/Loader";

export default function Index() {
  const { data: hotels, isLoading } = useGetHotelsQuery("hotest");

  // if (isLoading) {
  //   return (
  //     <div className="flex-1 flex justify-center items-center">
  //       <Loader className="size-14" />
  //     </div>
  //   );
  // }

  console.log("Hotels are: ", hotels);

  if (hotels === undefined && !isLoading) {
    // if (!isLoading) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">An error occured</h1>
        <p className="">
          An error occcured, and we were unable to fetch hotels and properties
        </p>
      </div>
    );
    // }
  }

  return (
    <div className="space-y-4">
      <h1 className="text-4xl font-bold">Hotest destinations</h1>

      {isLoading ? (
        <div className="flex justify-center">
          <Loader className="size-14" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {hotels?.map((hotel) => (
              <HotelCard hotel={hotel} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
