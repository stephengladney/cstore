import type { NextApiRequest, NextApiResponse } from "next"
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { name, email } = req.body as { name: string; email: string }
    try {
      await prisma.user.create({
        data: {
          name,
          email,
        },
      })
      res.send("USER ADDED")
    } catch ({ message }) {
      res.status(500).json(message as string)
    }
  } else {
    res.setHeader("Allow", "POST")
    res.status(405).end("Method Not Allowed")
  }
}
