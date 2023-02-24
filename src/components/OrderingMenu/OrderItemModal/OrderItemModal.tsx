import { type MutableRefObject, useContext, useState, useEffect } from "react"
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
import type { CartItem } from "../../../types/Cart"
import { QuantitySelector } from "../QuantitySelector/QuantitySelector"
import type { PopupActions } from "reactjs-popup/dist/types"

interface OrderItemModalProps {
  cartItemIndex?: number
  closeModal: () => void
  modalRef: MutableRefObject<PopupActions>
  selectedItem?: MenuItem | CartItem
  selectedCartItemIndex?: number
}

export function OrderItemModal({
  closeModal,
  modalRef,
  selectedCartItemIndex,
  selectedItem,
}: OrderItemModalProps) {
  // const [specialInstructions, setSpecialInstructions] = useState("")
  const [quantity, setQuantity] = useState(1)

  const increaseQuantity = () => setQuantity((quantity) => quantity + 1)
  const decreaseQuantity = () => {
    if (quantity > 1) setQuantity((quantity) => quantity - 1)
  }

  const { dispatch } = useContext(cartContext)
  const isEditingCartItem = !isNaN(selectedCartItemIndex!)

  const handleOrderItemClick = () => {
    if (isEditingCartItem) {
      dispatch({
        type: "EDIT_CART_ITEM",
        payload: {
          index: selectedCartItemIndex as number,
          newItem: {
            ...(selectedItem as MenuItem),
            quantity,
            price: Number(Number(selectedItem?.price) * quantity),
          },
        },
      })
      setQuantity(1)
      closeModal()
    } else if (selectedItem) {
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

  useEffect(() => {
    const itemAsCartItem = selectedItem as CartItem
    if (itemAsCartItem?.quantity) {
      setQuantity(itemAsCartItem.quantity)
    }
  }, [selectedItem])

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
            <OrderButton onClick={handleOrderItemClick}>
              {isEditingCartItem ? "Update Order" : "Add to Order"} - $
              {Number((selectedItem?.price as number) * quantity).toFixed(2)}
            </OrderButton>
          </ButtonsContainer>
        </ModalContent>
      </ModalWrapper>
    </Popup>
  )
}
