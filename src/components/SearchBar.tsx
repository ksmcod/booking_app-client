import Select from "react-select";
import { Search, SearchX } from "lucide-react";
import { Country, City } from "country-state-city";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Button from "./ui/button";
import { useCallback, useState } from "react";
import CalendarComponent from "./Calendar";
import { RangeKeyDict } from "react-date-range";
import { useSearchParams } from "react-router-dom";

interface SearchValuesType {
  country: {
    value: string;
    label: string;
    isoCode: string;
  };
  isoCode: string;
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
  const [dateRange, setDateRange] = useState<RangeKeyDict>({
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const [searchValues, setSearchValues] = useState<SearchValuesType>({
    country: { value: "", label: "Choose destination Country", isoCode: "" },
    city: { value: "", label: "Choose destination City" },
    adultCount: 1,
    childrenCount: 0,
    isoCode: "",
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
    const cities = City.getCitiesOfCountry(searchValues.country.isoCode);
    return cities?.map((city) => ({ label: city.name, value: city.name }));
  }, [searchValues.country.isoCode]);

  //   Function to execute when user selects a country in the dropdown
  function selectCountry(e: { value: string; label: string; isoCode: string }) {
    // Set the selected country
    setSearchValues((prev) => ({
      ...prev,
      country: { value: e.value, label: e.label, isoCode: e.isoCode },
    }));

    // Clear the city field
    setSearchValues((prev) => ({
      ...prev,
      city: { value: "", label: "Choose destination City" },
    }));
  }

  //   Function to run when user selects a city
  function selectCity(e: { value: string; label: string }) {
    setSearchValues((prev) => ({
      ...prev,
      city: { value: e.value, label: e.label },
    }));
  }

  function handleCalendarChange(item: RangeKeyDict) {
    setDateRange(item);
    setSearchValues((prev) => ({
      ...prev,
      startDate: item.selection.startDate ?? new Date(),
      endDate: item.selection.endDate ?? new Date(),
    }));
  }

  // Function to clear search values
  function clearSearchValues(e: React.MouseEvent) {
    e.preventDefault();

    setDateRange({
      selection: {
        startDate: new Date(),
        endDate: new Date(),
        key: "selection",
      },
    });

    setSearchValues({
      country: { value: "", label: "Choose destination Country", isoCode: "" },
      city: { value: "", label: "Choose destination City" },
      adultCount: 1,
      childrenCount: 0,
      isoCode: "",
      startDate: new Date(),
      endDate: new Date(),
    });
  }

  // Function to handle the search
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    searchParams.delete("country");
    searchParams.delete("city");
    searchParams.delete("adults");
    searchParams.delete("children");
    searchParams.delete("startDate");
    searchParams.delete("endDate");

    console.log("Search params at this point: ", searchParams);

    if (searchValues.country.value.length) {
      searchParams.set("country", searchValues.country.value);
    }

    if (searchValues.city.value.length) {
      searchParams.set("city", searchValues.city.value);
    }

    if (searchValues.startDate.getTime() !== searchValues.endDate.getTime()) {
      searchParams.set(
        "startDate",
        searchValues.startDate.getTime().toString()
      );
      searchParams.set("endDate", searchValues.endDate.getTime().toString());
    }

    searchParams.set("adults", searchValues.adultCount.toString());
    searchParams.set("children", searchValues.childrenCount.toString());

    setSearchParams(searchParams);
    console.log("Search params: ", searchParams);
  }

  return (
    <div className="px-5">
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="max-w-5xl mx-auto rounded-sm bg-orange-400 p-3 text-base shadow-md grid grid-cols-1 -translate-y-10 sm:grid-cols-2 sm:-translate-y-1/3 lg:grid-cols-3 gap-1 items-center"
      >
        {/* Dropdown to choose destination country */}
        {/* <div className="grid grid-cols-2 gap-1"> */}
        <Select
          placeholder="Destination country"
          options={allCountryNames}
          onChange={(e) => e && selectCountry(e)}
          value={searchValues.country}
          hideSelectedOptions
        />

        {/* Dropdown to choose destination city */}
        <Select
          placeholder="Destination city"
          options={cityOptions()}
          onChange={(e) => e && selectCity(e)}
          value={searchValues.city}
          hideSelectedOptions
          noOptionsMessage={() => {
            if (searchValues.country.value) {
              return "No cities found";
            }
            return "Please select a country";
          }}
        />
        {/* </div> */}

        {/* Select number of adults and children */}
        <div className="bg-white flex justify-center items-center gap-2 rounded-sm">
          <Label
            htmlFor="adults"
            className="flex justify-center items-center px-1"
          >
            <span>Adults:</span>
            <Input
              id="adults"
              type="number"
              className="border-none h-full w-full"
              min={1}
              value={searchValues.adultCount}
              onChange={(e) => {
                if (Number.isNaN(parseInt(e.target.value))) {
                  e.target.value = "01";
                }
                setSearchValues((prev) => ({
                  ...prev,
                  adultCount: parseInt(e.target.value),
                }));
              }}
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
              className="border-none h-full w-full"
              min={0}
              value={searchValues.childrenCount}
              onChange={(e) => {
                if (Number.isNaN(parseInt(e.target.value))) {
                  e.target.value = "0";
                }
                setSearchValues((prev) => ({
                  ...prev,
                  childrenCount: parseInt(e.target.value),
                }));
              }}
            />
          </Label>
        </div>

        {/* Calendar for choosing date */}
        <CalendarComponent
          dateRange={dateRange}
          onChange={(newDateRange) => handleCalendarChange(newDateRange)}
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
          onClick={(e: React.MouseEvent) => clearSearchValues(e)}
        >
          <SearchX />
          <span>Clear</span>
        </Button>
      </form>
    </div>
  );
}
