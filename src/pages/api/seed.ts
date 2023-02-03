import type { NextApiRequest, NextApiResponse } from "next"
import { seedDatabase } from "../../lib/menu"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    try {
      await seedDatabase()
      res.send("SEED COMPLETED")
    } catch ({ message }) {
      res.status(500).json(message as string)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
