import { useState } from "react";
import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { Trash2 } from "lucide-react";

interface ImagesSectionProps {
  imageUrls?: string[];
}

export default function ImagesSection({ imageUrls }: ImagesSectionProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext<HotelFormData>();

  function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const validImageTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    const images = Array.from(e.target.files || []);
    setSelectedImages([]);

    images.forEach((image) => {
      if (!validImageTypes.includes(image.type)) {
        toast.error("Only images are allowed");
        e.target.value = "";
        return;
      }
      setSelectedImages((prevImageFiles) => [...prevImageFiles, image]);
    });
  }

  console.log("Selected Image Files: ", selectedImages);

  const formImages = watch("imageFiles");
  console.log("Form images: ", formImages);

  return (
    <div>
      <h2 className="text-2xl mb-3">Images</h2>

      <div className="border rounded p-4 flex flex-col gap-4">
        {/* <div className="flex items-center">
          {imageUrls &&
            imageUrls.map((url) => (
              <div className="relative group w-full sm:w-44">
                <img
                  src={url}
                  alt="Hotel Image"
                  className="h-full object-cover"
                />
                <button className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white font-bold">
                  Delete
                </button>
              </div>
            ))}
        </div> */}

        <div className="flex flex-col sm:flex-row items-center gap-2">
          {selectedImages.map((image, index) => (
            <div
              key={index}
              className="relative group w-full sm:w-auto h-52 sm:h-44"
            >
              <img
                src={URL.createObjectURL(image)}
                alt={`Image ${index}`}
                className="h-full w-full object-cover object-center"
              />
              <button className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 text-white font-bold">
                <Trash2 size={26} />
              </button>
            </div>
          ))}
        </div>
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
          onChange={(e) => addImage(e)}
        />
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-xs">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}
