import type { Item } from "./Item"

export type Category = {
  name: string
  items: Item[]
}

export type ApiMenuCategory = {
  id: number
  name: string
  menuId: number
}
