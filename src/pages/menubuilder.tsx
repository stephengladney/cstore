import { useState } from "react"
import { type NextPage } from "next"
import { api } from "../utils/api"

const MenuBuilder: NextPage = () => {
  const [menuName, setMenuName] = useState("")
  const [categoryName, setCategoryName] = useState("")
  const [categoryMenuId, setCategoryMenuId] = useState(0)
  const { mutate: createMenu } = api.menu.create.useMutation()
  const { mutate: createCategory } = api.category.create.useMutation()
  const menus = api.menu.getAll.useQuery()
  const categories = api.category.getAll.useQuery()
  const menu = api.menu.get.useQuery({ id: 1 })

  return (
    <div className="grid grid-cols-2 p-8">
      <div>
        <h1 className="mt-4 mb-4 text-3xl font-bold">New Menu</h1>

        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            onChange={(e) => setMenuName(e.target.value)}
            placeholder="Item name"
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
            {menus?.data?.map((menu) => (
              <option value={menu.id}>{menu.name}</option>
            ))}
          </select>
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            placeholder="Item name"
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
          <select className="w-60 border border-solid border-black py-1 px-2">
            {categories?.data?.map((category) => (
              <option value={category.id}>{category.name}</option>
            ))}
          </select>
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            placeholder="Item name"
          />
          <span className="mt-1">Price</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            placeholder="0.00"
          />
          <span className="mt-1">Description</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            placeholder="Something about the item"
          />
          <button className="col-start-2 w-60 bg-red-600 p-2 text-white">
            Create Item
          </button>
        </div>
      </div>
      <div>
        <h1 className="mt-4 mb-4 text-3xl font-bold">Menu Preview</h1>
        <span>{JSON.stringify(menu?.data)}</span>
      </div>
    </div>
  )
}

export default MenuBuilder
