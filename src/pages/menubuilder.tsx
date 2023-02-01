import { type NextPage } from "next"

const MenuBuilder: NextPage = () => {
  return (
    <div className="grid grid-cols-2 p-8">
      <div>
        <h1 className="mt-4 mb-4 text-3xl font-bold">New Menu</h1>

        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            placeholder="Item name"
          />

          <button className="col-start-2 w-60 bg-red-600 p-2 text-white">
            Create Menu
          </button>
        </div>
        <h1 className="mt-8 mb-4 text-3xl font-bold">New Category</h1>
        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Menu</span>
          <select className="w-60 border border-solid border-black py-1 px-2">
            <option>derp</option>
            <option>derp</option>
            <option>derp</option>
          </select>
          <span className="mt-1">Name</span>
          <input
            className="w-60 border border-solid border-black py-1 px-2"
            placeholder="Item name"
          />
          <button className="col-start-2 w-60 bg-red-600 p-2 text-white">
            Create Category
          </button>
        </div>
        <h1 className="mt-8 mb-4 text-3xl font-bold">New Item</h1>
        <div className="grid w-72 grid-cols-2 gap-3">
          <span className="mt-1">Category</span>
          <select className="w-60 border border-solid border-black py-1 px-2">
            <option>derp</option>
            <option>derp</option>
            <option>derp</option>
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
      </div>
    </div>
  )
}

export default MenuBuilder
