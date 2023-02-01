import { z } from "zod"

import { createTRPCRouter, publicProcedure, protectedProcedure } from "../trpc"
import type { ApiMenuItem } from "../../../types/Item"

export const menuRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.menu.create({ data: input })
    }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }): Promise<ApiMenuItem[]> => {
      return ctx.prisma.$queryRaw`
      SELECT "Menu".id as "menuId","MenuItem".name as "itemName","MenuItem".price as "itemPrice","Menu"."name" as "menuName","MenuCategory"."name" as "categoryName"
FROM public."MenuCategory"
INNER JOIN public."Menu"
ON public."MenuCategory"."menuId" = public."Menu".id AND "MenuCategory"."menuId" = ${input.id}
INNER JOIN public."MenuItem"
ON public."MenuItem"."categoryId" = public."MenuCategory".id
ORDER BY "menuId","categoryId";
      `
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
    .mutation(({ input, ctx }) => {
      return ctx.prisma.menuCategory.create({ data: input })
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.menuCategory.findMany()
  }),
})

export const itemRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        categoryId: z.number(),
        name: z.string(),
        price: z.number(),
        description: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      return ctx.prisma.menuItem.create({ data: input })
    }),
})
