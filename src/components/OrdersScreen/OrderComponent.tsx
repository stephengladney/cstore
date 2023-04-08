import type { Order } from "@prisma/client"

export function capitalizeFirstLetter(str: string) {
  return str.charAt(0).toUpperCase() + str.substring(1)
}

export function formatTime(time: Date) {
  const timeString = time.toLocaleTimeString()
  const timeStringRegEx = /([0-9]+):([0-9]{2}):[0-9]{2} (AM|PM)/
  const [_, hour, minutes, meridian] = timeStringRegEx.exec(timeString)!
  return `${hour!}:${minutes!} ${meridian!}`
}

export function getPickupTimeFromPlacedAtTime(time: Date) {
  const _time = new Date(time)
  _time.setMinutes(time.getMinutes() + 15)
  return _time
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
      <div className="grid grid-cols-[0.5fr,1.5fr,1fr,1fr,0.75fr] text-xl font-bold">
        <div>{order.id}</div>
        <div>{order.customerName}</div>
        <div className="text-center">{capitalizeFirstLetter(order.type)}</div>
        <div className="text-center">
          {formatTime(getPickupTimeFromPlacedAtTime(order.createdAt))}
        </div>
        <div className="text-right">
          {order.items.length} item{s}
        </div>
      </div>
    </div>
  )
}
