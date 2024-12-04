import CalendarComponent from "@/components/Calendar";
import Button from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookingInfoType } from "@/pages/SearchResults/SearchResultsPage";
import { useEffect, useMemo, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useAppSelector } from "@/app/hooks";
import { differenceInDays } from "date-fns";
import toast from "react-hot-toast";
import { HotelType } from "@/types";

interface GuestInfoFormProps {
  hotel: HotelType;
  pricePerNight: number;
}

export interface GuestInfoFormData {
  startDate: Date;
  endDate: Date;
  adultCount: number;
  childrenCount: number;
}

export default function GuestInfoForm({
  hotel,
  pricePerNight,
}: GuestInfoFormProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    register,
    setValue,
    formState: { errors },
    handleSubmit,
  } = useForm<GuestInfoFormData>();

  //   Date range state variable for calendar component
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

  //   Check if user is currently logged in
  const isLoggedIn = useAppSelector((state) => state.user.isLoggedIn);

  //   Function to handle calendar interaction
  function handleCalendarChange(item: RangeKeyDict) {
    if (item.selection.startDate && item.selection.endDate) {
      if (item.selection.startDate !== item.selection.endDate) {
        setValue("startDate", item.selection.startDate);
        setValue("endDate", item.selection.endDate);

        const newSearchParams = searchParams;
        newSearchParams.set(
          "startDate",
          item.selection.startDate.getTime().toString()
        );
        newSearchParams.set(
          "endDate",
          item.selection.endDate.getTime().toString()
        );

        setSearchParams(newSearchParams);
      }
    }
    setDateRange(item);
    setValue("startDate", item.selection.startDate as Date);
    setValue("endDate", item.selection.endDate as Date);
  }

  //   Get booking info from url
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
  }, [
    bookingInfo.adults,
    bookingInfo.children,
    bookingInfo.startDate,
    bookingInfo.endDate,
    setValue,
  ]);

  // Text in the button
  const bookingButtonLabel = useMemo(() => {
    if (isLoggedIn) return "Book now";
    return "Sign in to book";
  }, [isLoggedIn]);

  // Function to handle signup before booking
  function handleSignupToBook() {
    const allSearchParams = searchParams;
    allSearchParams.set("next", location.pathname);
    navigate(`/login?${allSearchParams}`);
  }

  // Submit function
  function onSubmit(data: GuestInfoFormData) {
    // navigate(`/book/${hotelSlug}?${searchParams.toString()}`);

    if (differenceInDays(data.endDate, data.startDate) < 1) {
      return toast.error("Your checkin and checkout dates are identical");
    }

    if (
      data.adultCount > hotel.adultCount ||
      data.childrenCount > hotel.childrenCount
    ) {
      return toast.error("Hotel does not support that many guests");
    }

    const newSearchParams = searchParams;
    newSearchParams.set("adults", data.adultCount.toString());
    newSearchParams.set("children", data.childrenCount.toString());
    setSearchParams(newSearchParams);

    navigate(`/book/${hotel.slug}?${searchParams.toString()}`);
  }

  useEffect(() => {}, []);

  return (
    <div className="bg-blue-200 p-4 space-y-3 rounded-sm">
      <h3 className="text-xl font-bold">${pricePerNight} per night</h3>

      <form
        action=""
        onSubmit={
          isLoggedIn ? handleSubmit(onSubmit) : handleSubmit(handleSignupToBook)
        }
        className="py-2 space-y-4"
      >
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
                  required: {
                    value: true,
                    message: "You need at least one adult",
                  },
                  valueAsNumber: true,
                  min: { value: 1, message: "You need at least one adult" },
                })}
                min={1}
              />
            </Label>
            {errors && errors.adultCount && (
              <span className="text-red-400 font-bold text-xs">
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
                  required: {
                    value: true,
                    message: "This field may not be empty",
                  },
                })}
                min={0}
              />
            </Label>
            {errors && errors.childrenCount && (
              <span className="text-red-400 font-bold text-xs">
                {errors.childrenCount.message}
              </span>
            )}
          </div>
        </div>

        <Button variant="primary" type="submit">
          {bookingButtonLabel}
        </Button>
      </form>
    </div>
  );
}
