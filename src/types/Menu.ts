import type { MenuCategoryType } from "./MenuCategory"

export type Menu = {
  id: number
  name: string
  categories?: MenuCategoryType[]
}
