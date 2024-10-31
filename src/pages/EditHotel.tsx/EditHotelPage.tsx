import { useGetMyHotelBySlugQuery } from "@/app/api/myHotelsApi";
import { ApiErrorType } from "@/types";
import { Link, useParams } from "react-router-dom";

export default function EditHotelPage() {
  const { slug } = useParams();

  const { isLoading, data, isError, error } = useGetMyHotelBySlugQuery(
    slug as string
  );

  console.log("Slug is: ", slug);
  console.log("Data obtained is: ", data);

  if (isError && (error as ApiErrorType).status === 404) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">Hotel not found</h1>
        <div className="flex gap-1">
          <span>The hotel you requested could not found. Return to</span>
          <Link to={"/my-hotels"} className="link hover:text-blue-600" replace>
            your hotels
          </Link>
        </div>
      </div>
    );
  }

  return <div>{isLoading && "Loading..."}</div>;
}
