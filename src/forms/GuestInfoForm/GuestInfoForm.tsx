import CalendarComponent from "@/components/Calendar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookingInfoType } from "@/pages/SearchResults/SearchResultsPage";
import { useEffect, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

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
  const [searchParams] = useSearchParams();

  const {
    register,
    watch,
    setValue,
    formState: { errors },
  } = useForm<GuestInfoFormData>();

  const [dateRange, setDateRange] = useState<RangeKeyDict>({
    selection: {
      startDate: new Date(
        parseInt(
          searchParams.get("startDate") || new Date().getTime().toString()
        )
      ),
      endDate: new Date(
        parseInt(searchParams.get("endDate") || new Date().getTime().toString())
      ),
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
    setValue("startDate", item.selection.startDate as Date);
    setValue("endDate", item.selection.endDate as Date);
  }

  const bookingInfo: BookingInfoType = {
    startDate: searchParams.get("startDate") || new Date().getTime().toString(),
    endDate: searchParams.get("endDate") || new Date().getTime().toString(),
    adults: searchParams.get("adults") || "1",
    children: searchParams.get("children") || "0",
  };

  //   Set values for adults,children,start date & end date from url params
  useEffect(() => {
    setValue("adultCount", parseInt(bookingInfo.adults));
    setValue("childrenCount", parseInt(bookingInfo.children));
    setValue("startDate", new Date(parseInt(bookingInfo.startDate)));
    setValue("endDate", new Date(parseInt(bookingInfo.endDate)));
  }, []);

  console.log("Start date in form: ", watch("startDate"));
  console.log("End date in form: ", watch("endDate"));
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
