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
  const modalRef = useRef<PopupActions>({
    open: () => undefined,
    close: () => undefined,
    toggle: () => undefined,
  })
  const closeModal = () => {
    setSelectedItem(undefined)
    modalRef.current.close()
  }
  const openModal = () => modalRef.current.open()
  const { cartState } = useContext(cartContext)

  useEffect(() => {
    if (selectedItem) openModal()
  }, [selectedItem])

  return (
    <>
      <div className="flex grow justify-center overflow-y-scroll px-0 pb-32 lg:px-10">
        <OrderingMenu setSelectedItem={setSelectedItem} />
        <Dimmer isItemSelected={!!selectedItem}>
          <OrderItemModal
            closeModal={closeModal}
            modalRef={modalRef}
            selectedItem={selectedItem}
          />
        </Dimmer>
      </div>
      <OrderCart cart={cartState} />
    </>
  )
}
