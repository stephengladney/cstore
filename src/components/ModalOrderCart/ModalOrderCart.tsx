import { type MutableRefObject, useContext, useState } from "react"
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
  const [isRedirecting, setIsRedirecting] = useState(false)
  const [fulfillmentMethod, setFulfillmentMethod] =
    useState<keyof typeof FulfillmentMethods>("PICKUP")

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
          <CartItemsContainer>
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
              <div className="py-12">
                <ul className="flex flex-row justify-around">
                  <li
                    className={`text-slate- w-48 cursor-pointer
                     rounded-full border-2 border-solid border-slate-400 p-3 text-center font-poppins font-bold text-slate-400`}
                    onClick={() => setFulfillmentMethod("PICKUP")}
                    style={
                      fulfillmentMethod === "PICKUP"
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
                    className={`w-48 cursor-pointer rounded-full border-2 border-solid border-slate-400 p-3 text-center font-poppins font-bold text-slate-400`}
                    onClick={() => setFulfillmentMethod("DELIVERY")}
                    style={
                      fulfillmentMethod === "DELIVERY"
                        ? { borderColor: store.color, color: store.color }
                        : {}
                    }
                  >
                    Delivery
                  </li>
                </ul>
              </div>
              <form action="/api/payment/checkout_sessions" method="POST">
                <input
                  name="items"
                  value={JSON.stringify(cart.items)}
                  readOnly
                  hidden
                />
                <input name="storeSlug" value={store.slug} readOnly hidden />
                <CheckoutButton
                  onClick={() => setIsRedirecting(true)}
                  isDisabled={isRedirecting}
                  isLoading={isRedirecting}
                />
              </form>
            </CheckoutContainer>
          </CartItemsContainer>
        </ModalContent>
      </ModalWrapper>
    </Popup>
  )
}
