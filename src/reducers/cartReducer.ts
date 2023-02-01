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
} as const

type RemoveItemPayload = number
type AddItemPayload = CartItem

export type PayloadTypes = RemoveItemPayload | AddItemPayload

interface CardAction {
  type: keyof typeof ActionTypes
  payload: PayloadTypes
}

export function reducer(state: CartState, action: CardAction): CartState {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      console.log("adding", action.payload)
      return {
        items: [...state.items, action.payload as CartItem],
      }

    case ActionTypes.REMOVE_ITEM:
      const newItems = [...state.items]
      newItems.splice(action.payload as number, 1)
      return { items: newItems }
  }
}
