import type { MenuItem } from "./MenuItem"

export type MenuCategory = {
  name: string
  items: MenuItem[]
}

export type ApiMenuCategory = {
  id: number
  name: string
  menuId: number
}
