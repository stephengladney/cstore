import type { CartItem } from "../../types/Cart"
import type { ReactComponents } from "../../types/React"
import Image from "next/image"

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
      <div className="flex items-center">{item.quantity} x</div>
      <Image
        className="my-4 "
        src={item.imageUrl as string}
        height={150}
        width={150}
        alt={item.name}
      />
      <div className="flex items-center">{item.name}</div>
      <div className="flex items-center justify-end">
        $ {Number(item.price).toFixed(2)}
      </div>
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
