import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PaymentIntentResponseType, UserType } from "@/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";

import { useForm } from "react-hook-form";

interface BookingFormType {
  fullName: string;
  email: string;
}

interface BookingFormProps {
  currentUser: UserType;
  paymentIntentData: PaymentIntentResponseType;
}

export default function BookingForm({
  currentUser,
  paymentIntentData,
}: BookingFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const { register } = useForm<BookingFormType>({
    defaultValues: {
      fullName: currentUser.name,
      email: currentUser.email,
    },
  });

  const onSubmit = async () => {
    if (!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(
      paymentIntentData.clientSecret,
      {
        payment_method: {
          card: elements.getElement(CardElement) as StripeCardElement,
        },
      }
    );

    if (result.paymentIntent?.status === "succeeded") {
      //
    }
  };

  return (
    <form
      className="space-y-4 rounded-sm border border-slate-300 p-4"
      onSubmit={onSubmit}
    >
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

      <div className="space-y-2">
        <h4 className="text-xl">Price summary</h4>

        <div className="bg-blue-200 p-4 rounded-sm space-y-0">
          <div className="font-semibold text-lg">
            Total cost: ${paymentIntentData.totalCost.toFixed(2)}
          </div>
          <span className="text-xs">Includes taxes and charges</span>
        </div>

        <div className="space-y-2">
          <h4 className="text-xl">Payment details</h4>
          <CardElement id="payment-element" className="border p-3 rounded-sm" />
        </div>
      </div>
    </form>
  );
}
