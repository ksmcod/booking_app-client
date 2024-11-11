import Select from "react-select";
import { Search, SearchX } from "lucide-react";
import { Country, City } from "country-state-city";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import Button from "./ui/button";
import { useCallback, useState } from "react";

interface SearchParams {
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
}

export default function SearchBar() {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    country: { value: "", label: "Choose country", isoCode: "" },
    city: { value: "", label: "Choose city" },
    adultCount: 1,
    childrenCount: 0,
    isoCode: "",
  });

  //   Get all country names to fill into Select component
  const allCountryNames = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: `${country.flag} ${country.name}`,
    isoCode: country.isoCode,
  }));

  //   Get all cities within the selected country
  const cityOptions = useCallback(() => {
    const cities = City.getCitiesOfCountry(searchParams.country.isoCode);
    return cities?.map((city) => ({ label: city.name, value: city.name }));
  }, [searchParams.country.isoCode]);

  //   Function to execute when user selects a country in the dropdown
  function selectCountry(e: { value: string; label: string; isoCode: string }) {
    // Set the selected country
    setSearchParams((prev) => ({
      ...prev,
      country: { value: e.value, label: e.label, isoCode: e.isoCode },
    }));

    // Clear the city field
    setSearchParams((prev) => ({
      ...prev,
      city: { value: "", label: "Choose city" },
    }));
  }

  //   Function to run when user selects a city
  function selectCity(e: { value: string; label: string }) {
    setSearchParams((prev) => ({
      ...prev,
      city: { value: e.value, label: e.label },
    }));
  }

  console.log("Search params is: ", searchParams);
  return (
    <div className="px-5">
      <form className="max-w-5xl mx-auto rounded-sm bg-orange-400 p-3 text-base shadow-md grid grid-cols-1 sm:grid-cols-2 sm:-translate-y-1/3 lg:grid-cols-4 gap-1 items-center">
        {/* Dropdown to choose destination country */}
        <div className="">
          <Select
            placeholder="Destination country"
            options={allCountryNames}
            onChange={(e) => e && selectCountry(e)}
            value={searchParams.country}
            hideSelectedOptions
          />
        </div>

        {/* Dropdown to choose destination city */}
        <div className="">
          <Select
            placeholder="Destination city"
            options={cityOptions()}
            onChange={(e) => e && selectCity(e)}
            value={searchParams.city}
            hideSelectedOptions
            noOptionsMessage={() => {
              if (searchParams.country.value) {
                return "No cities found";
              }
              return "Please select a country";
            }}
          />
        </div>

        {/* Select number of adults and children */}
        <div className="bg-white grid grid-cols-2 items-center rounded-sm">
          <Label
            htmlFor="adults"
            className="flex justify-center items-center px-1"
          >
            <span>Adults:</span>
            <Input
              id="adults"
              type="number"
              className="border-none max-w-32"
              min={1}
              value={searchParams.adultCount}
              onChange={(e) => {
                if (Number.isNaN(parseInt(e.target.value))) {
                  e.target.value = "01";
                }
                setSearchParams((prev) => ({
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
              className="border-none max-w-32"
              min={0}
              value={searchParams.childrenCount}
              onChange={(e) => {
                if (Number.isNaN(parseInt(e.target.value))) {
                  e.target.value = "0";
                }
                setSearchParams((prev) => ({
                  ...prev,
                  childrenCount: parseInt(e.target.value),
                }));
              }}
            />
          </Label>
        </div>

        {/* Search and clear buttons */}
        <div className="flex items-center gap-1">
          <Button
            variant="primary"
            className="flex justify-center items-center px-3 self-stretch"
          >
            <Search />
            <span>Search</span>
          </Button>

          <Button className="flex justify-center items-center bg-red-500 px-3">
            <SearchX />
            <span>Clear</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
