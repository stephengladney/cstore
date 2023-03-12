import { createTRPCRouter } from "./trpc"
import { categoryRouter, itemRouter, menuRouter } from "./routers/menu"
import { orderRouter } from "./routers/order"
import { storeRouter } from "./routers/store"
import { userRouter } from "./routers/user"
import { deliveryRouter } from "./routers/delivery"

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
  user: userRouter,
  delivery: deliveryRouter,
})

// export type definition of API
export type AppRouter = typeof appRouter
