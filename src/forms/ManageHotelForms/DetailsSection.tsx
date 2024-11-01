import { useFormContext } from "react-hook-form";

import { City, Country } from "country-state-city";
import Select from "react-select";

import { HotelFormData } from "./ManageHotelForm";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useCallback, useEffect, useMemo, useState } from "react";

interface DetailsSectionProps {
  name?: string;
  city?: string;
  country?: string;
  description?: string;
  price?: number;
  starRating?: number;
}

export default function DetailsSection({
  name,
  city,
  country,
  description,
  price,
  starRating,
}: DetailsSectionProps) {
  const allCountryNames = Country.getAllCountries().map((country) => ({
    value: country.name,
    label: `${country.flag} ${country.name}`,
  }));

  const {
    register,
    formState: { errors },
    watch,
    setValue,
    resetField,
  } = useFormContext<HotelFormData>();

  const countryWatch = watch("country");
  const cityWatch = watch("city");
  const descriptionWatch = watch("description");
  const priceWatch = watch("price");
  const starRatingWatch = watch("starRating");

  const selectedCountry = useMemo(() => {
    return Country.getAllCountries().find(
      (country) => country.name === countryWatch
    );
  }, [countryWatch]);

  const citiesByCountry = () => {
    if (selectedCountry) {
      const countryCities = City.getCitiesOfCountry(selectedCountry.isoCode);
      const cities = countryCities?.map((city) => ({
        label: city.name,
        value: city.name,
      }));
      return cities;
    }
    return [];
  };

  const [selectedCity, setSelectedCity] = useState<{
    value: string;
    label: string;
  } | null>(null);

  // const [selectedCountry, setSelectedCountry] = useState<{
  //   value: string;
  //   label: string;
  // } | null>(null);

  const starRatingOptions = [
    {
      label: "1",
      value: 1,
    },
    {
      label: "2",
      value: 2,
    },
    {
      label: "3",
      value: 3,
    },
    {
      label: "4",
      value: 4,
    },
    {
      label: "5",
      value: 5,
    },
  ];

  /* Onchange function to select country */
  const selectCountry = useCallback(
    (e: { value: string; label: string }) => {
      setValue("country", e.value);
      resetField("city");
      setSelectedCity({ value: "", label: "" });
    },
    [resetField, setValue]
  );

  // Onchange function to select city
  const selectCity = useCallback(
    (e: { value: string; label: string }) => {
      setValue("city", e.value);
      setSelectedCity(e);
    },
    [setValue]
  );

  // UseEffect function to populate the form if entering in editing mode
  useEffect(() => {
    if (name && city && country && description && price && starRating) {
      // Set hotel name
      setValue("name", name);

      // Set hotel country
      selectCountry({ value: country, label: "" });

      // Set hotel city
      setValue("city", city);
      setSelectedCity({ value: city, label: city });

      // Set hotel description
      setValue("description", description);

      // Set hotel price
      setValue("price", price);
    }
  }, [
    name,
    city,
    country,
    setValue,
    selectCountry,
    description,
    price,
    starRating,
  ]);

  console.log("Country value is: ", countryWatch);
  console.log("City value is: ", cityWatch);
  console.log("Description value: ", descriptionWatch);
  console.log("Price is: ", priceWatch);
  console.log("Star rating is: ", starRatingWatch);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center">Add Hotel</h1>

      <h2 className="text-2xl">Details</h2>

      <Label htmlFor="name" className="text-gray-700 text-sm flex-1">
        Name
        <Input
          type="text"
          className="border rounded w-full p-2 font-normal"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500 text-xs">{errors.name.message}</span>
        )}
      </Label>

      {/* City and Country */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* ------------------------------------------------------------ */}

        {/* COUNTRY FIELD */}
        <Label htmlFor="country" className="text-gray-700 text-sm flex-1">
          Country
          <Select
            {...register("country", { required: "This field is required" })}
            options={allCountryNames}
            placeholder="Select a country"
            onChange={(e) => {
              if (e) {
                selectCountry(e);
              }
            }}
            blurInputOnSelect
            defaultValue={
              country &&
              allCountryNames.find(
                (countryData: { value: string; label: string }) =>
                  countryData.value === country
              )
            }
          />
          {errors.country && (
            <span className="text-red-500 text-xs">
              {errors.country.message}
            </span>
          )}
        </Label>

        {/* CITY FIELD */}
        <Label htmlFor="city" className="text-gray-700 text-sm flex-1">
          City
          <Select
            {...register("city", { required: "This field is required" })}
            options={citiesByCountry()}
            placeholder="Select a city"
            onChange={(e) => {
              if (e) {
                selectCity(e);
              }
            }}
            noOptionsMessage={() => {
              if (countryWatch) {
                return "No cities";
              }
              return "Please select a country";
            }}
            value={selectedCity}
            blurInputOnSelect
          />
          {errors.city && (
            <span className="text-red-500 text-xs">{errors.city.message}</span>
          )}
        </Label>
      </div>

      {/* DESCRIPTION */}
      <Label htmlFor="description" className="text-gray-700 text-sm flex-1">
        Description
        <Textarea
          rows={7}
          className="border rounded w-full p-2 font-normal"
          id="description"
          {...register("description", { required: "This field is required" })}
        />
        {errors.description && (
          <span className="text-red-500 text-xs">
            {errors.description.message}
          </span>
        )}
      </Label>

      {/* PRICE */}
      <Label htmlFor="price" className="text-gray-700 text-sm flex-1">
        Price per night ($USD)
        <Input
          type="number"
          min={1}
          className="border rounded w-full p-2 font-normal"
          id="price"
          {...register("price", { required: "This field is required" })}
        />
        {errors.price && (
          <span className="text-red-500 text-xs">{errors.price.message}</span>
        )}
      </Label>

      {/* STAR RATING */}
      <Label htmlFor="starRating" className="text-gray-700 text-sm flex-1">
        Star Rating
        {/* <select
          id="starRating"
          className="w-full bg-white border rounded p-4 font-normal text-gray-700"
          {...register("starRating", { required: "This field is required" })}
        >
          <option value="" className="hidden">
            Select star rating
          </option>

          {[1, 2, 3, 4, 5].map((i) => (
            <option key={i} value={i} className="">
              {i}
            </option>
          ))}
        </select> */}
        <Select
          id="starRating"
          {...register("starRating", { required: "This field is required" })}
          options={starRatingOptions}
          onChange={(e) => e && setValue("starRating", e.value)}
          placeholder="Select a star rating"
        />
        {errors.starRating && (
          <span className="text-red-500 text-xs">
            {errors.starRating.message}
          </span>
        )}
      </Label>
    </div>
  );
}
