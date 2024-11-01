import { FormProvider, useForm } from "react-hook-form";
import { useAddMyHotelMutation } from "@/app/api/myHotelsApi";

import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";
import Loader from "@/components/Loader";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { HotelType } from "@/types";

interface ManageHotelFormProps {
  hotel?: HotelType;
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
}

export default function ManageHotelForm({ hotel }: ManageHotelFormProps) {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;

  const navigate = useNavigate();

  const [addMyHotelMutation, { isLoading }] = useAddMyHotelMutation();

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("country", data.country);
    formData.append("city", data.city);
    formData.append("description", data.description);
    formData.append("price", data.price.toString());
    formData.append("starRating", data.starRating.toString());
    formData.append("type", data.type.toLowerCase());
    formData.append("adultCount", data.adultCount.toString());
    formData.append("childrenCount", data.childrenCount.toString());

    data.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility.toLowerCase());
    });

    Array.from(data.imageFiles).forEach((image) => {
      formData.append("imageFiles", image);
    });

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
          />

          <hr className="w-full" />

          <TypeSection />

          <hr className="w-full" />

          <FacilitiesSection />

          <hr className="w-full" />

          <GuestsSection />

          <hr className="w-full" />

          <ImagesSection />

          <button
            disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 active:opacity-90 text-xl rounded flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-60 w-full"
          >
            {isLoading ? <Loader className="size-7 text-white" /> : "Submit"}
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
