import { createContext } from "react"
import type {
  ActionTypes,
  CartState,
  PayloadTypes,
} from "../reducers/cartReducer"

type DispatchPayload = {
  type: keyof typeof ActionTypes
  payload: PayloadTypes
}

export const cartContext = createContext({
  dispatch: (_: DispatchPayload) => {
    items: []
  },
  cartState: {} as CartState,
})

export const CartProvider = cartContext.Provider
