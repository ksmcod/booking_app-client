import { FormProvider, useForm } from "react-hook-form";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import Loader from "@/components/Loader";
import { ApiErrorType, HotelType } from "@/types";
import Modal from "@/components/Modal";
import { useDeleteMyHotelMutation } from "@/app/api/myHotelsApi";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import handleApiError from "@/utils/handleApiError";

interface ManageHotelFormProps {
  hotel?: HotelType;
  title: string;
  isLoading: boolean;
  slug: string;
  submitFunction: ({ slug, body }: { slug: string; body: FormData }) => void;
  edit?: boolean;
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
  submitFunction,
  isLoading,
  slug,
  edit,
}: ManageHotelFormProps) {
  const navigate = useNavigate();

  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const [deleteTrigger, { isLoading: deleteLoading }] =
    useDeleteMyHotelMutation();

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

    if (data.imageUrls) {
      data.imageUrls.forEach((url, index) => {
        formData.append(`imageUrls[${index}]`, url);
      });
    }

    submitFunction({ slug, body: formData });
  });

  function deleteHotel() {
    deleteTrigger(slug)
      .then(() => {
        toast.success("Hotel deleted");
        navigate("/my-hotels");
      })
      .catch((err) => {
        handleApiError(err as ApiErrorType);
      });
  }

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
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 active:opacity-90 text-xl rounded flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-60 w-full"
          >
            {isLoading ? <Loader className="size-7 text-white" /> : "Submit"}
          </button>

          {edit && (
            <Modal
              label={deleteLoading ? "Deleting..." : "Delete hotel"}
              title="Are you absolutely sure?"
              description="This action cannot be undone. This will permanently delete this hotel
        and remove all related data from our servers."
              proceedFn={deleteHotel}
              triggerClassName="w-full p-2 font-bold text-xl bg-red-600 hover:bg-red-500 active:bg-red-400 text-white rounded-sm"
              disabled={deleteLoading}
            />
          )}
        </form>
      </div>
    </FormProvider>
  );
}
