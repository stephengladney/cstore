import { useContext, useEffect, useRef } from "react"
import { OrderingMenu } from "../OrderingMenu/OrderingMenu"
import { useState } from "react"
import { OrderItemModal } from "../OrderingMenu/OrderItemModal/OrderItemModal"
import { cartContext } from "../../contexts/cartContext"
import type { PopupActions } from "reactjs-popup/dist/types"
import type { MenuItem } from "../../types/MenuItem"
import { OrderCart } from "../OrderCart/OrderCart"
import { Dimmer } from "./Dimmer"

export function OrderingContainer({}) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>()
  const modalRef = useRef<PopupActions>()
  const closeModal = () => {
    setSelectedItem(undefined)
    modalRef.current!.close()
  }
  const openModal = () => modalRef.current!.open()
  const { cartState } = useContext(cartContext)

  useEffect(() => {
    if (selectedItem) openModal()
  }, [selectedItem])

  return (
    <>
      <div className="flex grow justify-center overflow-y-scroll pb-32">
        <OrderingMenu setSelectedItem={setSelectedItem} />
        <Dimmer isItemSelected={!!selectedItem}>
          <OrderItemModal
            closeModal={closeModal}
            // @ts-ignore
            modalRef={modalRef}
            selectedItem={selectedItem}
          />
        </Dimmer>
      </div>
      <OrderCart cart={cartState} />
    </>
  )
}
