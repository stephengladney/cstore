import { type Dispatch, type SetStateAction, useContext } from "react"
import { cartContext } from "../../../contexts/cartContext"
import type { MenuItem } from "../../../types/MenuItem"
import {
  MenuItemContainer,
  MenuItemDescription,
  MenuItemHeader,
  MenuItemPrimaryContainer,
  MenuItemSecondaryContainer,
  MenuItemName,
  MenuItemNameContainer,
  MenuItemPhoto,
  MenuItemPrice,
  MenuItemPriceContainer,
  UnavailablePill,
} from "./MenuItem.styles"

interface MenuItemProps {
  item: MenuItem
  openModal: () => void
  setSelectedItem: Dispatch<SetStateAction<MenuItem | undefined>>
}

export function MenuItem({ item, openModal, setSelectedItem }: MenuItemProps) {
  const { dispatch } = useContext(cartContext)
  const selectItem = () => {
    setSelectedItem(item)
    openModal()
  }

  return (
    <MenuItemContainer
      isDisabled={!item.isAvailable}
      onClick={() => {
        if (item.isAvailable) {
          dispatch({ type: "ADD_ITEM", payload: { ...item, quantity: 1 } })
        }
      }}
    >
      <MenuItemPrimaryContainer>
        <MenuItemPhoto src={item.imageUrl} />
      </MenuItemPrimaryContainer>
      <MenuItemSecondaryContainer>
        <MenuItemHeader>
          <MenuItemNameContainer>
            <MenuItemName isDisabled={!item.isAvailable}>
              {item.name}
            </MenuItemName>
            {!item.isAvailable && <UnavailablePill />}
          </MenuItemNameContainer>
          <MenuItemPriceContainer>
            <MenuItemPrice>${Number(item.price).toFixed(2)}</MenuItemPrice>
          </MenuItemPriceContainer>
        </MenuItemHeader>
        <MenuItemDescription isDisabled={!item.isAvailable}>
          {item.description}
        </MenuItemDescription>
      </MenuItemSecondaryContainer>
    </MenuItemContainer>
  )
}
