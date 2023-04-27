import type { Order, Store } from "@prisma/client"
import {
  LineItem,
  PriceLineItem,
} from "../CallbackHandler/CallbackHandler.styles"
import { BiArrowBack } from "react-icons/bi"
import { PricingContainer } from "../OrderCart/CartPricing/CartPricing.styles"
import { api } from "../../utils/api"
import {
  capitalizeFirstLetter,
  formatTime,
  getPickupTimeFromPlacedAtTime,
} from "./OrderComponent"
import type { CartItem } from "../../types/Cart"
import { formatPhoneNumber } from "../../lib/client"

export function OrderDetailsComponent({
  selectedOrder,
  handleBackClick,
  handleMarkReadyClick,
  store,
}: {
  selectedOrder: Order
  handleBackClick: () => void
  handleMarkReadyClick: () => void
  store: Store
}) {
  const { data: delivery } = api.delivery.getByOrderId.useQuery(
    { orderId: selectedOrder.id },
    { enabled: !!selectedOrder }
  )

  return (
    <div>
      <div className="flex flex-row items-center">
        <BiArrowBack
          size={52}
          className="my-4 ml-4 mr-2"
          onClick={handleBackClick}
        />
        {/* <span className="text-2xl">Back to orders</span> */}
      </div>
      <h1 className="mt-12 mb-4 text-center font-poppins text-6xl font-bold">
        #{selectedOrder.id} {selectedOrder.customerName}
      </h1>
      <h3
        className="py-4 text-center font-poppins text-3xl font-bold"
        style={{ color: store.color }}
      >
        {capitalizeFirstLetter(selectedOrder.type)}
      </h3>
      {
        <h4 className="text-center font-poppins text-lg">
          Customer Phone: {formatPhoneNumber(selectedOrder.customerPhone)}
        </h4>
      }
      {selectedOrder.type === "delivery" && (
        <>
          <h4 className="text-center font-poppins text-lg">
            Doordash Support: (855) 973-1040
          </h4>
          <h4 className="text-center font-poppins text-lg">
            Doordash Support Reference
            <br />#{delivery?.supportReference ?? ""}
          </h4>
        </>
      )}
      <div className="p-12 font-poppins text-3xl">
        <div className="grid grid-cols-[1fr,1fr] rounded-xl border-[1px] border-solid border-slate-500">
          <div className="flex flex-col items-center border-r border-solid border-slate-500 p-2 text-2xl font-bold">
            <div>Placed at</div>
            <div className="mt-2 font-normal">
              {formatTime(selectedOrder.createdAt)}
            </div>
          </div>
          <div className="flex flex-col items-center border-r border-solid border-slate-500 p-2 text-2xl font-bold">
            <div>Pickup at</div>
            <div className="mt-2 font-normal">
              {formatTime(
                getPickupTimeFromPlacedAtTime(selectedOrder.createdAt)
              )}
            </div>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-[0.35fr,1fr,4fr,2fr] font-poppins">
          {selectedOrder.items.map((item, i) => (
            <LineItem key={i} item={item as CartItem} />
          ))}
        </div>
        <div className="mt-12 font-poppins">
          <PricingContainer>
            <PriceLineItem
              name="Subtotal"
              amount={Number(selectedOrder.subtotal)}
            />
            <PriceLineItem name="Tax" amount={Number(selectedOrder.tax)} />
            <PriceLineItem name="Total" amount={Number(selectedOrder.total)} />
          </PricingContainer>
        </div>
        <div className="mt-16 flex flex-row justify-center">
          <button
            className="bold flex w-[400px] items-center justify-center rounded-full p-8 font-poppins font-bold text-slate-50"
            onClick={handleMarkReadyClick}
            style={{ backgroundColor: store.color }}
          >
            Mark Order Ready
          </button>
        </div>
      </div>
    </div>
  )
}
