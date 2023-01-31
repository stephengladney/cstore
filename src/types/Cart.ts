import type { Item, Option } from "./Item"

export type Cart = {
  items: CartItem[]
}

export type CartItem = Item & {
  quantity: number
}

export type CartItemOption = Option & {
  quantity: number
}
