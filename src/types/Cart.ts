import type { MenuItem } from "./MenuItem"
import type { MenuOption } from "./MenuOption"

export type Cart = {
  items: CartItem[]
}

export type CartItem = Omit<
  MenuItem,
  "imageUrl" | "description" | "isAvailable"
> & {
  instructions?: string
  quantity: number
}

export type CartItemOption = MenuOption & {
  quantity: number
}
