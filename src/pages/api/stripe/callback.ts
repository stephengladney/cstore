import type { NextApiRequest, NextApiResponse } from "next"
import { env } from "../../../env/server.mjs"
import Stripe from "stripe"

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY_TEST, {
  apiVersion: "2022-11-15",
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = await stripe.oauth.token({
    grant_type: "authorization_code",
    code: req.query.code as string,
  })
  console.log(req.body)
  res.send("done!")

  console.log("Snacky account:", req.query.state)
  console.log("Stripe account:", response)
}
