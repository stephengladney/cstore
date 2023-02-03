import { createTRPCRouter } from "./trpc"
import { exampleRouter } from "./routers/example"
import { categoryRouter, itemRouter, menuRouter } from "./routers/menu"
import { orderRouter } from "./routers/order"
import { storeRouter } from "./routers/store"

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  menu: menuRouter,
  category: categoryRouter,
  item: itemRouter,
  order: orderRouter,
  store: storeRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
