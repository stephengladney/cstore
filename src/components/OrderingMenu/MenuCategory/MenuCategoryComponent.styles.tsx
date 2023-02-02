import type { ReactComponents } from "../../../types/React"

export function CategoryContainer({ children }: ReactComponents) {
  return <div>{children}</div>
}

export function CategoryHeader({
  children,
  onClick,
}: ReactComponents & { onClick?: () => void }) {
  return (
    <div className="mb-4" onClick={onClick}>
      {children}
    </div>
  )
}

export function CategoryName({ children }: ReactComponents) {
  return (
    <span className="pl-4 font-poppins text-[22px] font-bold uppercase text-teal-700">
      {children}
    </span>
  )
}

export function ItemsContainer({ children }: ReactComponents) {
  return (
    <div className="lg:w-ma lg:m-w-4xl flex flex-col py-2 lg:grid lg:grid-cols-3 lg:gap-4">
      {children}
    </div>
  )
}