import type { NextApiRequest, NextApiResponse } from "next"
import { env } from "../../../env/server.mjs"
import Stripe from "stripe"
import { PrismaClient } from "@prisma/client"

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, {
  apiVersion: "2022-11-15",
})

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await stripe.oauth.token({
      grant_type: "authorization_code",
      code: req.query.code as string,
    })
    await prisma.store.update({
      where: { id: Number(req.query.state) },
      data: {
        stripeAccountId: response.stripe_user_id,
        stripeAccessToken: response.access_token,
      },
    })
    res.send("Success!")
  } catch (e) {
    res.send("Error authorizing Stripe")
  }
}
