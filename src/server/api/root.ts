import { createTRPCRouter } from "./trpc"
import { categoryRouter, itemRouter, menuRouter } from "./routers/menu"
import { orderRouter } from "./routers/order"
import { storeRouter } from "./routers/store"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  menu: menuRouter,
  category: categoryRouter,
  item: itemRouter,
  order: orderRouter,
  store: storeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
