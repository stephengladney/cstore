import { createContext } from "react"
import type { ActionTypes, cart, PayloadTypes } from "../reducers/cartReducer"

type DispatchPayload = {
  type: keyof typeof ActionTypes
  payload: PayloadTypes
}

export const cartContext = createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  dispatch: (_: DispatchPayload) => {
    items: []
  },
  cart: {} as cart,
  openCartModal: () => undefined as void,
})

export const CartProvider = cartContext.Provider
