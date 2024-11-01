import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import { hotelFacilities } from "@/utils/hotelConfigs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useEffect } from "react";

interface FacilitiesProps {
  facilities?: string[];
}

export default function Facilities({ facilities }: FacilitiesProps) {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<HotelFormData>();

  useEffect(() => {
    if (facilities?.length) {
      setValue("facilities", facilities);
    }
  }, [setValue, facilities]);

  return (
    <div>
      <h2 className="text-2xl mb-3">Facilities</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {hotelFacilities.map((facility) => (
          <Label
            key={facility}
            htmlFor={facility}
            className="flex items-center gap-2 font-normal"
          >
            <Input
              type="checkbox"
              id={facility}
              className="size-5"
              value={facility}
              {...register("facilities", {
                required: "This field is required",
                minLength: {
                  value: 1,
                  message: "Please select one or more facilities",
                },
              })}
            />

            <span>{facility}</span>
          </Label>
        ))}
      </div>
      {errors.facilities && (
        <span className="text-red-500 text-xs">
          {errors.facilities.message}
        </span>
      )}
    </div>
  );
}
