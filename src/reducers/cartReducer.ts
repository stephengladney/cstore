import type { CartItem } from "../types/Cart"
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
} as const

type RemoveItemPayload = number
type AddItemPayload = CartItem
type EditItemPayload = {
  index: number
  newItem: CartItem
}

export type PayloadTypes = RemoveItemPayload | AddItemPayload | EditItemPayload

interface CartAction {
  type: keyof typeof ActionTypes
  payload: PayloadTypes
}

export function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
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
  }
}
