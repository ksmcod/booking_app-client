import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

export default function GuestsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl mb-3">Guests</h2>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Adults */}
        <Label htmlFor="adults" className="text-gray-700 text-sm flex-1">
          Adults
          <Input
            id="adults"
            type="number"
            className="w-full"
            {...register("adultCount", {
              required: "Please fill this field",
              min: {
                value: 1,
                message: "This field may not be less than 1",
              },
              value: 1,
            })}
          />
          {errors.adultCount && (
            <span className="text-red-500 text-xs">
              {errors.adultCount.message}
            </span>
          )}
        </Label>

        {/* Children */}
        <Label htmlFor="children" className="text-gray-700 text-sm flex-1">
          Children
          <Input
            id="children"
            type="number"
            className="w-full"
            {...register("childrenCount", {
              required: "Please fill this field",
              min: {
                value: 0,
                message: "This field may not be less than 0",
              },
              value: 0,
            })}
          />
          {errors.childrenCount && (
            <span className="text-red-500 text-xs">
              {errors.childrenCount.message}
            </span>
          )}
        </Label>
      </div>
    </div>
  );
}
