import { useSearchHotelQuery } from "@/app/api/hotelsApi";
import Loader from "@/components/Loader";
import { SearchValuesType } from "@/types";
import { useSearchParams } from "react-router-dom";
import SearchResultsCard from "./SearchResultsCard";

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams();

  const queryValues: SearchValuesType = {
    country: searchParams.get("country") || "",
    city: searchParams.get("city") || "",
    adultCount: searchParams.get("adults") || "1",
    childrenCount: searchParams.get("children") || "0",
    startDate: searchParams.get("startDate") || "",
    endDate: searchParams.get("endDate") || "",
  };

  const { data, error, isFetching } = useSearchHotelQuery(queryValues);

  console.log("Data: ", data, ", Error: ", error);
  return isFetching ? (
    <div className="flex-1 flex justify-center items-center">
      <Loader className="size-16" />
    </div>
  ) : (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5 flex-1">
      {/* Filters */}
      <div className="rounded-lg border border-slate-300 p-5 h-fit">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300">
            Filter by:
          </h3>
        </div>
      </div>

      {/* Search results */}
      <div className="flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-xl font-bold flex gap-1">
            <span>{data?.totalNumberOfMatches} Hotel(s) found</span>
            <span>
              {queryValues.city.length ? `in ${queryValues.city}` : ""}
            </span>
          </h3>

          {/* TODO Sort Options */}
        </div>
        {data?.hotels.map((hotel) => (
          <SearchResultsCard key={hotel.id} hotel={hotel} />
        ))}
      </div>
    </div>
  );
}
