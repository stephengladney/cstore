import type { CartItem } from "../types/Cart"
import { setCookie } from "cookies-next"
export const initialCartState: CartState = { items: [] } as {
  items: CartItem[]
}

export interface CartState {
  items: CartItem[]
}

export const ActionTypes = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  EDIT_CART_ITEM: "EDIT_CART_ITEM",
  RESTORE_CART: "RESTORE_CART",
} as const

type RemoveItemPayload = number
type AddItemPayload = CartItem
type EditItemPayload = {
  index: number
  newItem: CartItem
}
type RestoreCartPayload = string

export type PayloadTypes =
  | RemoveItemPayload
  | AddItemPayload
  | EditItemPayload
  | RestoreCartPayload

interface CartAction {
  type: keyof typeof ActionTypes
  payload: PayloadTypes
}

export function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      setCookie(
        "swiftCart",
        JSON.stringify({ items: [...state.items, action.payload as CartItem] })
      )
      return {
        items: [...state.items, action.payload as CartItem],
      }

    case ActionTypes.REMOVE_ITEM:
      const newItems = [...state.items]
      newItems.splice(Number(action.payload), 1)
      return { items: newItems }
    case ActionTypes.EDIT_CART_ITEM:
      const newItemsForEdit = [...state.items]
      const editItemPayload = action.payload as EditItemPayload
      newItemsForEdit[editItemPayload.index] = editItemPayload.newItem
      return { items: newItemsForEdit }
    case ActionTypes.RESTORE_CART:
      const itemsParsed = (
        JSON.parse(action.payload as RestoreCartPayload) as CartState
      ).items
      return {
        items: itemsParsed,
      }
  }
}
