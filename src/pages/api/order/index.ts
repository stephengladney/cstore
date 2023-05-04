import { env } from "../../../env/server.mjs"
import type { NextApiRequest, NextApiResponse } from "next"
import * as DoorDashClient from "@doordash/sdk"
import { Prisma, PrismaClient } from "@prisma/client"
import type { CartItem } from "../../../types/Cart.js"

const prisma = new PrismaClient()
const doordash = new DoorDashClient.DoorDashClient({
  developer_id: env.DOORDASH_DEVELOPER_ID,
  key_id: env.DOORDASH_KEY_ID,
  signing_secret: env.DOORDASH_SIGNING_SECRET,
})

const convertToCents = (n: number | string) => Math.floor(Number(n) * 100)

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: "desc" },
      where: {
        storeId: 1,
        createdAt: { gte: new Date(new Date().toDateString()) },
      },
    })
    return res.send(orders)
  }
  if (req.method === "POST") {
    const {
      customerAddress,
      customerName,
      customerPhone,
      items,
      deliveryInstructions,
      storeAddress,
      storeId,
      storeName,
      storePhone,
      subtotal,
      tax,
      tip,
      total,
      type,
    } = req.body as {
      customerAddress: string
      customerName: string
      customerPhone: string
      items: CartItem[]
      deliveryInstructions: string
      storeAddress: string
      storeId: number
      storeName: string
      storePhone: string
      subtotal: number
      tax: number
      tip: string
      total: number
      type: "pickup" | "delivery"
    }
    try {
      const isDelivery = type === "delivery"
      let order = null
      let delivery = null

      if (isDelivery) {
        delivery = await prisma.delivery.create({ data: {} })
        const doordashDelivery = await doordash.createDelivery({
          external_delivery_id: delivery.id,
          pickup_address: storeAddress,
          pickup_phone_number: storePhone,
          pickup_business_name: storeName,
          dropoff_address: customerAddress,
          dropoff_instructions: deliveryInstructions,
          dropoff_phone_number: customerPhone,
          order_value: convertToCents(total),
          dropoff_contact_given_name: customerName,
          tip: convertToCents(tip),
        })

        order = await prisma.order.create({
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

        await prisma.delivery.update({
          where: { id: delivery.id },
          data: {
            orderId: order.id,
            status: doordashDelivery.data.delivery_status,
            pickupTime: doordashDelivery.data.pickup_time_estimated,
            dropoffTime: doordashDelivery.data.dropoff_time_estimated,
            trackingUrl: doordashDelivery.data.tracking_url,
            supportReference: doordashDelivery.data.support_reference,
          },
        })
      } else {
        order = await prisma.order.create({
          data: {
            customerName,
            customerPhone,
            items,
            subtotal,
            storeId,
            tax: new Prisma.Decimal(tax),
            total,
            type,
          },
        })
      }

      res.status(200).json({ order, delivery })
    } catch (e) {
      console.log(e)
      res.status(405).json(e)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
