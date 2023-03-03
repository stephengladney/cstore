import { number, z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { env } from "../../../env/server.mjs"
import SendGrid from "@sendgrid/mail"
import { getEmailBodyForOrder } from "../../../lib/order"

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
            categoryName: z.string(),
            quantity: z.number(),
          })
        ),
        subtotal: z.number(),
        tax: z.number(),
        total: z.number(),
        storeId: z.number(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        const { id } = await ctx.prisma.order.create({ data: input })
        return id

        // await SendGrid.send({
        //   to: "stephengladney@gmail.com",
        //   from: "cstoreonlineorders@gmail.com",
        //   subject: `Online Order #${id}`,
        //   html: getEmailBodyForOrder(input),
        // })
      } catch (e) {
        return e
      }
    }),
})
