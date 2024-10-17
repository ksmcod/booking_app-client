import { useFormContext } from "react-hook-form";
import { hotelTypes } from "@/utils/hotelConfigs";
import { HotelFormData } from "./ManageHotelForm";

import { Label } from "@/components/ui/label";
import { useEffect } from "react";
import { Input } from "@/components/ui/input";

export default function TypeSection() {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  useEffect(() => {
    console.log("Typewatch is: ", typeWatch);
  }, [typeWatch]);

  return (
    <div>
      <h2 className="text-2xl mb-3">Hotel type</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {hotelTypes.map((type) => (
          <Label
            key={type.type}
            htmlFor={type.type}
            className={`cursor-pointer text-md rounded-full sm:px-6 sm:py-3 px-4 py-2 font-normal flex items-center justify-center  shadow ${
              type.type === typeWatch ? "bg-blue-300" : "bg-neutral-100"
            }`}
          >
            <Input
              type="radio"
              value={type.type}
              {...register("type", { required: "This field is required" })}
              id={type.type}
              className="hidden"
            />
            <span>{type.type}</span>
          </Label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500">{errors.type.message}</span>
      )}
    </div>
  );
}
