import { Fragment, useContext } from "react"
import { loadStripe } from "@stripe/stripe-js"
import { env } from "../../env/client.mjs"
import {
  CartHeader,
  CartItemsContainer,
  CheckoutContainer,
  CheckoutButton,
  EmptyStateMessage,
  CartContainer,
} from "./OrderCart.styles"
import { CartPricing } from "./CartPricing/CartPricing"
import { CartItemComponent } from "./CartItem/CartItem"
import type { Cart } from "../../types/Cart"
import { getCheckoutPricingFromCartItems } from "../../lib/order"
import { cartContext } from "../../contexts/cartContext"

void loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY)
interface OrderCartProps {
  cart: Cart
  editCartItem: (itemIndex: number) => void
}

export function OrderCart({ cart, editCartItem }: OrderCartProps) {
  const { subtotal, tax, total } = getCheckoutPricingFromCartItems(cart.items)
  const { openCartModal } = useContext(cartContext)

  return (
    <CartContainer>
      <CartHeader>Your Order</CartHeader>
      {cart.items.length > 0 ? (
        <Fragment>
          <CartItemsContainer>
            {cart.items.map((item, i) => (
              <CartItemComponent
                index={i}
                key={`cart-item-${i}`}
                item={item}
                onClick={() => editCartItem(i)}
              />
            ))}
          </CartItemsContainer>
          <CheckoutContainer>
            <CartPricing label="Subtotal" amount={subtotal} />
            <CartPricing label="Tax" amount={tax} />
            <CartPricing
              isBig
              amount={total}
              label="Total"
              style={{ marginTop: "10px" }}
            />

            <CheckoutButton
              onClick={openCartModal}
              isDisabled={false}
              isLoading={false}
            />
          </CheckoutContainer>
        </Fragment>
      ) : (
        <EmptyStateMessage />
      )}
    </CartContainer>
  )
}
