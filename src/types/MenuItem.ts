import type { MenuOption } from "./MenuOption"

export type MenuItem = {
  id: number
  categoryName: string
  description?: string
  imageUrl: string
  isAvailable: boolean
  menuId?: number
  menuName?: string
  name: string
  options?: MenuOption[]
  price: number
  stripeId?: string
}
