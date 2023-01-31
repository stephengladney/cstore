import { createContext } from "react"
import { ActionTypes, CartState, PayloadTypes } from "../reducers/cartReducer"

export const cartContext = createContext({
  dispatch: ({
    type,
    payload,
  }: {
    type: keyof typeof ActionTypes
    payload: PayloadTypes
  }) => {
    items: []
  },
  cartState: {} as CartState,
})

export const CartProvider = cartContext.Provider
