import { Dispatch, SetStateAction, useContext, useEffect, useRef } from "react"
import { OrderingMenu } from "../OrderingMenu/OrderingMenu"
import { useState } from "react"
import { OrderItemModal } from "../OrderingMenu/OrderItemModal/OrderItemModal"
import { cartContext } from "../../contexts/cartContext"
import type { PopupActions } from "reactjs-popup/dist/types"
import type { MenuItemType } from "../../types/MenuItemType"
import type { CartItem } from "../../types/Cart"
import { OrderCart } from "../OrderCart/OrderCart"
import { MobileViewCartButton } from "../OrderCart/MobileViewCartButton/MobileViewCartButton"
import { dimmerContext } from "../../contexts/dimmerContext"
import { storeContext } from "../../contexts/storeContext"
import { formatPhoneNumber } from "../../lib/client"

export function OrderingContainer({
  openCartModal,
}: {
  openCartModal: () => void
}) {
  const [selectedItem, setSelectedItem] = useState<
    MenuItemType | CartItem | undefined
  >()
  const [selectedCartItemIndex, setSelectedCartItemIndex] = useState<number>()
  const { setIsDimmed } = useContext(dimmerContext)
  const store = useContext(storeContext)
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
      <div className="flex grow flex-col items-center overflow-y-scroll px-0 lg:px-10">
        <div className="w-full">
          <div className="mt-8 flex w-full flex-col items-start px-4 font-poppins lg:px-0">
            <h1 className="text-3xl lg:text-4xl">
              Welcome to
              <br className="lg:hidden" />
              <span className="hidden lg:inline"> </span>
              {store.name}
            </h1>
            <h2 className="mt-1 text-sm leading-6">{store.address}</h2>
            <h2 className="text-sm leading-5">
              {formatPhoneNumber(store.phone as string)}
            </h2>
          </div>
          <OrderingMenu setSelectedItem={setSelectedItem} />
          <OrderItemModal
            closeModal={closeModal}
            selectedCartItemIndex={selectedCartItemIndex}
            modalRef={orderItemModalRef}
            selectedItem={selectedItem}
          />
        </div>
      </div>
      <OrderCart cart={cart} editCartItem={editCartItem} />
      {cart.items.length > 0 && (
        <MobileViewCartButton cart={cart} onClick={openCartModal} />
      )}
    </>
  )
}
