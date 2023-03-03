import { useRef } from "react"
import {
  HeaderContainer,
  HeaderCenterCell,
  HeaderLeftCell,
  HeaderRightCell,
  HeaderTitle,
  MaxWidthContainer,
  HeaderSubTitle,
  CartBadge,
} from "./Header.styles"
import { IconContext } from "react-icons/lib"
import { RxHamburgerMenu } from "react-icons/rx"
import { BsCart2 } from "react-icons/bs"
import { useContext } from "react"
import { cartContext } from "../../contexts/cartContext"
import { getCartItemCount } from "../../lib/cart"
import type { Store } from "../../types/Store"
import type { PopupActions } from "reactjs-popup/dist/types"
import { ModalOrderCart } from "../ModalOrderCart/ModalOrderCart"

export function Header({ store }: { store: Store }) {
  const { cart } = useContext(cartContext)

  const modalOrderCartRef = useRef<PopupActions>({
    open: () => undefined,
    close: () => undefined,
    toggle: () => undefined,
  })
  const openCartModal = () => {
    if (cart.items.length > 0) {
      modalOrderCartRef.current.open()
    }
  }

  const closeCartModal = () => {
    modalOrderCartRef.current.close()
  }

  return (
    <HeaderContainer>
      <MaxWidthContainer>
        <HeaderLeftCell>
          <RxHamburgerMenu size="1.5em" />
        </HeaderLeftCell>
        <HeaderCenterCell>
          <HeaderTitle>{store.name}</HeaderTitle>
          <HeaderSubTitle>{store.address}</HeaderSubTitle>
        </HeaderCenterCell>
        <HeaderRightCell>
          <IconContext.Provider value={{ color: "#eee" }}>
            <BsCart2 size="1.5em" onClick={openCartModal} />
          </IconContext.Provider>
          {cart.items.length > 0 && (
            <CartBadge
              itemCount={getCartItemCount(cart)}
              onClick={openCartModal}
            />
          )}
        </HeaderRightCell>
      </MaxWidthContainer>
      <ModalOrderCart
        cart={cart}
        closeModal={closeCartModal}
        modalRef={modalOrderCartRef}
      />
    </HeaderContainer>
  )
}
