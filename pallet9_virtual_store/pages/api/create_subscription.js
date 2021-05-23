import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async (req, res) => {
  if (req.method === "POST") {
    const { paymentId, paymentDetails } = JSON.parse(req.body);

    try {
      const new_customer = await stripe.customers.create({
        payment_method: paymentId,
        phone: "555-555-5555",
        email: paymentDetails.email,
        invoice_settings: {
          default_payment_method: paymentId,
        },
      });
      
      const new_subscription = await stripe.subscriptions.create({
        customer: new_customer.id,
        items: [{ plan: process.env.PLAN_ID }],
        expand: ["latest_invoice.payment_intent"],
      });
      res.status(200).json(new_subscription);
    } catch (err) {
      res.status(500).json({ statusCode: 500, message: err.message });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
  }
};
