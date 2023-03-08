import { type MutableRefObject, useContext, useState, useEffect } from "react"
import type { PopupActions } from "reactjs-popup/dist/types"
import Popup from "reactjs-popup"
import type { Cart } from "../../types/Cart"
import { getCheckoutPricingFromCartItems } from "../../lib/order"
import { storeContext } from "../../contexts/storeContext"
import {
  ModalContent,
  ModalWrapper,
  CloseButton,
} from "./ModalOrderCart.styles"
import { Checkout } from "../Checkout/Checkout"

export function ModalOrderCart({
  cart,
  closeModal,
  modalRef,
}: {
  cart: Cart
  closeModal: () => void
  modalRef: MutableRefObject<PopupActions>
}) {
  const store = useContext(storeContext)

  return (
    <Popup ref={modalRef}>
      <ModalWrapper>
        <ModalContent>
          <CloseButton closeModal={closeModal} />
          <h1
            className="block pb-4 text-center font-poppins text-3xl font-bold"
            style={{ color: store.color }}
          >
            Checkout
          </h1>
          <Checkout />
        </ModalContent>
      </ModalWrapper>
    </Popup>
  )
}
