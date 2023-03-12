import type { MenuItemType } from "../types/MenuItemType"
import type { MenuCategory } from "../types/MenuCategory"
import type { Menu } from "../types/Menu"
import { Prisma, PrismaClient } from "@prisma/client"
import type { Decimal } from "@prisma/client/runtime"

const prisma = new PrismaClient()

function getCategoryIdFromName(name: string): number {
  const ids: { [key: string]: number } = {
    Drinks: 1,
    Candy: 2,
    Chips: 3,
  }
  return ids[name] || 0
}

type DbMenuItem = {
  name: string
  categoryId: number
  price: Decimal
  description: string
  isAvailable: boolean
  imageUrl: string
}

const csvText = `Coke,Drinks,2.00,,TRUE,a
Diet Coke,Drinks,2.00,,TRUE,b
Sprite,Drinks,2.00,,TRUE,c
Lays,Chips,1.52,,TRUE,d
Fritos,Chips,1.50,,FALSE,e`

export function getMenuItemsFromCsv(text: string): DbMenuItem[] {
  const items: string[] = text.split("\n")
  return items.map((item) => {
    const itemProperties = item.split(",")
    return {
      name: itemProperties[0] || "Untitled",
      categoryId: getCategoryIdFromName(itemProperties[1] as string),
      price: new Prisma.Decimal(itemProperties[2]!) || 0,
      description: itemProperties[3] || "",
      isAvailable: itemProperties[4] === "TRUE",
      imageUrl: itemProperties[5] || "",
    }
  })
}

export async function createItemsInDatabase(items: DbMenuItem[]) {
  for (let i = 0; i < items.length; i++) {
    try {
      await prisma.menuItem.create({ data: items[i]! })
    } catch (e) {
      console.log("Unable to add item!", items[i])
      break
    }
  }
  await prisma.$disconnect()
}

export async function csvToDatabase() {
  await createItemsInDatabase(getMenuItemsFromCsv(csvText))
}

export function getMenuFromApiMenuItems(items: MenuItemType[]): Menu {
  const categories: { [key: string]: MenuItemType[] } = {}
  const categoriesWithItems: MenuCategory[] = []
  const name = items[0]?.menuName as string
  const id = items[0]?.menuId as number

  const convertApiMenuItemToMenuItem = (item: MenuItemType): MenuItemType => ({
    id: item.id,
    name: item.name,
    description: item.description,
    categoryName: item.categoryName,
    imageUrl: item.imageUrl,
    isAvailable: item.isAvailable,
    price: item.price,
  })

  items.forEach((item) => {
    if (categories[item.categoryName]) {
      categories[item.categoryName]!.push(convertApiMenuItemToMenuItem(item))
    } else {
      categories[item.categoryName] = [convertApiMenuItemToMenuItem(item)]
    }
  })

  Object.keys(categories).forEach((category) => {
    categoriesWithItems.push({ name: category, items: categories[category]! })
  })

  return { id, name, categories: categoriesWithItems }
}
