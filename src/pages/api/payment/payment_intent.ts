import { env } from "../../../env/server.mjs"
import Stripe from "stripe"
import type { NextApiRequest, NextApiResponse } from "next"
const isDevMode = process.env.NODE_ENV === "development"
const stripe = new Stripe(
  isDevMode ? env.STRIPE_PRIVATE_KEY_TEST : env.STRIPE_PRIVATE_KEY,
  { apiVersion: "2022-11-15" }
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { stripeAccountId } = req.body as {
      stripeAccountId: string
    }
    try {
      // Create Checkout Sessions from body params.
      const paymentIntent = await stripe.paymentIntents.create({
        amount: 1099,
        automatic_payment_methods: { enabled: true },
        currency: "usd",
        on_behalf_of: stripeAccountId,
      })
      res.send(paymentIntent.client_secret)
    } catch ({ message }) {
      res.status(500).json(message as string)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
