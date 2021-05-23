import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const {
    query: { data },
  } = router;
  /**
   * handle the submit form event
   * @param {any} e: error
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.input_name.value;
    const email = e.target.input_email.value;
    const result = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
      billing_details: {
        email: String(email),
        name: String(name),
      },
    });

    await handleStripePaymentMethod(result);
  };
  /**
   * handle the stripe payment method
   * @param {any} result
   */
  const handleStripePaymentMethod = async (result) => {
    if (result.error) {
      alert("some error occurred in payment method");
    }
    const response = await fetch("api/create_subscription", {
      method: "POST",
      mode: "same-origin",
      body: JSON.stringify({
        paymentMethodId: result.paymentMethod.id,
        paymentDetails: result.paymentMethod.billing_details,
      }),
    });
    const subscription = await response.json();

    handleSubscription(subscription);
  };

  /**
   *
   * @param {any hash map} message
   */
  const sendProductEmailToBuyer = async (message) => {
    await fetch("/api/send_email", {
      method: "POST",
      mode: "same-origin",
      body: JSON.stringify({
        from: message.from,
        to: message.to,
        subject: message.subject,
        message: message.message,
      }),
    }).then((res) => {
      console.log("response received");
      if (res.status === "200") {
        console.log("success response");
      } else {
        console.log("failed response");
      }
    });
  };

  /**
   * handle subscription
   * @param {any} subscription
   */
  const handleSubscription = (subscription) => {
    const latestInvoice = subscription;
    const paymentIntent = latestInvoice;
    console.log(subscription);
    console.log(typeof subscription.latest_invoice.customer_email);
    const emailMessage = {
      from: "help@carlvirtualshop.com",
      to: String(subscription.latest_invoice.customer_email),
      subject: "Here's your receipt from Carl's virtual shop",
      message: `Here is a confirmation email that Your ordered product: ${data} -- Carl's virtual shop`,
    };

    if (paymentIntent) {
      const { client_secret, status } = paymentIntent;
      if (status === "requires_action") {
        stripe.confirmCardPayment(client_secret).then((result) => {
          if (result.error) {
            console.log("confirmCardPayment error", result.error.message);
          } else {
            alert("You have successfully subscribed");
          }
        });
      } else {
        alert("You have successfully subscribed to " + data);
        sendProductEmailToBuyer(emailMessage);

        document.getElementById("checkout_form").reset();
      }
    } else {
      console.log("handleSubscription: ERROR no payment received");
    }
  };

  return (
    <>
      <Link href="/shop">
        <button>back to shop</button>
      </Link>
      {console.log("data from selected product", data)}
      <p>Enter your card details</p>
      <p>Price: $ 0.5 / month</p>
      <form id="checkout_form" onSubmit={(e) => handleSubmit(e)}>
        <label>Name on Card</label>
        <input placeholder="Name" id="input_name" required />
        <label>Your email</label>
        <input placeholder="Email" id="input_email" required />
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Subscribe
        </button>
        <p>Powered by Stripe</p>
      </form>
    </>
  );
};

export default CheckoutForm;
