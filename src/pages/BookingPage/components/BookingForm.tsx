import { useBookHotelMutation } from "@/app/api/hotelsApi";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  BookHotelRequestBodyType,
  PaymentIntentResponseType,
  UserType,
} from "@/types";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useMemo, useState } from "react";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

interface BookingFormType {
  fullName: string;
  email: string;
}

interface BookingFormProps {
  currentUser: UserType;
  paymentIntentData: PaymentIntentResponseType;
  slug: string;
  checkinDate: string;
  checkoutDate: string;
  adultCount: number;
  childrenCount: number;
}

export default function BookingForm({
  currentUser,
  paymentIntentData,
  slug,
  checkinDate,
  checkoutDate,
  adultCount,
  childrenCount,
}: BookingFormProps) {
  const stripe = useStripe();
  const elements = useElements();

  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [paymentError, setPaymentError] = useState<string>("");
  const [disableButton, setDisableButton] = useState<boolean>(false);

  // Trigger function to create hotel booking
  const [bookHotelMutationTrigger, { isLoading }] = useBookHotelMutation();

  const { register } = useForm<BookingFormType>({
    defaultValues: {
      fullName: currentUser.name,
      email: currentUser.email,
    },
  });

  // Function that runs when payment request is submitted
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessing(true);

    try {
      const result = await stripe.confirmCardPayment(
        paymentIntentData.clientSecret,
        {
          payment_method: {
            card: elements.getElement(CardElement) as StripeCardElement,
          },
        }
      );

      if (result.error) {
        setPaymentError(
          result.error.message ?? "Payment failed. An error occured."
        );
        setIsProcessing(false);
      } else if (result.paymentIntent.status === "succeeded") {
        toast.success("Payment successful");
        setIsProcessing(false);

        const bookingInfo: BookHotelRequestBodyType = {
          adultCount,
          childrenCount,
          checkinDate,
          checkoutDate,
          paymentIntentId: paymentIntentData.paymentIntentId,
          slug,
          totalPrice: paymentIntentData.totalCost,
        };

        bookHotelMutationTrigger(bookingInfo)
          .then(() => {
            setDisableButton(true);
            navigate("/my-bookings");
            toast.success("Hotel booked");
          })
          .catch((err) => {
            console.log("Error in booking hotel: ", err);
            toast.error(
              err.message ?? "An error occured while booking the hotel"
            );
          });
      }
    } catch (error) {
      //
      console.log("Error while paying/booking: ", error);
      toast.error("An error occured");
      setIsProcessing(false);
    }
  };

  // Label of the payment button
  const paymentButtonLabel = useMemo(() => {
    if (isProcessing) return "Processing payment...";

    if (isLoading) {
      return "Booking hotel room...";
    }

    return "Book";
  }, [isProcessing, isLoading]);

  return (
    <form
      className="space-y-4 rounded-sm border border-slate-300 p-4"
      onSubmit={(e) => onSubmit(e)}
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

      <Button
        type="submit"
        variant="primary"
        disabled={isProcessing || isLoading || disableButton}
      >
        {paymentButtonLabel}
      </Button>

      {!isProcessing && !isLoading && paymentError && (
        <div className="bg-rose-200 text-red-500 font-bold p-4">
          {paymentError}
        </div>
      )}
    </form>
  );
}
