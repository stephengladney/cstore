import { createContext } from "react"
import type { Store } from "../types/Store"

export const storeContext = createContext({
  id: 0,
  name: "",
  address: "",
  slug: "",
  color: "",
  stripeAccountId: "",
} as Store)

export const StoreProvider = storeContext.Provider
