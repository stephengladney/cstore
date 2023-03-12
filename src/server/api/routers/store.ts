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
  getBySlug: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.store.findFirst({ where: input })
    }),
  getById: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.store.findFirst({ where: input })
    }),
  getByIds: publicProcedure
    .input(z.object({ ids: z.array(z.number()) }))
    .query(({ input, ctx }) => {
      return ctx.prisma.store.findMany({
        where: { OR: input.ids.map((id) => ({ id })) },
      })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.store.findMany()
  }),
})
