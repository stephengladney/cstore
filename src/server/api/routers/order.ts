import { number, z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { env } from "../../../env/server.mjs"
import SendGrid from "@sendgrid/mail"
import { getEmailBodyFromCart } from "../../../lib/order"

SendGrid.setApiKey(env.SENDGRID_API_KEY)

export const orderRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        customerName: z.string(),
        customerPhone: z.string(),
        items: z.array(
          z.object({
            id: number(),
            name: z.string(),
            price: z.number(),
            category: z.string(),
            quantity: z.number(),
          })
        ),
        subtotal: z.number(),
        tax: z.number(),
        total: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await SendGrid.send({
          to: "stephengladney@gmail.com",
          from: "cstoreonlineorders@gmail.com",
          subject: `Online Order #${1}`,
          html: getEmailBodyFromCart(input),
        })
        const response = ctx.prisma.order.create({ data: input })
        return response
      } catch (e) {
        return e
      }
    }),
})
