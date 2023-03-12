import type { MenuItem } from "./MenuItemType"

export type MenuCategory = {
  name: string
  items: MenuItem[]
}

export type ApiMenuCategory = {
  id: number
  name: string
  menuId: number
}
