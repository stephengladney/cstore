import { type MutableRefObject, useContext, useState, useEffect } from "react"
import type { PopupActions } from "reactjs-popup/dist/types"
import Popup from "reactjs-popup"
import type { Cart } from "../../types/Cart"
import {
  ModalContent,
  ModalWrapper,
  CloseButton,
} from "./ModalOrderCart.styles"
import { Checkout } from "../Checkout/Checkout"

export function ModalOrderCart({
  closeModal,
  modalRef,
}: {
  cart: Cart
  closeModal: () => void
  modalRef: MutableRefObject<PopupActions>
}) {
  return (
    <Popup ref={modalRef} onClose={closeModal}>
      <ModalWrapper>
        <ModalContent>
          <CloseButton closeModal={closeModal} />
          <h1 className="block pb-4 text-center font-poppins text-3xl font-bold text-slate-700">
            Checkout
          </h1>
          <Checkout closeModal={closeModal} isMobileCheckout={false} />
        </ModalContent>
      </ModalWrapper>
    </Popup>
  )
}
