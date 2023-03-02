import { useContext, useEffect } from "react"
import { cartContext } from "../../contexts/cartContext"
import { storeContext } from "../../contexts/storeContext"
import { getCheckoutPricingFromCart, money } from "../../lib/order"
import { api } from "../../utils/api"

interface CallbackHandlerProps {
  callback: string
}
export function CallbackHandler({ callback }: CallbackHandlerProps) {
  const { cart } = useContext(cartContext)
  const { subtotal, tax, total } = getCheckoutPricingFromCart(cart)
  const { mutate: submitOrder } = api.order.create.useMutation()
  const store = useContext(storeContext)

  useEffect(() => {
    if (callback === "success" && cart.items.length > 0) {
      submitOrder({
        customerName: "Test",
        customerPhone: "404-123-4567",
        items: cart.items,
        subtotal,
        storeId: store.id,
        tax,
        total,
      })
    }
  }, [cart])
  if (callback === "success")
    return (
      <div>
        <h1>Your order from {store.name} has been placed.</h1>
        {cart.items.map((item, i) => (
          <div key={i}>
            {item.quantity}x {item.name} {item.price}
          </div>
        ))}
        <div>Subtotal: {money(subtotal)}</div>
        <div>Tax: {money(tax)}</div>
        <div>TOTAL: {money(total)}</div>
      </div>
    )
  else return null
}
