import type { Store } from "@prisma/client"
export type StoreType = Omit<
  Store,
  "createdAt" | "updatedAt" | "stripeAccessToken"
>
