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
import { Store } from "../../types/Store"

export function Header({ store }: { store: Store }) {
  const { cartState } = useContext(cartContext)

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
            <BsCart2 size="1.5em" />
          </IconContext.Provider>
          {cartState.items.length > 0 && (
            <CartBadge itemCount={getCartItemCount(cartState)} />
          )}
        </HeaderRightCell>
      </MaxWidthContainer>
    </HeaderContainer>
  )
}
