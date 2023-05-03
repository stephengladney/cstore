import { env } from "../../../../env/server.mjs"
import Stripe from "stripe"
import type { NextApiRequest, NextApiResponse } from "next"
const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, { apiVersion: "2022-11-15" })

const convertToCents = (amount: number) =>
  Math.floor(Number(Number(amount).toFixed(2)) * 100)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { amount, deliveryFee, stripeAccountId, tip } = req.body as {
      amount: number
      stripeAccountId: string
      deliveryFee: number
      tip: number
    }
    try {
      const totalInCents = convertToCents(amount)
      const deliveryFeeInCents = convertToCents(deliveryFee)
      const tipInCents = convertToCents(tip)
      const amountToMerchant = totalInCents - deliveryFeeInCents - tipInCents
      console.log(`AMOUNT TO MERCHANT: ${amountToMerchant}`)

      const paymentIntent = await stripe.paymentIntents.create({
        amount: totalInCents,
        automatic_payment_methods: { enabled: true },
        currency: "usd",
        on_behalf_of: stripeAccountId,
        transfer_data: {
          amount: amountToMerchant,
          destination: stripeAccountId,
        },
      })
      res.json({
        id: paymentIntent.id,
        clientSecret: paymentIntent.client_secret,
      })
    } catch (e) {
      const { message } = e as { message: string }
      res.status(500).end(message)
    }
  } else if (req.method === "PUT") {
    const { paymentIntentId, field, value } = req.body as {
      paymentIntentId: string
      field: string
      value: string | number
    }
    await stripe.paymentIntents.update(paymentIntentId, {
      [field]:
        field === "amount"
          ? Math.floor(Number(Number(value).toFixed(2)) * 100)
          : value,
    })
    res.status(200).end()
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
