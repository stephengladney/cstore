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
import { api } from "../../utils/api"
import { getCheckoutPricingFromCart } from "../../lib/order"
import { storeContext } from "../../contexts/storeContext"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const stripeKeyToUse =
  env.NEXT_PUBLIC_DEV_MODE === "true"
    ? env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST
    : env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

const stripePromise = loadStripe(stripeKeyToUse)

interface OrderCartProps {
  cart: Cart
  editCartItem: (itemIndex: number) => void
}

export function OrderCart({ cart, editCartItem }: OrderCartProps) {
  const { subtotal, tax, total } = getCheckoutPricingFromCart(cart)
  const { mutate: submitOrder } = api.order.create.useMutation()
  const { slug } = useContext(storeContext)

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
            <form action="/api/payment/checkout_sessions" method="POST">
              <input
                name="items"
                value={JSON.stringify(cart.items)}
                readOnly
                hidden
              />
              <input name="storeSlug" value={slug} readOnly hidden />
              <CheckoutButton onClick={handleSubmitOrderClick} />
            </form>
          </CheckoutContainer>
        </Fragment>
      ) : (
        <EmptyStateMessage />
      )}
    </CartContainer>
  )
}
