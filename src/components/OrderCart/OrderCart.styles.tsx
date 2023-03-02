import type { ReactComponents } from "../../types/React"
import { useContext } from "react"
import { storeContext } from "../../contexts/storeContext"

export function CartContainer({ children }: ReactComponents) {
  return (
    <div
      className="hidden h-full w-[390px] flex-col border border-solid border-gray-300 px-2 md:flex"
      style={{ boxShadow: "0px 0px 6px #ddd" }}
    >
      {children}
    </div>
  )
}

export function CartHeader({ children }: ReactComponents) {
  return (
    <header className="border-b border-solid border-slate-300 px-2 py-3 font-poppins text-[21px] font-bold text-slate-700">
      {children}
    </header>
  )
}

export function CartItemsContainer({ children }: ReactComponents) {
  return <div className="grow overflow-y-scroll">{children}</div>
}

export function CheckoutContainer({ children }: ReactComponents) {
  return (
    <div className="border-t border-solid border-slate-300 p-4">{children}</div>
  )
}

export function CheckoutButton({
  isDisabled,
  isLoading,
  onClick,
}: {
  isDisabled: boolean
  isLoading: boolean
  onClick: () => void
}) {
  const store = useContext(storeContext)
  return (
    <div className="mt-6 mb-2 flex w-full flex-row justify-center ">
      <button
        className={`bold flex w-[300px] items-center justify-center rounded-full p-5 font-poppins font-bold text-slate-50`}
        style={{ backgroundColor: isDisabled ? "#ccc" : store.color }}
        onClick={!isDisabled ? onClick : () => null}
        type="submit"
      >
        {isLoading && <span className="loader-white mr-2"></span>}Checkout
      </button>
    </div>
  )
}

export function EmptyStateMessage() {
  return (
    <div
      className="mb-20 flex h-full flex-col items-center justify-center text-gray-500"
      style={{ fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif" }}
    >
      {"You haven't ordered anything yet."}
    </div>
  )
}
