import { env } from "../../../env/server.mjs"
import type { NextApiRequest, NextApiResponse } from "next"

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.headers)
  if (req.method === "POST") {
    try {
      res.redirect(
        303,
        `https://connect.stripe.com/oauth/authorize?response_type=code&client_id=${
          env.STRIPE_CLIENT_ID
          // State includes Store ID so the callback updates the stripe ID in the database
        }&scope=read_write&redirect_uri=${req.headers
          .origin!}/api/stripe/callback&state=${req.query.id as string}`
      )
    } catch ({ message }) {
      res.status(500).json(message as string)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
