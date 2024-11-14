import { useSearchHotelQuery } from "@/app/api/hotelsApi";
import { SearchValuesType } from "@/types";
import { useSearchParams } from "react-router-dom";

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

  const { data, error } = useSearchHotelQuery(queryValues);

  console.log("Data: ", data, ", Error: ", error);
  return <div>SearchResultsPage</div>;
}
