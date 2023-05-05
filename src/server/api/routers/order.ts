import { number, z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"
// import { env } from "../../../env/server.mjs"
// import SendGrid from "@sendgrid/mail"
// import { getEmailBodyForOrder } from "../../../lib/order"

// SendGrid.setApiKey(env.SENDGRID_API_KEY)

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
  getOrdersTodayByStoreId: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      let date: Date | number = new Date()
      if (new Date().getHours() <= 4) {
        date = Date.now() - 1000 * 60 * 60 * 5
        date = new Date(date)
      }
      const orders = await ctx.prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          storeId: input,
          createdAt: { gte: new Date(date.toDateString()) },
        },
      })
      return orders
    }),
  getOrdersTotalsForToday: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      let date: Date | number = new Date()
      if (new Date().getHours() <= 4) {
        date = Date.now() - 1000 * 60 * 60 * 5
        date = new Date(date)
      }
      const orders = await ctx.prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          storeId: input,
          createdAt: { gte: new Date(date.toDateString()) },
        },
      })
      const totals = orders.reduce(
        (acc, order) => {
          return {
            total: acc.total + Number(order.total),
            subtotal: acc.subtotal + Number(order.subtotal),
            tax: acc.tax + Number(order.tax),
          }
        },
        { subtotal: 0, tax: 0, total: 0 }
      )
      return totals
    }),
  getOrdersTotalsForThisMonth: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      const _date = new Date()
      _date.setHours(0)
      _date.setMinutes(0)
      _date.setSeconds(1)
      _date.setDate(1)
      const orders = await ctx.prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        where: {
          storeId: input,
          createdAt: { gte: new Date(_date.toDateString()) },
        },
      })
      const totals = orders.reduce(
        (acc, order) => {
          return {
            total: acc.total + Number(order.total),
            subtotal: acc.subtotal + Number(order.subtotal),
            tax: acc.tax + Number(order.tax),
          }
        },
        { subtotal: 0, tax: 0, total: 0 }
      )
      return totals
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
