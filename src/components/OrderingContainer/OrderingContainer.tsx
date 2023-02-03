import { useContext, useEffect, useRef } from "react"
import { OrderingMenu } from "../OrderingMenu/OrderingMenu"
import { useState } from "react"
import { OrderItemModal } from "../OrderingMenu/OrderItemModal/OrderItemModal"
import { cartContext } from "../../contexts/cartContext"
import type { PopupActions } from "reactjs-popup/dist/types"
import type { MenuItem } from "../../types/MenuItem"
import { OrderCart } from "../OrderCart/OrderCart"
import { dimmerContext } from "../../contexts/dimmerContext"

export function OrderingContainer({}) {
  const [selectedItem, setSelectedItem] = useState<MenuItem | undefined>()
  const { setIsDimmed } = useContext(dimmerContext)
  const orderItemModalRef = useRef<PopupActions>({
    open: () => undefined,
    close: () => undefined,
    toggle: () => undefined,
  })

  const closeModal = () => {
    setSelectedItem(undefined)
    orderItemModalRef.current.close()
  }
  const openModal = () => orderItemModalRef.current.open()
  const { cartState } = useContext(cartContext)

  useEffect(() => {
    if (selectedItem) {
      setIsDimmed(true)
      openModal()
    } else {
      setIsDimmed(false)
    }
  }, [selectedItem])

  return (
    <>
      <div className="flex grow justify-center overflow-y-scroll px-0 pb-32 lg:px-10">
        <OrderingMenu setSelectedItem={setSelectedItem} />
        <OrderItemModal
          closeModal={closeModal}
          modalRef={orderItemModalRef}
          selectedItem={selectedItem}
        />
      </div>
      <OrderCart cart={cartState} />
    </>
  )
}
