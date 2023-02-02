import type { MenuCategory } from "./MenuCategory"

export type ApiMenu = {
  id: number
  name: string
}

export type Menu = {
  name: string
  categories: MenuCategory[]
}
