import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserType } from "@/types";

import { useForm } from "react-hook-form";

interface BookingFormType {
  fullName: string;
  email: string;
}

interface BookingFormProps {
  currentUser: UserType;
}

export default function BookingForm({ currentUser }: BookingFormProps) {
  const { register } = useForm<BookingFormType>({
    defaultValues: {
      fullName: currentUser.name,
      email: currentUser.email,
    },
  });

  return (
    <form className="space-y-4 rounded-sm border border-slate-300 p-4">
      <h3 className="text-3xl font-bold">Confirm your details</h3>

      {/* Full name */}
      <Label
        htmlFor="fullName"
        className="text-gray-700 text-sm font-bold px-1"
      >
        <span>Full name</span>
        <Input
          type="text"
          id="fullName"
          {...register("fullName")}
          className="rounded-sm bg-gray-200 text-slate-900"
          readOnly
          disabled
        />
      </Label>

      {/* Email */}
      <Label htmlFor="email" className="text-gray-700 text-sm font-bold px-1">
        <span>Email</span>
        <Input
          type="email"
          id="emial"
          {...register("email")}
          className="rounded-sm bg-gray-200 text-slate-900"
          readOnly
          disabled
        />
      </Label>
    </form>
  );
}
