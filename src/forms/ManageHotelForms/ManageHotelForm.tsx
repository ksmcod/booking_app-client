import { FormProvider, useForm } from "react-hook-form";
import DetailsSection from "./DetailsSection";
import TypeSection from "./TypeSection";
import FacilitiesSection from "./FacilitiesSection";
import GuestsSection from "./GuestsSection";
import ImagesSection from "./ImagesSection";

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

export default function ManageHotelForm() {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit } = formMethods;

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  return (
    <FormProvider {...formMethods}>
      <div className="p-4">
        <form
          className="p-3 space-y-6 border max-w-5xl mx-auto"
          onSubmit={onSubmit}
        >
          <DetailsSection />

          <hr className="w-full" />

          <TypeSection />

          <hr className="w-full" />

          <FacilitiesSection />

          <hr className="w-full" />

          <GuestsSection />

          <hr className="w-full" />

          <ImagesSection />

          <button
            // disabled={isLoading}
            type="submit"
            className="bg-blue-600 text-white font-bold p-2 hover:bg-blue-500 active:opacity-90 text-xl rounded flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-60 w-full"
          >
            {/* {isLoading ? <Loader /> : "Login"} */}
            Submit
          </button>
        </form>
      </div>
    </FormProvider>
  );
}
