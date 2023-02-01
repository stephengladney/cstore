import type { ApiMenuItem, MenuItem } from "../types/MenuItem"
import type { MenuCategory } from "../types/MenuCategory"
import type { Menu } from "../types/Menu"

function getCategoryIdFromName(name: string): number {
  const ids: { [key: string]: number } = {
    Drinks: 1,
    Candy: 2,
    Chips: 3,
  }
  return ids[name] || 0
}

export function getMenuItemsFromCsv(text: string) {
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

export const dummyItems: Omit<MenuItem, "id">[] = [
  {
    category: "Drinks",
    name: "Coca-Cola",
    imageUrl: "/cocacola.png",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    category: "Drinks",
    name: "Diet Coke",
    imageUrl: "/dietcoke.jpeg",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    category: "Drinks",
    name: "Sprite",
    imageUrl: "/sprite.png",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    category: "Drinks",
    name: "Dr. Pepper",
    imageUrl: "/drpepper.png",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    category: "Drinks",
    name: "Dasani Water",
    imageUrl: "/dasani.png",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    category: "Drinks",
    name: "Powerade Fruit Punch",
    imageUrl: "/powerade.jpeg",
    isAvailable: true,
    price: 3,
    description: "20oz bottle",
  },
  {
    category: "Candy",
    name: "Snickers",
    description: "This is the best thing ever",
    imageUrl: "/snickers.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    category: "Candy",
    name: "Milky Way",
    imageUrl: "/milkyway.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    category: "Candy",
    name: "Twix",
    imageUrl: "/twix.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    category: "Candy",
    name: "Reese's Cup",
    imageUrl: "/reeses.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    category: "Chips",
    name: "Lays Classic",
    imageUrl: "/laysclassic.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    category: "Chips",
    name: "Lays Barbecue",
    imageUrl: "/laysbbq.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    category: "Chips",
    name: "Lays Salt and Vinegar",
    imageUrl: "/layssnv.png",
    isAvailable: true,
    price: 2.75,
  },
  {
    category: "Chips",
    name: "Lays Sour Cream and Onion",
    imageUrl: "/layssourcream.png",
    isAvailable: true,
    price: 2.75,
  },
]

export function convertApiMenuItemToMenuItem(item: ApiMenuItem): MenuItem {
  return {
    id: item.id,
    name: item.itemName,
    category: item.categoryName,
    imageUrl: item.itemImageUrl,
    isAvailable: item.itemIsAvailable,
    price: item.itemPrice,
  }
}

export function getMenuFromApiMenuItems(items: ApiMenuItem[]): Menu {
  const categories: { [key: string]: MenuItem[] } = {}
  const categoriesWithItems: MenuCategory[] = []
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

  return { categories: categoriesWithItems }
}
