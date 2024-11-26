import { loadStripe } from "@stripe/stripe-js";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const STRIPE_PUB_KEY = import.meta.env.VITE_STRIPE_PUB_KEY || "";

export const stripePromise = loadStripe(STRIPE_PUB_KEY);
