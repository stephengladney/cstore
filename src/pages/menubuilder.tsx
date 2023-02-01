import { type ReactNode, useState } from "react"
import { type NextPage } from "next"
import { api } from "../utils/api"
import { parseMenu } from "../lib/menu"
import type { ApiMenu } from "../types/Menu"
import type { ApiMenuCategory } from "../types/MenuCategory"
import type { ApiMenuItem } from "../types/MenuItem"

function getUiMenu(json: { [key: string]: ApiMenuItem[] }): ReactNode {
  return Object.keys(json).map((category, i) => (
    <div key={i}>
      <h1 className="text-lg font-bold">{category}</h1>
      {json[category]?.map((item: ApiMenuItem) => (
        <div className="grid grid-cols-2" key={`menu-item-${item.id}`}>
          <div className="col-span-1 pl-4">{item.itemName}</div>
          <div className="col-span-1">${Number(item.itemPrice).toFixed(2)}</div>
        </div>
      ))}
    </div>
  ))
}

const MenuBuilder: NextPage = () => {
  const [menuName, setMenuName] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [categoryMenuId, setCategoryMenuId] = useState(0)
  const [itemCategoryId, setItemCategoryId] = useState(0)
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemDescription, setItemDescription] = useState("s")
  const { mutate: createMenu } = api.menu.create.useMutation()
  const { mutate: createCategory } = api.category.create.useMutation()
  const { mutate: createItem } = api.item.create.useMutation()
  const { data: menus } = api.menu.getAll.useQuery()
  const { data: categories } = api.category.getAll.useQuery()
  const { data: menu } = api.menu.get.useQuery({ id: 3 })

  return (
    <div className="grid grid-cols-2 p-8">
      <div>
        <h1 className="mt-4 mb-4 text-3xl font-bold">New Menu</h1>

        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Menu name"
            value={menuName}
          />
          <button
            className="col-start-2 w-60 bg-red-600 p-2 text-white"
            onClick={() => {
              createMenu({ name: menuName })
            }}
          >
            Create Menu
          </button>
        </div>
        <h1 className="mt-8 mb-4 text-3xl font-bold">New Category</h1>
        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Menu</span>
          <select
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setCategoryMenuId(Number(e.target.value))}
          >
            <option value={0}>Select a menu...</option>
            {menus?.map((menu: ApiMenu) => (
              <option key={`menu-dropdown-${menu.id}`} value={menu.id}>
                {menu.name}
              </option>
            ))}
          </select>
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            placeholder="Category name"
            onChange={(e) => setCategoryName(e.target.value)}
            value={categoryName}
          />
          <button
            className="col-start-2 w-60 bg-red-600 p-2 text-white"
            onClick={() => {
              createCategory({ menuId: categoryMenuId, name: categoryName })
            }}
          >
            Create Category
          </button>
        </div>
        <h1 className="mt-8 mb-4 text-3xl font-bold">New Item</h1>
        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Category</span>
          <select
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setItemCategoryId(Number(e.target.value))}
          >
            <option value={0}>Select a category...</option>
            {categories?.map((category: ApiMenuCategory) => (
              <option
                key={`category-dropdown-${category.id}`}
                value={category.id}
              >
                {category.name}
              </option>
            ))}
          </select>
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Item name"
            value={itemName}
          />
          <span className="mt-1">Price</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setItemPrice(e.target.value)}
            placeholder="0.00"
            value={itemPrice}
          />
          <span className="mt-1">Description</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setItemDescription(e.target.value)}
            placeholder="Something about the item"
            value={itemDescription}
          />
          <button
            className="col-start-2 w-60 bg-red-600 p-2 text-white"
            onClick={() => {
              createItem({
                categoryId: itemCategoryId,
                price: Number(itemPrice),
                name: itemName,
                description: itemDescription,
              })
            }}
          >
            Create Item
          </button>
        </div>
      </div>
      <div>
        <h1 className="mt-4 mb-4 text-3xl font-bold">
          {menu && menu[0]?.menuName}
        </h1>
        {menu && getUiMenu(parseMenu(menu))}
      </div>
    </div>
  )
}

export default MenuBuilder
