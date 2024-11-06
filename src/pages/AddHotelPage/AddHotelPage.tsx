import { useAddMyHotelMutation } from "@/app/api/myHotelsApi";
import ManageHotelForm from "@/forms/ManageHotelForms/ManageHotelForm";
import { ApiErrorType } from "@/types";
import handleApiError from "@/utils/handleApiError";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function AddHotelPage() {
  const [addMyHotelMutation, { isLoading }] = useAddMyHotelMutation();
  const navigate = useNavigate();

  const submitFunction = ({ slug, body }: { slug: string; body: FormData }) => {
    // This console.log does nothing. It is for ts no-unused-vars rule!
    console.log(slug);
    addMyHotelMutation(body)
      .unwrap()
      .then(() => {
        toast.success("Hotel added successfully");
        navigate("/my-hotels");
      })
      .catch((err) => handleApiError(err as ApiErrorType));
  };
  return (
    <>
      <ManageHotelForm
        title="Add Hotel"
        isLoading={isLoading}
        slug=""
        submitFunction={submitFunction}
      />
    </>
  );
}
