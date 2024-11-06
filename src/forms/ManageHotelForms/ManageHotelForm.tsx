import { FormProvider, useForm } from "react-hook-form";
import {
  useAddMyHotelMutation,
  useUpdateMyHotelMutation,
} from "@/app/api/myHotelsApi";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { ApiErrorType, HotelType } from "@/types";
import handleApiError from "@/utils/handleApiError";

interface ManageHotelFormProps {
  hotel?: HotelType;
  title: string;
  mode: "create" | "edit";
}
export interface HotelFormData {
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  price: number;
  starRating: number;
  facilities: string[];
  adultCount: number;
  childrenCount: number;
  imageFiles: FileList;
  imageUrls: string[];
}

export default function ManageHotelForm({
  hotel,
  title,
  mode,
}: ManageHotelFormProps) {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  const navigate = useNavigate();

  const [addMyHotelMutation, { isLoading: isLoading1 }] =
    useAddMyHotelMutation();
  const [updateMyHotelMutation, { isLoading: isLoading2 }] =
    useUpdateMyHotelMutation();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("type", data.type);
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childrenCount", data.childrenCount.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });

    Array.from(data.imageFiles).forEach((image) => {
      formData.append("imageFiles", image);
    });

    data.imageUrls.forEach((url, index) => {
      formData.append(`imageUrls[${index}]`, url);
    });

    if (mode === "create") {
      addMyHotelMutation(formData)
        .unwrap()
        .then(() => {
          toast.success("Hotel added successfully");
          reset();
          navigate("/my-hotels");
        })
        .catch((err) => {
          if (err.message === "Aborted") {
            return toast.error("A network error occured");
          }
          toast.error(err?.data?.message ?? "An error occured");
        });
    }

    if (mode === "edit") {
      if (hotel) {
        updateMyHotelMutation({ slug: hotel.slug as string, body: formData })
          .unwrap()
          .then(() => {
            toast.success("Hotel updated successfully");
            reset();
            navigate("/my-hotels");
          })
          .catch((error) => {
            handleApiError(error as ApiErrorType);
          });
      }
    }
  });

  return (
    <FormProvider {...formMethods}>
      <div className="p-4">
        <form
          className="p-3 space-y-6 border max-w-5xl mx-auto"
          onSubmit={onSubmit}
        >
          <DetailsSection
            name={hotel?.name}
            city={hotel?.city}
            country={hotel?.country}
            description={hotel?.description}
            price={hotel?.price}
            starRating={hotel?.starRating}
            title={title}
          />

          <hr className="w-full" />

          <TypeSection type={hotel?.type} />

          <hr className="w-full" />

          <FacilitiesSection facilities={hotel?.facilities} />

          <hr className="w-full" />

          <GuestsSection
            adults={hotel?.adultCount}
            children={hotel?.childrenCount}
          />

          <hr className="w-full" />

          <ImagesSection imageUrls={hotel?.imageUrls} />

          <button
            disabled={isLoading1 || isLoading2}
            type="submit"
            className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 active:opacity-90 text-xl rounded flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-60 w-full"
          >
            {isLoading1 || isLoading2 ? (
              <Loader className="size-7 text-white" />
            ) : (
              "Submit"
            )}
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
