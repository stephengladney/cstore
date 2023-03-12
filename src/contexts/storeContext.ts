import { createContext } from "react"
import type { StoreComponent } from "../types/StoreComponent"

export const storeContext = createContext({
  id: 0,
  name: "",
  address: "",
  slug: "",
  color: "",
  stripeAccountId: "",
} as StoreComponent)

export const StoreProvider = storeContext.Provider
