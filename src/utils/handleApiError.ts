import { ApiErrorType } from "@/types";
import toast from "react-hot-toast";

export default function handleApiError(error: ApiErrorType) {
  if (error.name && error.message) {
    return toast.error("An error occured");
  }

  if (error.status && error.data) {
    return toast.error(error.data.message ?? "An error occured");
  }
}
