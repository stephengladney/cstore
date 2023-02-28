import { type MutableRefObject, useContext } from "react"
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
import { getCheckoutPricingFromCart } from "../../lib/order"
import { storeContext } from "../../contexts/storeContext"
import { api } from "../../utils/api"
import {
  ModalContent,
  ModalWrapper,
  CloseButton,
} from "./ModalOrderCart.styles"

export function ModalOrderCart({
  cart,
  closeModal,
  modalRef,
}: {
  cart: Cart
  closeModal: () => void
  modalRef: MutableRefObject<PopupActions>
}) {
  const { subtotal, tax, total } = getCheckoutPricingFromCart(cart)
  const { mutate: submitOrder } = api.order.create.useMutation()
  const store = useContext(storeContext)

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
              <form action="/api/payment/checkout_sessions" method="POST">
                <input name="items" value={JSON.stringify(cart.items)} hidden />
                <CheckoutButton onClick={handleSubmitOrderClick} />
              </form>
            </CheckoutContainer>
          </CartItemsContainer>
        </ModalContent>
      </ModalWrapper>
    </Popup>
  )
}
