import { useLazySearchHotelQuery } from "@/app/api/hotelsApi";
import Loader from "@/components/Loader";
import { SearchFiltersType, SearchValuesType } from "@/types";
import { Link, useSearchParams } from "react-router-dom";
import SearchResultsCard from "./components/SearchResultsCard";
import Pagination from "@/components/Pagination";
import { useEffect, useMemo, useState } from "react";
import StarRatingFilter from "./components/StarRatingFilter";
import HotelTypeFilter from "./components/HotelTypeFilter";
import FacilityFilter from "./components/FacilitiesFilter";

export default function SearchResultsPage() {
  const [searchQuery, { data, isFetching, isError }] =
    useLazySearchHotelQuery();

  const [searchParams, setSearchParams] = useSearchParams();

  // Object that contains all search and sorting filters
  const [searchFilters, setSearchFilters] = useState<SearchFiltersType>({
    selectedStars: [],
    selectedHotelType: [],
    selectedFacilities: [],
    sortBy: "none",
  });

  // Object to be passed to the api client to be used to create the request string
  // All request parameters are sent to the server as url params
  const queryValues: SearchValuesType = useMemo(() => {
    return {
      country: searchParams.get("country") || "",
      city: searchParams.get("city") || "",
      adultCount: searchParams.get("adults") || "1",
      childrenCount: searchParams.get("children") || "0",
      startDate: searchParams.get("startDate") || "",
      endDate: searchParams.get("endDate") || "",
      page: searchParams.get("page") || "1",
      searchFilters: searchFilters,
    };
  }, [searchParams, searchFilters]);

  // Function to run everytime user filters results by star ratings
  function handleStarFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedStars = Array.from(searchFilters.selectedStars);

    if (selectedStars.includes(e.target.value)) {
      const updatedSelectedStars = selectedStars.filter(
        (star) => star !== e.target.value
      );
      updatedSelectedStars.sort();
      setSearchFilters((prev) => ({
        ...prev,
        selectedStars: updatedSelectedStars,
      }));
      return;
    }
    selectedStars.push(e.target.value);
    selectedStars.sort();

    setSearchFilters((prev) => ({
      ...prev,
      selectedStars: selectedStars,
    }));
  }

  // Function to run everytime user filters results by hotel types
  function handleHotelTypeFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedHotelType = Array.from(searchFilters.selectedHotelType);

    if (selectedHotelType.includes(e.target.value)) {
      const updatedSelectedHotelType = selectedHotelType.filter(
        (hotelType) => hotelType !== e.target.value
      );
      updatedSelectedHotelType.sort();
      setSearchFilters((prev) => ({
        ...prev,
        selectedHotelType: updatedSelectedHotelType,
      }));
      return;
    }
    selectedHotelType.push(e.target.value);
    selectedHotelType.sort();

    setSearchFilters((prev) => ({
      ...prev,
      selectedHotelType: selectedHotelType,
    }));
  }

  // Function to run everytime user filters hotels by facilities
  function handleFacilitiesFilter(e: React.ChangeEvent<HTMLInputElement>) {
    const selectedFacilities = Array.from(searchFilters.selectedFacilities);

    if (selectedFacilities.includes(e.target.value)) {
      const updatedSelectedFacilities = selectedFacilities.filter(
        (facility) => facility !== e.target.value
      );
      updatedSelectedFacilities.sort();
      setSearchFilters((prev) => ({
        ...prev,
        selectedFacilities: updatedSelectedFacilities,
      }));
      return;
    }
    selectedFacilities.push(e.target.value);
    selectedFacilities.sort();

    setSearchFilters((prev) => ({
      ...prev,
      selectedFacilities: selectedFacilities,
    }));
  }

  // Function to sort hotel. Sorting is done on the server
  function handleHotelSorting(e: React.ChangeEvent<HTMLSelectElement>) {
    console.log("Hotel sorting: ", e.target.value);

    if (e.target.value === "starRating") {
      setSearchFilters((prev) => ({ ...prev, sortBy: "starRating" }));
    }

    if (e.target.value === "priceLowToHigh") {
      setSearchFilters((prev) => ({ ...prev, sortBy: "priceLowToHigh" }));
    }

    if (e.target.value === "priceHighToLow") {
      setSearchFilters((prev) => ({ ...prev, sortBy: "priceHighToLow" }));
    }

    if (e.target.value === "no-sorting") {
      setSearchFilters((prev) => ({ ...prev, sortBy: "none" }));
    }
  }

  useEffect(() => {
    searchQuery(queryValues);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchQuery, queryValues]);

  // =================================================================================================
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-[250px_1fr] gap-5 flex-1">
      {/* Filters */}
      <div className="rounded-lg border border-slate-300 p-5 h-fit">
        <div className="space-y-5">
          <h3 className="text-lg font-semibold border-b border-slate-300">
            Filter by:
          </h3>

          <StarRatingFilter
            selectedStars={searchFilters.selectedStars}
            onChange={handleStarFilter}
          />

          <hr className="" />

          <HotelTypeFilter
            selectedHotelType={searchFilters.selectedHotelType}
            onChange={handleHotelTypeFilter}
          />

          <hr className="" />

          <FacilityFilter
            selectedFacilities={searchFilters.selectedFacilities}
            onChange={handleFacilitiesFilter}
          />
        </div>
      </div>

      {/* Search results */}
      <div className="">
        {isFetching ? (
          <div className="flex justify-center items-center mt-10">
            <Loader className="size-16" />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center flex-wrap gap-2">
              <h3 className="text-xl font-bold flex gap-1">
                <span>{data?.totalNumberOfMatches} Hotel(s) found</span>
                <span>
                  {queryValues.city.length ? `in ${queryValues.city}` : ""}
                </span>
              </h3>

              {/* Sort Options */}
              <select
                name="sort"
                id="sort"
                className="p-3 rounded-sm bg-white border shadow-sm"
                onChange={(e) => handleHotelSorting(e)}
                value={searchFilters.sortBy || ""}
              >
                <option value="" hidden>
                  Sort by
                </option>

                <option value="no-sorting">No sorting</option>
                <option value="starRating">Star rating</option>
                <option value="priceLowToHigh">
                  Price per night (low to high)
                </option>
                <option value="priceHighToLow">
                  Price per night (high to low)
                </option>
              </select>
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
                }}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
