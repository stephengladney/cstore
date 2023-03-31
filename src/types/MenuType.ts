import type { MenuCategoryType } from "./MenuCategoryType"

export type MenuType = {
  id: number
  name: string
  categories?: MenuCategoryType[]
}
