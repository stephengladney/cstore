import { Fragment, useContext } from "react"

import {
  MobileViewCartButton,
  CartContainer,
  CartHeader,
  CartItemsContainer,
  CheckoutContainer,
  CheckoutButton,
  EmptyStateWrapper,
  EmptyStateMessage,
} from "./OrderCart.styles"
import { OrderCartPricing } from "./OrderCartPricing/OrderCartPricing"

import { OrderCartItem } from "./OrderCartItem/OrderCartItem"
import type { Cart } from "../../types/Cart"
import { cartContext } from "../../contexts/cartContext"

export function OrderingCart({ cart }: { cart: Cart }) {
  const { dispatch } = useContext(cartContext)
  const subtotal = cart.items.reduce((acc, item) => acc + Number(item.price), 0)
  const taxRate = 0.09
  const tax = subtotal * taxRate
  return (
    <Fragment>
      <CartContainer>
        <CartHeader>Your Order</CartHeader>
        {cart.items.length > 0 ? (
          <Fragment>
            <CartItemsContainer>
              {cart.items.map((item, i) => (
                <OrderCartItem index={i} item={item} />
              ))}
            </CartItemsContainer>
            <CheckoutContainer>
              <OrderCartPricing
                label="Subtotal"
                amount={subtotal}
                style={{ color: "#888" }}
              />
              <OrderCartPricing
                label="Tax"
                amount={tax}
                style={{ color: "#888" }}
              />
              <OrderCartPricing
                label="Total"
                amount={subtotal + tax}
                style={{ marginTop: "10px" }}
              />
              <CheckoutButton>Checkout</CheckoutButton>
            </CheckoutContainer>
          </Fragment>
        ) : (
          <EmptyStateWrapper>
            <EmptyStateMessage>
              You haven't ordered anything yet.
            </EmptyStateMessage>
          </EmptyStateWrapper>
        )}
      </CartContainer>
    </Fragment>
  )
}
