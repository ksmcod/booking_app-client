import CalendarComponent from "@/components/Calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";

interface GuestInfoFormProps {
  hotelSlug: string;
  pricePerNight: number;
}

interface GuestInfoFormData {
  startDate: Date;
  endDate: Date;
  adultCount: number;
  childrenCount: number;
}

export default function GuestInfoForm({
  hotelSlug,
  pricePerNight,
}: GuestInfoFormProps) {
  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>();

  const [dateRange, setDateRange] = useState<RangeKeyDict>({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  });

  function handleCalendarChange(item: RangeKeyDict) {
    if (item.selection.startDate && item.selection.endDate) {
      if (item.selection.startDate !== item.selection.endDate) {
        setValue("startDate", item.selection.startDate);
        setValue("endDate", item.selection.endDate);
      }
    }

    setDateRange(item);
  }

  console.log("Date changing: ", dateRange);
  //   console.log("Form state: ", formState);

  return (
    <div className="bg-blue-200 p-4 space-y-3">
      <h3 className="text-xl font-bold">${pricePerNight} per night</h3>

      <form action="" className="py-2 space-y-2">
        <CalendarComponent
          dateRange={dateRange}
          onChange={(newDateRange) => handleCalendarChange(newDateRange)}
          position="up"
        />

        <div className="flex items-center gap-2 p-2 bg-white rounded-sm">
          <div>
            <Label htmlFor="adults" className="flex items-center gap-1">
              <span>Adults:</span>

              <Input
                type="number"
                className="h-fit py-1 rounded-none border-none"
                {...register("adultCount", {
                  required: true,
                  valueAsNumber: true,
                  min: { value: 1, message: "You need atleast one adult" },
                })}
              />
            </Label>
            {errors && errors.adultCount && (
              <span className="text-red-400 font-bold text-sm">
                {errors.adultCount.message}
              </span>
            )}
          </div>

          <div>
            <Label htmlFor="children" className="flex items-center gap-1">
              <span>Children:</span>

              <Input
                type="number"
                className="h-fit py-1 rounded-none border-none"
                {...register("childrenCount", {
                  valueAsNumber: true,
                  min: {
                    value: 0,
                    message: "This field cannot be less than zero",
                  },
                })}
              />
            </Label>
            {errors && errors.childrenCount && (
              <span className="text-red-400 font-bold text-sm">
                {errors.childrenCount.message}
              </span>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
