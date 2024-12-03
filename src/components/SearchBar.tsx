import { Label } from "@radix-ui/react-label";
import { City, Country } from "country-state-city";
import { useCallback, useEffect, useState } from "react";
import { RangeKeyDict } from "react-date-range";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams } from "react-router-dom";
import Select from "react-select";
import { Input } from "./ui/input";
import CalendarComponent from "./Calendar";
import Button from "./ui/button";
import { Search, SearchX } from "lucide-react";
import toast from "react-hot-toast";

interface FormState {
  country: {
    value: string;
    label: string;
    isoCode: string;
  };
  city: {
    value: string;
    label: string;
  };
  adultCount: number;
  childrenCount: number;
  startDate: Date;
  endDate: Date;
}

export default function SearchBar() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormState>({
    defaultValues: {
      adultCount: 1,
      childrenCount: 0,
    },
  });

  //   Daterange to be passed down to the Calendar comp.
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

  //   Form state
  const [formState, setFormState] = useState<FormState>({
    country: { value: "", label: "Choose destination Country", isoCode: "" },
    city: { value: "", label: "Choose destination City" },
    adultCount: parseInt(searchParams.get("adults") || "1"),
    childrenCount: parseInt(searchParams.get("children") || "0"),
    startDate: dateRange.selection.startDate ?? new Date(),
    endDate: dateRange.selection.endDate ?? new Date(),
  });

  //   Get all country names to fill into Select component
  const allCountryNames = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: `${country.flag} ${country.name}`,
    isoCode: country.isoCode,
  }));

  //   Get all cities within the selected country
  const cityOptions = useCallback(() => {
    const cities = City.getCitiesOfCountry(formState.country.isoCode);
    return cities?.map((city) => ({ label: city.name, value: city.name }));
  }, [formState.country.isoCode]);

  //   Execute when user selects a country in the dropdown
  function selectCountry(e: { value: string; label: string; isoCode: string }) {
    // Set the selected country
    setFormState((prev) => ({
      ...prev,
      country: { value: e.value, label: e.label, isoCode: e.isoCode },
    }));

    setValue("country", e);

    // Clear the city field
    setFormState((prev) => ({
      ...prev,
      city: { value: "", label: "Choose destination City" },
    }));

    setValue("city", { value: "", label: "" });
  }

  //   Execute when user selects a city
  function selectCity(e: { value: string; label: string }) {
    setFormState((prev) => ({
      ...prev,
      city: { value: e.value, label: e.label },
    }));
    setValue("city", e);
  }

  // Handle change in calendar
  function handleCalendarChange(item: RangeKeyDict) {
    setDateRange(item);
    setFormState((prev) => ({
      ...prev,
      startDate: item.selection.startDate ?? new Date(),
      endDate: item.selection.endDate ?? new Date(),
    }));

    setValue("startDate", item.selection.startDate || new Date());
    setValue("endDate", item.selection.endDate || new Date());
  }

  //   Function to clear form
  function clearFormState(e: React.MouseEvent) {
    e.preventDefault();

    setDateRange({
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    });

    setFormState({
      country: { value: "", label: "Choose destination Country", isoCode: "" },
      city: { value: "", label: "Choose destination City" },
      adultCount: 1,
      childrenCount: 0,
      startDate: new Date(),
      endDate: new Date(),
    });

    setValue("adultCount", 1);
    setValue("childrenCount", 0);
    setValue("country", formState.country);
    setValue("city", formState.city);
    setValue("startDate", formState.startDate);
    setValue("endDate", formState.endDate);
  }

  //   Submit function
  const onSubmit = handleSubmit((data) => {
    console.log("Form data is: ", data);

    searchParams.delete("country");
    searchParams.delete("city");
    searchParams.delete("adults");
    searchParams.delete("children");
    searchParams.delete("startDate");
    searchParams.delete("endDate");

    if (formState.country.value) {
      searchParams.set("country", watch("country").value);
    }

    if (formState.city.value) {
      searchParams.set("city", watch("city").value);
    }

    if (formState.startDate.getTime() !== formState.endDate.getTime()) {
      searchParams.set("startDate", formState.startDate.getTime().toString());
      searchParams.set("endDate", formState.endDate.getTime().toString());
    }

    searchParams.set("adults", watch("adultCount").toString());
    searchParams.set("children", watch("childrenCount").toString());

    navigate(`/search?${searchParams.toString()}`);
  });

  //   Toast error if adult count and/or children count field(s) is/are empty
  useEffect(() => {
    if (errors.adultCount) {
      toast.error(errors.adultCount.message ?? "Adults");
    } else if (errors.childrenCount) {
      toast.error(errors.childrenCount.message ?? "Children");
    }
  }, [errors.adultCount, errors.childrenCount]);

  return (
    <div className="px-5">
      <form
        className="max-w-5xl mx-auto rounded-sm bg-orange-400 p-3 text-base shadow-md grid grid-cols-1 -translate-y-10 sm:-translate-y-1/3 sm:grid-cols-2 lg:grid-cols-3 gap-1 items-center"
        onSubmit={onSubmit}
      >
        {/* Dropdown to choose destination country */}
        {/* <div className="grid grid-cols-2 gap-1"> */}
        <Select
          placeholder="Destination country"
          options={allCountryNames}
          onChange={(e) => e && selectCountry(e)}
          value={formState.country}
          hideSelectedOptions
        />

        {/* Dropdown to choose destination city */}
        <Select
          placeholder="Destination city"
          options={cityOptions()}
          onChange={(e) => e && selectCity(e)}
          value={formState.city}
          hideSelectedOptions
          noOptionsMessage={() => {
            if (formState.country.value) {
              return "No cities found";
            }
            return "Please select a country";
          }}
        />

        {/* Select number of adults and children */}
        <div className="bg-white flex justify-center items-center gap-2 rounded-sm">
          <Label
            htmlFor="adults"
            className="flex justify-center items-center px-1 gap-1"
          >
            <span>Adults:</span>
            <Input
              id="adults"
              type="number"
              className="border-none"
              {...register("adultCount", {
                min: { value: 1, message: "There must be at least one adult" },
                required: {
                  value: true,
                  message: "You must have at least 1 adult",
                },
              })}
            />
          </Label>

          <Label
            htmlFor="children"
            className="flex justify-center items-center px-1"
          >
            <span>Children:</span>
            <Input
              id="children"
              type="number"
              className="border-none"
              min={0}
              {...register("childrenCount", {
                min: {
                  value: 0,
                  message: "You cannot have less than 0 children",
                },
                required: {
                  value: true,
                  message: "The children field may not be empty",
                },
              })}
            />
          </Label>
        </div>

        <CalendarComponent
          dateRange={dateRange}
          onChange={(newDateRange) => handleCalendarChange(newDateRange)}
          position="down"
        />

        {/* Search and clear buttons */}
        <Button
          type="submit"
          variant="primary"
          className="flex justify-center items-center px-3 gap-2"
        >
          <Search />
          <span>Search</span>
        </Button>

        <Button
          className="flex justify-center items-center bg-red-600 px-3 gap-2 hover:bg-red-500"
          onClick={(e: React.MouseEvent) => clearFormState(e)}
        >
          <SearchX />
          <span>Clear</span>
        </Button>
      </form>
    </div>
  );
}
