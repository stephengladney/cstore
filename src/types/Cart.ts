import type { MenuItemType } from "./MenuItemType"
import type { MenuOption } from "./MenuOption"

export type Cart = {
  items: CartItem[]
}

export type CartItem = Omit<MenuItemType, "imageUrl" | "isAvailable"> & {
  imageUrl?: string | null
  instructions?: string
  quantity: number
}

export type CartItemOption = MenuOption & {
  quantity: number
}
