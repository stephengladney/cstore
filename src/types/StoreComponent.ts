import type { Store } from "@prisma/client"
export type StoreComponent = Omit<
  Store,
  "createdAt" | "updatedAt" | "stripeAccessToken"
>
