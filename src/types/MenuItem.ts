import type { MenuOption } from "./MenuOption"

export type MenuItem = {
  category: string
  description?: string
  imageUrl: string
  isAvailable: boolean
  name: string
  options?: MenuOption[]
  price: number
}

export type ApiMenuItem = {
  id: number
  itemName: string
  menuName: string
  categoryName: string
  itemPrice: number
}
