import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export default function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

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
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </Label>

      {/* City and Country */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* COUNTRY FIELD */}
        <Label htmlFor="country" className="text-gray-700 text-sm flex-1">
          Country
          <Input
            type="text"
            className="border rounded w-full p-2 font-normal"
            id="country"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </Label>

        {/* CITY FIELD */}
        <Label htmlFor="city" className="text-gray-700 text-sm flex-1">
          City
          <Input
            type="text"
            className="border rounded w-full p-2 font-normal"
            id="city"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
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
          <span className="text-red-500">{errors.description.message}</span>
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
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </Label>

      {/* STAR RATING */}
      <Label htmlFor="price" className="text-gray-700 text-sm flex-1">
        Star Rating
        <select
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
        </select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </Label>
    </div>
  );
}
