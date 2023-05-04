import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    try {
      await prisma.order.update({
        where: { id: Number(req.query.orderId) },
        data: {
          ...(req.body as object),
        },
      })
      res.status(200).end()
    } catch (e) {
      console.log(e)
      res.status(503).end()
    }
  }
}
