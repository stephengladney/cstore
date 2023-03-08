import { env } from "../../../../env/server.mjs"
import Stripe from "stripe"
import type { NextApiRequest, NextApiResponse } from "next"
const isDevMode = process.env.NODE_ENV === "development"
const stripe = new Stripe(
  isDevMode ? env.STRIPE_PRIVATE_KEY_TEST : env.STRIPE_PRIVATE_KEY,
  { apiVersion: "2022-11-15" }
)

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.redirect("/stephen?success=true")
}
