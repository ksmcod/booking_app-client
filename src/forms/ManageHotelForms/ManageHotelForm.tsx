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
  return (
    <FormProvider {...formMethods}>
      <div className="p-4">
        <form className="p-3 space-y-6 border max-w-5xl mx-auto">
          <DetailsSection />

          <hr className="w-full" />

          <TypeSection />

          <hr className="w-full" />

          <FacilitiesSection />

          <hr className="w-full" />

          <GuestsSection />

          <hr className="w-full" />

          <ImagesSection />
        </form>
      </div>
    </FormProvider>
  );
}
