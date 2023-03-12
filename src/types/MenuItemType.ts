import type { MenuItem } from "@prisma/client"

export type MenuItemType = Omit<MenuItem, "createdAt" | "updatedAt">
