import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"
import type { MenuItem } from "../../../types/MenuItemType"
import { getMenuFromApiMenuItems } from "../../../lib/menu"

export const menuRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        storeId: z.number(),
      })
    )
    .mutation(({ input, ctx }) => {
      return ctx.prisma.menu.create({ data: input })
    }),
  get: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const rawItems = await ctx.prisma.$queryRaw`
      SELECT "Menu".id as "menuId","MenuItem".id as "id","MenuItem"."isAvailable" as "isAvailable","MenuItem".price as "price","MenuItem"."imageUrl" as "imageUrl","MenuItem".name as "name","MenuItem".price as "price","MenuItem"."description" as "description","Menu"."name" as "menuName","MenuCategory"."name" as "categoryName"
FROM public."MenuCategory"
INNER JOIN public."Menu"
ON public."MenuCategory"."menuId" = public."Menu".id AND "MenuCategory"."menuId" = ${input.id}
INNER JOIN public."MenuItem"
ON public."MenuItem"."categoryId" = public."MenuCategory".id
ORDER BY "menuId","categoryId";
      `
      return getMenuFromApiMenuItems(rawItems as MenuItem[])
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.menu.findMany()
  }),
  getByStoreId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const menu = await ctx.prisma.menu.findFirst({
        where: { storeId: input.id },
      })
      if (menu) {
        const rawItems = await ctx.prisma.$queryRaw`
        SELECT "Menu".id as "menuId","MenuItem".id as "id","MenuItem"."isAvailable" as "isAvailable","MenuItem".price as "price","MenuItem"."imageUrl" as "imageUrl","MenuItem".name as "name","MenuItem".price as "price","MenuItem"."description" as "description","Menu"."name" as "menuName","MenuCategory"."name" as "categoryName","MenuItem"."createdAt" as "createdAt"
  FROM public."MenuCategory"
  INNER JOIN public."Menu"
  ON public."MenuCategory"."menuId" = public."Menu".id AND "MenuCategory"."menuId" = ${menu.id}
  INNER JOIN public."MenuItem"
  ON public."MenuItem"."categoryId" = public."MenuCategory".id
  ORDER BY "menuId","categoryId","createdAt";
        `
        return getMenuFromApiMenuItems(rawItems as MenuItem[])
      } else return null
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
