import type { CartItem } from "../types/Cart"
import { setCookie } from "cookies-next"

export interface cart {
  items: CartItem[]
  slug: string
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

export function reducer(state: cart, action: CartAction): cart {
  switch (action.type) {
    case ActionTypes.ADD_ITEM:
      const newCartAfterAdd = {
        items: [...state.items, action.payload as CartItem],
        slug: state.slug,
      }
      setCookie(
        `swiftCart_${state.slug}`,
        JSON.stringify({ items: newCartAfterAdd.items })
      )
      return newCartAfterAdd

    case ActionTypes.REMOVE_ITEM:
      const newItems = [...state.items]
      newItems.splice(Number(action.payload), 1)
      setCookie(`swiftCart_${state.slug}`, JSON.stringify({ items: newItems }))
      return { items: newItems, slug: state.slug }

    case ActionTypes.EDIT_CART_ITEM:
      const newItemsEdit = [...state.items]
      const editItemPayload = action.payload as EditItemPayload
      newItemsEdit[editItemPayload.index] = editItemPayload.newItem
      setCookie(
        `swiftCart_${state.slug}`,
        JSON.stringify({ items: newItemsEdit })
      )
      return { items: newItemsEdit, slug: state.slug }

    case ActionTypes.RESTORE_CART:
      const itemsParsed = (
        JSON.parse(action.payload as RestoreCartPayload) as cart
      ).items
      return {
        items: itemsParsed,
        slug: state.slug,
      }
  }
}
