import { MutableRefObject, Ref, useContext, useState } from "react"
import Popup from "reactjs-popup"
import { cartContext } from "../../../contexts/cartContext"
import {
  CloseButton,
  ModalContent,
  ModalWrapper,
  ItemDescription,
  ItemHeader,
  ItemName,
  ItemPrice,
  OrderButton,
  ItemImage,
  ItemInfo,
  LeftContainer,
  RightContainer,
  ButtonsContainer,
} from "./OrderItemModal.styles"

import type { MenuItem } from "../../../types/MenuItem"
import { QuantitySelector } from "../QuantitySelector/QuantitySelector"
import { PopupActions } from "reactjs-popup/dist/types"
import { redirect } from "next/dist/server/api-utils"

interface OrderItemModalProps {
  closeModal: () => void
  modalRef: MutableRefObject<PopupActions>
  selectedItem?: MenuItem
}

export function OrderItemModal({
  closeModal,
  modalRef,
  selectedItem,
}: OrderItemModalProps) {
  // const [specialInstructions, setSpecialInstructions] = useState("")
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity((quantity) => quantity + 1)
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((quantity) => quantity - 1)
  }

  const { dispatch } = useContext(cartContext)

  const handleOrderItemClick = () => {
    if (selectedItem) {
      dispatch({
        type: "ADD_ITEM",
        payload: {
          ...selectedItem,
          quantity,
          price: selectedItem.price * quantity,
        },
      })
      setQuantity(1)
      closeModal()
    }
  }

  return (
    <Popup ref={modalRef} closeOnDocumentClick onClose={closeModal}>
      <ModalWrapper>
        <ModalContent>
          <CloseButton closeModal={closeModal} />
          <ItemInfo>
            <LeftContainer>
              <ItemImage
                alt={`${selectedItem?.name || "No"} image`}
                src={selectedItem?.imageUrl}
              />
            </LeftContainer>
            <RightContainer>
              <ItemHeader>
                <ItemName>{selectedItem?.name}</ItemName>
                <ItemPrice>${Number(selectedItem?.price).toFixed(2)}</ItemPrice>
              </ItemHeader>
              <ItemDescription>{selectedItem?.description}</ItemDescription>
            </RightContainer>
          </ItemInfo>
          {/* <br />
          <InputLabel>Special Instructions</InputLabel>
          <SpecialIntructionsInput
            value={specialInstructions}
            onChange={(e) => setSpecialInstructions(e.target.value)}
          />
          <br />
          <br /> */}
          <ButtonsContainer>
            <QuantitySelector
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              quantity={quantity}
            />
            <OrderButton onClick={handleOrderItemClick} />
          </ButtonsContainer>
        </ModalContent>
      </ModalWrapper>
    </Popup>
  )
}
