import { z } from "zod"

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc"

export const menuRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.menu.create({ data: input })
      } catch (e) {
        return e
      }
    }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.menu.findFirst({ where: input })
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.menu.findMany()
  }),
})

export const categoryRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        menuId: z.number(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.menuCategory.create({ data: input })
      } catch (e) {
        return e
      }
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.menuCategory.findMany()
  }),
})

export const itemRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        categoryId: z.number(),
        menuId: z.number(),
        name: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await ctx.prisma.menuItem.create({ data: input })
      } catch (e) {
        return e
      }
    }),
})
