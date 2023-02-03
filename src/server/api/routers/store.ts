import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const storeRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        address: z.string(),
        slug: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.store.create({ data: input })
    }),
  get: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.store.findFirst({ where: input })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.store.findMany()
  }),
})
