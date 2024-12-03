import { useGetHotelsQuery } from "@/app/api/hotelsApi";
import HotelCard from "@/components/HotelCard";
import Loader from "@/components/Loader";

export default function Index() {
  const { data: hotHotels, isLoading: loading1 } = useGetHotelsQuery("hotest");
  const { data: recentHotels, isLoading: loading2 } =
    useGetHotelsQuery("recent");

  // if (isLoading) {
  //   return (
  //     <div className="flex-1 flex justify-center items-center">
  //       <Loader className="size-14" />
  //     </div>
  //   );
  // }

  if ((!hotHotels && !loading1) || (!recentHotels && !loading2)) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-xl font-bold">An error occured</h1>
        <p className="">
          An error occcured, and we were unable to fetch hotels and properties
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      <div className="space-y-5">
        <h2 className="text-4xl font-bold">Most recent additions</h2>

        {loading2 ? (
          <div className="flex justify-center">
            <Loader className="size-14" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {recentHotels?.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </>
        )}
      </div>

      <div className="space-y-5">
        <h2 className="text-4xl font-bold">Hotest destinations</h2>

        {loading1 ? (
          <div className="flex justify-center">
            <Loader className="size-14" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {hotHotels?.map((hotel) => (
                <HotelCard key={hotel.id} hotel={hotel} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
