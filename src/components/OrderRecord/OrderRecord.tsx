import type { Order } from "@prisma/client"
import { formatTime } from "../OrdersScreen/OrderComponent"
import { SlArrowDown, SlArrowRight } from "react-icons/sl"
import { useState } from "react"
import type { CartItem } from "../../types/Cart"

export function OrderRecord({ order }: { order: Order }) {
  const [isExpanded, setIsExpanded] = useState(false)
  return (
    <>
      <div
        className="cursor-pointer border-b-[1px] border-solid border-slate-300 p-2"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="grid grid-cols-[0.45fr,1.2fr,3fr,0.5fr] items-center">
          <div>
            {isExpanded ? (
              <SlArrowDown size={12} />
            ) : (
              <SlArrowRight size={12} />
            )}
          </div>
          <div className={`${isExpanded ? "font-bold" : ""}`}>
            {formatTime(order.createdAt)}
          </div>
          <div className={`${isExpanded ? "font-bold" : ""}`}>
            {order.customerName}
          </div>
          <div className={`${isExpanded ? "font-bold" : ""}`}>
            ${Number(order.total).toFixed(2)}
          </div>
        </div>
        {isExpanded && (
          <>
            <div className="mt-4 grid grid-cols-[3fr,0.5fr] pl-36">
              {order.items.map((item) => (
                <>
                  <div>
                    {(item as CartItem).quantity} x {(item as CartItem).name}
                  </div>
                  <div>${Number((item as CartItem).price).toFixed(2)}</div>
                </>
              ))}
            </div>
            <div className="mt-4 flex flex-row justify-end">
              <div className="grid w-[35%] grid-cols-2">
                <div>Subtotal:</div>
                <div className="text-right">
                  ${Number(order.subtotal).toFixed(2)}
                </div>
                <div>Tax:</div>
                <div className="text-right">
                  ${Number(order.tax).toFixed(2)}
                </div>
                <div>Total:</div>
                <div className="text-right">
                  ${Number(order.total).toFixed(2)}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  )
}
