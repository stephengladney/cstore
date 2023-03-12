import { createContext } from "react"
import type { Store } from "@prisma/client"

export const storeContext = createContext({
  id: 0,
  name: "",
  address: "",
  slug: "",
  color: "",
  stripeAccountId: "",
} as Store)

export const StoreProvider = storeContext.Provider
