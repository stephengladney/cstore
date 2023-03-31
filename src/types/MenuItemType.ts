import type { MenuItem } from "@prisma/client"

export type MenuItemType = Omit<
  MenuItem,
  "price" | "createdAt" | "updatedAt" | "categoryId"
> & {
  categoryName: string
  categoryId?: number
  menuId?: number
  menuName?: string
  price: number
}
