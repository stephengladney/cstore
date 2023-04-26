import type { Cart } from "../../../types/Cart"
import { useContext } from "react"
import { storeContext } from "../../../contexts/storeContext"

export function MobileViewCartButton({
  cart,
  onClick,
}: {
  cart: Cart
  onClick: () => void
}) {
  const store = useContext(storeContext)
  return (
    <button
      className="bold fixed left-[calc((100vw-300px)/2)] bottom-5 z-10 flex w-[300px] animate-fadein-1s items-center justify-center rounded-full p-5 font-poppins font-bold text-slate-50 md:hidden"
      onClick={onClick}
      style={{ background: store.color }}
    >
      View Cart - {cart.items.length} items
    </button>
  )
}
