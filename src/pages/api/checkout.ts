import { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "../../lib/stripe";

const success_url = `${process.env.NEXT_URL}/success`;
const cancel_url = `${process.env.NEXT_URL}/`;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { priceId } = req.body;

  if (!priceId) {
    return res.status(400).json({ error: "Price not found" });
  }

  const checkoutSessionStripe = await stripe.checkout.sessions.create({
    mode: "payment",
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
    success_url: success_url,
    cancel_url: cancel_url,
  });

  return res.status(201).json({ checkoutUrl: checkoutSessionStripe.url });
}
