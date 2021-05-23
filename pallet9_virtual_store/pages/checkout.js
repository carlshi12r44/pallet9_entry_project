import React from "react";
import Stripe from "stripe";
import {API_URL} from "../utils/urls";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../components/CheckoutForm";
const checkout = ({checkoutProduct}) => {
  const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);
  
  return (
    <>
    <Elements stripe={stripePromise}>   
      <CheckoutForm />
    </Elements>
    </>
  );
};

export default checkout;
