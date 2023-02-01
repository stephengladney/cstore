import type { ApiMenuItem, MenuItem } from "../types/MenuItem"
import type { MenuCategory } from "../types/MenuCategory"

export const dummyItems: MenuItem[] = [
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

export function getMenu(items: MenuItem[]): MenuCategory[] {
  const categories: { [key: string]: MenuItem[] } = {}
  const result: MenuCategory[] = []
  items.forEach((item) => {
    if (categories[item.category]) {
      categories[item.category]!.push(item)
    } else {
      categories[item.category] = [item]
    }
  })

  Object.keys(categories).forEach((category) => {
    result.push({ name: category, items: categories[category]! })
  })

  return result
}
export function parseMenu(json: ApiMenuItem[]) {
  const result: { [key: string]: ApiMenuItem[] } = {}
  json.forEach((item: ApiMenuItem) => {
    if (result[item.categoryName]) {
      result[item.categoryName]!.push(item)
    } else {
      result[item.categoryName] = [item]
    }
  })
  return result
}
