import { useContext, useEffect } from "react"
import { cartContext } from "../../contexts/cartContext"
import { storeContext } from "../../contexts/storeContext"
import { getCheckoutPricingFromCartItems } from "../../lib/order"
import { api } from "../../utils/api"
import { LineItem, PriceLineItem } from "./CallbackHandler.styles"
import { PricingContainer } from "../OrderCart/CartPricing/CartPricing.styles"
import { BsBagCheck } from "react-icons/bs"
import { deleteCookie, hasCookie } from "cookies-next"

interface CallbackHandlerProps {
  callback: string
}
export function CallbackHandler({ callback }: CallbackHandlerProps) {
  const { cart } = useContext(cartContext)
  const { subtotal, tax, total } = getCheckoutPricingFromCartItems(cart.items)
  const { mutate, data } = api.order.create.useMutation()
  const store = useContext(storeContext)

  useEffect(() => {
    if (cart.items.length > 0) {
      mutate({
        customerName: "Test",
        customerPhone: "404-123-4567",
        items: cart.items,
        subtotal,
        storeId: store.id,
        tax,
        total,
      })
      deleteCookie(`swiftCart_${store.slug}`)
    } else if (!hasCookie(`swiftCart_${store.slug}`)) {
      const win: Window = window
      win.location = `/${store.slug}`
    }
  }, [cart])
  if (callback === "success" && cart.items.length > 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <div className="mt-[-200px]">
          <h1 className="text-center text-2xl font-bold">
            Your order has been placed!
          </h1>
          <div className="my-8 flex justify-center">
            <BsBagCheck size={60} />
          </div>
          <h1 className="text-center font-bold">{`Order #${
            (data || "...") as string
          }`}</h1>
          <div className="mt-8 grid grid-cols-[1fr,5fr,2fr] font-poppins">
            {cart.items.map((item, i) => (
              <LineItem key={i} item={item} />
            ))}
          </div>
          <div className="mt-8 font-poppins">
            <PricingContainer>
              <PriceLineItem name="Subtotal" amount={subtotal} />
              <PriceLineItem name="Tax" amount={tax} />
              <PriceLineItem name="Total" amount={total} />
            </PricingContainer>
          </div>
        </div>
      </div>
    )
  } else {
    return null
  }
}
