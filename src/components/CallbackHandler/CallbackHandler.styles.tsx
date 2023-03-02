import type { CartItem } from "../../types/Cart"
import type { ReactComponents } from "../../types/React"

export function ItemsContainer({ children }: ReactComponents) {
  return (
    <div className="mt-8 grid grid-cols-[1fr,5fr,2fr] font-poppins">
      {children}
    </div>
  )
}

export function LineItem({ item }: { item: CartItem }) {
  return (
    <>
      <div>{item.quantity}x</div>
      <div>{item.name}</div>
      <div className="text-right">$ {Number(item.price).toFixed(2)}</div>
    </>
  )
}

export function PriceLineItem({
  name,
  amount,
}: {
  name: string
  amount: number
}) {
  return (
    <>
      <div>{name}</div>
      <div className="text-right">$ {Number(amount).toFixed(2)}</div>
    </>
  )
}
