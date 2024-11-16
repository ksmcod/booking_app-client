import { useLazySearchHotelQuery } from "@/app/api/hotelsApi";
import Loader from "@/components/Loader";
import { SearchValuesType } from "@/types";
import { Link, useSearchParams } from "react-router-dom";
import SearchResultsCard from "./SearchResultsCard";
import Pagination from "@/components/Pagination";
import { useEffect, useMemo } from "react";

export default function SearchResultsPage() {
  const [searchParams, setSearchParams] = useSearchParams();

  const queryValues: SearchValuesType = useMemo(() => {
    return {
      country: searchParams.get("country") || "",
      city: searchParams.get("city") || "",
      adultCount: searchParams.get("adults") || "1",
      childrenCount: searchParams.get("children") || "0",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      page: searchParams.get("page") || "1",
    };
  }, [searchParams]);

  console.log("QUERY VALUES: ", queryValues);

  const [searchQuery, { data, isFetching, isError }] =
    useLazySearchHotelQuery();

  useEffect(() => {
    searchQuery(queryValues);
  }, [searchQuery, queryValues]);

  console.log("Query Values: ", queryValues);
  console.log("Data", data);

  // Display error if there is an error
  if (isError) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">An error occured</h1>
        <div className="flex gap-1">
          <span>We enountered an error. Return to</span>
          <Link to={"/"} className="link hover:text-blue-600" replace>
            home page
          </Link>
        </div>
      </div>
    );
  }

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

        {data && (
          <Pagination
            currentPage={data.pagination.pageNumber}
            totalPages={data.pagination.pages}
            onPageChange={(pageNo) => {
              const newSearchParams = new URLSearchParams(searchParams);
              newSearchParams.set("page", pageNo.toString());
              setSearchParams(newSearchParams);
              console.log("New search params: ", newSearchParams);
              console.log("Query values: ", queryValues);
            }}
          />
        )}
      </div>
    </div>
  );
}
