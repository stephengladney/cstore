import { number, z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { env } from "../../../env/server.mjs"
import SendGrid from "@sendgrid/mail"
// import { getEmailBodyForOrder } from "../../../lib/order"

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
        // SendGrid.send({ Not needed since built an orders screen
        //   to: "stephengladney@gmail.com",
        //   from: "cstoreonlineorders@gmail.com",
        //   subject: `Online Order #${id}`,
        //   html: getEmailBodyForOrder({ id, ...input }),
        // }).catch(() => {
        //   //NO-OP
        // })

        return id
      } catch (e) {
        return e
      }
    }),
  getByStoreId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const orders = await ctx.prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          storeId: input.id,
          createdAt: { gte: new Date(new Date().toDateString()) },
        },
      })
      return orders
    }),
  confirm: publicProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.order.update({
        where: { id: input },
        data: { status: "confirmed" },
      })
    }),
  markReady: publicProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.order.update({
        where: { id: input },
        data: { status: "ready" },
      })
    }),
})
