import type { MenuItemType } from "./MenuItemType"

export type MenuCategory = {
  name: string
  items: MenuItemType[]
}

export type ApiMenuCategory = {
  id: number
  name: string
  menuId: number
}
