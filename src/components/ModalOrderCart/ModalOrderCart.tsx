import { type MutableRefObject, useContext, useState, useEffect } from "react"
import type { PopupActions } from "reactjs-popup/dist/types"
import Popup from "reactjs-popup"
import type { Cart } from "../../types/Cart"
import {
  CartItemsContainer,
  CheckoutButton,
  CheckoutContainer,
} from "../OrderCart/OrderCart.styles"
import { CartPricing } from "../OrderCart/CartPricing/CartPricing"
import { CartItemComponent } from "../OrderCart/CartItem/CartItem"
import { getCheckoutPricingFromCartItems } from "../../lib/order"
import { storeContext } from "../../contexts/storeContext"
import {
  ModalContent,
  ModalWrapper,
  CloseButton,
} from "./ModalOrderCart.styles"
import axios from "axios"
import { Elements } from "@stripe/react-stripe-js"
import { PaymentElement } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { env } from "../../env/client.mjs"

const stripe = loadStripe(env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST)

const FulfillmentMethods = { PICKUP: "PICKUP", DELIVERY: "DELIVERY" } as const

export function ModalOrderCart({
  cart,
  closeModal,
  modalRef,
}: {
  cart: Cart
  closeModal: () => void
  modalRef: MutableRefObject<PopupActions>
}) {
  const { subtotal, tax, total } = getCheckoutPricingFromCartItems(cart.items)
  const store = useContext(storeContext)
  const [fulfillmentMethod, setFulfillmentMethod] =
    useState<keyof typeof FulfillmentMethods>("PICKUP")
  const [clientSecret, setClientSecret] = useState<string>()

  const isPickupSelected = fulfillmentMethod === "PICKUP"
  const isDeliverySelected = fulfillmentMethod === "DELIVERY"

  useEffect(() => {
    axios
      .post("/api/payment/payment_intent", {
        stripeAccountId: store.stripeAccountId,
      })
      .then(({ data }: { data: string }) => {
        setClientSecret(data)
      })
      .catch((e) => {
        //NO OP
      })
  }, [fulfillmentMethod, store.stripeAccountId])

  return (
    <Popup ref={modalRef}>
      <ModalWrapper>
        <ModalContent>
          <CloseButton closeModal={closeModal} />
          <h1
            className="mb-8 block text-center font-poppins text-3xl font-bold"
            style={{ color: store.color }}
          >
            Your Cart
          </h1>
          <div className="xl:px-12">
            <CartItemsContainer>
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
            </CheckoutContainer>
          </div>
          <div className="py-10">
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
                className={`w-36 cursor-pointer rounded-full rounded-full ${
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
          <div
            className={`grid grid-rows-[1fr,1fr${
              isDeliverySelected ? ",1fr" : ""
            }] gap-4 pb-4 lg:pb-8`}
          >
            <div>
              <label className="mb-2 block font-poppins text-sm font-medium text-gray-900">
                Your name
              </label>
              <input
                type="text"
                id="first_name"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
                required
              />
            </div>
            {isDeliverySelected && (
              <div>
                <label className="mb-2 block font-poppins text-sm font-medium text-gray-900">
                  Delivery Address
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
                  required
                />
              </div>
            )}
            <div className="grid grid-cols-[1fr,1fr] gap-4">
              <div>
                <label className="mb-2 block font-poppins text-sm font-medium text-gray-900">
                  Email
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
                  required
                />
              </div>
              <div>
                <label className="mb-2 block font-poppins text-sm font-medium text-gray-900">
                  Phone number
                </label>
                <input
                  type="text"
                  id="first_name"
                  className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 "
                  required
                />
              </div>
            </div>
          </div>
          {clientSecret && (
            <Elements stripe={stripe} options={{ clientSecret }}>
              <form>
                <PaymentElement />
              </form>
            </Elements>
          )}
        </ModalContent>
      </ModalWrapper>
    </Popup>
  )
}
