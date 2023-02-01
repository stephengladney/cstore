import type { Item, Option } from "./Item"

export type Cart = {
  items: CartItem[]
}

export type CartItem = Item & {
  instructions?: string
  quantity: number
}

export type CartItemOption = Option & {
  quantity: number
}
