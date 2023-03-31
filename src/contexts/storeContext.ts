import { createContext } from "react"
import type { StoreType } from "../types/StoreType"

export const storeContext = createContext({
  id: 0,
  name: "",
  address: "",
  slug: "",
  color: "",
  stripeAccountId: "",
} as StoreType)

export const StoreProvider = storeContext.Provider
