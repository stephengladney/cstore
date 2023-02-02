import { useContext, useRef } from "react"
import { OrderingMenu } from "../OrderingMenu/OrderingMenu"
import { useState } from "react"
// import { OrderItemModal } from "./OrderItemModal/OrderItemModal"
import { cartContext } from "../../contexts/cartContext"
import { PopupActions } from "reactjs-popup/dist/types"
import type { MenuItem } from "../../types/MenuItem"
import { OrderCart } from "../OrderCart/OrderCart"

export function OrderingContainer({}) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>()
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
