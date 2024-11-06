import { useFormContext } from "react-hook-form";
import { hotelTypes } from "@/utils/hotelConfigs";
import { HotelFormData } from "./ManageHotelForm";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

interface TypeSectionProps {
  type?: string;
}

export default function TypeSection({ type }: TypeSectionProps) {
  const {
    register,
    watch,
    formState: { errors },
    setValue,
  } = useFormContext<HotelFormData>();

  const typeWatch = watch("type");

  useEffect(() => {
    if (type) {
      setTimeout(() => {
        setValue("type", type);
      }, 0);
    }
  }, [type, setValue]);

  // useEffect(() => {
  //   if (type) {
  //     setValue("type", type);
  //     console.log("If statement EXECUTED!");
  //   }
  // }, [type, setValue]);

  return (
    <div>
      <h2 className="text-2xl mb-3">Hotel type</h2>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
        {hotelTypes.map((hotelType) => (
          <Label
            key={hotelType.type}
            htmlFor={hotelType.type}
            className={`cursor-pointer text-md rounded-full sm:px-6 sm:py-3 px-4 py-2 font-normal flex items-center justify-center  shadow ${
              hotelType.type === typeWatch
                ? "bg-blue-300 font-bold"
                : "bg-neutral-100"
            }`}
          >
            <Input
              type="radio"
              value={hotelType.type}
              {...register("type", { required: "This field is required" })}
              id={hotelType.type}
              className="hidden"
            />
            <span>{hotelType.type}</span>
          </Label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-xs">{errors.type.message}</span>
      )}
    </div>
  );
}
