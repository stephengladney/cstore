import type { MenuCategory } from "./MenuCategory"

export type Menu = {
  id: number
  name: string
  categories?: MenuCategory[]
}
