import type { MenuCategory } from "./MenuCategory"

export type ApiMenu = {
  id: number
  name: string
}

export type Menu = {
  categories: MenuCategory[]
}
