import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const deliveryRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.delivery.findFirst({ where: input })
    }),
  getByOrderId: publicProcedure
    .input(z.object({ orderId: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.delivery.findFirst({ where: input })
    }),
})
