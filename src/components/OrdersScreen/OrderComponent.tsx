import type { Order } from "@prisma/client"

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

function getOrderBackgroundColor(order: Order) {
  switch (order.status) {
    case "unconfirmed":
      return "bg-green-300"
    case "confirmed":
      return "bg-yellow-300"
    default:
      return "bg-white"
  }
}

export function OrderComponent({
  order,
  handleSelectOrder,
}: {
  order: Order
  handleSelectOrder: (order: Order) => void
}) {
  const s = order.items.length > 1 ? "s" : ""
  return (
    <div
      key={order.id}
      className={`cursor-pointer border-b-[1px] border-solid border-gray-300 p-4 ${getOrderBackgroundColor(
        order
      )}`}
      onClick={() => handleSelectOrder(order)}
    >
      <div className="grid grid-cols-[1fr,1fr,1fr] text-xl font-bold">
        <div>
          #{order.id} {order.customerName}
        </div>
        <div className="text-center">{capitalizeFirstLetter(order.type)}</div>
        <div className="text-right">
          {order.items.length} item{s}
        </div>
      </div>
    </div>
  )
}
