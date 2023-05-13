import type { ReactComponents } from "../../../types/React"
import { useContext } from "react"
import { storeContext } from "../../../contexts/storeContext"

export function CategoryContainer({ children }: ReactComponents) {
  return <div>{children}</div>
}

export function CategoryHeader({
  children,
  onClick,
}: ReactComponents & { onClick?: () => void }) {
  return (
    <div className="my-4" onClick={onClick}>
      {children}
    </div>
  )
}

export function CategoryName({ children }: ReactComponents) {
  const store = useContext(storeContext)
  return (
    <span
      className="pl-4 font-poppins text-[22px] font-bold uppercase"
      style={{ color: store.color }}
    >
      {children}
    </span>
  )
}

export function ItemsContainer({ children }: ReactComponents) {
  return (
    <div className="lg:m-w-4xl flex flex-row overflow-x-scroll py-2 lg:grid lg:grid-cols-3 lg:flex-col lg:gap-4">
      {children}
    </div>
  )
}
