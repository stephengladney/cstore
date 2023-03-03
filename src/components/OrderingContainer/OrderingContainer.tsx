import { useContext, useEffect, useRef } from "react"
import { OrderingMenu } from "../OrderingMenu/OrderingMenu"
import { useState } from "react"
import { OrderItemModal } from "../OrderingMenu/OrderItemModal/OrderItemModal"
import { cartContext } from "../../contexts/cartContext"
import type { PopupActions } from "reactjs-popup/dist/types"
import type { MenuItem } from "../../types/MenuItem"
import type { CartItem } from "../../types/Cart"
import { OrderCart } from "../OrderCart/OrderCart"
import { dimmerContext } from "../../contexts/dimmerContext"

export function OrderingContainer({}) {
  const [selectedItem, setSelectedItem] = useState<
    MenuItem | CartItem | undefined
  >()
  const [selectedCartItemIndex, setSelectedCartItemIndex] = useState<number>()
  const { setIsDimmed } = useContext(dimmerContext)
  const orderItemModalRef = useRef<PopupActions>({
    open: () => undefined,
    close: () => undefined,
    toggle: () => undefined,
  })

  const closeModal = () => {
    setSelectedItem(undefined)
    setSelectedCartItemIndex(undefined)
    orderItemModalRef.current.close()
  }
  const openModal = () => orderItemModalRef.current.open()
  const { cart } = useContext(cartContext)

  const editCartItem = (itemIndex: number) => {
    const itemToEdit = cart.items[itemIndex]
    if (itemToEdit) {
      setSelectedCartItemIndex(itemIndex)
      setSelectedItem({
        ...itemToEdit,
        price: itemToEdit.price / itemToEdit.quantity,
      })
    }
  }

  useEffect(() => {
    if (selectedItem) {
      setIsDimmed(true)
      openModal()
    } else {
      setIsDimmed(false)
    }
  }, [selectedItem, setIsDimmed])

  return (
    <>
      <div className="flex grow justify-center overflow-y-scroll px-0 pb-32 lg:px-10">
        <OrderingMenu setSelectedItem={setSelectedItem} />
        <OrderItemModal
          closeModal={closeModal}
          selectedCartItemIndex={selectedCartItemIndex}
          modalRef={orderItemModalRef}
          selectedItem={selectedItem}
        />
      </div>
      <OrderCart cart={cart} editCartItem={editCartItem} />
    </>
  )
}
