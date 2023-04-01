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
import { type Dispatch, type SetStateAction, useContext } from "react"
import { cartContext } from "../../contexts/cartContext"
import { getCartItemCount } from "../../lib/cart"
import type { StoreType } from "../../types/StoreType"

interface HeaderProps {
  callback: string
  isNavMenuOpen: boolean
  openCartModal: () => void
  setIsNavMenuOpen: Dispatch<SetStateAction<boolean>>
  store: StoreType
}

export function Header({
  callback,
  openCartModal,
  isNavMenuOpen,
  setIsNavMenuOpen,
  store,
}: HeaderProps) {
  const { cart } = useContext(cartContext)

  const handleDrawerClick = () => {
    setIsNavMenuOpen((isNavMenuOpen) => !isNavMenuOpen)
  }

  return (
    <HeaderContainer>
      <MaxWidthContainer>
        <HeaderLeftCell>
          <RxHamburgerMenu
            size="1.5em"
            onClick={handleDrawerClick}
            className={`cursor-pointer ${
              isNavMenuOpen ? "opacity-0" : "opacity-1"
            }`}
            style={{ transition: "opacity 0.2s linear" }}
          />
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
