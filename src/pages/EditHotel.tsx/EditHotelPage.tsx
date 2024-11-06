import { useGetMyHotelBySlugQuery } from "@/app/api/myHotelsApi";
import Loader from "@/components/Loader";
import ManageHotelForm from "@/forms/ManageHotelForms/ManageHotelForm";
import { ApiErrorType } from "@/types";
import { Link, useParams } from "react-router-dom";

export default function EditHotelPage() {
  const { slug } = useParams();

  const { isLoading, data, isError, error } = useGetMyHotelBySlugQuery(
    slug as string
  );

  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        {isLoading && <Loader className="size-16" />}
      </div>
    );
  }

  // Display hotel not found if server response is 404
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

  // If a server error occurs
  if (isError && (error as ApiErrorType).status === 500) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">Server error</h1>
        <div className="flex gap-1">
          <span>
            We encountered a server error. Please try again later. Return to
          </span>
          <Link to={"/my-hotels"} className="link hover:text-blue-600" replace>
            your hotels
          </Link>
        </div>
      </div>
    );
  }

  // If network error occurs
  if (isError) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">An error occured</h1>
        <div className="flex gap-1">
          <span>
            We encountered an unknown error. Please try again later. Return to
          </span>
          <Link to={"/my-hotels"} className="link hover:text-blue-600" replace>
            your hotels
          </Link>
        </div>
      </div>
    );
  }

  return <ManageHotelForm hotel={data} title="Edit Hotel" />;
}
