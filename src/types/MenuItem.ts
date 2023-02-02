import type { MenuOption } from "./MenuOption"

export type MenuItem = {
  id: number
  category: string
  description?: string
  imageUrl: string
  isAvailable: boolean
  name: string
  options?: MenuOption[]
  price: number
}

export type ApiMenuItem = {
  itemId: number
  isAvailable: boolean
  imageUrl: string
  itemName: string
  description: string
  menuName: string
  categoryName: string
  price: number
}
