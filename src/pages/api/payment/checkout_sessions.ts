import { env } from "../../../env/server.mjs"
import Stripe from "stripe"
import type { NextApiRequest, NextApiResponse } from "next"
const isDevMode = env.NEXT_PUBLIC_DEV_MODE === "true"
const stripe = new Stripe(
  isDevMode ? env.STRIPE_PRIVATE_KEY_TEST : env.STRIPE_PRIVATE_KEY,
  { apiVersion: "2022-11-15" }
)
import type { CartItem } from "../../../types/Cart.js"

function getStripeItemPayload(itemsString: string) {
  return (JSON.parse(itemsString) as CartItem[]).map((item: CartItem) => ({
    price: item.stripeId as string,
    quantity: item.quantity,
  }))
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { items, storeSlug } = req.body as {
      items: string
      storeSlug: string
    }
    try {
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: getStripeItemPayload(items),
        mode: "payment",
        success_url: `${
          req.headers.origin as string
        }/${storeSlug}?success=true`,
        cancel_url: `${req.headers.origin as string}/${storeSlug}`,
        automatic_tax: { enabled: true },
      })
      res.redirect(303, session.url as string)
    } catch ({ message }) {
      res.status(500).json(message as string)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
