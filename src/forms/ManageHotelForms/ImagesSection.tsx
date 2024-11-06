import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

import { HotelFormData } from "./ManageHotelForm";
import toast from "react-hot-toast";

import { Input } from "@/components/ui/input";
import { ImagePlus, Trash2 } from "lucide-react";
import { Label } from "@radix-ui/react-label";

interface ImagesSectionProps {
  imageUrls?: string[];
}

export default function ImagesSection({ imageUrls }: ImagesSectionProps) {
  const [selectedImages, setSelectedImages] = useState<File[]>([]);

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<HotelFormData>();

  // Function to add an image
  function addImage(e: React.ChangeEvent<HTMLInputElement>) {
    const validImageTypes = [
      "image/png",
      "image/jpg",
      "image/jpeg",
      "image/webp",
    ];
    const images = Array.from(e.target.files || []);
    const imageFilesArray: File[] = Array.from(selectedImages);

    images.forEach((image) => {
      if (!validImageTypes.includes(image.type)) {
        toast.error("Only images are allowed");
        e.target.value = "";
        return;
      }

      imageFilesArray.push(image);
      setSelectedImages(imageFilesArray);

      const dataTransfer = new DataTransfer();
      imageFilesArray.forEach((image) => dataTransfer.items.add(image));

      setValue("imageFiles", dataTransfer.files);
    });
  }

  // Function to delete a selected image
  function deleteSelectedImage(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageFile: File
  ) {
    e.preventDefault();

    const imageFilesArray: File[] = Array.from(selectedImages);

    const filteredImageFilesArray: File[] = imageFilesArray.filter(
      (image) => image !== imageFile
    );

    const dataTransfer = new DataTransfer();
    filteredImageFilesArray.forEach((image) => dataTransfer.items.add(image));

    setSelectedImages(filteredImageFilesArray);
    setValue("imageFiles", dataTransfer.files);
  }

  return (
    <div>
      <h2 className="text-2xl mb-3">Images</h2>

      <div className="rounded p-4 flex flex-col gap-4">
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
              <button
                className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-70 opacity-0 group-hover:opacity-100 text-white font-bold"
                onClick={(e) => deleteSelectedImage(e, image)}
              >
                <Trash2 size={26} />
              </button>
            </div>
          ))}
        </div>
        <Label
          htmlFor="imageInput"
          className="border-2 p-2 cursor-pointer rounded-sm flex justify-center bg-slate-100"
        >
          <ImagePlus size={30} />
          <Input
            id="imageInput"
            draggable
            multiple
            accept="image/*"
            placeholder="Select images of your hotel"
            type="file"
            className="hidden"
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
        </Label>
      </div>
      {errors.imageFiles && (
        <span className="text-red-500 text-xs">
          {errors.imageFiles.message}
        </span>
      )}
    </div>
  );
}
