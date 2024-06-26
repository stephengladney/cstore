// import { env } from "../../../env/server.mjs"
// import Stripe from "stripe"
import type { NextApiRequest, NextApiResponse } from "next"
// const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, { apiVersion: "2022-11-15" })

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    console.log("Received payload")
    console.log(req.body)
    res.status(200)
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
