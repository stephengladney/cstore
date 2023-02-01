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
  id: number
  itemIsAvailable: boolean
  itemImageUrl: string
  itemName: string
  menuName: string
  categoryName: string
  itemPrice: number
}
