import type { Item } from "./Item"
import type { Option } from "./Option"

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
