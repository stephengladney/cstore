import { Fragment } from "react"

import {
  CartHeader,
  CartItemsContainer,
  CheckoutContainer,
  CheckoutButton,
  EmptyStateMessage,
  CartContainer,
} from "./OrderCart.styles"
import { CartPricing } from "./CartPricing/CartPricing"

import { CartItem } from "./CartItem/CartItem"
import type { Cart } from "../../types/Cart"
import { api } from "../../utils/api"
import { getCheckoutPricingFromCart } from "../../lib/order"

export function OrderCart({ cart }: { cart: Cart }) {
  const { subtotal, tax, total } = getCheckoutPricingFromCart(cart)
  const { mutate: submitOrder } = api.order.create.useMutation()

  const handleSubmitOrderClick = () => {
    submitOrder({
      customerName: "Test",
      customerPhone: "404-123-4567",
      items: cart.items,
      subtotal,
      tax,
      total,
    })
  }
  return (
    <CartContainer>
      <CartHeader>Your Order</CartHeader>
      {cart.items.length > 0 ? (
        <Fragment>
          <CartItemsContainer>
            {cart.items.map((item, i) => (
              <CartItem index={i} key={`cart-item-${i}`} item={item} />
            ))}
          </CartItemsContainer>
          <CheckoutContainer>
            <CartPricing
              label="Subtotal"
              amount={subtotal}
              style={{ color: "#888" }}
            />
            <CartPricing label="Tax" amount={tax} style={{ color: "#888" }} />
            <CartPricing
              isBig
              amount={total}
              label="Total"
              style={{ marginTop: "10px" }}
            />
            <CheckoutButton onClick={handleSubmitOrderClick} />
          </CheckoutContainer>
        </Fragment>
      ) : (
        <EmptyStateMessage />
      )}
    </CartContainer>
  )
}
