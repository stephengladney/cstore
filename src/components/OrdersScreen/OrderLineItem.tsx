import type { CartItem } from "../../types/Cart"
import Image from "next/image"

export function OrderLineItem({ item }: { item: CartItem }) {
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
