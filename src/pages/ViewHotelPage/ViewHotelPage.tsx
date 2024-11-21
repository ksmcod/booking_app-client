import { useGetSingleHotelQuery } from "@/app/api/hotelsApi";
import Loader from "@/components/Loader";
import { ApiErrorType } from "@/types";
import Redirect from "@/utils/Redirect";
import { Link, useParams } from "react-router-dom";

export default function ViewHotelPage() {
  const { slug } = useParams();

  if (!slug) {
    return <Redirect target="/" />;
  }

  const { isLoading, data, error, isError } = useGetSingleHotelQuery(slug);

  console.log("Gotten hotel is: ", data);

  //  Show when request is in flight
  if (isLoading) {
    return (
      <div className="flex-1 flex justify-center items-center">
        <Loader className="size-16" />
      </div>
    );
  }

  //   If hotel was not found
  if (isError && (error as ApiErrorType).status === 404) {
    return (
      <div className="flex-1 flex flex-col justify-center items-center">
        <h1 className="text-4xl">Hotel not found</h1>
        <div className="flex gap-1">
          <span>The hotel you requested could not be found. Return to</span>
          <Link to={"/"} className="link hover:text-blue-600" replace>
            home page
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

  return <div className="flex-1 bg-violet-500">ViewHotelPage</div>;
}
