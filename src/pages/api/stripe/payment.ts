import type { NextApiRequest, NextApiResponse } from "next"
import { env } from "../../../env/server.mjs"
import Stripe from "stripe"

const isDevMode = process.env.NODE_ENV === "development"

const stripe = new Stripe(
  isDevMode ? env.STRIPE_PRIVATE_KEY_TEST : env.STRIPE_PRIVATE_KEY,
  {
    apiVersion: "2022-11-15",
  }
)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const session = await stripe.checkout.sessions.create(
      {
        mode: "payment",
        automatic_tax: { enabled: true },
        line_items: [{ price: "price_1Mho50IsuoejKTrGXg2ksxHj", quantity: 1 }],
        payment_intent_data: { application_fee_amount: 0 },
        success_url: "http://localhost:3000/stephen",
        cancel_url: "http://localhost:3000/stephen",
      },
      { stripeAccount: "acct_1MhkKQIsuoejKTrG" }
    )
    res.send(session.url)
    console.log(session)
  } catch (e) {
    res.send("Error!")
    console.log(e)
  }
}
