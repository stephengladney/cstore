import { useContext, useState } from "react"
import { cartContext } from "../../../contexts/cartContext"
import type { CartItem } from "../../../types/Cart"
import {
  ItemContainer,
  ItemCategory,
  ItemName,
  ItemQuantity,
  ItemPrice,
  RemoveItemButton,
  RemoveItemButtonContainer,
} from "./CartItem.styles"
// import { OrderCartItemInstructions } from "./OrderCartItemInstructions/OrderCartItemInstructions"
// import { OrderCartItemOption } from "./OrderCartItemOption/OrderCartItemOption"

export function CartItem({ index, item }: { index: number; item: CartItem }) {
  const [isHover, setIsHover] = useState(false)
  const { dispatch } = useContext(cartContext)

  const handleRemoveItemClick = () =>
    dispatch({ type: "REMOVE_ITEM", payload: index })

  return (
    <ItemContainer
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
    >
      <ItemCategory>{item.category}</ItemCategory>
      <ItemQuantity>{item.quantity || 1} x</ItemQuantity>
      <ItemName>{item.name}</ItemName>
      {isHover ? (
        <RemoveItemButtonContainer>
          <RemoveItemButton onClick={handleRemoveItemClick}>
            &times;
          </RemoveItemButton>
        </RemoveItemButtonContainer>
      ) : (
        <ItemPrice>{Number(item.price).toFixed(2)}</ItemPrice>
      )}
      {/* {item.instructions && (
        <OrderCartItemInstructions instructions={item.instructions} />
      )}
      {item.options &&
        item.options.map((option) => <OrderCartItemOption option={option} />)} */}
    </ItemContainer>
  )
}