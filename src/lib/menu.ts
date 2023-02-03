import type { MenuItem } from "../types/MenuItem"
import type { MenuCategory } from "../types/MenuCategory"
import type { Menu } from "../types/Menu"
import { PrismaClient } from "@prisma/client"

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
  price: number
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
      price: Number(itemProperties[2]) || 0,
      description: itemProperties[3] || "",
      isAvailable: itemProperties[4] === "TRUE",
      imageUrl: itemProperties[5] || "",
    }
  })
}

export async function seedItems(items: DbMenuItem[]) {
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

export async function seedDatabase() {
  await seedItems(getMenuItemsFromCsv(csvText))
}

export const dummyItems: Omit<MenuItem, "id">[] = [
  {
    categoryName: "Drinks",
    name: "Coca-Cola",
    imageUrl: "/cocacola.png",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    categoryName: "Drinks",
    name: "Diet Coke",
    imageUrl: "/dietcoke.jpeg",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    categoryName: "Drinks",
    name: "Sprite",
    imageUrl: "/sprite.png",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    categoryName: "Drinks",
    name: "Dr. Pepper",
    imageUrl: "/drpepper.png",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    categoryName: "Drinks",
    name: "Dasani Water",
    imageUrl: "/dasani.png",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    categoryName: "Drinks",
    name: "Powerade Fruit Punch",
    imageUrl: "/powerade.jpeg",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    categoryName: "Candy",
    name: "Snickers",
    description: "This is the best thing ever",
    imageUrl: "/snickers.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    categoryName: "Candy",
    name: "Milky Way",
    imageUrl: "/milkyway.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    categoryName: "Candy",
    name: "Twix",
    imageUrl: "/twix.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    categoryName: "Candy",
    name: "Reese's Cup",
    imageUrl: "/reeses.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    categoryName: "Chips",
    name: "Lays Classic",
    imageUrl: "/laysclassic.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    categoryName: "Chips",
    name: "Lays Barbecue",
    imageUrl: "/laysbbq.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    categoryName: "Chips",
    name: "Lays Salt and Vinegar",
    imageUrl: "/layssnv.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    categoryName: "Chips",
    name: "Lays Sour Cream and Onion",
    imageUrl: "/layssourcream.png",
    isAvailable: true,
    price: 2.75,
  },
]

export function getMenuFromApiMenuItems(items: MenuItem[]): Menu {
  const categories: { [key: string]: MenuItem[] } = {}
  const categoriesWithItems: MenuCategory[] = []
  const name = items[0]?.menuName as string
  const id = items[0]?.menuId as number

  const convertApiMenuItemToMenuItem = (item: MenuItem): MenuItem => ({
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
