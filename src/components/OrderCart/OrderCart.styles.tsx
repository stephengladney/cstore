import type { ReactComponents } from "../../types/React"

export function CartContainer({ children }: ReactComponents) {
  return (
    <div
      className="hidden h-full min-w-[360px] flex-col border border-solid border-gray-300 px-1 px-2 md:flex"
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
  return <div className="grow overflow-y-auto">{children}</div>
}

export function CheckoutContainer({ children }: ReactComponents) {
  return (
    <div className="border-t border-solid border-slate-300 p-4">{children}</div>
  )
}

export function CheckoutButton() {
  return (
    <div className="mt-6 flex w-full flex-row justify-center ">
      <button className="bold w-[300px] rounded-full bg-valero p-5 font-poppins font-bold text-slate-50">
        Checkout
      </button>
    </div>
  )
}

export function EmptyStateMessage() {
  return (
    <div style={{ fontFamily: "Inter, Avenir, Helvetica, Arial, sans-serif" }}>
      {"You haven't ordered anything yet."}
    </div>
  )
}
