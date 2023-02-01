import type { Option } from "./Option"

export type Item = {
  category: string
  description?: string
  imageUrl: string
  isAvailable: boolean
  name: string
  options?: Option[]
  price: number
}

export type ApiMenuItem = {
  id: number
  itemName: string
  menuName: string
  categoryName: string
  itemPrice: number
}
