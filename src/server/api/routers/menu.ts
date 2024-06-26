import { z } from "zod"

import { createTRPCRouter, publicProcedure } from "../trpc"
import type { MenuItemType } from "../../../types/MenuItemType"
import {
  getMenuFromApiMenuItems,
  createCategoriesFromCsvText,
  createItemsFromCsvText,
} from "../../../lib/menu"

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
      SELECT "Menu".id as "menuId","MenuItem".id as "id","MenuItem"."isAvailable" as "isAvailable","MenuItem".price as "price","MenuItem"."imageUrl" as "imageUrl","MenuItem".name as "name","MenuItem".price as "price","MenuItem"."description" as "description","Menu"."name" as "menuName","MenuCategory"."name" as "categoryName","MenuItem"."ageRequired" as "ageRequired"
FROM public."MenuCategory"
INNER JOIN public."Menu"
ON public."MenuCategory"."menuId" = public."Menu".id AND "MenuCategory"."menuId" = ${input.id}
INNER JOIN public."MenuItem"
ON public."MenuItem"."categoryId" = public."MenuCategory".id
ORDER BY "menuId","categoryId";
      `
      return getMenuFromApiMenuItems(rawItems as MenuItemType[])
    }),
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.menu.findMany()
  }),
  getAllByStoreId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const ids = await ctx.prisma.menu.findMany({
        where: { storeId: input.id },
      })
      return ids
    }),
  getByStoreId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(async ({ input, ctx }) => {
      const menu = await ctx.prisma.menu.findFirst({
        where: { storeId: input.id },
      })
      if (menu) {
        const rawItems = await ctx.prisma.$queryRaw`
        SELECT "Menu".id as "menuId","MenuItem".id as "id","MenuItem"."isAvailable" as "isAvailable","MenuItem".price as "price","MenuItem"."imageUrl" as "imageUrl","MenuItem".name as "name","MenuItem".price as "price","MenuItem"."description" as "description","Menu"."name" as "menuName","MenuCategory"."name" as "categoryName","MenuItem"."taxRate" as "taxRate","MenuItem"."createdAt" as "createdAt","MenuItem"."ageRequired" as "ageRequired"
  FROM public."MenuCategory"
  INNER JOIN public."Menu"
  ON public."MenuCategory"."menuId" = public."Menu".id AND "MenuCategory"."menuId" = ${menu.id}
  INNER JOIN public."MenuItem"
  ON public."MenuItem"."categoryId" = public."MenuCategory".id
  ORDER BY "menuId","categoryId","createdAt";
        `
        return getMenuFromApiMenuItems(rawItems as MenuItemType[])
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
  createFromCsv: publicProcedure
    .input(z.object({ menuId: z.number(), text: z.string() }))
    .mutation(({ input }) => {
      return createCategoriesFromCsvText(input.text, input.menuId)
    }),
  getAll: publicProcedure.query(async ({ ctx }) => {
    return ctx.prisma.menuCategory.findMany()
  }),
  getByMenuId: publicProcedure
    .input(z.object({ id: z.number() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.menuCategory.findMany({ where: { menuId: input.id } })
    }),
  getCategoryCountByStoreId: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      try {
        const categoryCount = (await ctx.prisma.$queryRaw`
        SELECT COUNT("Menu"."storeId") as "categories" from "MenuCategory"
INNER JOIN "Menu"
ON "MenuCategory"."menuId" = "Menu".id
INNER JOIN "Store"
ON "Menu"."storeId" = "Store".id
WHERE "Menu"."storeId" = ${input};
        `) as [{ categories: number }]
        return BigInt(categoryCount[0].categories).valueOf()
      } catch (e) {
        return 0
      }
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
  createFromCsv: publicProcedure
    .input(z.object({ menuId: z.number(), text: z.string() }))
    .mutation(async ({ input }) => {
      try {
        return createItemsFromCsvText(input.text, input.menuId)
      } catch (e) {
        //NO OP
      }
    }),
  deleteById: publicProcedure
    .input(z.number())
    .mutation(async ({ input, ctx }) => {
      await ctx.prisma.menuItem.delete({ where: { id: input } })
    }),
  getItemCountByStoreId: publicProcedure
    .input(z.number())
    .query(async ({ input, ctx }) => {
      try {
        const itemCount = (await ctx.prisma.$queryRaw`
        SELECT COUNT("Menu"."storeId") as "items" from "MenuItem"
INNER JOIN "MenuCategory"
ON "MenuItem"."categoryId" = "MenuCategory".id
INNER JOIN "Menu"
ON "MenuCategory"."menuId" = "Menu".id
INNER JOIN "Store"
ON "Menu"."storeId" = "Store".id
WHERE "Menu"."storeId" = ${input};
        `) as [{ items: number }]
        return BigInt(itemCount[0].items).valueOf()
      } catch (e) {
        return 0
      }
    }),
})
