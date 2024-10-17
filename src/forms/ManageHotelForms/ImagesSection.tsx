import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";

export default function ImagesSection() {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  function validateImage(e: React.ChangeEvent<HTMLInputElement>) {
    const validImageTypes = ["image/png", "image/jpg", "image/jpeg"];
    const images = Array.from(e.target.files || []);

    images.forEach((image) => {
      if (!validImageTypes.includes(image.type)) {
        toast.error("Only images are allowed");
        e.target.value = "";
      }
    });
  }

  return (
    <div>
      <h2 className="text-2xl mb-3">Images</h2>

      <div className="border rounded p-4 flex flex-col gap-4">
        <Input
          draggable
          multiple
          accept="image/*"
          placeholder="Select images of your hotel"
          type="file"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLength = imageFiles.length;

              if (totalLength === 0) {
                return "Please upload at least one image of your hotel";
              }

              if (totalLength > 5) {
                return "You may only select up to five images";
              }
              return true;
            },
          })}
          onChange={(e) => validateImage(e)}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500">{errors.imageFiles.message}</span>
      )}
    </div>
  );
}
