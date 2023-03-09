import type { NextApiRequest, NextApiResponse } from "next"
import * as DoorDashClient from "@doordash/sdk"
import { env } from "../../../env/server.mjs"

const accessKey = {
  developer_id: env.DOORDASH_DEVELOPER_ID,
  key_id: env.DOORDASH_KEY_ID,
  signing_secret: env.DOORDASH_SIGNING_SECRET,
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const client = new DoorDashClient.DoorDashClient(accessKey)
    const {
      orderId,
      storeAddress,
      storePhone,
      customerAddress,
      customerPhone,
    } = req.body as {
      orderId: string
      storeAddress: string
      storePhone: string
      customerAddress: string
      customerPhone: string
    }
    try {
      const response = await client.createDelivery({
        external_delivery_id: orderId,
        pickup_address: storeAddress,
        pickup_phone_number: storePhone,
        dropoff_address: customerAddress,
        dropoff_phone_number: customerPhone,
      })
      res.send(response.data)
    } catch (e) {
      console.log(e)
      res.status(500).end(e)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
