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

export function Header({ storeUrl }: { storeUrl: string }) {
  const { cartState } = useContext(cartContext)

  return (
    <HeaderContainer>
      <MaxWidthContainer>
        <HeaderLeftCell>
          <RxHamburgerMenu size="1.5em" />
        </HeaderLeftCell>
        <HeaderCenterCell>
          <HeaderTitle>{storeUrl}</HeaderTitle>
          <HeaderSubTitle>
            1989 Hosea L Williams Dr SE, Atlanta, GA 30317
          </HeaderSubTitle>
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
