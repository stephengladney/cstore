import { ReactNode, useContext, useReducer, useRef } from "react"
import { OrderingMenu } from "../OrderingMenu/OrderingMenu"
// import { OrderCart } from "../OrderCart/OrderCart"
import { useState } from "react"
// import { Container } from "./OrderingContainer.styles"
// import { OrderItemModal } from "./OrderItemModal/OrderItemModal"
import { cartContext, CartProvider } from "../../contexts/cartContext"
import type { Cart, CartItem } from "../../types/Cart"
import { PopupActions } from "reactjs-popup/dist/types"
import type { Item } from "../../types/Item"
import { ReactComponents } from "../../types/React"
import { OrderingCart } from "../OrderingCart/OrderingCart"
import { CartContainer } from "../OrderingCart/OrderingCart.styles"

export function OrderingContainer({}) {
  const [selectedItem, setSelectedItem] = useState<Item | undefined>(undefined)
  const modalRef = useRef<PopupActions>()
  // const closeModal = () => modalRef.current!.close()
  // const openModal = () => modalRef.current!.open()
  const { cartState } = useContext(cartContext)

  return (
    <>
      <div className="grow lg:px-52">
        <OrderingMenu
          setSelectedItem={setSelectedItem}
          openModal={() => null}
        />
        {/* <OrderItemModal
          closeModal={closeModal}
          modalRef={modalRef}
          selectedItem={selectedItem}
        /> */}
      </div>
      <CartContainer>x</CartContainer>
      {/* <OrderCart cart={cartState} /> */}
    </>
  )
}
