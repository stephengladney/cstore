import { ReactNode, useContext, useReducer, useRef } from "react"
import { OrderingMenu } from "../OrderingMenu/OrderingMenu"
// import { OrderCart } from "../OrderCart/OrderCart"
import { useState } from "react"
// import { Container } from "./OrderingContainer.styles"
// import { OrderItemModal } from "./OrderItemModal/OrderItemModal"
import { cartContext, CartProvider } from "../../contexts/cartContext"
import type { Cart, CartItem } from "../../types/Cart"
import { PopupActions } from "reactjs-popup/dist/types"
import type { MenuItem } from "../../types/MenuItem"
import { ReactComponents } from "../../types/React"
import { OrderCart } from "../OrderCart/OrderCart"

export function OrderingContainer({}) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>(
    undefined
  )
  const modalRef = useRef<PopupActions>()
  // const closeModal = () => modalRef.current!.close()
  // const openModal = () => modalRef.current!.open()
  const { cartState } = useContext(cartContext)

  return (
    <>
      <div className="flex grow justify-center overflow-y-scroll pb-32">
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
      <OrderCart cart={cartState} />
    </>
  )
}
