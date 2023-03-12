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
import type { StoreType } from "../../types/StoreType"

interface HeaderProps {
  callback: string
  openCartModal: () => void
  store: StoreType
}

export function Header({ callback, openCartModal, store }: HeaderProps) {
  const { cart } = useContext(cartContext)

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
          {callback !== "success" && (
            <>
              <IconContext.Provider value={{ color: "#eee" }}>
                <BsCart2 size="1.5em" onClick={openCartModal} />
              </IconContext.Provider>
              {cart.items.length > 0 && (
                <CartBadge
                  itemCount={getCartItemCount(cart)}
                  onClick={openCartModal}
                />
              )}
            </>
          )}
        </HeaderRightCell>
      </MaxWidthContainer>
    </HeaderContainer>
  )
}
