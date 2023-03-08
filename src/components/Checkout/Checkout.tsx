import {
  CartItemsContainer,
  CheckoutContainer,
} from "../OrderCart/OrderCart.styles"
import { CartPricing } from "../OrderCart/CartPricing/CartPricing"
import { CartItemComponent } from "../OrderCart/CartItem/CartItem"

import axios from "axios"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { env } from "../../env/client.mjs"
import { useContext, useEffect, useState } from "react"
import { cartContext } from "../../contexts/cartContext"
import { getCheckoutPricingFromCartItems } from "../../lib/order"
import { storeContext } from "../../contexts/storeContext"
import { CheckoutForm } from "./CheckoutForm"

const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST)

const FulfillmentMethods = { PICKUP: "PICKUP", DELIVERY: "DELIVERY" } as const

export function Checkout() {
  const { cart } = useContext(cartContext)
  const store = useContext(storeContext)
  const { subtotal, tax, total } = getCheckoutPricingFromCartItems(cart.items)
  const [fulfillmentMethod, setFulfillmentMethod] =
    useState<keyof typeof FulfillmentMethods>("PICKUP")
  const [paymentIntentId, setPaymentIntentId] = useState<string>()
  const [clientSecret, setClientSecret] = useState<string>()

  const isPickupSelected = fulfillmentMethod === "PICKUP"
  const isDeliverySelected = fulfillmentMethod === "DELIVERY"

  const stripeOptions = {
    clientSecret,
    fonts: [
      {
        cssSrc: "https://fonts.googleapis.com/css2?family=Poppins",
      },
    ],
    appearance: {
      theme: "stripe",
      variables: { borderRadius: "8px", fontFamily: "Poppins" },
    } as { theme: "stripe" },
  }

  useEffect(() => {
    //TODO: change to update
    axios
      .post("/api/payment/payment_intent", {
        amount: total,
        stripeAccountId: store.stripeAccountId,
      })
      .then(({ data: { id, clientSecret } }) => {
        setClientSecret(clientSecret as string)
        setPaymentIntentId(id as string)
      })
      .catch(() => {
        //NO OP
      })
  }, [fulfillmentMethod, store.stripeAccountId, cart.items])

  return (
    <div>
      {/* <CartItemsContainer>
        {cart.items.map((item, i) => (
          <CartItemComponent
            index={i}
            key={`cart-item-${i}`}
            item={item}
            onClick={() => null}
          />
        ))}
      </CartItemsContainer>
      <CheckoutContainer>
        <CartPricing
          label="Subtotal"
          amount={subtotal}
          style={{ color: "#666" }}
        />
        <CartPricing label="Tax" amount={tax} style={{ color: "#666" }} />
        <CartPricing
          isBig
          amount={total}
          label="Total"
          style={{ marginTop: "10px" }}
        />
      </CheckoutContainer> */}
      <h1
        className="w-full py-4 text-center font-poppins text-5xl font-bold"
        style={{ color: store.color }}
      >
        ${Number(total).toFixed(2)}
      </h1>

      <div className="py-5">
        <ul className="flex flex-row justify-center gap-8">
          <li
            className={`text-slate- w-36 cursor-pointer
         rounded-full ${
           isPickupSelected ? "border-[3px]" : "border-2"
         } border-solid border-slate-400 p-3 text-center font-poppins font-bold text-slate-400`}
            onClick={() => setFulfillmentMethod("PICKUP")}
            style={
              isPickupSelected
                ? {
                    borderColor: store.color,
                    color: store.color,
                  }
                : {}
            }
          >
            Pickup
          </li>
          <li
            className={`w-36 cursor-pointer rounded-full ${
              isDeliverySelected ? "border-[3px]" : "border-2"
            } border-solid border-slate-400 p-3 text-center font-poppins font-bold text-slate-400`}
            onClick={() => setFulfillmentMethod("DELIVERY")}
            style={
              isDeliverySelected
                ? { borderColor: store.color, color: store.color }
                : {}
            }
          >
            Delivery
          </li>
        </ul>
      </div>
      <div className="pb-4 lg:pb-8">
        <div className="grid grid-cols-[1fr,1fr] gap-4">
          <div>
            <label className="mb-2 block font-poppins text-[14.88px] font-medium text-gray-900">
              Name
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-inherit text-gray-900 "
              required
            />
          </div>
          <div>
            <label className="mb-2 block font-poppins text-[14.88px] font-medium text-gray-900">
              Phone number
            </label>
            <input
              type="text"
              id="first_name"
              className="block w-full rounded-lg border border-gray-300 p-2.5 text-inherit text-gray-900 "
              required
            />
          </div>
        </div>
      </div>
      {clientSecret && (
        <Elements stripe={stripe} options={stripeOptions}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
