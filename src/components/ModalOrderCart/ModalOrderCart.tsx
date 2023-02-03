import type { MutableRefObject } from "react"
import type { PopupActions } from "reactjs-popup/dist/types"
import Popup from "reactjs-popup"
import type { Cart } from "../../types/Cart"
import {
  CartItemsContainer,
  CheckoutButton,
  CheckoutContainer,
} from "../OrderCart/OrderCart.styles"
import { CartPricing } from "../OrderCart/CartPricing/CartPricing"
import { CartItem } from "../OrderCart/CartItem/CartItem"
import { getCheckoutPricingFromCart } from "../../lib/order"
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
          <h1 className="mb-8 block text-center font-poppins text-3xl font-bold text-valero">
            Your Cart
          </h1>
          <CartItemsContainer>
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
              <form action="/api/payment/checkout_sessions" method="POST">
                <CheckoutButton onClick={handleSubmitOrderClick} />
              </form>
            </CheckoutContainer>
          </CartItemsContainer>
        </ModalContent>
      </ModalWrapper>
    </Popup>
  )
}
