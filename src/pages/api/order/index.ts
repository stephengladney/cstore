import { env } from "../../../env/server.mjs"
import type { NextApiRequest, NextApiResponse } from "next"
import Stripe from "stripe"
import * as DoorDashClient from "@doordash/sdk"
import { PrismaClient } from "@prisma/client"
import { CartItem } from "../../../types/Cart.js"

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, { apiVersion: "2022-11-15" })
const prisma = new PrismaClient()
const doordash = new DoorDashClient.DoorDashClient({
  developer_id: env.DOORDASH_DEVELOPER_ID,
  key_id: env.DOORDASH_KEY_ID,
  signing_secret: env.DOORDASH_SIGNING_SECRET,
})

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const {
      customerAddress,
      customerName,
      customerPhone,
      items,
      storeAddress,
      storeId,
      storePhone,
      subtotal,
      tax,
      total,
      type,
    } = req.body as {
      customerAddress: string
      customerName: string
      customerPhone: string
      items: CartItem[]
      storeAddress: string
      storeId: number
      storePhone: string
      subtotal: number
      tax: number
      total: number
      type: "pickup" | "delivery"
    }
    try {
      const isDelivery = type === "delivery"
      let delivery = null
      const order = await prisma.order.create({
        data: {
          customerName,
          customerPhone,
          items,
          subtotal,
          storeId,
          tax,
          total,
          type,
        },
      })
      if (isDelivery) {
        delivery = await prisma.delivery.create({
          data: { orderId: order.id },
        })
        console.log(customerName)
        const totalInCents = Math.floor(Number(Number(total).toFixed(2)) * 100)
        const doordashDelivery = await doordash.createDelivery({
          external_delivery_id: delivery.id,
          pickup_address: storeAddress,
          pickup_phone_number: storePhone,
          dropoff_address: customerAddress,
          dropoff_phone_number: customerPhone,
          order_value: totalInCents,
          dropoff_contact_given_name: customerName,
        })

        await prisma.delivery.update({
          where: { id: delivery.id },
          data: {
            status: doordashDelivery.data.delivery_status,
            pickupTime: doordashDelivery.data.pickup_time_estimated,
            dropoffTime: doordashDelivery.data.dropoff_time_estimated,
            trackingUrl: doordashDelivery.data.tracking_url,
            supportReference: doordashDelivery.data.support_reference,
          },
        })
      }

      res.status(200).json({ order, delivery })
    } catch (e) {
      console.log(e)
      res.status(500).end(e)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
