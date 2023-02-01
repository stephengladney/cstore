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

export function OrderCart({ cart }: { cart: Cart }) {
  const subtotal = cart.items.reduce((acc, item) => acc + Number(item.price), 0)
  const taxRate = 0.09
  const tax = subtotal * taxRate
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
              amount={subtotal + tax}
              label="Total"
              style={{ marginTop: "10px" }}
            />
            <CheckoutButton />
          </CheckoutContainer>
        </Fragment>
      ) : (
        <EmptyStateMessage />
      )}
    </CartContainer>
  )
}
