import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function DetailsSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl font-bold text-center">Add Hotel</h1>

      <label htmlFor="name" className="text-gray-700 text-sm font-bold flex-1">
        Name
        <input
          type="text"
          className="border rounded w-full p-2 font-normal"
          id="name"
          {...register("name", { required: "This field is required" })}
        />
        {errors.name && (
          <span className="text-red-500">{errors.name.message}</span>
        )}
      </label>

      {/* City and Country */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* COUNTRY FIELD */}
        <label
          htmlFor="country"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          Country
          <input
            type="text"
            className="border rounded w-full p-2 font-normal"
            id="country"
            {...register("country", { required: "This field is required" })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </label>

        {/* CITY FIELD */}
        <label
          htmlFor="city"
          className="text-gray-700 text-sm font-bold flex-1"
        >
          City
          <input
            type="text"
            className="border rounded w-full p-2 font-normal"
            id="city"
            {...register("city", { required: "This field is required" })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </label>
      </div>

      {/* DESCRIPTION */}
      <label
        htmlFor="description"
        className="text-gray-700 text-sm font-bold flex-1"
      >
        Description
        <textarea
          rows={7}
          className="border rounded w-full p-2 font-normal"
          id="description"
          {...register("description", { required: "This field is required" })}
        ></textarea>
        {errors.description && (
          <span className="text-red-500">{errors.description.message}</span>
        )}
      </label>

      {/* PRICE */}
      <label htmlFor="price" className="text-gray-700 text-sm font-bold flex-1">
        Price per night
        <input
          type="number"
          min={1}
          className="border rounded w-full p-2 font-normal"
          id="price"
          {...register("price", { required: "This field is required" })}
        />
        {errors.price && (
          <span className="text-red-500">{errors.price.message}</span>
        )}
      </label>

      {/* STAR RATING */}
      <label htmlFor="price" className="text-gray-700 text-sm font-bold flex-1">
        Star Rating
        <Select
          {...register("starRating", { required: "This field is required" })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select a star rating" />
          </SelectTrigger>
          <SelectContent className="">
            {[1, 2, 3, 4, 5].map((num) => (
              <SelectItem value={`${num}`}>{num}</SelectItem>
            ))}
            {/* <SelectItem value="1">1</SelectItem>
            <SelectItem value="2">2</SelectItem>
            <SelectItem value="3">3</SelectItem>
            <SelectItem value="4">4</SelectItem>
            <SelectItem value="5">5</SelectItem> */}
          </SelectContent>
        </Select>
        {errors.starRating && (
          <span className="text-red-500">{errors.starRating.message}</span>
        )}
      </label>
    </div>
  );
}
