import { useState } from "react"
import { type NextPage } from "next"
import { api } from "../utils/api"
import type { MenuType } from "../types/MenuType"
import type { ApiMenuCategory } from "../types/MenuCategoryType"
import type { MenuItemType } from "../types/MenuItemType"
import type { Store } from "@prisma/client"
import { useSession } from "next-auth/react"

function getUiMenu(menu?: MenuType) {
  if (!menu) return null

  const { categories } = menu
  return categories?.map((category, i) => (
    <div key={i} className="mb-4 max-w-xs">
      <h1 className="text-sm font-bold">{category.name}</h1>
      {category.items?.map((item: MenuItemType) => (
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
  const { data: session } = useSession({ required: true })
  const [menuName, setMenuName] = useState("")
  const [storeId, setStoreId] = useState(0)
  const [categoryName, setCategoryName] = useState("")
  const [menuId, setMenuId] = useState(0)
  const [categoryId, setCategoryId] = useState(0)
  const [itemName, setItemName] = useState("")
  const [itemPrice, setItemPrice] = useState("")
  const [itemDescription, setItemDescription] = useState("")
  const [storeName, setStoreName] = useState("")
  const [storeAddress, setStoreAddress] = useState("")
  const [storeSlug, setStoreSlug] = useState("")
  const [uploadMenuId, setUploadMenuId] = useState(0)
  const { data: user } = api.user.getByEmail.useQuery(
    { email: session?.user.email as string },
    { enabled: !!session }
  )
  const { mutate: createMenu } = api.menu.create.useMutation()
  const { mutate: createCategory } = api.category.create.useMutation()
  const { mutate: createItem } = api.item.create.useMutation()
  const { mutate: createStore } = api.store.create.useMutation()
  const { mutate: createCategoriesFromCsv } =
    api.category.createFromCsv.useMutation()
  const { mutate: createItemsFromCsv } = api.item.createFromCsv.useMutation()
  const { data: stores } = api.store.getByIds.useQuery(
    { ids: user?.stores ?? [] },
    { enabled: !!user?.stores }
  )
  const { data: menus } = api.menu.getAllByStoreId.useQuery({ id: storeId })
  const { data: categories } = api.category.getByMenuId.useQuery({
    id: menuId,
  })
  const { data: menu } = api.menu.get.useQuery({ id: menuId })

  const clearInputs = () => {
    setStoreName("")
    setStoreAddress("")
    setStoreSlug("")
    setMenuName("")
    setCategoryName("")
    setMenuId(0)
    setCategoryId(0)
    setItemName("")
    setItemPrice("")
    setItemDescription("")
  }

  function handleFileSelect(
    type: "category" | "item",
    file: File,
    menuId: number
  ) {
    const reader = new FileReader()
    reader.addEventListener("load", () => {
      if (type === "category") {
        createCategoriesFromCsv({
          text: reader.result as string,
          menuId,
        })
      }
      if (type === "item") {
        createItemsFromCsv({ text: reader.result as string, menuId })
      }
    })
    reader.readAsText(file)
  }

  if (session?.user.email !== "stephengladney@gmail.com")
    return <h1>Unauthorized</h1>
  else
    return (
      <div className="grid grid-cols-3 px-8 py-2">
        <div>
          <h1 className="mt-4 mb-4 text-2xl font-bold">New Store</h1>
          <div className="grid w-72 grid-cols-2 gap-3">
            <span className="mt-1">Name</span>
            <input
              className="w-60 border border-solid border-black py-1 px-2"
              onChange={(e) => setStoreName(e.target.value)}
              placeholder="My Store"
              value={storeName}
            />
            <span className="mt-1">Address</span>
            <input
              className="w-60 border border-solid border-black py-1 px-2"
              onChange={(e) => setStoreAddress(e.target.value)}
              placeholder="123 Right Way"
              value={storeAddress}
            />
            <span className="mt-1">Slug</span>
            <input
              className="w-60 border border-solid border-black py-1 px-2"
              onChange={(e) => setStoreSlug(e.target.value)}
              placeholder="slug"
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
          <div>
            <h1 className="mt-4 mb-4 text-2xl font-bold">Manual Add</h1>
            <div className="grid w-72 grid-cols-2 gap-3">
              <span className="mt-1">Store</span>
              <select
                className="w-60 border border-solid border-black py-1 px-2"
                onChange={(e) => setStoreId(Number(e.target.value))}
                value={storeId}
              >
                <option value={0}>Select a store...</option>
                {stores?.map((store: Omit<Store, "stripeAccountId">) => (
                  <option key={`menu-dropdown-${store.id}`} value={store.id}>
                    {store.name}
                  </option>
                ))}
              </select>
              <span className="mt-1">Menu</span>
              <select
                className="w-60 border border-solid border-black py-1 px-2"
                onChange={(e) => setMenuId(Number(e.target.value))}
                value={menuId}
              >
                <option value={0}>Select a menu...</option>
                {menus?.map((menu: MenuType) => (
                  <option key={`menu-dropdown-${menu.id}`} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
              <span className="mt-1">Category</span>
              <select
                className="w-60 border border-solid border-black py-1 px-2"
                onChange={(e) => setCategoryId(Number(e.target.value))}
                value={categoryId}
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
            </div>
          </div>

          <div className="mt-8 grid w-72 grid-cols-2 gap-3">
            <span className="mt-1">New Menu</span>
            <input
              className="w-60 border border-solid border-black py-1 px-2"
              onChange={(e) => setMenuName(e.target.value)}
              placeholder="Menu name"
              value={menuName}
            />
            <button
              className="col-start-2 w-60 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
              onClick={() => {
                createMenu({ name: menuName, storeId: storeId })
                clearInputs()
              }}
            >
              Create Menu
            </button>
          </div>
          <div className="mt-8 grid w-72 grid-cols-2 gap-3">
            <span className="mt-1">New Category</span>
            <input
              className="w-60 border border-solid border-black py-1 px-2"
              placeholder="Category name"
              onChange={(e) => setCategoryName(e.target.value)}
              value={categoryName}
            />
            <button
              className="col-start-2 w-60 rounded-full bg-red-600 p-2 text-white hover:bg-red-700"
              onClick={() => {
                createCategory({ menuId: menuId, name: categoryName })
                clearInputs()
              }}
            >
              Create Category
            </button>
          </div>
          <h1 className="mt-8 mb-4 text-xl font-bold">New Item</h1>
          <div className="grid w-72 grid-cols-2 gap-3">
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
                  categoryId: categoryId,
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
          <div>
            <h1 className="mt-8 mb-4 text-2xl font-bold">Upload from CSV</h1>
            <div className="mb-4 grid w-72 grid-cols-2 gap-3">
              <span className="mt-1">Menu</span>
              <select
                className="w-60 border border-solid border-black py-1 px-2"
                onChange={(e) => setUploadMenuId(Number(e.target.value))}
                value={uploadMenuId}
              >
                <option value={0}>Select a menu...</option>
                {menus?.map((menu: MenuType) => (
                  <option key={`menu-dropdown-${menu.id}`} value={menu.id}>
                    {menu.name}
                  </option>
                ))}
              </select>
            </div>
            <h2 className="my-4 text-lg font-bold">Categories</h2>
            <input
              accept=".csv"
              type="file"
              id="file-selector"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileSelect("category", e.target.files[0]!, uploadMenuId)
                }
              }}
            />
          </div>
          <div>
            <h2 className="my-4 text-lg font-bold">Items</h2>
            <input
              accept=".csv"
              type="file"
              id="file-selector"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  handleFileSelect("item", e.target.files[0]!, uploadMenuId)
                }
              }}
            />
          </div>
        </div>
        <div>
          <h1 className="mt-4 mb-4 text-2xl font-bold">Menu Preview</h1>
          <h2 className="mt-4 mb-4 text-lg font-bold">
            {menus?.find((menu) => menu.id === menuId)?.name ?? ""}
          </h2>
          {menus?.find((menu) => menu.id === menuId) && menu && getUiMenu(menu)}
        </div>
      </div>
    )
}

export default MenuBuilder
