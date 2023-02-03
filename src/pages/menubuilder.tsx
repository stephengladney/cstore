import { useState } from "react"
import { type NextPage } from "next"
import { api } from "../utils/api"
import type { ApiMenu, Menu } from "../types/Menu"
import type { ApiMenuCategory } from "../types/MenuCategory"
import type { MenuItem } from "../types/MenuItem"

function getUiMenu(menu: Menu) {
  const { categories } = menu
  return categories.map((category, i) => (
    <div key={i} className="mb-4 max-w-xs">
      <h1 className="text-sm font-bold">{category.name}</h1>
      {category.items?.map((item: MenuItem) => (
        <div
          className="m-1 grid cursor-pointer grid-cols-2 border border-solid p-2"
          key={`menu-item-${item.id}`}
        >
          <div className="col-span-1 flex flex-col justify-center p-1 text-sm">
            {item.name}
          </div>
          <div className="col-span-1 pt-1 text-right text-sm">
            $ {Number(item.price).toFixed(2)}
            <button className="ml-4 rounded-full bg-red-600 py-1 px-2 text-xs text-white hover:bg-red-700">
              X
            </button>
          </div>
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
  const [storeName, setStoreName] = useState("")
  const [storeAddress, setStoreAddress] = useState("")
  const [storeSlug, setStoreSlug] = useState("")
  const { mutate: createMenu } = api.menu.create.useMutation()
  const { mutate: createCategory } = api.category.create.useMutation()
  const { mutate: createItem } = api.item.create.useMutation()
  const { mutate: createStore } = api.store.create.useMutation()
  const { data: menus } = api.menu.getAll.useQuery()
  const { data: categories } = api.category.getAll.useQuery()
  const { data: menu } = api.menu.get.useQuery({ id: 1 })

  const clearInputs = () => {
    setStoreName("")
    setStoreAddress("")
    setStoreSlug("")
    setMenuName("")
    setCategoryName("")
    setCategoryMenuId(0)
    setItemCategoryId(0)
    setItemName("")
    setItemPrice("")
    setItemDescription("")
  }

  return (
    <div className="grid grid-cols-2 p-8">
      <div>
        <h1 className="mt-4 mb-4 text-2xl font-bold">New Store</h1>

        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setStoreName(e.target.value)}
            placeholder="Menu name"
            value={storeName}
          />
          <span className="mt-1">Address</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setStoreAddress(e.target.value)}
            placeholder="Menu name"
            value={storeAddress}
          />
          <span className="mt-1">Slug</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setStoreSlug(e.target.value)}
            placeholder="Menu name"
            value={storeSlug}
          />
          <button
            className="col-start-2 w-60 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
            onClick={() => {
              createStore({
                name: storeName,
                address: storeAddress,
                slug: storeSlug,
              })
              clearInputs()
            }}
          >
            Create Store
          </button>
        </div>
        <h1 className="mt-4 mb-4 text-2xl font-bold">New Menu</h1>

        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Menu name"
            value={menuName}
          />
          <button
            className="col-start-2 w-60 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
            onClick={() => {
              createMenu({ name: menuName })
              clearInputs()
            }}
          >
            Create Menu
          </button>
        </div>
        <h1 className="mt-8 mb-4 text-2xl font-bold">New Category</h1>
        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Menu</span>
          <select
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setCategoryMenuId(Number(e.target.value))}
            value={categoryMenuId}
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
            className="col-start-2 w-60 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
            onClick={() => {
              createCategory({ menuId: categoryMenuId, name: categoryName })
              clearInputs()
            }}
          >
            Create Category
          </button>
        </div>
        <h1 className="mt-8 mb-4 text-2xl font-bold">New Item</h1>
        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Category</span>
          <select
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setItemCategoryId(Number(e.target.value))}
            value={itemCategoryId}
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
            className="hover:bg-red--700 col-start-2 w-60 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
            onClick={() => {
              createItem({
                categoryId: itemCategoryId,
                price: Number(itemPrice),
                name: itemName,
                description: itemDescription,
              })
              clearInputs()
            }}
          >
            Create Item
          </button>
        </div>
      </div>
      <div>
        <h1 className="mt-4 mb-4 text-lg font-bold">{menu && menu.name}</h1>
        {menu && getUiMenu(menu)}
      </div>
    </div>
  )
}

export default MenuBuilder
